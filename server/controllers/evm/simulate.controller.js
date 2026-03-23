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

// Wathc tokens for dyanamic EVM chain collection
const WATCHED_CHAIN_TOKENS = {
  // Ethereum Mainnet
  1: {
    watchToken: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT
    watchList: [
      "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
      "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
    ],
  },
  // BNB Smart Chain
  56: {
    watchToken: "0x55d398326f99059fF775485246999027B3197955", // BSC-USD
    watchList: [
      "0x55d398326f99059fF775485246999027B3197955", // BSC-USD
      "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", // USDC (Binance-Peg)
      "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", // WBNB
    ],
  },
  // Base
  8453: {
    watchToken: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC (Native)
    watchList: [
      "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC
      "0x4200000000000000000000000000000000000006", // WETH
    ],
  },
  // Arbitrum One
  42161: {
    watchToken: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9", // USDT
    watchList: [
      "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9", // USDT
      "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", // USDC (Native)
      "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1", // WETH
    ],
  },
};

// master controller
const masterSimulationController = async (req, res) => {
  try {
    // call the validator
    const validation = evmSimulateValidator(req.body);
    if (validation !== true) {
      return res.status(400).json(validation);
    }

    // Normalized values are now injected by the validator
    const {
      userAddress,
      amount,
      chainId,
      normalizedRecipient,
      normalizedCurrency,
    } = req.body;

    // getting provider
    const { provider, rpcUrl } = decideChains(chainId);
    const tokenConfig = WATCHED_CHAIN_TOKENS[Number(chainId)];

    if (!tokenConfig) {
      throw new Error(`Token configuration missing for chainId: ${chainId}`);
    }

    const cleanAddress = recepientAddress.trim().toLowerCase();
    if (!isAddress(cleanAddress)) {
      throw new Error("Invalid Ethereum Address format");
    }

    // Determine if it's a native transfer based on the currency
    const isNativeTrasnfer =
      normalizedCurrency === "ETH" ||
      normalizedCurrency === "BNB" ||
      normalizedCurrency === "MATIC";

    let txTo;
    let txData;
    let txValue;
    let tokenAddress = isNativeTrasnfer ? ethers.ZeroAddress : cleanAddress;
    let decimals = 18;

    if (isNativeTrasnfer) {
      txTo = cleanAddress;
      const weiBigInt = ethers.parseEther(amount.toString());
      txValue = ethers.toBeHex(weiBigInt);
      txData = "0x";
    } else {
      // ... (ERC20 logic remains same)
      if (!isAddress(tokenAddress))
        throw new Error("Invalid Token Address format");
      txTo = tokenAddress;
      txValue = "0x0";

      const erc20Abi = ["function decimals() view returns(uint8)"];
      const tokenContract = new ethers.Contract(
        tokenAddress,
        erc20Abi,
        provider,
      );
      try {
        decimals = await tokenContract.decimals();
      } catch (e) {
        console.warn("Could not fetch decimals, defaulting to 18");
      }

      txData = await getErc20TransferData(
        provider,
        tokenAddress,
        cleanAddress,
        amount,
        decimals,
      );
    }

    // preparing the expected amount for tax-checking
    const expectedAmount = ethers
      .parseUnits(amount.toString(), decimals)
      .toString();

    // now call the services
    const [simulateResult, byteCodeResult, transactionHistoryResult] =
      await Promise.all([
        getSimulate(
          rpcUrl,
          userAddress,
          txTo,
          tokenAddress,
          tokenConfig.watchToken,
          tokenConfig.watchList,
          txData,
          txValue,
          expectedAmount,
          chainId,
        ),
        analyzeBytecode(cleanAddress, chainId),
        getTransferHistory(cleanAddress, chainId),
      ]);

    // Human-friendly error mapping
    if (simulateResult && !simulateResult.success) {
      const reason = simulateResult.errorReason
        ? simulateResult.errorReason.toLowerCase()
        : "";

      // Loophole Check: Native ETH to Contract failure
      if (
        isNativeTrasnfer &&
        byteCodeResult.isContract &&
        reason.includes("silent")
      ) {
        simulateResult.humanReason =
          "Transaction Reverted: You are trying to send native ETH to a token contract address. Tokens usually don't accept raw ETH transfers.";
      } else if (reason.includes("insufficient allowance")) {
        simulateResult.humanReason =
          "Allowance Error: You need to approve the token first.";
      } else if (
        reason.includes("insufficient balance") ||
        reason.includes("transfer amount exceeds balance")
      ) {
        simulateResult.humanReason =
          "Balance Error: You don't have enough tokens for this transaction.";
      } else if (
        reason.includes("slippage") ||
        reason.includes("insufficient_output_amount")
      ) {
        simulateResult.humanReason =
          "Slippage Error: Price changed too much. Try increasing slippage.";
      } else if (reason.includes("expired")) {
        simulateResult.humanReason =
          "Deadline Error: The transaction took too long and expired.";
      } else if (reason.includes("frozen") || reason.includes("blacklisted")) {
        simulateResult.humanReason =
          "Security Error: Your address or the token is frozen/blacklisted.";
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

// utility function to generate ERC20 transfer data
const getErc20TransferData = async (
  provider,
  tokenAddress,
  recipient,
  amountStr,
  decimals,
) => {
  const erc20Abi = ["function transfer(address to, uint256 amount)"];
  const iface = new ethers.Interface(erc20Abi);

  const amountWei = ethers.parseUnits(amountStr.toString(), decimals);

  return iface.encodeFunctionData("transfer", [recipient, amountWei]);
};

module.exports = masterSimulationController;
