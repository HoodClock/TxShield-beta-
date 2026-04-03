/**
 * Middleware to authenticate request for api_key and store in database
 * @async
 * @param {wallet} = req.headers
 * @function @async authMiddleware(req, res, next)
 * const origin = req.headers.origin then
 * -> Allow all origins (cors) just like in the server.js (just copy paste that here)
 * -> check if apiKey exists in database and attach wallet info to request if not throw error right away (using sql {pool.query})
 * @constant fetch req.[wallet,tier,apikey]
 * -> update last_used timestamp using sql {pool.query}
 * -> at last use "next()" to pass control to the next middleware
 */

const pool = require("../config/db");

async function authMiddleware(req, res, next) {

    const origin = req.headers.origin;
    const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://txshield.xyz",
        "https://www.txshield.xyz",
        /\.vercel\.app$/, // This Regex allows ANY Vercel preview or production branch
    ];

    if (origin && !allowedOrigins.some((allowed) => {
        if (allowed instanceof RegExp) return allowed.test(origin);
        return allowed === origin;
    })) {
        return res.status(403).json({ error: "Origin not allowed" });
    }

    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
        return res.status(401).json({ error: "API key is missing" });
    }

    try {
        const result = await pool.query(
            "SELECT * FROM api_keys WHERE api_key = $1",
            [apiKey]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid API key" });
        }

        const api_key_data = result.rows[0];
        req.api_key_data = api_key_data;

        // Update last_used timestamp
        await pool.query(
            "UPDATE api_keys SET last_used = CURRENT_TIMESTAMP WHERE id = $1",
            [api_key_data.id]
        );

    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }

    next();
}

module.exports = authMiddleware;
