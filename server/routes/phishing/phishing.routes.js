const express = require("express");
const router = express.Router();

const masterPhishingController = require("../../controllers/evm/phishing.controller")

router.post("/phishing-checks", masterPhishingController);

module.exports = router;