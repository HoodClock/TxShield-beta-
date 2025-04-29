const axios = require("axios");

const traceTrasnaction = async (_transactionHash) => {
  try {
    const alchemeyURL = process.env.ETH_MAINNET_NET_URL;

    const payload = {
      id: 1,
      jsonrpc: "2.0",
      method: "trace_transaction",
      params: [_transactionHash],
    };

    const response = await axios.post(alchemeyURL, payload);

    const returnData = response.data;

    return {
      success: true,
      returnData,
    };
  } catch (err) {
    console.error("Error occur while tracing transaction", err.message);
    return { success: false, error: err.message };
  }
};

module.exports = traceTrasnaction;