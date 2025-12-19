const { getAddress } = require("ethers");
const { evmSimulateValidator } = require('../../validators/evm/evmSimulation.validator')
const { analyzeByteCode, getTransactionHistory, getSimulate } = require("../../services/evm/simulation/index")

const masterSimulationController = async (req, res) => {
  try {

    const { userAddress, recepientAddress, amount, currencySymbol } = req.body;

    // call the validator
    evmSimulateValidator(req.body)

    const checkSumAddress = getAddress(recepientAddress);

    // now call the services
    const [simulateResult, byteCodeResult, transactionHistoryResult] = await Promise.all([
      getSimulate(userAddress,
        checkSumAddress,
        amount,
        currencySymbol),
      analyzeByteCode(checkSumAddress, currencySymbol),
      getTransactionHistory(checkSumAddress)
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

module.exports = masterSimulationController;
