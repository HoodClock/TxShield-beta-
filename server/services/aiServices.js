const axios = require("axios");

const openAiUrl = process.env.OPEN_AI_URL;
const openAiKey = process.env.MODEL_API_KEY;

const callAiModel = async (prompt) => {
  console.log("PROMTP=> ", prompt)
  try {
    const response = await axios.post(
      openAiUrl,
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("AI model error:", error.response?.data || error.message);
    throw new Error("Failed to get AI recommendation");
  }
};

module.exports = callAiModel;
