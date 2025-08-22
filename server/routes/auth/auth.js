const express = require('express')
const {v4: uuidv4} = require('uuid')
const db = require("../../config/db")
const {ethers} = require('ethers')

const router = express.Router();

router.post('/connect', (req, res)=> {
    const {wallet, signature} = req.body

    if (!wallet || !signature) {
        return res.status(400).json({ error: "Wallet and signature required" });
    }

    // verification signatures
    const message = "They can't exploit you if you are the exploit"
    const recovered = ethers.verifyMessage(message, signature)

    if (recovered.toLowerCase() !== wallet.toLowerCase()) {
        return res.status(401).json({ error: "Signature verification failed" });
    }

    // check if wallet have already api key
    db.get("SELECT * FROM api_keys WHERE wallet = ?", [wallet], (err, row)=> {
        if (err) return res.status(500).json({ error: "DB error" });

        // if wallet has already api key
        if (row){
            return res.json({apiKey: row.apiKey})
        }

        // if not -> generate new one using uuidv4 with now date
        const apiKey = uuidv4();
        const createdAt = new Date().toISOString();

        // now insert into database
        db.run(
            "INSERT INTO api_keys (wallet, apiKey, createdAt) VALUES (?, ?, ?)",
            [wallet, apiKey, createdAt],
            function(err){
                if (err) return res.status(500).json({error: "DB insertion error"})
                res.json({apiKey})        
            }
        )
    })
})

module.exports = router;