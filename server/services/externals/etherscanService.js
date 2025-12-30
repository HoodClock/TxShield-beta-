const axios = require("axios");
const { ethers, getAddress, JsonRpcProvider } = require("ethers");
require("dotenv").config();

const etherscanApiEndpoint = process.env.ETHERSCAN_API_ENDPOINT;
const etherscanApiKey = process.env.ETHERSCAN_API_KEY;
const provider = new ethers.JsonRpcProvider(process.env.ETH_MAINNET_NET_URL);

// redis imports
const redisClient = require("../../config/redisClient")
const { generateContractKey } = require('../../utils/cache')
const REDIS_EXPIRY_SECONDS = process.env.REDIS_EXPIRY_SECONDS || 86400;

// rpc's
const rpcUrl = {
  ETH: process.env.ETH_MAINNET_NET_URL,
  BNB: process.env.BNB_MAINNET_NET_URL
}

const getChainConfig = (chain) => {
  switch (chain) {
    case "ETH":
    case "BNB":
      return {
        endpoint: etherscanApiEndpoint,
        apikey: etherscanApiKey,
        provider: new ethers.JsonRpcProvider(rpcUrl[chain])
      }
    default:
      throw new Error(`Unsupported Chain ${chain}`)
  }
}

// sleep function
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// get ABI
const getAbi = async (address, chain) => {

  const checkSumAddress = getAddress(address);


  // generating formatted key
  const cacheKey = generateContractKey(chain, address, "abi")

  // checking redis
  const cachedAbi = await redisClient.get(cacheKey);
  if (cachedAbi) return JSON.parse(cachedAbi);

  await sleep(300); // throttle to avoid Etherscan rate limit

  const { endpoint, apikey } = getChainConfig(chain)

  try {
    const response = await axios.get(endpoint, {
      params: {
        module: "contract",
        action: "getabi",
        address: checkSumAddress,
        apikey: apikey,
      },
    });

    if (response.data.status === "1") {
      // getting the response 
      const abi = JSON.parse(response.data.result);

      // saving the response to redis and returning it
      await redisClient.set(cacheKey, JSON.stringify(abi), {
        'EX': parseInt(REDIS_EXPIRY_SECONDS)
      })
      return abi
    }
    return null
  } catch (err) {
    console.error("Error fetching ABI:", err.message);
    return null;
  }
};

// getSourceCode
const getSourceCode = async (address, chain) => {

  const checkSumAddress = getAddress(address);


  const cacheKey = generateContractKey(chain, address, "sourcecode")

  const cacheSourcecode = await redisClient.get(cacheKey);
  if (cacheSourcecode) return JSON.parse(cacheSourcecode);

  const { endpoint, apikey } = getChainConfig(chain)

  try {
    const response = await axios.get(endpoint, {
      params: {
        module: "contract",
        action: "getsourcecode",
        address: checkSumAddress,
        apikey: apikey,
      },
    });

    if (response.data.status === "1") {
      const sourceCode = response.data.result;

      // saving it to redis
      await redisClient.set(cacheKey, JSON.stringify(sourceCode), {
        'EX': parseInt(REDIS_EXPIRY_SECONDS)
      });
      return sourceCode
    }
    return null
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
const getByteCode = async (address, chain) => {

  const checkSumAddress = getAddress(address);

  // generating the cache key
  const cacheKey = generateContractKey(chain, address, "bytecode")

  // getting bytecode from redis cache
  const cachedBytecode = await redisClient.get(cacheKey)
  if (cachedBytecode) return JSON.parse(cachedBytecode);

  const { endpoint, apikey } = getChainConfig(chain)

  try {
    const response = await axios.get(endpoint, {
      params: {
        module: "proxy",
        action: "eth_getCode",
        address: checkSumAddress,
        apikey: apikey,
      },
    });

    const byteCode = response.data?.result || "";

    // saving this bytecode to redis
    await redisClient.set(cacheKey, JSON.stringify(byteCode), {
      'EX': parseInt(REDIS_EXPIRY_SECONDS)
    })
    return byteCode
  } catch (err) {
    console.error("Error fetching bytecode:", err.message);
    return "";
  }
};

// check address -> contract or not (also apply the redis wrapper) 
const isContract = async (address, chain) => {
  const checkSumAddress = getAddress(address);

  // formatted cache key
  const cacheKey = generateContractKey(chain, address, "isContract")

  // checking redis for existing cache key
  const cached = await redisClient.get(cacheKey);
  if (cached !== null) return cached === "true"

  try {
    const { provider } = getChainConfig(chain)
    const code = await provider.getCode(checkSumAddress);
    const result = code && code != "0x";

    // now save to redis
    await redisClient.set(cacheKey, String(result), {
      'EX': parseInt(REDIS_EXPIRY_SECONDS)
    })
    return result
  } catch (err) {
    console.error("Error checking contract:", err.message);
    return false;
  }
};

module.exports = { getAbi, getSourceCode, getByteCode, isContract };
