const redisClient = require("../../../config/redisClient");
const { generateChacheKey } = require("../../../utils/cache");
const { analyzeBytecode } = require("./analyzeByteCode");
const { getTransferHistory } = require("./getTransferHistory");

const EXPIRY_SECONDS = process.env.REDIS_EXPIRY_SECONDS || 3600;
const HISTORY_EXPIRY = 300;

const analyzeBytecodeCache = async (recipientAddress, chainId) => {
  const cacheKey = generateChacheKey({
    type: "bytecode",
    address: recipientAddress.toLowerCase(),
    chainId: chainId.toString(),
  });

  const cached = await redisClient.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const result = await analyzeBytecode(recipientAddress, chainId);

  await redisClient.set(cacheKey, JSON.stringify(result), {
    EX: parseInt(EXPIRY_SECONDS),
  });

  return result;
};

const getTransferHistoryCache = async (targetAddress, chainId) => {
  const cacheKey = generateChacheKey({
    type: "bytecode",
    address: recipientAddress.toLowerCase(),
    chainId: chainId.toString(),
  });

  const cached = await redisClient.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const result = await getTransferHistory(targetAddress, chainId);

  await redisClient.set(cacheKey, JSON.stringify(result), {
    EX: parseInt(HISTORY_EXPIRY),
  });

  return result;
};

module.exports = {
  analyzeBytecodeCache,
  getTransferHistoryCache,
};
