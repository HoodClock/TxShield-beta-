const phishingHelper = require("../helpers/phishing.helper");
const {getAddress} = require("ethers")
const callAiModel = require("../services/aiServices")

const MasterPhishingController = async (req, res) => {
  const { userAddress, recepientAddress, amount, currencySymbol } = req.body;

  try {

    const checkSumRecepientAddress = getAddress(recepientAddress);

    const [approveScam, etherForwarding, proxyScam] = await Promise.all([
      phishingHelper.phishingApproveScam(
        userAddress,
        recepientAddress,
      ),
      phishingHelper.phishingEtherForwardScam(checkSumRecepientAddress),
      phishingHelper.phishingMaliciousProxy(checkSumRecepientAddress)
    ]);


    // now gather the data and generate the prompt and call the ai model to analyze 
    const prompt = `
    As a Web3 security expert, analyze these phishing checks and return ONLY valid JSON with:
    - phishingScore (0-100%)
    - riskLevel (low/medium/high/critical)
    - keyFindings: [array of 2-3 most important findings as strings]
    - recommendedActions: [array of 2 concrete steps as strings]
    - confidence: (high/medium/low)
    
    IMPORTANT: 
    1. Return ONLY the JSON object, no additional text or markdown
    2. Never include <think> tags or reasoning
    3. Format all findings and actions as plain strings
    
    Example response format:
    {
      "phishingScore": 95,
      "riskLevel": "critical",
      "keyFindings": ["Finding 1", "Finding 2"],
      "recommendedActions": ["Action 1", "Action 2"],
      "confidence": "high"
    }
    
    Checks to analyze:
    1. approveScam: ${JSON.stringify(approveScam)}
    2. etherForwarding: ${JSON.stringify(etherForwarding)}
    3. proxyScam: ${JSON.stringify(proxyScam)}
    `.trim();
    
      // calling the ai-model (Deepseek R1)
      const phishingVerdict = await callAiModel(prompt);
  
    return res.status(200).json({
      success: true,
      checks: {
          approveScam,
          etherForwarding,
          proxyScam
      },
      // ai verdict is added to final response 
      phishingVerdict
    });
  } catch (err) {
    console.error("Internal Server Error, can't resolve phishing checks.")
    return res.status(500).json({success: false, error: err.message}) 
  }

};

module.exports = MasterPhishingController;