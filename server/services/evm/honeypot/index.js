const _runHoneypotCheck = require("./honeypot.service");
const redisClient = require("../../../config/redisClient");
const { generateChacheKey } = require("../../../utils/cache");

const EXPIRY_SECONDS = process.env.REDIS_EXPIRY_SECONDS || 3600;

const HoneypotService = async (contractAddress, chainId) => {
  const cachePayload = {
    type: "honeypot",
    contractAddress: contractAddress.toLowerCase(),
    chainId: chainId.toString(),
  };

  const cacheKey = generateChacheKey(cachePayload);

  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    console.log("[Redis] Honeypot cache hit:", cacheKey);
    return JSON.parse(cachedData);
  }

  const result = await _runHoneypotCheck(contractAddress, chainId);

  await redisClient.set(cacheKey, JSON.stringify(result), {
    EX: parseInt(EXPIRY_SECONDS),
  });

  return result;
};

module.exports = { HoneypotService };
