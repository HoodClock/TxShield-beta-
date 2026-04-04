const { isAddress, ethers } = require("ethers");
require("dotenv").config();
const { decideChains } = require("../../config/provider");
const { getSimulate } = require("../../services/evm/simulation/simulateTx");
const {
  analyzeBytecodeCache,
  getTransferHistoryCache,
} = require("../../services/evm/simulation/index");

const PHANTOM_ADDRESS = "0x0000000000000000000000000000000000008888";
const DEFAULT_USER_ADDRESS = process.env.SIMULATOR_WALLET_ADDRESS;

const CHAIN_DEFAULT_AMOUNTS = {
  1: "1",
  56: "0.5",
  8453: "1",
  42161: "1",
};

const CHAIN_WETH = {
  1: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  56: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  8453: "0x4200000000000000000000000000000000000006",
  42161: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
};

const WATCHED_CHAIN_TOKENS = {
  1: {
    watchToken: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    watchList: [
      "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    ],
  },
  56: {
    watchToken: "0x55d398326f99059fF775485246999027B3197955",
    watchList: [
      "0x55d398326f99059fF775485246999027B3197955",
      "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
      "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    ],
  },
  8453: {
    watchToken: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    watchList: [
      "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      "0x4200000000000000000000000000000000000006",
    ],
  },
  42161: {
    watchToken: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    watchList: [
      "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    ],
  },
};

const CHAIN_DEX_ROUTERS = {
  1: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  56: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  8453: "0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24",
  42161: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
};

// ✅ Fixed: uses routerInterface (not routerContract), correct param order
const getDexSwapData = (wethAddress, tokenOutAddress, recipient) => {
  const routerInterface = new ethers.Interface([
    "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)",
  ]);

  const path = [wethAddress, tokenOutAddress];
  const amountOutMin = 0;
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

  return routerInterface.encodeFunctionData("swapExactETHForTokens", [
    amountOutMin,
    path,
    recipient,
    deadline,
  ]);
};

const masterSimulationController = async (req, res) => {
  try {
    const { contractAddress, chainId } = req.body;

    if (!contractAddress || !chainId) {
      return res
        .status(400)
        .json({ success: false, error: "Missing contractAddress or chainId." });
    }

    const chainIdNum = Number(chainId);
    const { rpcUrl } = decideChains(chainId);
    const tokenConfig = WATCHED_CHAIN_TOKENS[chainIdNum];
    const dexRouter = CHAIN_DEX_ROUTERS[chainIdNum];
    const wethAddress = CHAIN_WETH[chainIdNum];

    if (!tokenConfig || !dexRouter) {
      throw new Error(`Configuration missing for chainId: ${chainId}`);
    }
    if (!wethAddress) {
      throw new Error(`WETH address not configured for chainId: ${chainId}`);
    }

    const tokenAddressToScan = contractAddress.trim().toLowerCase();
    if (!isAddress(tokenAddressToScan)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid Ethereum address format." });
    }

    // ✅ Guard: prevent WETH → WETH swap (IDENTICAL_ADDRESSES error)
    if (tokenAddressToScan === wethAddress.toLowerCase()) {
      return res.status(400).json({
        success: false,
        error:
          "Cannot simulate native wrapped token. Please enter a token contract address.",
      });
    }

    const userAddress = DEFAULT_USER_ADDRESS;
    const amount = CHAIN_DEFAULT_AMOUNTS[chainIdNum];
    const txValue = ethers.toBeHex(ethers.parseEther(amount));

    // ✅ Fixed: correct arg order (wethAddress, tokenOut, recipient) — no await needed, it's sync now
    const txData = getDexSwapData(
      wethAddress,
      tokenAddressToScan,
      PHANTOM_ADDRESS,
    );

    const [simulateResult, byteCodeResult, transactionHistoryResult] =
      await Promise.all([
        getSimulate(
          rpcUrl,
          userAddress,
          dexRouter,
          tokenAddressToScan,
          tokenConfig.watchToken,
          tokenConfig.watchList,
          txData,
          txValue,
          "0",
          chainId,
        ),
        analyzeBytecodeCache(tokenAddressToScan, chainId),
        getTransferHistoryCache(tokenAddressToScan, chainId),
      ]);

    if (simulateResult && !simulateResult.success) {
      const reason = simulateResult.errorReason
        ? simulateResult.errorReason.toLowerCase()
        : "";

      if (
        reason.includes("insufficient amount") ||
        reason.includes("transfer_failed") ||
        reason.includes("k")
      ) {
        simulateResult.humanReason =
          "Simulation Failed: Token lacks liquidity or has 100% buy tax (Honeypot).";
      } else if (reason.includes("identical_addresses")) {
        simulateResult.humanReason =
          "Simulation Failed: Cannot swap a token with itself.";
      } else if (reason.includes("silent") || reason === "") {
        simulateResult.humanReason =
          "Transaction Reverted: DEX Swap failed. Token may be a honeypot, paused, or lack liquidity.";
      } else {
        simulateResult.humanReason = `Transaction Reverted: ${simulateResult.errorReason || "Unknown Reason"}`;
      }
    }

    return res.status(200).json({
      success: true,
      checks: { simulateResult, byteCodeResult, transactionHistoryResult },
    });
  } catch (err) {
    console.error("Master Simulation Controller Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = masterSimulationController;
