// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HoneypotBase {
    struct HoneypotBaseResult {
        bool isBlackListDetected;
        bool isMintable;
        bool isTradingControl;
        uint256 buyTax;
        uint256 sellTax;
        uint8 riskScore;
        string errorReason;
    }
}
