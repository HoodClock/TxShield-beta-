const { getAddress } = require("ethers");
const { HoneypotService } = require("../../services/evm/honeypot/index");

// master controllers of Honeypot Services
const honeypotMasterController = async (req, res) => {
  try {
    // 1. Destructure both possible variable names
    let { contractAddress, chainId } = req.body;

    if (!contractAddress || !chainId) {
      return res
        .status(400)
        .json({ success: false, error: "Missing contractAddress or chainId." });
    }

    // 2. Defensively normalize the address (The Bagley Fix)
    try {
      contractAddress = getAddress(contractAddress.toLowerCase());
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid Ethereum Address format." });
    }

    // 3. Execute the service
    const [honeypotResp] = await Promise.all([
      HoneypotService(contractAddress, chainId),
    ]);

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
