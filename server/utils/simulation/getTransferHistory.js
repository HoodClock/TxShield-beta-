const axios = require("axios");

const getTransferHistory = async (_recipientAddress) => {
  try {
    const etherScan_Api_Key = process.env.ETHERSCAN_API_KEY;

    const response = await axios.get(process.env.ETHERSCAN_API_ENDPOINT, {
      params: {
        module: "account",
        action: "tokentx",
        address: _recipientAddress,
        page: 1,
        offset: 10,
        sort: "desc",
        apikey: etherScan_Api_Key,
      },
    });

    const { status, result, message } = response.data;

    if (status === "1") {
      return { success: true, transfers: result };
    } else {
      return { success: false, error: message || "No transfers found" };
    }
  } catch (err) {
    console.error("Transfer History Error:", err.message);
    return { success: false, error: err.message };
  }
};

module.exports = getTransferHistory;
