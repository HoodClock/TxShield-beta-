// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../base/HoneypotBase.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

abstract contract MintLogic is HoneypotBase {
    bytes4[] private _mintSelectors = [
        bytes4(0x40c10f19), // mint(address,uint256)
        bytes4(0x13d0966a), // mint(uint256)
        bytes4(0x98320473), // _mint(address,uint256)
        bytes4(0x6a627842), // mint(address,uint256,bytes)
        bytes4(0x23451234), // generic placeholder
        bytes4(0x04896b3f), // createTokens(address,uint256)
        bytes4(0xa0712d68), // mintPublic(uint256)
        bytes4(0xc0111816)  // mintProtected(address,uint256)
    ];

    function _checkMint(address target) internal returns (bool isMintable, uint256 mintScore, string memory reason) {
        uint256 initialSupply = 0;
        try IERC20(target).totalSupply() returns (uint256 s) {
            initialSupply = s;
        } catch {
            return (false, 0, "No totalSupply");
        }

        address dummy = address(0xDEAD);
        uint256 amount = 1000000 * 10**18;

        for (uint i = 0; i < _mintSelectors.length; i++) {
            // Try selector(address, uint256)
            bytes memory payload1 = abi.encodeWithSelector(_mintSelectors[i], dummy, amount);
            (bool success1, ) = target.call(payload1);
            
            if (success1) {
                try IERC20(target).totalSupply() returns (uint256 s) {
                    if (s > initialSupply) return (true, 80, "Mint detected (addr, uint)");
                } catch {}
            }

            // Try selector(uint256)
            bytes memory payload2 = abi.encodeWithSelector(_mintSelectors[i], amount);
            (bool success2, ) = target.call(payload2);
            if (success2) {
                try IERC20(target).totalSupply() returns (uint256 s) {
                    if (s > initialSupply) return (true, 80, "Mint detected (uint)");
                } catch {}
            }
        }

        return (false, 0, "");
    }
}
