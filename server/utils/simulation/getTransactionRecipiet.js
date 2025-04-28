const axios = require("axios");

const getTransactionReceipts = async (_transactionHash) => {
  try {
    const payload = {
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getTransactionReceipt",
      params: [_transactionHash],
    };

    const response = await axios.post(process.env.ETH_MAINNET_NET_URL, payload);

    const returnData = response.data;

    return {
      success: returnData?.status === "0x1" ? true : false,
      gasUsed: returnData?.gasUsed || 0,
      logs: returnData?.logs || [],
      blockNumber: returnData?.blockNumber || null,
      transactionHash: returnData?.transactionHash || null,
      cumulativeGasUsed: returnData?.cumulativeGasUsed || 0,
    };
  } catch (error) {
    console.error("Error fetching transaction receipt:", error);
    return { success: false, error: error.message };
  }
};


module.exports = getTransactionReceipts;