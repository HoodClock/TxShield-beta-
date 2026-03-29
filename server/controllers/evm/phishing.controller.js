const {
  evmPhishingValidator,
} = require("../../validators/evm/evmPhishing.validator");
const {
  detectPhishing,
} = require("../../services/evm/phishing/phishingService");
const { getAddress } = require("ethers");

const MasterPhishingController = async (req, res) => {
  try {
    const { recepientAddress, chainId } = req.body;

    // validation
    const validation = evmPhishingValidator(req.body);
    if (!validation.success)
      return res
        .status(400)
        .json({ success: false, message: validation.message });

    const normalContractAddress = getAddress(recepientAddress.toLowerCase());

    const result = await detectPhishing(normalContractAddress, chainId);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("Phishing check error:", err.message);
    return res
      .status(500)
      .json({ success: false, error: "Internal phishing analysis error" });
  }
};

module.exports = MasterPhishingController;
