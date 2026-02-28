// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../base/HoneypotBase.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/*
    @define:swap a small amount(ETH) for our target token on real dex
            then check how many token actually recevied
            then approve the token and swap back to ETH
            then compare the expected amount (what router is having) vs actual amount (arrived in wallet)
            and finally if the actual < 80% => HIGHSELLTAX but if actual is 0 => HONEYPOT
    @dev: we apply bruteforce through all of the selectors to pin point scam
    @return: boolean (isScam or not)
*/

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
    ) external payable;

    function getAmountsOut(
        uint amountIn,
        address[] calldata path
    ) external view returns (uint[] memory amounts);

    function WETH() external pure returns (address);
}

abstract contract HighTaxLogic is HoneypotBase {
    // using eth_call (simulation) do a BUY/SELL to calculate real tax
    function _simulateTax(
        address token,
        address router
    ) internal view returns (uint256 buyTax, uint256 sellTax) {
        IUniswapV2Router dexRouter = IUniswapV2Router(router);
        address weth = dexRouter.WETH();

        address[] memory buyPath = new address[](2);
        buyPath[0] = weth;
        buyPath[1] = token;

        uint256 ethIn = 0.1 ether;

        // SIMULATE BUY

        // calcualte expected ETH (from the router)
        uint256[] memory expectedBuy = dexRouter.getAmountsOut(ethIn, buyPath);

        // SIMULATE SELL
        address[] memory sellPath = new address[](2);
        sellPath[0] = token;
        sellPath[1] = weth;

        dexRouter.getAmountsOut(expectedBuy[1], sellPath);

        return (buyTax, sellTax);
    }
}
