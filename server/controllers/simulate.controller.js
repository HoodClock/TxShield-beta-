const simulationHelper = require("../helpers/simulation.helper");
const {getAddress} = require("ethers")

const masterSimulationController = async (req, res) => {
  try {
    const { userAddress, recepientAddress, amount } = req.body;

    const checkSumAddress = getAddress(recepientAddress);

    if (!userAddress || !recepientAddress || !amount) {
      return res
        .status(400)
        .json({ success: false, message: "Missing input fields" });
    }

    const [simulateTx, byteCode, transactionHistory] = await Promise.all([
      simulationHelper.simulateTxHelper(userAddress, checkSumAddress, amount),
      simulationHelper.byteCodeHelper(checkSumAddress),
      simulationHelper.transactionHistoryHelper(checkSumAddress),
    ]);

    return res.status(200).json({
      success: true,
      checks: {
        simulateTx,
        byteCode,
        transactionHistory,
      },
    });

  } catch (err) {
    console.error("Master Simulation Controller Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = masterSimulationController;
