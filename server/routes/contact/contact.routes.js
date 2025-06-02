const express = require("express");
const router = express.Router();
const contactController = require("../../controllers/contact.controller");

router.post("/connect", contactController.sendMessage);

module.exports = router;