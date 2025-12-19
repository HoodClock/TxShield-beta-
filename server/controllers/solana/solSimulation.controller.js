const solSimulationHelper = require("../helpers/solSimulation.helper")


const simulateSOLTransactionController = async (req, res) => {
    try {
      const {signedTxBase64, userAddress, recepientAddress, amount, currencySymbol } = req.body;

      const result = await solSimulationHelper.simulateSOLTxHelper(
        signedTxBase64,
        userAddress,
        recepientAddress,
        amount,
        currencySymbol
      );
  
      if (!result.success) {
        return res.status(400).json({ success: false, message: result.message || result.error });
      }
  
      res.status(200).json({ success: true, data: result.data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  module.exports = simulateSOLTransactionController