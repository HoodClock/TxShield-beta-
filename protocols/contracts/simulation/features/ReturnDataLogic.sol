// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../base/SimulationBase.sol";

abstract contract ReturnDataLogic is SimulationBase {
    function _captureReturnData(
        bytes memory rawData,
        BalanceDelta memory delta
    ) internal pure {
        if (delta.success) {
            delta.returnData = rawData;
        }
    }
}
