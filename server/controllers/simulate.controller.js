const simulationHelper = require("../helpers/simulation.helper");

const masterSimulationController = async (req, res) => {
  try {
    const { userAddress, recepientAddress, amount } = req.body;
  
    if (!userAddress || !recepientAddress || !amount) {
      return res
        .status(400)
        .json({ success: false, message: "Missing input fields" });
    }
  
    const [
      simulateTx,
      contractABI,
      byteCode,
      transactionHistory
    ] = await Promise.all([
      simulationHelper.simulateTxHelper(userAddress, recepientAddress, amount),
      simulationHelper.contractABIHelper(recepientAddress),
      simulationHelper.byteCodeHelper(recepientAddress),
      simulationHelper.transactionHistoryHelper(recepientAddress)
    ])
  
    return res.status(200).json({
      success: true,
      checks: {
        simulateTx,
        contractABI,
        byteCode,
        transactionHistory
      }
    })
  } catch (err) {
    console.log("Master Simulation Controller Error Occur", err.message)
    return res.status(500).json({ success: false, error: err.message });
  }
};


module.exports = masterSimulationController;