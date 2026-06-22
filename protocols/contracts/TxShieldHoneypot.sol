// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./honeypot/base/HoneypotBase.sol";
import "./honeypot/features/BlacklistLogic.sol";
import "./honeypot/features/TradingControlLogic.sol";
import "./honeypot/features/HighTaxLogic.sol";
import "./honeypot/features/MintLogic.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title TxShieldHoneypot
 * @dev This contract is designed to identify potential honeypot characteristics within a target smart contract.
 * It integrates various logic modules to perform comprehensive checks, including blacklist detection and mint access evaluation.
 */
contract TxShieldHoneypot is
    HoneypotBase,
    BlacklistLogic,
    TradingControlLogic,
    HighTaxLogic,
    MintLogic
{
    /**
     * @dev Performs a series of checks on a target contract to determine if it exhibits honeypot-like behavior.
     *      It evaluates blacklist status and minting capabilities, accumulating a risk score based on findings.
     * @param targetContract The address of the contract to be checked.
     * @return A HoneypotBaseResult struct containing the findings, including blacklist detection, minting status, and an aggregated risk score.
     */
    function checkContract(
        address targetContract,
        address dexRouter
    ) external payable returns (HoneypotBaseResult memory) {
        HoneypotBaseResult memory result;

        // Blacklist detection
        result.isBlackListDetected = _isBlacklist(targetContract);
        if (result.isBlackListDetected) {
            result.riskScore += 10;
        }

        // Trading control detection
        result.isTradingControl = _checkTradingControl(targetContract);
        if (result.isTradingControl) {
            result.riskScore += 20;
        }

        // Mint access detection
        (
            bool isMintable,
            uint256 mintScore,
            string memory mintReason
        ) = _checkMint(targetContract);
        result.isMintable = isMintable;
        result.mintScore = mintScore;
        result.mintReason = mintReason;
        if (isMintable) {
            result.riskScore += uint8(mintScore);
        }

        // Tax Check
        (uint256 buyTax, uint256 sellTax) = _simulateTax(
            targetContract,
            dexRouter
        );

        result.buyTax = buyTax;
        result.sellTax = sellTax;

        if (buyTax >= 100 || sellTax >= 100) {
            result.riskScore = 100;
            result.errorReason = "Honeypot: Swap failed or 100% tax";
        } else if (buyTax > 20 || sellTax > 20) {
            result.riskScore += 50;
        }

        return result;
    }

    receive() external payable {}
}
