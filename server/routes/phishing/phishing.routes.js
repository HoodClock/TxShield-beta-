const express = require("express");
const router = express.Router();

const phishingControl = require("../../controllers/phishing.controller");

router.post("/phishing-checks", phishingControl.masterPhishingController);

module.exports = router;