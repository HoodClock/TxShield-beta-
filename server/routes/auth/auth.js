const express = require("express");
const { ethers } = require("ethers");
const crypto = require("crypto");
const pool = require("../../config/db");
const router = express.Router();

const SIGNATURE_MESSAGE = "They can't exploit you if you are the exploit";

// POST /auth/connect — Generate API Key (one-time only)
router.post("/connect", async (req, res) => {
  try {
    const { wallet, signature } = req.body;
    if (!wallet || !signature) {
      return res
        .status(400)
        .json({ error: "Wallet address and signature are required" });
    }

    const recoveredAddress = ethers.verifyMessage(SIGNATURE_MESSAGE, signature);
    if (recoveredAddress.toLowerCase() !== wallet.toLowerCase()) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    const checkResult = await pool.query(
      "SELECT api_key FROM api_keys WHERE wallet = $1",
      [wallet]
    );

    if (checkResult.rows.length > 0) {
      return res.status(400).json({
        error:
          "API key already exists for this wallet. Delete the existing key first to generate a new one.",
      });
    }

    const apiKey = "txs_" + crypto.randomBytes(32).toString("hex");
    await pool.query(
      "INSERT INTO api_keys (api_key, wallet, tier) VALUES ($1, $2, $3)",
      [apiKey, wallet, "free"]
    );

    return res.status(201).json({
      apiKey,
      message: "API key generated successfully.",
      warning:
        "Save this key now — it will NOT be shown again. Store it somewhere safe.",
    });
  } catch (error) {
    console.error("Error generating API key:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET /auth/apikey/:wallet — Check key status (returns masked key, NOT the full key)
router.get("/apikey/:wallet", async (req, res) => {
  try {
    const { wallet } = req.params;
    if (!wallet) {
      return res.status(400).json({ error: "Wallet parameter is required" });
    }

    const result = await pool.query(
      "SELECT api_key, tier, created_at, last_used FROM api_keys WHERE wallet = $1",
      [wallet]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ hasKey: false });
    }

    const { api_key, tier, created_at, last_used } = result.rows[0];
    const maskedKey =
      api_key.slice(0, 7) + "****************************" + api_key.slice(-4);

    return res.status(200).json({
      hasKey: true,
      maskedKey,
      apiKey: maskedKey,
      tier,
      created_at,
      last_used,
    });
  } catch (error) {
    console.error("Error fetching API key:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /auth/apikey/:wallet — Delete API Key (requires signature verification)
router.delete("/apikey/:wallet", async (req, res) => {
  try {
    const { wallet } = req.params;
    const { signature } = req.body;

    if (!wallet || !signature) {
      return res
        .status(400)
        .json({ error: "Wallet and signature are required" });
    }

    const recoveredAddress = ethers.verifyMessage(SIGNATURE_MESSAGE, signature);
    if (recoveredAddress.toLowerCase() !== wallet.toLowerCase()) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    const result = await pool.query(
      "DELETE FROM api_keys WHERE wallet = $1 RETURNING api_key",
      [wallet]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No API key found for this wallet" });
    }

    return res.status(200).json({ message: "API key deleted successfully" });
  } catch (error) {
    console.error("Error deleting API key:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
