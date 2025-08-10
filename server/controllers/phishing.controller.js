const phishingHelper = require("../helpers/phishing.helper");
const { getAddress } = require("ethers");
const callAiModel = require("../services/aiServices");

const MasterPhishingController = async (req, res) => {
  const { userAddress, recepientAddress, amount, currencySymbol } = req.body;

  try {
    const checkSumRecepientAddress = getAddress(recepientAddress);

    const [approveScam, etherForwarding, proxyScam, permitCheck, domainCheck] = await Promise.all([
      phishingHelper.phishingApproveScam(userAddress, recepientAddress),
      phishingHelper.phishingEtherForwardScam(checkSumRecepientAddress),
      phishingHelper.phishingMaliciousProxy(checkSumRecepientAddress),
      phishingHelper.phishingPermit(checkSumRecepientAddress),
      phishingHelper.phishingDomainLink(checkSumRecepientAddress),
    ]);

    // Enhanced AI prompt with context to avoid false positives
    const prompt = `
    As a Web3 security expert, analyze these phishing checks and return ONLY valid JSON with:
    - phishingScore (0-100%, adjust conservatively if patterns are common in legit contracts)
    - riskLevel (low/medium/high/critical, downgrade if findings are non-unique)
    - keyFindings: [array of findings, noting if patterns are also seen in safe contracts]
    - recommendedActions: [suggestions, but avoid extreme measures unless truly malicious]
    - confidence: (high/medium/low, lower if patterns are ambiguous)
    
    IMPORTANT: 
    1. Return ONLY the JSON object, no additional text.
    2. Flag as malicious ONLY if clear evidence exists (e.g., known scam address).
    3. If CALL opcodes or approvals exist but are explainable (e.g., DEX routers), adjust risk accordingly.
    
    Example safe response for ambiguous cases:
    {
      "phishingScore": 30,
      "riskLevel": "medium",
      "keyFindings": ["CALL opcodes detected (common in legit contracts)", "Approval logic requires further manual review"],
      "recommendedActions": ["Review contract on Etherscan", "Check if address is verified"],
      "confidence": "medium"
    }
    
    Checks to analyze:
    1. approveScam: ${JSON.stringify(approveScam)}
    2. etherForwarding: ${JSON.stringify(etherForwarding)}
    3. proxyScam: ${JSON.stringify(proxyScam)}
    4. permitCheck: ${JSON.stringify(permitCheck)}
    5. phishingDomainLinks: ${JSON.stringify(domainCheck)}
    `.trim();

    const phishingVerdict = await callAiModel(prompt);

    return res.status(200).json({
      success: true,
      checks: { approveScam, etherForwarding, proxyScam, permitCheck, domainCheck },
      phishingVerdict
    });
  } catch (err) {
    console.error("Phishing check error:", err.message);
    return res.status(500).json({ success: false, error: "Internal phishing analysis error" });
  }
};

module.exports = MasterPhishingController;