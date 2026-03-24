const {
  evmPhishingValidator,
} = require("../../validators/evm/evmPhishing.validator");
const {
  calculatePhishingRisks,
} = require("../../utils/calculatePhishingRisks.utils");
const {
  detectApprovalScam,
  detectEtherForwarding,
  detectMaliciousProxy,
  detectPermitPhishing,
  detectPhishingDomainLink,
} = require("../../services/evm/phishing/index");
const { getAddress } = require("ethers");

const MasterPhishingController = async (req, res) => {
  try {
    const { userAddress, recepientAddress, currencySymbol, chainId } = req.body;

    // validation
    const validation = evmPhishingValidator(req.body);
    if (!validation.success)
      return res
        .status(400)
        .json({ success: false, message: validation.message });

    const normalUserAddress = getAddress(userAddress.toLowerCase());
    const normalContractAddress = getAddress(recepientAddress.toLowerCase());

    const [approveScam, etherForwarding, proxyScam, permitCheck, domainCheck] =
      await Promise.all([
        detectApprovalScam(
          normalUserAddress,
          normalContractAddress,
          currencySymbol,
          chainId,
        ),
        detectEtherForwarding(normalContractAddress, currencySymbol, chainId),
        detectMaliciousProxy(normalContractAddress, currencySymbol, chainId),
        detectPermitPhishing(normalContractAddress, currencySymbol, chainId),
        detectPhishingDomainLink(
          normalContractAddress,
          currencySymbol,
          chainId,
        ),
      ]);

    const results = [
      { name: "approvalScam", data: approveScam },
      { name: "etherForwarding", data: etherForwarding },
      { name: "proxyScam", data: proxyScam },
      { name: "permitCheck", data: permitCheck },
      { name: "domainCheck", data: domainCheck },
    ];

    const summery = calculatePhishingRisks(results);

    return res.status(200).json({
      success: true,
      riskSummery: summery,
      details: {
        approveScam,
        etherForwarding,
        proxyScam,
        permitCheck,
        domainCheck,
      },
    });
  } catch (err) {
    console.error("Phishing check error:", err.message);
    return res
      .status(500)
      .json({ success: false, error: "Internal phishing analysis error" });
  }
};

module.exports = MasterPhishingController;
