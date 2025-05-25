const phishingHelper = require("../helpers/phishing.helper");

const masterPhishingController = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res
        .status(401)
        .json({ message: "Missing credentials" });
    }

    const [
      approveScam,
      hiddenFunction,
      impression,
      malacious,
      byteCode,
    ] = await Promise.all([
      phishingHelper.handleApproveScam(address),
      phishingHelper.handleHiddenFunctions(address),
      phishingHelper.handleImpression(address),
      phishingHelper.handleMalicious(address),
      phishingHelper.handleByteCode(address),
    ]);

    return res.status(200).json({
      success: true,
      checks: {
        approveScam,
        hiddenFunction,
        impression,
        malacious,
        byteCode,
      },
    });
  } catch (err) {
    console.error("Master Phishing Check Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { masterPhishingController };
