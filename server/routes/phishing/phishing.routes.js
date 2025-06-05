const express = require("express");
const router = express.Router();

const {masterPhishingController} = require("../../controllers/phishing.controller");

router.post("/phishing-checks", masterPhishingController);

module.exports = router;