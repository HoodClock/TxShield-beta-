const express = require("express");
const router = express.Router();

const aiModelController = require("../../controllers/suggestion.controller");

router.post("/generate-recommendation", aiModelController);

module.exports = router;
