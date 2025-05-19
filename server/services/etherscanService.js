const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const etherscanApiEndpoint = process.env.ETHERSCAN_API_ENDPOINT;
const etherscanApiKey = process.env.ETHERSCAN_API_KEY;

// getABI
const getAbi = async (address) => {
  try {
    const response = await axios.get(etherscanApiEndpoint, {
      params: {
        module: "contract",
        action: "getabi",
        address,
        apikey: etherscanApiKey,
      },
    });

    if (response.data.status === "1") {
      return response.data.result;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error fetching ABI:", err.message);
    return null;
  }
};

// getSourceCode
const getSourceCode = async (address) => {
  try {
    const response = await axios.get(etherscanApiEndpoint, {
      params: {
        module: "contract",
        action: "getsourcecode",
        address,
        apikey: etherscanApiKey,
      },
    });

    if (response.data.status === "1") {
      return response.data.result;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error fetching source code:", err.message);
    return null;
  }
};

const getByteCode = async (address) => {
  const response = await axios.post(etherscanApiEndpoint, {
    params: {
      module: "proxy",
      action: "eth_getCode",
      address,
      apikey: etherscanApiKey,
    },
  });

  return response.data?.results;
};

module.exports = { getAbi, getSourceCode, getByteCode };
