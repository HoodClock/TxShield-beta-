// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../base/HoneypotBase.sol";

abstract contract BlacklistLogic is HoneypotBase {
    // first through brute force look for the write and read

    // writes => if they suceed owner can blacklist user
    bytes4[] private _writeSelectors = [
        bytes4(0x7b587a54), // blacklist(address)
        bytes4(0x0c136364), // addToBlacklist(address)
        bytes4(0x39a73441), // ban(address)
        bytes4(0x8c1ad763), // lock(address)
        bytes4(0x09cf1c26), // freeze(address)
        bytes4(0x7426e22f), // deny(address)
        bytes4(0x2e1a7d4d) // block(address)
    ];

    // reads => tries to read the list
    bytes4[] private _readSelectors = [
        bytes4(0xfe575a87), // isBlacklisted(address)
        bytes4(0x40c10f19), // isBanned(address)
        bytes4(0x9a84d642), // isLocked(address)
        bytes4(0x56a6552a), // isFrozen(address)
        bytes4(0x893d390a) // isDenied(address)
    ];

    function _isBlacklist(
        address target,
        address owner
    ) internal returns (bool) {
        address dummy = address(0xDEAD);

        // bruteforcing => writes
        for (uint i = 0; i < _writeSelectors.length; i++) {
            bytes memory payload = abi.encodePacked(
                _writeSelectors[i],
                abi.encode(dummy)
            );

            (bool success, ) = target.call(payload);

            // we find in the writes through bruteforce
            if (success) return true; // found it
        }

        // bruteforce => reads
        for (uint i = 0; i < _readSelectors.length; i++) {
            bytes memory payload = abi.encodePacked(
                _readSelectors[i],
                abi.encode(dummy)
            );

            (bool success, ) = target.call(payload);

            // we find in the reads through bruteforce
            if (success) return true;
        }

        return false; // can't find in the read/write selctrors
    }
}
