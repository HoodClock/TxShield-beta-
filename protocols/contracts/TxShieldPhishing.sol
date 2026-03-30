// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 *   Three Traps:
 *     1. Allowance Trap    —> Does target drain ERC20 allowances?
 *     2. Permit Trap       —> Does target abuse EIP-2612 signatures?
 *     3. Native Forwarder  —> Does target silently route ETH elsewhere?
 */
contract InstrumentedERC20 {
    // ── Core ERC20 state
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    // ── Trap 1 instrumentation
    bool public transferFromCalled;
    address public transferFromCaller; // Who called it? (should be the target)
    address public transferFromRecipient; // Where were the tokens going?
    uint256 public transferFromAmount;

    // ── Trap 2 instrumentation
    bool public permitCalled;
    address public permitCaller; // Who called permit? (should be the target)
    address public permitSpender; // Who did they grant allowance to?

    // ── Bootstrap

    function mint(address to, uint256 amount) external {
        _balances[to] = amount;
    }

    // ── Standard ERC20

    function balanceOf(address account) external view returns (uint256) {
        return _balances[account];
    }

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        _allowances[msg.sender][spender] = amount;
        return true;
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        if (_balances[msg.sender] >= amount) {
            _balances[msg.sender] -= amount;
            _balances[to] += amount;
        }
        return true;
    }

    /**
     * @notice Instrumented transferFrom.
     *         Always succeeds so the drainer's flow continues uninterrupted.
     *         We record the caller so the harness can check if TARGET was the one
     *         who pulled the funds — not some innocent third party.
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool) {
        transferFromCalled = true;
        transferFromCaller = msg.sender;
        transferFromRecipient = to;
        transferFromAmount = amount;

        // Simulate a realistic balance change so the drainer doesn't short-circuit
        if (_balances[from] >= amount) {
            _balances[from] -= amount;
        } else {
            _balances[from] = 0;
        }
        _balances[to] += amount;

        // Consume allowance if present
        if (_allowances[from][msg.sender] >= amount) {
            _allowances[from][msg.sender] -= amount;
        }

        return true;
    }

    /**
     * @notice Instrumented EIP-2612 permit.
     *         Signature validation is intentionally skipped.
     *
     *         Rationale: A legitimate protocol verifies signatures and reverts on
     *         bad ones. A drainer's contract will call permit() using the victim's
     *         real signature forwarded from the frontend. In our simulation we pass
     *         a bogus signature — if the target calls permit() AT ALL, it means it
     *         was designed to consume off-chain signatures from victims. That's the
     *         red flag. We don't care that our fake sig is invalid; we care that the
     *         target TRIED to use it.
     */
    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 /* v */,
        bytes32 /* r */,
        bytes32 /* s */
    ) external {
        permitCalled = true;
        permitCaller = msg.sender;
        permitSpender = spender;

        // Grant the allowance so the target can continue to the transferFrom step
        _allowances[owner][spender] = value;

        // Suppress unused variable warning
        deadline;
    }

    // ── EIP-2612 interface stubs (needed for ABI compatibility)

    function DOMAIN_SEPARATOR() external pure returns (bytes32) {
        return keccak256("TXSHIELD_PHANTOM_DOMAIN_SEPARATOR");
    }

    function nonces(address) external pure returns (uint256) {
        return 0;
    }

    // ── ERC20 metadata

    function decimals() external pure returns (uint8) {
        return 18;
    }

    function name() external pure returns (string memory) {
        return "PhantomUSDT";
    }

    function symbol() external pure returns (string memory) {
        return "pUSDT";
    }

    function totalSupply() external pure returns (uint256) {
        return 10_000_000e18;
    }
}

/**
 * @title TxShieldPhishingHarness
 * @notice The main phantom contract. Injected via eth_call state overrides.
 *         Acts as a "victim wallet" and tests the target across three attack surfaces.
 *
 * @dev what we do at the Node.js(server-side):
 *      1. Compile this file → get abi + deployedBytecode
 *      2. eth_call with stateOverride { [PHANTOM_ADDR]: { code: deployedBytecode, balance: 0.01 ETH } }
 *      3. Call runAllChecks(targetAddress) and decode the PhishingResult
 *      4. For etherForwarded, use debug_traceCall to resolve the destination address
 */
contract TxShieldPhishingHarness {
    // ── Result struct — ABI-decoded in Node.js

    struct PhishingResult {
        // Trap 1: Allowance
        bool allowanceDrained;
        address drainedTo; // Recipient the target tried to send tokens to
        uint256 drainedAmount;
        // Trap 2: Permit
        bool permitAbused;
        address permitGrantedTo; // Who the target tried to give allowance to
        // Trap 3: Native Forwarder
        bool etherForwarded;
        // NOTE: etherForwardedTo is NOT in this struct.
        //       It is resolved in Node.js via debug_traceCall on the result.

        // Summary
        uint8 riskScore; // 0–100
        uint8 flagCount; // Number of traps that fired
    }

    // ── Known drainer function selectors
    // Sourced from real-world drainer contract analysis.
    // We probe each of these on the target to see if any trigger our instrumented token.

    // Generic drainer entry points
    bytes4 private constant _SEL_CLAIM = bytes4(keccak256("claim()"));
    bytes4 private constant _SEL_SWEEP = bytes4(keccak256("sweep(address)"));
    bytes4 private constant _SEL_DRAIN =
        bytes4(keccak256("drain(address,address)"));
    bytes4 private constant _SEL_COLLECT =
        bytes4(keccak256("collect(address)"));
    bytes4 private constant _SEL_TRANSFER_FROM =
        bytes4(keccak256("transferFrom(address,address,uint256)"));
    bytes4 private constant _SEL_SAFE_TF =
        bytes4(keccak256("safeTransferFrom(address,address,uint256)"));
    bytes4 private constant _SEL_EXECUTE =
        bytes4(keccak256("execute(address,bytes)"));
    bytes4 private constant _SEL_WITHDRAW =
        bytes4(keccak256("withdraw(address,uint256)"));

    // Permit-flavored drainer entry points
    bytes4 private constant _SEL_SWEEP_PERMIT =
        bytes4(
            keccak256(
                "sweepWithPermit(address,uint256,uint256,uint8,bytes32,bytes32)"
            )
        );
    bytes4 private constant _SEL_CLAIM_PERMIT =
        bytes4(
            keccak256(
                "claimWithPermit(address,address,uint256,uint256,uint8,bytes32,bytes32)"
            )
        );
    bytes4 private constant _SEL_PULL_PERMIT =
        bytes4(
            keccak256(
                "pullWithPermit(address,uint256,uint256,uint8,bytes32,bytes32)"
            )
        );
    bytes4 private constant _SEL_PERMIT_AND_CALL =
        bytes4(
            keccak256(
                "permitAndCall(address,uint256,uint256,uint8,bytes32,bytes32,bytes)"
            )
        );

    // ── Entry point

    /**
     * @notice Runs all three phishing traps against the target contract.
     * @param target The suspicious contract address to probe.
     *
     * @dev Called via eth_call with state overrides — never on-chain.
     *      Send ETH in the call value so the native forwarder check has funds.
     */
    function runAllChecks(
        address target
    ) external payable returns (PhishingResult memory result) {
        // Deploy instrumented mock token #1 for the Allowance Trap
        InstrumentedERC20 token1 = new InstrumentedERC20();
        token1.mint(address(this), 10_000_000e18);

        // ── Trap 1: Allowance
        _runAllowanceTrap(target, token1, result);

        // Deploy a FRESH mock token for Trap 2 so there are no state collisions
        InstrumentedERC20 token2 = new InstrumentedERC20();
        token2.mint(address(this), 10_000_000e18);

        // ── Trap 2: Permit
        _runPermitTrap(target, token2, result);

        // ── Trap 3: Native Forwarder
        _runNativeForwarder(target, result);

        // ── Scoring
        uint8 flagCount = 0;
        uint8 score = 0;

        if (result.allowanceDrained) {
            score += 45;
            flagCount++;
        }
        if (result.permitAbused) {
            score += 40;
            flagCount++;
        }
        if (result.etherForwarded) {
            score += 15;
            flagCount++;
        }

        result.riskScore = score;
        result.flagCount = flagCount;
    }

    // ── Trap 1: Allowance Drain
    /**
     * @dev Simulates a victim approving the target, then probes all known drainer
     *      entry points. If the target calls transferFrom on our instrumented token
     *      AND the caller is specifically the target — it's a drainer.
     *
     *      The key check: `token.transferFromCaller() == target`
     *      This ensures we don't false-positive on legitimate internal router hops.
     */
    function _runAllowanceTrap(
        address target,
        InstrumentedERC20 token,
        PhishingResult memory result
    ) internal {
        address tokenAddr = address(token);
        address victim = address(this);

        // The victim (us) approves the target — exactly what a phishing site prompts
        token.approve(target, type(uint256).max);

        // Probe all known drainer selectors
        // We don't check success — we care what the target ATTEMPTS, not whether it succeeds
        target.call(abi.encodeWithSelector(_SEL_CLAIM));
        target.call(abi.encodeWithSelector(_SEL_SWEEP, tokenAddr));
        target.call(abi.encodeWithSelector(_SEL_COLLECT, tokenAddr));
        target.call(abi.encodeWithSelector(_SEL_DRAIN, tokenAddr, victim));
        target.call(
            abi.encodeWithSelector(
                _SEL_TRANSFER_FROM,
                victim,
                target,
                10_000_000e18
            )
        );
        target.call(
            abi.encodeWithSelector(_SEL_SAFE_TF, victim, target, 10_000_000e18)
        );
        target.call(
            abi.encodeWithSelector(_SEL_WITHDRAW, tokenAddr, 10_000_000e18)
        );
        target.call(
            abi.encodeWithSelector(
                _SEL_EXECUTE,
                tokenAddr,
                abi.encodeWithSelector(
                    _SEL_TRANSFER_FROM,
                    victim,
                    target,
                    10_000_000e18
                )
            )
        );

        // Some drainers trigger on bare ETH receive with no calldata
        target.call{value: 0}("");

        // Verdict: did the TARGET specifically call transferFrom on our fake token?
        if (
            token.transferFromCalled() && token.transferFromCaller() == target
        ) {
            result.allowanceDrained = true;
            result.drainedTo = token.transferFromRecipient();
            result.drainedAmount = token.transferFromAmount();
        }
    }

    // ── Trap 2: Permit Abuse
    /**
     * @dev Simulates a victim handing the target a gasless approval signature.
     *      We probe permit-flavored drainer entry points with a fake (v=27, r=1, s=1)
     *      signature. Our instrumented token's permit() doesn't validate — it just
     *      records who called it. If the target calls permit(), it was designed to
     *      consume off-chain victim signatures. That's a drainer.
     */
    function _runPermitTrap(
        address target,
        InstrumentedERC20 token,
        PhishingResult memory result
    ) internal {
        address tokenAddr = address(token);
        address victim = address(this);
        uint256 deadline = type(uint256).max;
        uint8 v = 27;
        bytes32 r = bytes32(uint256(1));
        bytes32 s = bytes32(uint256(1));

        // Probe permit-based drainer selectors
        target.call(
            abi.encodeWithSelector(
                _SEL_SWEEP_PERMIT,
                tokenAddr,
                10_000_000e18,
                deadline,
                v,
                r,
                s
            )
        );
        target.call(
            abi.encodeWithSelector(
                _SEL_CLAIM_PERMIT,
                tokenAddr,
                victim,
                10_000_000e18,
                deadline,
                v,
                r,
                s
            )
        );
        target.call(
            abi.encodeWithSelector(
                _SEL_PULL_PERMIT,
                tokenAddr,
                10_000_000e18,
                deadline,
                v,
                r,
                s
            )
        );
        target.call(
            abi.encodeWithSelector(
                _SEL_PERMIT_AND_CALL,
                tokenAddr,
                10_000_000e18,
                deadline,
                v,
                r,
                s,
                bytes("")
            )
        );

        // Verdict: did the TARGET call permit() on our fake token?
        if (token.permitCalled() && token.permitCaller() == target) {
            result.permitAbused = true;
            result.permitGrantedTo = token.permitSpender();
        }
    }

    // ── Trap 3: Native ETH Forwarder
    /**
     * @dev Sends ETH to the target and checks if the target's balance increased.
     *      A legitimate contract (vault, staking, etc.) will hold or track the ETH.
     *      A scam router immediately pushes it to a hidden wallet.
     *
     *      If target's balance did NOT increase by what we sent → it forwarded the ETH.
     *      The actual destination address is resolved in Node.js via debug_traceCall.
     */
    function _runNativeForwarder(
        address target,
        PhishingResult memory result
    ) internal {
        if (address(this).balance == 0) return;

        // Send half our ETH balance — keeping the other half in reserve
        uint256 sendAmount = address(this).balance / 2;
        uint256 balanceBefore = target.balance;

        (bool sent, ) = target.call{value: sendAmount}("");

        if (!sent) return; // If it reverted entirely, not a forwarder

        uint256 balanceAfter = target.balance;

        // If the target's balance grew by less than what we sent,
        // it routed some or all of the ETH somewhere else.
        if (balanceAfter < balanceBefore + sendAmount) {
            result.etherForwarded = true;
            // Destination is resolved in Node.js — debug_traceCall gives us the full call tree
        }
    }

    // ── Housekeeping

    receive() external payable {}

    fallback() external payable {}
}
