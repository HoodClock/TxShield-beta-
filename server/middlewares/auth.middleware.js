const pool = require("../config/db");

async function authMiddleware(req, res, next) {
    try {
    const apiKey = req.headers["x-api-key"];
    const wallet = req.headers["wallet"];
    const origin = req.headers.origin;

    const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://txshield.xyz",
        "https://www.txshield.xyz",
        /\.vercel\.app$/, // This Regex allows ANY Vercel preview or production branch
    ];

    const isAllowed = allowedOrigins.some((allowed) => {
    if (allowed instanceof RegExp) {
        return allowed.test(origin);
    }
        return allowed === origin;
    });

    if (origin && !isAllowed) {
        return res.status(403).json({ error: "CORS: Origin not allowed" });
    }

        // Allow request
        res.setHeader("Access-Control-Allow-Origin", origin || "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-api-key, wallet");

        // Handle preflight
        if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    if (!apiKey || !wallet) {
        return res.status(401).json({ error: "Missing API key or wallet" });
    }

    // Check API key in DB
    const result = await pool.query(
        "SELECT * FROM api_keys WHERE api_key = $1 AND wallet = $2",
        [apiKey, wallet]
    );

    if (result.rows.length === 0) {
        return res.status(403).json({ error: "Invalid API key" });
    }

    const user = result.rows[0];

    // Attach user info to request
    req.wallet = user.wallet;
    req.tier = user.tier;
    req.apiKey = user.api_key;

    // Update last_used timestamp
    await pool.query(
        "UPDATE api_keys SET last_used = NOW() WHERE api_key = $1",
        [apiKey]
    );

    next();
  } catch (error) {
        console.error("Auth middleware error:", error.message);
        res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = authMiddleware;
