const express = require("express");
const { ethers } = require("ethers");
const crypto = require("crypto");
const pool = require("../../config/db");
const router = express.Router();

const SIGNATURE_MESSAGE = "They can't exploit you if you are the exploit";

// Generate API Key
router.post("/", async (req, res) => {
    try {
        const { wallet, signature } = req.body;
        if (!wallet || !signature) {
            return res.status(400).json({ error: "Wallet address and signature are required" });
        }

        // Verify signature
        const recoveredAddress = ethers.verifyMessage(SIGNATURE_MESSAGE, signature);
        if (recoveredAddress.toLowerCase() !== wallet.toLowerCase()) {
            return res.status(401).json({ error: "Invalid signature" });
        }

        // Check if API key already exists for this wallet
        const checkQuery = "SELECT api_key FROM api_keys WHERE wallet = $1";
        const checkResult = await pool.query(checkQuery, [wallet]);

        if (checkResult.rows.length > 0) {
            // Already has an active key, return it
            return res.status(200).json({ apiKey: checkResult.rows[0].api_key, message: "Key already exists" });
        }

        // Generate and insert new api key
        const apiKey = 'txs' + crypto.randomBytes(32).toString("hex");
        const insertQuery = "INSERT INTO api_keys (api_key, wallet) VALUES ($1, $2) RETURNING api_key";
        await pool.query(insertQuery, [apiKey, wallet]);

        return res.status(201).json({ apiKey, message: "API key generated successfully" });
    } catch (error) {
        console.error("Error generating API key:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Retrieve API Key
router.get("/apikey/:wallet", async (req, res) => {
    try {
        const { wallet } = req.params;
        if (!wallet) {
            return res.status(400).json({ error: "Wallet parameter is required" });
        }

        const query = "SELECT api_key FROM api_keys WHERE wallet = $1";
        const result = await pool.query(query, [wallet]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No API key found for this wallet" });
        }

        return res.status(200).json({ apiKey: result.rows[0].api_key });
    } catch (error) {
        console.error("Error fetching API key:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
