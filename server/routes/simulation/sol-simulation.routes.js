const express = require("express");
const router = express.Router();

const masterSimulationController = require("../../controllers/solana/solSimulation.controller");

router.post("/execute-sol-simulation", masterSimulationController);

module.exports = router;