const { isAddress, ethers } = require("ethers");
const { decideChains } = require("../../config/provider");
const {
  evmSimulateValidator,
} = require("../../validators/evm/evmSimulation.validator");
const { getSimulate } = require("../../services/evm/simulation/simulateTx");
const {
  analyzeBytecode,
} = require("../../services/evm/simulation/analyzeByteCode");
const {
  getTransferHistory,
} = require("../../services/evm/simulation/getTransferHistory");

// ⚠️ CRITICAL: The address of your deployed Phantom Simulator Contract
const PHANTOM_ADDRESS = "0x0000000000000000000000000000000000008888";

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

// DEX Utility Function
const getDexSwapData = async (
  provider,
  routerAddress,
  tokenOutAddress,
  recipient,
) => {
  const routerAbi = [
    "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)",
    "function WETH() external pure returns (address)",
  ];

  const routerContract = new ethers.Contract(
    routerAddress,
    routerAbi,
    provider,
  );

  let wethAddress;
  try {
    wethAddress = await routerContract.WETH();
  } catch (e) {
    throw new Error(
      "Target is not a standard V2 Router or WETH() is unsupported.",
    );
  }

  const path = [wethAddress, tokenOutAddress];
  const amountOutMin = 0; // 100% Slippage
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

  return routerContract.interface.encodeFunctionData("swapExactETHForTokens", [
    amountOutMin,
    path,
    recipient,
    deadline,
  ]);
};

// Master Controller
const masterSimulationController = async (req, res) => {
  try {
    const validation = evmSimulateValidator(req.body);
    if (validation !== true) {
      return res.status(400).json(validation);
    }

    const { userAddress, amount, chainId, normalizedRecipient } = req.body;

    const { provider, rpcUrl } = decideChains(chainId);
    const tokenConfig = WATCHED_CHAIN_TOKENS[Number(chainId)];
    const dexRouter = CHAIN_DEX_ROUTERS[Number(chainId)];

    if (!tokenConfig || !dexRouter) {
      throw new Error(`Configuration missing for chainId: ${chainId}`);
    }

    const tokenAddressToScan = normalizedRecipient.trim().toLowerCase();
    if (!isAddress(tokenAddressToScan)) {
      throw new Error("Invalid Ethereum Address format");
    }

    // --- THE CORE ARCHITECTURE FIX ---
    // We ruthlessly enforce a DEX swap. The target is the Router. The purchase is the Token.

    const txTo = dexRouter;
    const expectedAmount = "0";
    const needsTokenSpoof = false;

    // We spend the exact ETH amount
    const weiBigInt = ethers.parseEther(amount.toString());
    const txValue = ethers.toBeHex(weiBigInt);

    // ⚠️ We set the recipient to PHANTOM_ADDRESS so the simulator catches and measures the tokens!
    const txData = await getDexSwapData(
      provider,
      dexRouter,
      tokenAddressToScan,
      PHANTOM_ADDRESS,
    );

    const [simulateResult, byteCodeResult, transactionHistoryResult] =
      await Promise.all([
        getSimulate(
          rpcUrl,
          userAddress,
          txTo, // Send to DEX Router
          tokenAddressToScan, // The Token CA we are evaluating
          tokenConfig.watchToken,
          tokenConfig.watchList,
          txData, // The swap payload
          txValue, // 1 ETH
          expectedAmount,
          chainId,
          needsTokenSpoof,
        ),
        analyzeBytecode(tokenAddressToScan, chainId),
        getTransferHistory(tokenAddressToScan, chainId),
      ]);

    // Human-friendly error mapping for DEX Swaps
    if (simulateResult && !simulateResult.success) {
      const reason = simulateResult.errorReason
        ? simulateResult.errorReason.toLowerCase()
        : "";

      if (
        reason.includes("insufficient amount") ||
        reason.includes("transfer_failed") ||
        reason.includes("uniswapv2: k")
      ) {
        simulateResult.humanReason =
          "Simulation Failed: Token lacks liquidity, or has a 100% buy tax (Honeypot).";
      } else if (reason.includes("silent") || reason === "") {
        simulateResult.humanReason =
          "Transaction Reverted: DEX Swap failed. Token may be a honeypot, paused, or lack liquidity.";
      } else {
        simulateResult.humanReason = `Transaction Reverted: ${simulateResult.errorReason || "Unknown Reason"}`;
      }
    }

    return res.status(200).json({
      success: true,
      checks: {
        simulateResult,
        byteCodeResult,
        transactionHistoryResult,
      },
    });
  } catch (err) {
    console.error("Master Simulation Controller Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = masterSimulationController;
