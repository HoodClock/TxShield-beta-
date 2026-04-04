const pool = require("./db");

export async function setup() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS api_keys (
        id SERIAL PRIMARY KEY,
        api_key TEXT UNIQUE NOT NULL,
        wallet TEXT UNIQUE NOT NULL,
        tier TEXT DEFAULT 'free',
        request_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_used TIMESTAMP
      );
    `);

    console.log("DB READY");
  } catch (error) {
    console.error("Database setup failed:", error.message);
    throw error;
  }
}

setup();