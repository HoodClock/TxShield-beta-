// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);
}

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

contract TxShieldSimulator {
    struct SimulationResult {
        uint256 buyTax;
        uint256 sellTax;
        bool isHoneypot;
        string reason;
    }

    function simulateTrade(
        address token,
        address router
    ) external payable returns (SimulationResult memory result) {
        IUniswapV2Router dexRouter = IUniswapV2Router(router);
        address weth;

        try dexRouter.WETH() returns (address w) {
            weth = w;
        } catch {
            return
                SimulationResult(
                    0,
                    0,
                    true,
                    "Fatal: Invalid Router or WETH missing"
                );
        }

        address[] memory buyPath = new address[](2);
        buyPath[0] = weth;
        buyPath[1] = token;

        uint256 ethIn = msg.value;
        uint256 expectedTokens = 0;

        try dexRouter.getAmountsOut(ethIn, buyPath) returns (
            uint[] memory amounts
        ) {
            expectedTokens = amounts[1];
        } catch {
            return
                SimulationResult(
                    100,
                    100,
                    true,
                    "Fatal: Zero Liquidity or Dead Contract"
                );
        }

        // --- BUY SIMULATION ---
        uint256 startTokenBal = IERC20(token).balanceOf(address(this));

        try
            dexRouter.swapExactETHForTokensSupportingFeeOnTransferTokens{
                value: ethIn
            }(0, buyPath, address(this), block.timestamp)
        {
            uint256 actualTokens = IERC20(token).balanceOf(address(this)) -
                startTokenBal;
            if (expectedTokens > 0) {
                result.buyTax =
                    ((expectedTokens - actualTokens) * 100) /
                    expectedTokens;
            }

            if (actualTokens == 0)
                return
                    SimulationResult(100, 100, true, "Honeypot: 100% Buy Tax");

        // --- SELL SIMULATION ---
        address[] memory sellPath = new address[](2);
        sellPath[0] = token;
        sellPath[1] = weth;

        // Loophole Fix: Low-level call for approve to support USDT (which returns void)
        (bool approveSuccess, ) = token.call(
            abi.encodeWithSelector(0x095ea7b3, router, actualTokens)
        );
        if (!approveSuccess) {
            return SimulationResult(result.buyTax, 100, true, "Honeypot: Approve Failed");
        }

        uint256 startEthBal = address(this).balance;
            uint256 expectedEth = 0;

            try dexRouter.getAmountsOut(actualTokens, sellPath) returns (
                uint[] memory amountsOut
            ) {
                expectedEth = amountsOut[1];
            } catch {}

            try
                dexRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
                    actualTokens,
                    0,
                    sellPath,
                    address(this),
                    block.timestamp
                )
            {
                uint256 actualEth = address(this).balance - startEthBal;
                if (expectedEth > 0) {
                    result.sellTax =
                        ((expectedEth - actualEth) * 100) /
                        expectedEth;
                }

                if (result.buyTax >= 90 || result.sellTax >= 90) {
                    result.isHoneypot = true;
                    result.reason = "Honeypot: Extreme Taxes detected";
                } else {
                    result.reason = "Simulation Passed";
                }
            } catch {
                return
                    SimulationResult(
                        result.buyTax,
                        100,
                        true,
                        "Honeypot: Sell Reverted (Blacklist/Pausable trap)"
                    );
            }
        } catch {
            return SimulationResult(100, 100, true, "Honeypot: Buy Reverted");
        }
        return result;
    }
}
