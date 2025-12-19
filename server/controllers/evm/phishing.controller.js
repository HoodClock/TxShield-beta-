const { evmPhishingValidator } = require("../../validators/evm/evmPhishing.validator");
const { calculatePhishingRisks } = require("../../utils/calculatePhishingRisks.utils")
const { detectApprovalScam, detectEtherForwarding, detectMaliciousProxy, detectPermitPhishing, detectPhishingDomainLink } = require("../../services/evm/phishing/index")
const { getAddress } = require("ethers");

const MasterPhishingController = async (req, res) => {
  try {

    const { userAddress, recepientAddress, currencySymbol } = req.body;

    // validation
    const validation = evmPhishingValidator(req.body);
    if (!validation.success) return res.status(400).json({ success: false, message: validation.message })

    const normalUserAddress = getAddress(userAddress)
    const normalContractAddress = getAddress(recepientAddress);

    const [approveScam, etherForwarding, proxyScam, permitCheck, domainCheck] = await Promise.all([
      detectApprovalScam(normalUserAddress, normalContractAddress, currencySymbol),
      detectEtherForwarding(normalContractAddress, currencySymbol),
      detectMaliciousProxy(normalContractAddress, currencySymbol),
      detectPermitPhishing(normalContractAddress, currencySymbol),
      detectPhishingDomainLink(normalContractAddress, currencySymbol),
    ]);

    const results = [
      { name: 'approvalScam', data: approveScam },
      { name: 'etherForwarding', data: etherForwarding },
      { name: 'proxyScam', data: proxyScam },
      { name: 'permitCheck', data: permitCheck },
      { name: 'domainCheck', data: domainCheck },
    ]

    const summery = calculatePhishingRisks(results);

    return res.status(200).json({
      success: true,
      riskSummery: summery,
      details: {
        approveScam,
        etherForwarding,
        proxyScam,
        permitCheck,
        domainCheck
      }
    })
  } catch (err) {
    console.error("Phishing check error:", err.message);
    return res.status(500).json({ success: false, error: "Internal phishing analysis error" });
  }
};

module.exports = MasterPhishingController;