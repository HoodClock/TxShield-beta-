const axios = require("axios");
require("dotenv").config();
const { ethers, getAddress } = require("ethers");

const etherscanApiEndpoint = process.env.ETHERSCAN_API_ENDPOINT;
const etherscanApiKey = process.env.ETHERSCAN_API_KEY;
const provider = new ethers.JsonRpcProvider(process.env.ETH_MAINNET_NET_URL);

// sleep function
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// get ABI
const getAbi = async (address) => {
  await sleep(300); // throttle to avoid Etherscan rate limit
  const checkSumAddress = getAddress(address);
  try {
    const response = await axios.get(etherscanApiEndpoint, {
      params: {
        module: "contract",
        action: "getabi",
        address: checkSumAddress,
        apikey: etherscanApiKey,
      },
    });

    if (response.data.status === "1") {
      return JSON.parse(response.data.result);
    } else {
      console.error("ABI fetch failed:", response.data.result);
      return null;
    }
  } catch (err) {
    console.error("Error fetching ABI:", err.message);
    return null;
  }
};

// getSourceCode
const getSourceCode = async (address) => {
  const checkSumAddress = getAddress(address);
  try {
    const response = await axios.get(etherscanApiEndpoint, {
      params: {
        module: "contract",
        action: "getsourcecode",
        address: checkSumAddress,
        apikey: etherscanApiKey,
      },
    });

    if (response.data.status === "1") {
      const sourceCode = response.data.result;
      return {
        success: true,
        data: sourceCode,
        error: null,
      };
    } else {
      return {
        success: false,
        data: null,
        error: response.data.result || "Unable to fetch source code",
      };
    }
  } catch (err) {
    console.error("Error fetching source code:", err.message);
    return {
      success: false,
      data: null,
      error: err.message,
    };
  }
};

// getByteCode
const getByteCode = async (address) => {
  const checkSumAddress = getAddress(address);

  try {
    const response = await axios.get(etherscanApiEndpoint, {
      params: {
        module: "proxy",
        action: "eth_getCode",
        address: checkSumAddress,
        apikey: etherscanApiKey,
      },
    });

    return response.data?.result || "";
  } catch (err) {
    console.error("Error fetching bytecode:", err.message);
    return "";
  }
};

// check address -> contract or not
const isContract = async (address) => {
  const checkSumAddress = getAddress(address);
  try {
    const code = await provider.getCode(checkSumAddress);
    return code && code != "0x";
  } catch (err) {
    console.error("Error checking contract:", err.message);
    return false;
  }
};

module.exports = { getAbi, getSourceCode, getByteCode, isContract };
