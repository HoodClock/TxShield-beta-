const {
  sumUpAllFeatures,
} = require("../../services/solana/simulationSol/sumUpallFeatures");

const simulateSOLTransactionController = async (req, res) => {
  console.log("Solana Simulation Request Body:", JSON.stringify(req.body, null, 2));
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
      recepientAddress, // maps to _contractAddress
      userAddress,      // maps to _userAddress
      amount,
      currencySymbol,
    );

    if (!result.success) {
      console.log("SIMULATION FAILED RETURNING 418:", result.message);
      return res.status(418).json({ 
        success: false, 
        message: result.message || result.error || "Simulation Error",
        _debug: "HIT-CONTROLLER-418"
      });
    }

    res.status(200).json({ success: true, data: result, _v: "2.0-PATCH-LEGACY-FIX" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = simulateSOLTransactionController;
