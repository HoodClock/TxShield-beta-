// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../base/HoneypotBase.sol";

/*
    @define: selectors that scammer use to swith off trading interactions (usually stop the trading or limit the trading)
    @dev: we use bruteforce technique to check all the possible "switches" related to trading/transfer
        for the check we are seeing if the any of the certain funciton [exist and exec] then mark it = True otherwise(False)
    @returns: boolean
*/

abstract contract TradingControlLogic is HoneypotBase {
    bytes4[] private _controlSelector = [
        bytes4(0x8a8c523c), // enableTrading()
        bytes4(0xc9567bf9), // openTrading()
        bytes4(0x8456cb59), // pause()
        bytes4(0x3f4ba83a), // unpause()
        bytes4(0xbed13866), // setMaxTxAmount(uint256)
        bytes4(0x4081c713), // setMaxWallet(uint256)
        bytes4(0x205c2878), // setSwapAndLiquifyEnabled(bool)
        bytes4(0x7599c4d9) // setTxLimit(uint256)
    ];

    function _checkTradingControl(address target) internal returns (bool) {
        uint256 dummyVal = 1;

        for (uint i = 0; i < _controlSelector.length; i++) {
            // first calling toggel selectors to check if there is "switch" for trading
            (bool success1, ) = target.call(
                abi.encodeWithSelector(_controlSelector[i])
            );
            if (success1) return true;

            // then check for trading limitation (usually we pass some value to check for setTxAmount)
            (bool success2, ) = target.call(
                abi.encodeWithSelector(_controlSelector[i], dummyVal)
            );
            if (success2) return true;

            // then check for boolean (usually we pass some true to check for setSwapAndLiquifyEnabled)
            (bool success3, ) = target.call(
                abi.encodeWithSelector(_controlSelector[i], true)
            );
            if (success3) return true;
        }

        return false;
    }
}
