// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./simulation/features/SideEffectsAllowance.sol";
import "./simulation/features/ReturnDataLogic.sol";
import "./simulation/features/TrueValueLogic.sol";

contract TxShieldSimulator is
    TrueValueLogic,
    SideEffectsAllowance,
    ReturnDataLogic
{
    bool private _isExecuting;
    bool private _reentrancyFlag;

    function simulateTransaction(
        address targetContract,
        address tokenAddress,
        address watchToken,
        address[] calldata additionalTokens,
        uint256 expectedAmount,
        bytes calldata data
    ) external payable returns (BalanceDelta memory) {
        // locking bool value to capture the reentrancy
        _reentrancyFlag = false;
        _isExecuting = true; // this will lock the simulation phase

        // catching before tx gas value
        uint256 stateZeroGas = gasleft();

        uint256 startAllowance = _getAllowance(watchToken, targetContract);

        (
            BalanceDelta memory result,
            bytes memory rawResponse
        ) = _executeTrueValue(
                targetContract,
                tokenAddress,
                data,
                additionalTokens,
                msg.value
            );

        // unlocking bool value
        _isExecuting = false;
        result.reentrancyDetected = _reentrancyFlag;

        // tax logic to check if the recieved amount is as it is or is it changed
        if (result.success && expectedAmount > 0 && result.tokenDelta > 0) {
            uint256 actualReceived = uint256(result.tokenDelta);

            if (actualReceived < expectedAmount) {
                uint256 taxAmount = expectedAmount - actualReceived;
                // formula for Basis Points (tax * 1000) / expectedAmount
                result.esitmatedTaxBps = (taxAmount * 1000) / expectedAmount;
            } else {
                result.esitmatedTaxBps = 0;
            }
        }

        _captureReturnData(rawResponse, result);

        _checkSideEffect(startAllowance, watchToken, targetContract, result);

        // checking after tx gas value and calculating it
        result.gasUsed = stateZeroGas - gasleft();

        return result;
    }

    // checking for trap(reentrancy) & make it payable

    receive() external payable {
        if (_isExecuting) {
            _reentrancyFlag = true;
        }
    }
}
