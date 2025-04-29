const axios = require("axios");

const debugTransaction = async (_transactionHash) => {
  try {
    const payload = {
      id: 1,
      jsonrpc: "2.0",
      method: "debug_traceTransaction",
      params: [_transactionHash],
    };

    const response = await axios.post(process.env.ETH_MAINNET_NET_URL, payload);

    const returnData = response.data.result;

    return {
      success: true,
      debugInfo: returnData,
    };
  } catch (err) {
    console.error("Some Error occur while dubugging", err.message);
    return { success: false, error: err.message };
  }
};

module.exports = debugTransaction;
