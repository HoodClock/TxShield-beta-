const express = require("express");
const { ethers } = require("ethers");
const crypto = require("crypto");
const pool = require("../../config/db");
const router = express.Router();

const MESSAGE = "They can't exploit you if you are the exploit";

/**
 * POST /auth
 * Generate API Key
 */
router.post("/auth", async (req, res) => {
  try {
    const { wallet, signature } = req.body;

    if (!wallet || !signature) {
      return res.status(400).json({ error: "Wallet and signature required" });
    }

    // Verify signature
    const recoveredAddress = ethers.verifyMessage(MESSAGE, signature);

    if (recoveredAddress.toLowerCase() !== wallet.toLowerCase()) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    // Check if API key already exists
    const existing = await pool.query(
      "SELECT * FROM api_keys WHERE wallet = $1",
      [wallet]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "API key already exists" });
    }

    // Generate API key
    const apiKey = "txs_" + crypto.randomBytes(32).toString("hex");

    // Insert into DB
    await pool.query(
      `INSERT INTO api_keys (api_key, wallet, tier) VALUES ($1, $2, $3)`,
      [apiKey, wallet, "free"]
    );

    return res.json({ apiKey });
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /apikey/:wallet
 * Retrieve API key
 */
router.get("/apikey/:wallet", async (req, res) => {
  try {
    const { wallet } = req.params;

    const result = await pool.query(
      "SELECT api_key FROM api_keys WHERE wallet = $1",
      [wallet]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    return res.json({ apiKey: result.rows[0].api_key });
  } catch (error) {
    console.error("Fetch API key error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
