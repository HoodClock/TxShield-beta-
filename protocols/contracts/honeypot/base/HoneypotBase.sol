// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HoneypotBase {
    struct HoneypotBaseResult {
        bool isBlackListDetected;
        bool isMintable;
        uint8 riskScore;
        string errorReason;
    }
}
