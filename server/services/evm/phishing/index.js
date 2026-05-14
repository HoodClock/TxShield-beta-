const redisClient = require("../../../config/redisClient");
const { generateChacheKey } = require("../../../utils/cache");
const { detectPhishing } = require("./phishingService");

const EXPIRY_SECONDS = process.env.REDIS_EXPIRY_SECONDS || 3600;

const detectPhishingCached = async (contractAddress, chain) => {
  const cachePayload = {
    type: "phishing",
    contractAddress: contractAddress.toLowerCase(),
    chain: chain.toString(),
  };

  const cacheKey = generateChacheKey(cachePayload);

  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    console.log("[Redis] Phishing cache hit:", cacheKey);
    return JSON.parse(cachedData);
  }

  const result = await detectPhishing(contractAddress, chain);

  await redisClient.set(cacheKey, JSON.stringify(result), {
    EX: parseInt(EXPIRY_SECONDS),
  });

  return result;
};

module.exports = { detectPhishing: detectPhishingCached };
