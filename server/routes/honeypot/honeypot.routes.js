const express = require('express')
const router = express.Router();

const { honeypotMasterController } = require('../../controllers/evm/honeypot.controller');

router.post("/honeypot-checks", honeypotMasterController);

module.exports = router;
