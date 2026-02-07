const { isAddress } = require("ethers");
const { ethers } = require("ethers");
const { decideChains } = require("../../config/provider");
const {
  evmSimulateValidator,
} = require("../../validators/evm/evmSimulation.validator");
const {
  analyzeByteCode,
  getTransactionHistory,
  getSimulate,
} = require("../../services/evm/simulation/index");

const WATCH_TOKEN_USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

// master controller
const masterSimulationController = async (req, res) => {
  try {
    const { userAddress, recepientAddress, amount, currencySymbol } = req.body;

    // call the validator
    evmSimulateValidator(req.body);

    // getting provider
    const provider = decideChains(currencySymbol);

    const cleanAddress = recepientAddress.toLowerCase();
    if (!isAddress(cleanAddress)) {
      throw new Error("Invalid Ethereum Address format");
    }

    let txTo;
    let txData;
    let txValue;
    let tokenAddress = ethers.ZeroAddress;

    if (currencySymbol === "ETH") {
      txTo = cleanAddress;
      const weiBigInt = ethers.parseEther(amount.toString());
      txValue = ethers.toBeHex(weiBigInt);
      txData = "0x";
    } else {
      tokenAddress =
        WATCH_TOKENS_DELTAS[currencySymbol] || req.body.tokenAddress;
      if (!tokenAddress)
        throw new Error(`Unknown Token Symbol: ${currencySymbol}`);

      txTo = tokenAddress;
      txValue = "0x0";

      txData = await getErc20TransferData(
        provider,
        tokenAddress,
        cleanAddress,
        amount,
      );
    }

    // preparing simulation Parameters
    let watchToken = WATCH_TOKEN_USDT;

    // preparing the expected amount for tax-checking
    const expectedAmount = ethers.parseUnits(amount.toString(), 18).toString();

    // now call the services
    const [simulateResult, byteCodeResult, transactionHistoryResult] =
      await Promise.all([
        getSimulate(
          userAddress,
          txTo,
          tokenAddress,
          watchToken,
          WATCH_TOKENS_DELTAS,
          txData,
          txValue,
          expectedAmount,
        ),
        analyzeByteCode(cleanAddress, currencySymbol),
        getTransactionHistory(cleanAddress),
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

// utility array for the hardcoded-big4-tokens to check MULTI_CHAIN_CHANGE_Tracking
const WATCH_TOKENS_DELTAS = [
  "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
  "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
];

module.exports = masterSimulationController;
