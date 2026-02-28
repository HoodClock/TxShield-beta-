/**
 * @param {*} tokenAddress
 * @param {*} dex_routerAddress
 * @process =>
 *  1. setup a new fork using anvil
 *  2. Swap tokens in buying for ETH
 *  3. Swap back in Sell for the token
 * @returns Json response => {buyTax, sellTax}
 */

const { ethers } = require("ethers");

const RICH_WHALE = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const ANVIL_URL = "http://127.0.0.1:8545";

const routerABI = [
  "function swapExactETHForTokensSupportingFeeOnTransferTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable",
  "function swapExactTokensForETHSupportingFeeOnTransferTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external",
  "function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)",
  "function WETH() external pure returns (address)",
];

async function _simulateAccurateTax(token, router, activeRpcUrl) {
  const provider = new ethers.JsonRpcProvider(activeRpcUrl, undefined, {
    staticNetwork: true,
  });

  // 1. Setup the Whale (Payer)
  await provider.send("anvil_impersonateAccount", [RICH_WHALE]);
  await provider.send("anvil_setBalance", [
    RICH_WHALE,
    "0x100000000000000000000000000",
  ]);
  const signer = await provider.getSigner(RICH_WHALE);

  // 2. Setup a "Clean" Recipient (Receiver)
  // We send profits here so Gas costs don't mess up the math
  const RECIPIENT = ethers.Wallet.createRandom().address;

  const weth = await new ethers.Contract(
    router,
    ["function WETH() view returns (address)"],
    provider,
  ).WETH();
  const routerContract = new ethers.Contract(router, routerABI, signer);
  const tokenContract = new ethers.Contract(
    token,
    [
      "function balanceOf(address) view returns (uint256)",
      "function approve(address,uint256)",
    ],
    signer,
  );

  const ethAmount = ethers.parseEther("0.1");

  // BUY SIMULATION
  const startToken = await tokenContract.balanceOf(RICH_WHALE);

  await routerContract.swapExactETHForTokensSupportingFeeOnTransferTokens(
    0,
    [weth, token],
    RICH_WHALE, // Whale gets the tokens
    Math.floor(Date.now() / 1000) + 300,
    { value: ethAmount, gasLimit: 30000000 },
  );

  const afterTokenBalance = await tokenContract.balanceOf(RICH_WHALE);
  const tokensReceived = afterTokenBalance - startToken;

  const expectedBuy = await routerContract.getAmountsOut(ethAmount, [
    weth,
    token,
  ]);

  let buyTax = 0n;
  if (expectedBuy[1] > 0n) {
    buyTax = ((expectedBuy[1] - tokensReceived) * 100n) / expectedBuy[1];
  }

  // SELL SIMULATION
  // Approve router to take tokens from Whale
  await tokenContract.approve(router, tokensReceived);

  // We don't need to check StartETH because RECIPIENT starts at 0
  await routerContract.swapExactTokensForETHSupportingFeeOnTransferTokens(
    tokensReceived,
    0,
    [token, weth],
    RECIPIENT, // <--- CRITICAL FIX: Send ETH to the clean bucket
    Math.floor(Date.now() / 1000) + 300,
    { gasLimit: 30000000 },
  );

  // Check the Clean Bucket's balance.
  // Since it paid no gas, this is the PURE ETH received.
  const ethReceived = await provider.getBalance(RECIPIENT);

  const expectedSell = await routerContract.getAmountsOut(tokensReceived, [
    token,
    weth,
  ]);

  let sellTax = 0n;
  if (expectedSell[1] > 0n) {
    sellTax = ((expectedSell[1] - ethReceived) * 100n) / expectedSell[1];
  }

  return { buyTax: Number(buyTax), sellTax: Number(sellTax) };
}

module.exports = { _simulateAccurateTax };
