// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../base/SimulationBase.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

abstract contract TrueValueLogic is SimulationBase {
    // -------------HELPER FUNCTIONS-------------
    // decoding error_message from the failed call
    function _getRevertMsg(
        bytes memory _returnData
    ) internal pure returns (string memory) {
        // if the response length is < 68, then tx failed siliently (without no reason)
        if (_returnData.length < 68) return "Transaction reverted siliently";
        // slicing of hash
        assembly {
            _returnData := add(_returnData, 0x04)
        }

        return abi.decode(_returnData, (string));
    }

    // helper function to check if the address is a contract or not
    function _isContract(address account) internal view returns (bool) {
        return account.code.length > 0;
    }

    // looping through the watch_list
    function _getBatchBalances(
        address[] memory tokens
    ) internal view returns (uint256[] memory) {
        uint256[] memory balances = new uint256[](tokens.length);

        for (uint i = 0; i < tokens.length; i++) {
            if (tokens[i] != address(0) && _isContract(tokens[i])) {
                try IERC20(tokens[i]).balanceOf(address(this)) returns (
                    uint256 bal
                ) {
                    balances[i] = bal;
                } catch {
                    balances[i] = 0;
                }
            }
        }

        return balances;
    }

    // -----------MAIN LOGIC-----------
    // performing True_Value_Change
    function _executeTrueValue(
        address targetContract,
        address tokenAddress,
        bytes calldata data,
        address[] memory watchList,
        uint256 msgValue
    ) internal returns (BalanceDelta memory, bytes memory) {
        BalanceDelta memory delta;

        delta.watchedTokens = watchList;

        uint256 stateZeroEth = address(this).balance - msgValue;
        uint256 startToken = 0;

        // before transaciton
        if (tokenAddress != address(0) && _isContract(tokenAddress)) {
            try IERC20(tokenAddress).balanceOf(address(this)) returns (
                uint256 bal
            ) {
                startToken = bal;
            } catch {
                startToken = 0;
            }
        }

        // recording before state of watchList
        uint256[] memory startWatchBalances = _getBatchBalances(watchList);

        // now run the tx_functions(buy/sell/transfer)
        (bool success, bytes memory returnData) = targetContract.call{
            value: msg.value
        }(data);
        delta.success = success;

        if (!success) {
            returnData.length > 0
                ? delta.errorReason = _getRevertMsg(returnData)
                : delta.errorReason = "Unknown Revert (Silent)";
        }

        // after transaction
        // check if now the balance is now greater then first user balance

        uint256 stateFinalEth = address(this).balance;
        delta.ethDelta = int256(stateFinalEth) - int256(stateZeroEth);
        delta.isProfit = (delta.ethDelta >= 0);

        // now finally token_calculation
        if (tokenAddress != address(0) && _isContract(tokenAddress)) {
            try IERC20(tokenAddress).balanceOf(address(this)) returns (
                uint256 finalToken
            ) {
                delta.tokenDelta = int256(finalToken) - int256(startToken);
            } catch {
                delta.tokenDelta = 0;
            }
        }

        // capturing after state of watchList
        uint256[] memory endsWatchBalances = _getBatchBalances(watchList);
        // putting after watchlist balances back to our base contract
        delta.watchedTokensDeltas = new int256[](watchList.length);

        for (uint i = 0; i < watchList.length; i++) {
            delta.watchedTokensDeltas[i] = int256(
                endsWatchBalances[i] - startWatchBalances[i]
            );
        }

        return (delta, returnData);
    }
}
