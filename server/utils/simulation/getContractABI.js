const axios = require("axios");

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

    const abi = response.data?.data?.ContractABI;

    if (abi) {
      return { success: true, abi: JSON.parse(abi) };
    } else {
      return {
        success: false,
        error: "ABI not found in response. Possibly rate-limited or invalid address.",
      };
    }
  } catch (err) {
    console.error("ABI Fetch Error:", err.message);
    return { success: false, error: err.message };
  }
};

module.exports = getContractABI;
