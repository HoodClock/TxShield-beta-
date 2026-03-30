const { Worker } = require("bullmq");
const { connection } = require("./analysis.queue");
const { getAddress } = require("ethers");

// Your exact services
const { HoneypotService } = require("../services/evm/honeypot/index");
const { detectPhishing } = require("../services/evm/phishing/phishingService");
const {
  analyzeBytecode,
} = require("../services/evm/simulation/analyzeByteCode");
const {
  getTransferHistory,
} = require("../services/evm/simulation/getTransferHistory");

const worker = new Worker(
  "analysis",
  async (job) => {
    const { targetContractAddress, chainId } = job.data;
    const normalizedAddress = getAddress(targetContractAddress.toLowerCase());

    const [honeypotResult, phishingResult, bytecodeResult, historyResult] =
      await Promise.allSettled([
        HoneypotService(normalizedAddress, chainId),
        detectPhishing(normalizedAddress, chainId),
        analyzeBytecode(normalizedAddress, chainId),
        getTransferHistory(normalizedAddress, chainId),
      ]);

    return {
      honeypotResult:
        honeypotResult.status === "fulfilled"
          ? honeypotResult.value
          : { error: honeypotResult.reason?.message },
      phishingResult:
        phishingResult.status === "fulfilled"
          ? phishingResult.value
          : { error: phishingResult.reason?.message },
      bytecodeResult:
        bytecodeResult.status === "fulfilled"
          ? bytecodeResult.value
          : { error: bytecodeResult.reason?.message },
      historyResult:
        historyResult.status === "fulfilled"
          ? historyResult.value
          : { error: historyResult.reason?.message },
    };
  },
  {
    connection,
    concurrency: 1, // 1 job at a time — respects Alchemy rate limit
  },
);

worker.on("completed", (job) => {
  console.log(`[Worker] Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`[Worker] Job ${job.id} failed:`, err.message);
});

module.exports = worker;
