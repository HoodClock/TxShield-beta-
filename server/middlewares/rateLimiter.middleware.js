const rateLimit = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const redisClient = require("../config/redisClient");

// general limiter for all public routes/endpoints
const generalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => !redisClient.isOpen,
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  message: {
    status: 429,
    error: "Too many requests, slow down.",
  },
});

// Strict limiter — for your heavy analysis endpoints
const analysisLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 10, // 10 analyses per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => !redisClient.isOpen,
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  message: {
    status: 429,
    error: "Analysis rate limit hit. Max 10 requests per minute.",
  },
});

module.exports = { generalLimiter, analysisLimiter };
