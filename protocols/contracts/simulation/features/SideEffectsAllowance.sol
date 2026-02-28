// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../base/SimulationBase.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// detect if the allowance permissions are used to spend/call other contracts during transaciton like (calling USDT etc)

abstract contract SideEffectsAllowance is SimulationBase {
    // helper so we dont call non-contract mistakenly
    function _isContractAllow(address account) internal view returns (bool) {
        return account.code.length > 0;
    }

    function _getAllowance(
        address token,
        address spender
    ) internal view returns (uint256) {
        // if there is no token provided then there is no allowance
        if (token == address(0) || !_isContractAllow(token)) return 0;
        // get the before allowance value
        try IERC20(token).allowance(address(this), spender) returns (
            uint256 val
        ) {
            return val;
        } catch {
            return 0;
        }
    }

    function _checkSideEffect(
        uint256 beforeAllowance,
        address token,
        address spender,
        BalanceDelta memory delta
    ) internal view {
        if (token == address(0) || !_isContractAllow(token)) return;

        uint afterAllowance = 0;

        // get the after allowance value
        try IERC20(token).allowance(address(this), spender) returns (
            uint256 val
        ) {
            afterAllowance = val;
        } catch {
            return;
        }

        // now compare before & after allowance value
        if (afterAllowance != beforeAllowance) {
            delta.allowanceChanged = true;

            if (afterAllowance > beforeAllowance) {
                delta.allowanceDelta = afterAllowance - beforeAllowance;
            } else {
                delta.allowanceDelta = beforeAllowance - afterAllowance;
            }
        }
    }
}
