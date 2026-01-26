const { isAddress } = require("ethers");
const { ethers } = require("ethers");
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

    // preparing simulation Parameters
    let txData = "0x";
    let valueInWei = "0";
    let tokenAddress = ethers.ZeroAddress;
    let watchToken = WATCH_TOKEN_USDT;

    const cleanAddress = recepientAddress.toLowerCase();
    if (!isAddress(cleanAddress)) {
      throw new Error("Invalid Ethereum Address format");
    }

    // handles both cases (if someone sending ETH to contract or user sending token to ERC20)
    if (currencySymbol === "ETH") {
      valueInWei = ethers.parseEther(amount.toString()).toString();
      txData = "0x";
      tokenAddress = ethers.ZeroAddress;
    } else {
      valueInWei = "0";
      tokenAddress = cleanAddress;
      txData = getErc20TransferData(amount);
    }

    // preparing the expected amount for tax-checking
    const expectedAmount = ethers.parseUnits(amount.toString(), 18).toString();

    // now call the services
    const [simulateResult, byteCodeResult, transactionHistoryResult] =
      await Promise.all([
        getSimulate(
          userAddress,
          cleanAddress,
          tokenAddress,
          watchToken,
          WATCH_TOKENS_DELTAS,
          txData,
          valueInWei,
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
const getErc20TransferData = (amountStr) => {
  const erc20Abi = ["function transfer(address to, uint256 amount)"];
  const iface = new ethers.Interface(erc20Abi);

  // simulate transferring to a 'Dead' address just to test the token logic
  const deadAddress = "0x000000000000000000000000000000000000dEaD";
  const amountWei = ethers.parseUnits(amountStr.toString(), 18);

  return iface.encodeFunctionData("transfer", [deadAddress, amountWei]);
};

// utility array for the hardcoded-big4-tokens to check MULTI_CHAIN_CHANGE_Tracking
const WATCH_TOKENS_DELTAS = [
  "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
  "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
];

module.exports = masterSimulationController;
