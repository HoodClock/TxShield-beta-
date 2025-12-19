const axios = require("axios");

const deepseekUrl = process.env.DEEPSEEK_URL;
const deepseekApi = process.env.MODEL_API_KEY;
const modelName = process.env.MODEL_NAME;
const siteUrlReferer = process.env.SITE_URL;
const siteName = process.env.SITE_NAME;


const callAiModel = async (prompt) => {
  try {
    const response = await axios.post(
      deepseekUrl,
      {
        model: modelName,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${deepseekApi}`,
          "HTTP-Referer": siteUrlReferer,
          "X-Title": siteName,
        },
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error("AI model error:", error, error.response?.data || error.message);
    throw new Error("Failed to get AI recommendation");
  }
};

module.exports = callAiModel;
