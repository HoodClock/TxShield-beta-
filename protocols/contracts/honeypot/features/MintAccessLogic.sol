// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../base/HoneypotBase.sol";

abstract contract MintAccessLogic is HoneypotBase {
    // the minting selector
    bytes4[] private _mintSelectors = [
        bytes4(0x40c10f19), // mint(address,uint256) - The most common standard
        bytes4(0xa0712d68), // mint(uint256) - Mints to msg.sender
        bytes4(0x449a52f8), // mintTo(address,uint256)
        bytes4(0x79c65068), // mint(address,uint256) (Alternative)
        bytes4(0x867904b4), // issue(uint256) - Old standard
        bytes4(0xbc25cf77), // increaseSupply(uint256)
        bytes4(0x2f95438d), // increaseAllowance(address,uint256) - Sometimes abused for minting
        bytes4(0x640b9914) // unlock(address,uint256) - Hidden mints
    ];

    function _checkMint(address target) internal returns (bool) {
        // to mint 1 token to dead address
        address dummy = address(0xDEAD);

        uint256 amount = 1;

        // bruteforcing _mintSelectors to find any mint access in targeted contract
        for (uint i = 0; i < _mintSelectors.length; i++) {
            bytes memory payload1 = abi.encodePacked(
                _mintSelectors[i],
                abi.encode(dummy, amount)
            );
            (bool success1, ) = target.call(payload1);
            if (success1) return true; // mint func is activated

            bytes memory payload2 = abi.encodePacked(
                _mintSelectors[i],
                abi.encode(amount)
            );
            (bool success2, ) = target.call(payload2);
            if (success2) return true; // caught it
        }
        return false;
    }
}
