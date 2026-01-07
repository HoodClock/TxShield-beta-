const {
  sumUpAllFeatures,
} = require("../../services/solana/simulationSol/sumUpallFeatures");

const simulateSOLTransactionController = async (req, res) => {
  try {
    const {
      signedTxBase64,
      userAddress,
      recepientAddress,
      amount,
      currencySymbol,
    } = req.body;

    const result = await sumUpAllFeatures(
      signedTxBase64,
      userAddress,
      recepientAddress,
      amount,
      currencySymbol,
    );

    if (!result.success) {
      return res.status(400).json({ success: false, message: result.message });
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = simulateSOLTransactionController;
