// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./honeypot/base/HoneypotBase.sol";
import "./honeypot/features/BlacklistLogic.sol";
import "./honeypot/features/MintAccessLogic.sol";

/**
 * @title TxShieldHoneypot
 * @dev This contract is designed to identify potential honeypot characteristics within a target smart contract.
 * It integrates various logic modules to perform comprehensive checks, including blacklist detection and mint access evaluation.
 */
contract TxShieldHoneypot is HoneypotBase, BlacklistLogic, MintAccessLogic {
    /**
     * @dev Performs a series of checks on a target contract to determine if it exhibits honeypot-like behavior.
     *      It evaluates blacklist status and minting capabilities, accumulating a risk score based on findings.
     * @param targetContract The address of the contract to be checked.
     * @return A HoneypotBaseResult struct containing the findings, including blacklist detection, minting status, and an aggregated risk score.
     */
    function checkContract(
        address targetContract
    ) external payable returns (HoneypotBaseResult memory) {
        HoneypotBaseResult memory result;

        // Attempt to retrieve the owner of the target contract.
        // This is done within a try-catch block to gracefully handle contracts that do not expose an `owner()` function.
        address owner = address(0);
        try this.getOwner(targetContract) returns (address _o) {
            owner = _o;
        } catch {}

        // Check if the target contract or its owner is on a blacklist.
        result.isBlackListDetected = _isBlacklist(targetContract, owner);

        if (result.isBlackListDetected) {
            result.riskScore += 10; // Increment risk score if a blacklist is detected.
        }

        // Evaluate if the target contract has minting capabilities that could be exploited.
        bool isMintable = _checkMint(targetContract);

        if (isMintable) {
            result.riskScore += 5; // Increment risk score if mint access is detected.
            result.isMintable = true;
        }

        return result;
    }

    /**
     * @dev Helper function to attempt to extract the owner address of a target contract.
     *      It uses `staticcall` to safely call the `owner()` function on the target contract.
     * @param target The address of the contract from which to retrieve the owner.
     * @return The address of the owner if successfully retrieved and decoded, otherwise returns address(0).
     */
    function getOwner(address target) external view returns (address) {
        // Attempt a staticcall to the `owner()` function of the target contract.
        // A staticcall is used to ensure no state changes occur.
        (bool success, bytes memory data) = target.staticcall(
            abi.encodeWithSignature("owner()")
        );
        // If the call was successful and returned data of sufficient length (address is 32 bytes + 4 bytes for function selector, so at least 36 bytes for a raw address return),
        // decode the address from the returned data.
        if (success && data.length >= 36) {
            return abi.decode(data, (address));
        }
        // Return address(0) if the call failed or the returned data was invalid.
        return address(0);
    }
}
