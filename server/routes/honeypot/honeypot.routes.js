const express = require('express')
const router = express.Router();

const honeypotControllers = require("../../controllers/honeypot.controller");

router.post("/honeypot-checks", honeypotControllers.honeypotMasterController);

module.exports = router;
