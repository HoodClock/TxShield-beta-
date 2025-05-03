const express = require("express");
const router = express.Router();

const {
  simulateController,
  contractABIController,
  analyzedByteCodeController,
  transactionHistoryController,
} = require("../../controllers/simulate.controller");


// post Simulate
router.post("/simulate", simulateController);

// post contract-abi
router.post("/contract-abi", contractABIController);

// post analyzedByteCode
router.post("/analyze-bytecode", analyzedByteCodeController);

// post transaction-history
router.post("/transaction-history", transactionHistoryController);

module.exports = router;