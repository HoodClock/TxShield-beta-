const callAiModel = require("../services/aiServices");

const generateRecommendataions = async (req, res) => {
  try {
    const { simulationData, honeypotData } = req.body;

    const prompt = `You are a Web3 security expert. A user has simulated a smart contract transaction. Analyze the result and provide clear, concise, and actionable recommendations.
  
  Instructions:
  - Detect any red flags like high gas usage, suspicious functions, or abnormal token transfers.
  - Check for known honeypot patterns or common scam behaviors.
  - Give 2 to 3 insights or warnings that help the user make a decision.
  - Keep the language non-technical but informative.
  
  Simulation Data:
  ${JSON.stringify(simulationData, null, 2)}
  Honeypot Data:
  ${JSON.stringify(honeypotData, null, 2)}`;

    const recommendations = await callAiModel(prompt);

    res.json({ recommendations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = generateRecommendataions;
