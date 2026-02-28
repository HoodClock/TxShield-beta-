// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";

contract MintAccess is Test {
    address public target;

    function setUp() public {
        target = vm.envAddress("TARGET_CONTRACT");
    }

    function test_BruteForceMint() public {
        address owner;

        // getting owner
        (bool success, bytes memory data) = target.staticcall(
            abi.encodeWithSignature("owner()")
        );
        owner = success && data.length == 32
            ? abi.decode(data, (address))
            : address(this);
        uint256 supplyBefore = _getSupply();

        // some mint selectors for right away check but forge test also covers the custom one's
        bytes4[] memory selectors = new bytes4[](6);
        selectors[0] = 0x40c10f19; // mint(address,uint256)
        selectors[1] = 0xa0712d68; // mint(uint256)
        selectors[2] = 0x449a52f8; // mintTo(address,uint256)
        selectors[3] = 0x63750dc3; // issue(uint256)
        selectors[4] = 0xcc872b66; // Suspect custom mints
        selectors[5] = 0x124fc392; // Suspect custom mints

        // bruteforcing _mintSelectors to find any mint access in targeted contract
        for (uint i = 0; i < selectors.length; i++) {
            // tricking contract & pretend as an owner so to change supply and see if it really goes up
            vm.startPrank(owner);

            // try to mint huge amount to a dead address
            (bool s, ) = target.call(
                abi.encodeWithSelector(selectors[i], 1000000 * 10 ** 6)
            );
            if (!s) {
                (s, ) = target.call(
                    abi.encodeWithSelector(
                        selectors[i],
                        address(0xDEAD),
                        1000000 * 10 ** 18
                    )
                );
            }
            vm.stopPrank();

            // if success then compare after with before supply
            if (s && _getSupply() > supplyBefore) {
                console.log("MINT_DETECTED");
                return;
            }
        }
    }

    function _getSupply() internal view returns (uint256) {
        (, bytes memory data) = target.staticcall(
            abi.encodeWithSignature("totalSupply()")
        );
        return abi.decode(data, (uint256));
    }
}
