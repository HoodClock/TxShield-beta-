const pool = require("./db");

/**
 * Initialize api_keys table: {id, api_key, wallet, tier, request_count, created_at, last_used}
 */
const setup = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS api_keys (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        api_key VARCHAR(255) UNIQUE NOT NULL,
        wallet VARCHAR(42) NOT NULL,
        tier VARCHAR(50) DEFAULT 'free',
        request_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_used TIMESTAMP
      );
    `;
    await pool.query(query);
    console.log("DB READY: api_keys table initialized.");
  } catch (error) {
    console.error("Database connection failed", error);
    throw error;
  }
};

// Run if called directly
if (require.main === module) {
  setup().finally(() => process.exit());
}

module.exports = setup;
