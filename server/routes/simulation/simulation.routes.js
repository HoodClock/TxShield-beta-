const express = require("express");
const router = express.Router();

const masterSimulationController = require("../../controllers/simulate.controller");

router.post("/execute-simulation", masterSimulationController);

module.exports = router;