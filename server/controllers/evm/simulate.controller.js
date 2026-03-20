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
    const { userAddress, targetContractAddress, amount, chainId } = req.body;

    // call the validator
    evmSimulateValidator(req.body);

    // getting provider
    const { provider, rpcUrl } = decideChains(chainId);
    const tokenConfig = WATCHED_CHAIN_TOKENS[Number(chainId)];

    if (!tokenConfig) {
      throw new Error(`Token configuration missing for chainId: ${chainId}`);
    }

    const cleanAddress = targetContractAddress.toLowerCase();
    if (!isAddress(cleanAddress)) {
      throw new Error("Invalid Ethereum Address format");
    }

    let txTo;
    let txData;
    let txValue;
    let tokenAddress = targetContractAddress
      ? targetContractAddress.toLowerCase()
      : null;

    const isNativeTrasnfer =
      !tokenAddress || tokenAddress === ethers.ZeroAddress;

    if (isNativeTrasnfer) {
      txTo = cleanAddress;
      const weiBigInt = ethers.parseEther(amount.toString());
      txValue = ethers.toBeHex(weiBigInt);
      txData = "0x";
      tokenAddress = ethers.ZeroAddress;
    } else {
      if (!isAddress(tokenAddress))
        throw new Error("Invalid Token Address format");
      txTo = tokenAddress;
      txValue = 0x0;
      txData = await getErc20TransferData(
        provider,
        tokenAddress,
        cleanAddress,
        amount,
      );
    }

    // preparing the expected amount for tax-checking
    const expectedAmount = ethers.parseUnits(amount.toString(), 18).toString();

    // now call the services
    const [simulateResult, byteCodeResult, transactionHistoryResult] =
      await Promise.all([
        getSimulate(
          userAddress,
          txTo,
          tokenAddress,
          tokenConfig.watchToken,
          tokenConfig.watchList,
          txData,
          txValue,
          expectedAmount,
          rpcUrl,
          chainId,
        ),
        analyzeBytecode(cleanAddress, chainId),
        getTransferHistory(cleanAddress, chainId),
      ]);

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
) => {
  const erc20Abi = [
    "function transfer(address to, uint256 amount)",
    "function decimals() view returns(uint8)",
  ];
  const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, provider);

  const decimals = await tokenContract.decimals();
  const amountWei = ethers.parseUnits(amountStr.toString(), decimals);

  return tokenContract.interface.encodeFunctionData("transfer", [
    recipient,
    amountWei,
  ]);
};

module.exports = masterSimulationController;
