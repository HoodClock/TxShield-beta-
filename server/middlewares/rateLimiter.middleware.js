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

// Rate limiters for simulation endpoints
const simulationUnauthLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => !redisClient.isOpen,
  store: new RedisStore({
    prefix: "rl:sim:unauth:",
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  handler: (req, res, next, options) => {
    res.status(429).json({
      success: false,
      error: "Too Many Requests",
      message: "Unauthenticated rate limit hit. Max 10 requests per minute.",
    });
  },
});

const simulationAuthLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute per Wallet
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => !redisClient.isOpen,
  store: new RedisStore({
    prefix: "rl:sim:auth:",
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  keyGenerator: (req) => {
    return req.wallet || req.headers["wallet"];
  },
  validate: { keyGeneratorIpFallback: false },
  handler: (req, res, next, options) => {
    res.status(429).json({
      success: false,
      error: "Too Many Requests",
      message: "Authenticated rate limit hit. Max 100 requests per minute.",
    });
  },
});

const simulationLimiter = (req, res, next) => {
  if (req.isAuthenticated) {
    return simulationAuthLimiter(req, res, next);
  } else {
    return simulationUnauthLimiter(req, res, next);
  }
};

module.exports = { generalLimiter, analysisLimiter, simulationLimiter };
