// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../base/HoneypotBase.sol";

interface IUniswapV2Router {
    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable;

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;

    function getAmountsOut(
        uint amountIn,
        address[] calldata path
    ) external view returns (uint[] memory amounts);

    function WETH() external pure returns (address);
}

abstract contract HighTaxLogic is HoneypotBase {
    function _simulateTax(
        address token,
        address router
    ) internal returns (uint256 buyTax, uint256 sellTax) {
        IUniswapV2Router dexRouter = IUniswapV2Router(router);
        address weth;
        try dexRouter.WETH() returns (address w) {
            weth = w;
        } catch {
            return (0, 0);
        }

        address[] memory buyPath = new address[](2);
        buyPath[0] = weth;
        buyPath[1] = token;

        uint256 ethIn = 0.1 ether;
        uint256 deadline = block.timestamp + 300;

        uint256 startTokenBal = IERC20(token).balanceOf(address(this));
        uint256[] memory expectedBuy;
        try dexRouter.getAmountsOut(ethIn, buyPath) returns (
            uint[] memory amounts
        ) {
            expectedBuy = amounts;
        } catch {}

        // BUY SIMULATION
        try
            dexRouter.swapExactETHForTokensSupportingFeeOnTransferTokens{
                value: ethIn
            }(0, buyPath, address(this), deadline)
        {
            uint256 actualTokens = IERC20(token).balanceOf(address(this)) -
                startTokenBal;

            if (expectedBuy.length > 1 && expectedBuy[1] > 0) {
                buyTax =
                    ((expectedBuy[1] - actualTokens) * 100) /
                    expectedBuy[1];
            }

            // SELL SIMULATION
            if (actualTokens > 0) {
                address[] memory sellPath = new address[](2);
                sellPath[0] = token;
                sellPath[1] = weth;

                // Loophole Fix: Low-level call for approve to support USDT
                (bool approveSuccess, ) = token.call(
                    abi.encodeWithSelector(0x095ea7b3, router, actualTokens)
                );
                if (!approveSuccess) {
                    return (buyTax, 100); // Approve failed = Sell Honeypot
                }

                uint256 startEthBal = address(this).balance;
                uint256[] memory expectedSell;
                try dexRouter.getAmountsOut(actualTokens, sellPath) returns (
                    uint[] memory amounts
                ) {
                    expectedSell = amounts;
                } catch {}

                try
                    dexRouter
                        .swapExactTokensForETHSupportingFeeOnTransferTokens(
                            actualTokens,
                            0,
                            sellPath,
                            address(this),
                            deadline
                        )
                {
                    uint256 actualEth = address(this).balance - startEthBal;

                    if (expectedSell.length > 1 && expectedSell[1] > 0) {
                        sellTax =
                            ((expectedSell[1] - actualEth) * 100) /
                            expectedSell[1];
                    }
                } catch {
                    sellTax = 100; // SELL FAILED = HONEYPOT
                }
            }
        } catch {
            buyTax = 100; // BUY FAILED = HONEYPOT
        }

        return (buyTax, sellTax);
    }
}
