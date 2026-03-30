/**
 * Detects phishing contracts (drainers, permit abusers, ETH routers) using
 * the TxShieldPhishingHarness phantom contract injected via eth_call state
 * overrides. No on-chain deployment, no gas cost, no persistent state.
 *
 * Technique summary:
 *   1. We give the harness a fake address on the target chain
 *   2. We tell the node "for THIS call only, pretend code exists at that address"
 *   3. We call the harness, which calls the target, and the target reveals itself
 *   4. We decode what the target attempted to do and return a verdict
 */

"use strict";

const { ethers } = require("ethers");
const artifact = require("../../../../protocols/artifacts/contracts/TxShieldPhishing.sol/TxShieldPhishingHarness.json");

// ── Phantom address constants ──────────────────────────────────────────────
// These addresses are arbitrary — they just need to be unused on any chain.
// We inject our harness bytecode here at call time via state overrides.

const PHANTOM_HARNESS_ADDR = "0x1337133713371337133713371337133713371337";
const PHANTOM_VICTIM_ETH = ethers.parseEther("0.02"); // ETH we hand to the harness

// ── Chain → Alchemy RPC URL mapping ───────────────────────────────────────
const { decideChains } = require("../../../config/provider");

// debug_traceCall chain support (not all chains support this)
const TRACE_SUPPORTED = new Set(["eth", "base", "arb"]);

// ── Ethers interface for our harness ──────────────────────────────────────

const harnessInterface = new ethers.Interface(artifact.abi);

/**
 * Runs all phishing checks against a smart contract address.
 *
 * @param {string} contractAddress — The suspicious contract to probe
 * @param {string} chain           — One of: eth | bsc | base | arb
 * @returns {PhishingReport}
 */
async function detectPhishing(contractAddress, chain) {
  // chain selection & fetching rpcUrl
  const { rpcUrl } = decideChains(chain);
  if (!rpcUrl) {
    throw new Error(`Unsupported chain: ${chain}`);
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const checksumTarget = ethers.getAddress(contractAddress);

  // ── Step 1: Verify the target has code ──────────────────────────────────
  const code = await provider.getCode(checksumTarget);
  if (!code || code === "0x") {
    return buildReport({ isEmpty: true, contractAddress, chain });
  }

  // ── Step 2: Run the phantom harness via eth_call + state overrides ───────
  let rawResult;
  try {
    rawResult = await _callPhantomHarness(provider, checksumTarget);
  } catch (err) {
    // Some contracts have guards that revert on any external call.
    // That itself isn't evidence of phishing — report as inconclusive.
    return buildReport({
      inconclusive: true,
      reason: `Harness call reverted: ${err.message}`,
      contractAddress,
      chain,
    });
  }

  // ── Step 3: Decode the PhishingResult struct ─────────────────────────────
  const decoded = harnessInterface.decodeFunctionResult(
    "runAllChecks",
    rawResult,
  );
  const r = decoded[0]; // PhishingResult struct

  // ── Step 4: Resolve ETH forward destination via trace (if supported) ─────
  let etherForwardedTo = null;
  if (r.etherForwarded && TRACE_SUPPORTED.has(chain)) {
    etherForwardedTo = await _traceEtherForwardDestination(
      provider,
      checksumTarget,
    );
  }

  // ── Step 5: Build and return the report ──────────────────────────────────
  return buildReport({
    contractAddress,
    chain,

    allowanceDrained: r.allowanceDrained,
    drainedTo: r.allowanceDrained ? r.drainedTo : null,
    drainedAmount: r.allowanceDrained ? r.drainedAmount.toString() : null,

    permitAbused: r.permitAbused,
    permitGrantedTo: r.permitAbused ? r.permitGrantedTo : null,

    etherForwarded: r.etherForwarded,
    etherForwardedTo,

    riskScore: Number(r.riskScore),
    flagCount: Number(r.flagCount),
  });
}

// ── Internal helpers ───────────────────────────────────────────────────────

/**
 * Injects the phantom harness at a fake address via eth_call state overrides
 * and calls runAllChecks(target).
 *
 * State override format (EIP-1193 / Alchemy):
 *   { [address]: { code, balance, nonce, stateDiff } }
 *
 * The harness bytecode lives at PHANTOM_HARNESS_ADDR "for this call only".
 * The node executes it, returns the result, and forgets it ever existed.
 */
async function _callPhantomHarness(provider, targetAddress) {
  const calldata = harnessInterface.encodeFunctionData("runAllChecks", [
    targetAddress,
  ]);

  const tx = {
    to: PHANTOM_HARNESS_ADDR,
    data: calldata,
    value: "0x" + PHANTOM_VICTIM_ETH.toString(16),
    gas: "0x1312D00", // 20M gas — simulation is cheap, be generous
  };

  // State override: inject harness bytecode + fund it with ETH
  const stateOverride = {
    [PHANTOM_HARNESS_ADDR]: {
      code: artifact.deployedBytecode,
      balance: "0x" + PHANTOM_VICTIM_ETH.toString(16),
    },
  };

  // eth_call with state overrides (3rd parameter)
  const rawResult = await provider.send("eth_call", [
    tx,
    "latest",
    stateOverride,
  ]);

  return rawResult;
}

/**
 * Uses debug_traceCall to find where ETH was forwarded.
 * Walks the call tree looking for a CALL with value sent to an address
 * that is NOT the target itself (i.e., a hidden recipient).
 *
 * Only called when etherForwarded === true and chain supports tracing.
 */
async function _traceEtherForwardDestination(provider, targetAddress) {
  try {
    const trace = await provider.send("debug_traceCall", [
      {
        to: targetAddress,
        value: "0x" + ethers.parseEther("0.01").toString(16),
        data: "0x",
      },
      "latest",
      {
        tracer: "callTracer",
        tracerConfig: { onlyTopCall: false },
      },
    ]);

    return _walkCallTreeForForward(trace, targetAddress.toLowerCase());
  } catch {
    // Tracing may not be available for every node endpoint
    return null;
  }
}

/**
 * Recursively walks a callTracer trace tree.
 * Returns the first address that received ETH from the target
 * that is NOT the target itself.
 */
function _walkCallTreeForForward(node, targetAddr) {
  if (!node) return null;

  const calls = node.calls || [];

  for (const call of calls) {
    const to = call.to?.toLowerCase();
    const value = BigInt(call.value || "0x0");

    // Found an outbound call with ETH going to somewhere other than the target
    if (value > 0n && to && to !== targetAddr) {
      return call.to; // Return the original checksum form
    }

    // Recurse into nested calls
    const nested = _walkCallTreeForForward(call, targetAddr);
    if (nested) return nested;
  }

  return null;
}

// ── Report builder ─────────────────────────────────────────────────────────

/**
 * Builds a standardised PhishingReport object.
 * This is what the controller returns to the frontend.
 */
function buildReport(data) {
  const {
    contractAddress,
    chain,
    isEmpty = false,
    inconclusive = false,
    reason = null,
    allowanceDrained = false,
    drainedTo = null,
    drainedAmount = null,
    permitAbused = false,
    permitGrantedTo = null,
    etherForwarded = false,
    etherForwardedTo = null,
    riskScore = 0,
    flagCount = 0,
  } = data;

  // Derive a human-readable verdict label
  let verdict = "SAFE";
  if (isEmpty) verdict = "EMPTY_CONTRACT";
  if (inconclusive) verdict = "INCONCLUSIVE";
  if (riskScore >= 15 && riskScore < 40) verdict = "LOW_RISK";
  if (riskScore >= 40 && riskScore < 75) verdict = "HIGH_RISK";
  if (riskScore >= 75) verdict = "CRITICAL";

  const checks = [];

  if (!isEmpty && !inconclusive) {
    checks.push({
      name: "Allowance Drain Trap",
      triggered: allowanceDrained,
      severity: "CRITICAL",
      detail: allowanceDrained
        ? `Target called transferFrom and routed ${drainedAmount} tokens to ${drainedTo}`
        : "Target did not attempt to drain approved ERC20 allowances.",
    });

    checks.push({
      name: "Permit Signature Abuse",
      triggered: permitAbused,
      severity: "CRITICAL",
      detail: permitAbused
        ? `Target called permit() and granted allowance to ${permitGrantedTo}`
        : "Target did not attempt to consume permit signatures.",
    });

    checks.push({
      name: "Native ETH Forwarder",
      triggered: etherForwarded,
      severity: "MEDIUM",
      detail: etherForwarded
        ? `Target forwarded received ETH${etherForwardedTo ? ` to ${etherForwardedTo}` : " to an unknown address (tracing unavailable on this chain)"}`
        : "Target retained ETH — no silent forwarding detected.",
    });
  }

  return {
    contractAddress,
    chain,
    verdict,
    riskScore,
    flagCount,
    isEmpty,
    inconclusive,
    reason,
    checks,
    // Raw fields for the frontend to consume as needed
    raw: {
      allowanceDrained,
      drainedTo,
      drainedAmount,
      permitAbused,
      permitGrantedTo,
      etherForwarded,
      etherForwardedTo,
    },
    detectedAt: new Date().toISOString(),
  };
}

module.exports = { detectPhishing };
