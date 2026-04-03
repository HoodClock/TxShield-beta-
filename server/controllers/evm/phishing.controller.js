const { detectPhishing } = require("../../services/evm/phishing/index");
const { getAddress } = require("ethers");

const MasterPhishingController = async (req, res) => {
  try {
    const { contractAddress, chainId } = req.body;

    const normalContractAddress = getAddress(contractAddress.toLowerCase());

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
