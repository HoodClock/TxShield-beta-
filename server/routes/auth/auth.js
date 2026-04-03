/**
 *  for Devs:
 * What this router file does: generates & reterives api keys
 * @deprecated: the current code was not compatible with our new POSTGRE_SQL so i remove it
 * @description: middleware to authticate request for api_key and store in database
 * @todo update to use POSTGRE_SQL
 * @async
 * @param {wallet, signature} = req.body
 * -> check if wallet & signature exists in req.body otherwise throw error right away
 * -> verify signature against wallet address
 *      => const message = "They can't exploit you if you are the exploit"
 * -> check if wallet already have a apiKey exists in database if not throw error right away || if exists [Key already exists]
 * -> if apiKey does not exist, insert it into the database
 * @generator -> const apikey = 'txs' + crypto.randomBytes(32).toString("hex");
 * -> after generating apikey apply query to insert into database (right now no payment so all apiKeys are free for every user)
 *
 * THEN MAKE ANOTHER ROUTE
 * @router GET /apikey/:wallet
 * -> check if wallet exists in database and return apiKey if not throw error right away
 * -> otherwise select apiKey from database and return it
 */

const express = require("express");
const { ethers } = require("ethers");
const crypto = require("crypto");
const pool = require("../../config/db");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth.middleware");


router.post("/generate", async (req, res) => {
  try {
    const { wallet, signature } = req.body;

    if (!wallet || !signature) {
      return res.status(400).json({ error: "Wallet and signature are required" });
    }

    const message = "They can't exploit you if you are the exploit";

    const signerAddress = ethers.verifyMessage(message, signature);

    if (signerAddress.toLowerCase() !== wallet.toLowerCase()) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    const existingKey = await pool.query("SELECT api_key FROM api_keys WHERE wallet = $1", [wallet]);

    if (existingKey.rows.length > 0) {
      return res.status(400).json({ error: "API key already exists for this wallet" });
    }

    const apiKey = "txs" + crypto.randomBytes(32).toString("hex");

    await pool.query("INSERT INTO api_keys (wallet, api_key) VALUES ($1, $2)", [wallet, apiKey]);

    res.json({ apiKey });

} catch (error) {
    console.error("Error generating API key:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/apikey/:wallet", authMiddleware,async (req, res) => {
  try {
    const { wallet } = req.params;

    const result = await pool.query("SELECT api_key FROM api_keys WHERE wallet = $1", [wallet]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "API key not found for this wallet" });
    }

    res.json({ apiKey: result.rows[0].api_key });
    } catch (error) {
    console.error("Error retrieving API key:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
