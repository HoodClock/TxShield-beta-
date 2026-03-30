const { Queue } = require("bullmq");
require("dotenv").config();

// Railway gives you these exact variable names
const connection = {
  host: process.env.REDISHOST,
  port: parseInt(process.env.REDISPORT),
  password: process.env.REDISPASSWORD,
  username: process.env.REDISUSER || "default",
};

const analysisQueue = new Queue("analysis", { connection });

module.exports = { analysisQueue, connection };
