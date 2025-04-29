const axios = require("axios");

const getTransferHistory = async (_recipientAddress) => {
  try {
    const payload = {
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getAssetTransfers",
      params: [
        {
          fromBlock: "0x0",
          toBlock: "latest",
          toAddress: _recipientAddress,
          category: ["external", "erc20", "erc721", "erc1155"],
        },
      ],
    };

    const response = await axios.post(process.env.ETH_MAINNET_NET_URL, payload);
    const transferData = response.data.results.transfers;

    return {
      success: true,
      transfers: transferData,
    }

  } catch (error) {
    console.error("Error while fetching transfer history:", error.message);
    return { success: false, error: error.message };
  }
};

module.exports = getTransferHistory;
