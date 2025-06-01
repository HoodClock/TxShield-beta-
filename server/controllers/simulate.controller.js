const simulationHelper = require("../helpers/simulation.helper");

const masterSimulationController = async (req, res) => {
  try {
    const { userAddress, recepientAddress, amount } = req.body;

    if (!userAddress || !recepientAddress || !amount) {
      return res.status(400).json({ success: false, message: "Missing input fields" });
    }

    const [simulateTx, byteCode, transactionHistory] = await Promise.all([
      simulationHelper.simulateTxHelper(userAddress, recepientAddress, amount),
      simulationHelper.byteCodeHelper(recepientAddress),
      simulationHelper.transactionHistoryHelper(recepientAddress)
    ]);

    return res.status(200).json({
      success: true,
      checks: {
        simulateTx,
        byteCode,
        transactionHistory
      }
    });
  } catch (err) {
    console.error("Master Simulation Controller Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = masterSimulationController;