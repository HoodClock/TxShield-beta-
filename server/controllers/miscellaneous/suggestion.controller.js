const callAiModel = require("../../services/externals/aiServices");

const generateRecommendataions = async (req, res) => {
  try {
    const { simulation: simulationData, honeypot: honeypotData } = req.body;

    const prompt = `You are a Web3 security analyst for TxShield — a platform that simulates smart contract transactions and detects honeypot patterns.

Your task:
- Analyze the provided simulation and honeypot results.
- Return ONLY 2 to 4 very short, clear, non-technical bullet points.
- Each point should be a direct insight or warning.
- Do NOT add headings, intros, explanations, or mention any tools outside TxShield.
- No markdown, no formatting — just clean plain text.
- Focus on actionable insights that can be immediately understood by a user.
- Avoid technical jargon or complex terms.
- Ensure the response is concise and to the point must be COMPLETED in only TWO to Three LINES.

Simulation Output:
${JSON.stringify(simulationData, null, 2)}

Honeypot Analysis:
${JSON.stringify(honeypotData, null, 2)}`;

    const recommendations = await callAiModel(prompt);

    res.json({ recommendation: recommendations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = generateRecommendataions;
