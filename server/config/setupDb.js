const pool = require("./db");

/**
 * for devs:
 * @async
 * @function -> "your function name here"
 * @description Initialize api_keys table: {id, api_key, wallet, tier, request_count, created_at, last_used}
 * @returns {Promise<void>} -> using pool here from ./db.js {@example -> pool.query("your query")} with await returns void
 * @todo call a funciton simply at the end -> {setup}
 * @throws {Error} Database connection failed
 * @example await setup(); // logs "DB READY"
 * @todo run this file once on server startup in terminal -> @example {node ./location of this file }
 */

async function setup() {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS api_keys (
      id SERIAL PRIMARY KEY,
      api_key VARCHAR(255) UNIQUE NOT NULL,
        wallet VARCHAR(255) NOT NULL,
        tier VARCHAR(50) NOT NULL,
        request_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_used TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    console.log("DB IS READY");
  } catch (err) {
    console.error("Database connection failed:", err);
    throw new Error("Database connection failed");
  }
}

module.exports = setup;