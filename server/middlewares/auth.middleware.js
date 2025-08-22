const db = require('../config/db')

function authMidlleware(req, res, next){

    // extracting the authorization from the header
    const authHeader = req.header["authorization"]

    if (!authHeader) return res.status(401).json({ error: "Missing Authorization header" });

    // Bearer <APIKEY>
    const token = authHeader.split(" ")[1]; 
    if (!token) return res.status(401).json({ error: "Invalid Authorization format" });

    db.get("SELECT * FROM api_keys WHERE apiKey = ?", [token], (err, row)=> {
        if (err) return res.status(500).json({ error: "DB error" });
        if (!row) return res.status(403).json({ error: "Invalid API key" });

        // attach wallet info to request for later use if needed
        req.wallet = row.wallet;
        next();
    })
}

module.exports = authMidlleware;
