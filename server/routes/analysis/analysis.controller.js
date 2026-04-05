const { analysisQueue } = require("../../queues/analysis.queue");
const { getAddress } = require("ethers");

// POST /api/analyze
const submitAnalysis = async (req, res) => {
  const { targetContractAddress, chainId } = req.body;

  if (!targetContractAddress) {
    return res.status(400).json({ error: "targetContractAddress is required" });
  }
  if (!chainId) {
    return res.status(400).json({ error: "chainId is required" });
  }

  try {
    getAddress(targetContractAddress); // validates format
  } catch {
    return res.status(400).json({ error: "Invalid Ethereum address format" });
  }

  const job = await analysisQueue.add("analyze", {
    targetContractAddress,
    chainId,
  });

  return res.status(202).json({
    success: true,
    jobId: job.id,
    message: "Analysis queued.",
    statusUrl: `/api/analyze/status/${job.id}`,
  });
};

// GET /api/analyze/status/:jobId
const getAnalysisStatus = async (req, res) => {
  const { jobId } = req.params;
  const job = await analysisQueue.getJob(jobId);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  const state = await job.getState();

  if (state === "waiting" || state === "active") {
    return res
      .status(202)
      .json({ success: true, jobId, state, message: "Processing..." });
  }

  if (state === "failed") {
    return res
      .status(500)
      .json({ success: false, jobId, state, error: job.failedReason });
  }

  return res.status(200).json({
    success: true,
    jobId,
    state,
    result: job.returnvalue,
  });
};

module.exports = { submitAnalysis, getAnalysisStatus };
