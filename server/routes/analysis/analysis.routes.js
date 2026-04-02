const express = require("express");
const { submitAnalysis, getAnalysisStatus } = require("./analysis.controller");
const router = express.Router();

router.post("/", submitAnalysis);
router.get("/status/:jobId", getAnalysisStatus);

module.exports = router;
