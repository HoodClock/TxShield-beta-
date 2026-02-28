// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimulationBase {
    struct BalanceDelta {
        int256 ethDelta;
        int256 tokenDelta;
        address[] watchedTokens;
        int256[] watchedTokensDeltas;
        bool isProfit; // if goes up (true) vice-versa
        bool success;
        bool allowanceChanged;
        uint256 allowanceDelta;
        string errorReason;
        bytes returnData;
        bool reentrancyDetected;
        bool isHoneypot;
        uint256 esitmatedTaxBps;
        uint256 gasUsed;
    }
}
