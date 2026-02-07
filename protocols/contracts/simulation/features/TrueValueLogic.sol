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
        if (_returnData.length < 4) return "Transaction reverted silently";

        bytes4 selector;
        assembly {
            selector := mload(add(_returnData, 0x20))
        }

        // standard error
        if (selector == 0x08c379a0) {
            assembly {
                _returnData := add(_returnData, 0x04)
            }
            return abi.decode(_returnData, (string));
        }

        // panic error
        if (selector == 0x4e487b71) {
            if (_returnData.length >= 36) {
                uint256 panicCode;
                assembly {
                    panicCode := mload(add(_returnData, 0x24))
                }
                if (panicCode == 0x01) return "Panic: Assertion Failed";
                if (panicCode == 0x11) return "Panic: Math Overflow/Underflow";
                if (panicCode == 0x12) return "Panic: Division by Zero";
                if (panicCode == 0x21) return "Panic: Enum Conversion Error";
                if (panicCode == 0x22) return "Panic: Storage Encoding Error";
                if (panicCode == 0x31) return "Panic: Empty Array Pop";
                if (panicCode == 0x32) return "Panic: Array Out of Bounds";
                if (panicCode == 0x41) return "Panic: Out of Memory";
                if (panicCode == 0x51) return "Panic: Internal Function Type";
                return "Panic: Unknown Code";
            }
        }

        // custom error
        return string(abi.encodePacked("Custom Error: ", _toHex(selector)));
    }

    // helper funciton to convert byte4 -> string hex
    function _toHex(bytes4 data) internal pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(10);
        str[0] = "0";
        str[1] = "x";
        for (uint256 i = 0; i < 4; i++) {
            str[2 + i * 2] = alphabet[uint8(data[i] >> 4)];
            str[3 + i * 2] = alphabet[uint8(data[i] & 0x0f)];
        }
        return string(str);
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

        // checking honeypot: bought & send/move 1_wei so to check if user can move its token or not
        if (
            delta.success &&
            delta.tokenDelta > 0 &&
            tokenAddress != address(this)
        ) {
            try
                IERC20(tokenAddress).transfer(
                    address(0x000000000000000000000000000000000000dEaD),
                    1
                )
            {
                delta.isHoneypot = false; // our token can be moved after interacting with the our tokenAddress
            } catch {
                delta.isHoneypot = true; // can buy but can't be sell
            }
        }

        return (delta, returnData);
    }
}
