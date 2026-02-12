const { HoneypotService } = require("../../services/evm/honeypot/index");

// master controllers of Honeypot Services
const honeypotMasterController = async (req, res) => {
  try {
    const { contractAddress } = req.body;

    const [honeypotResp] = await Promise.all([
      HoneypotService(contractAddress),
    ]);

    // Final Result (all checks + riskScoring)
    return res.status(200).json({
      success: true,
      honeypotResponse: honeypotResp,
    });
  } catch (err) {
    console.error("Master Honeypot Check Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  honeypotMasterController,
};
