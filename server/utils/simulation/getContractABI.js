const { provider } = require("../../config/provider");
const { axios } = require("axios");

const getContractABI = async (_recipientAddress) => {
  try {
    const etherScan_Api_Key = process.env.ETHERSCAN_API_KEY;

    const response = await axios.get(process.env.ETHERSCAN_API_ENDPOINT, {
      params: {
        module: "contract",
        action: "getabi",
        address: _recipientAddress,
        apikey: etherScan_Api_Key,
      },
    });

    const { status, result, message } = response.data;

    if (status === "1") {
      const abi = JSON.parse(result);
      return { success: true, abi };
    } else {
      return { success: false, error: `Etherscan error ${message || result}` };
    }
  } catch (error) {
    console.error("ABI Fetch Error:", err.message);
    return { success: false, error: err.message };
  }
};

module.exports = getContractABI;
