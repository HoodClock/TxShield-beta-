const redis = require('redis');
require('dotenv').config();

// Retrieve environment variables
const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const REDIS_DB = process.env.REDIS_DB || 0;

// Configure the client
const client = redis.createClient({
    url: REDIS_URL,
    database: REDIS_DB, // Selects the Redis database index (0 by default)
});

// Handle connection events
client.on('connect', () => {
    console.log(`[Redis] Connected successfully to DB ${REDIS_DB}`);
});

client.on('error', (err) => {
    console.error('[Redis] Connection Error:', err.message);
    // In a production environment, degrade service here
    // or set a flag that caching is currently unavailable.
});

// Connect to Redis upon module load
(async () => {
    try {
        await client.connect();
    } catch (error) {
        console.error('[Redis] Failed to connect on startup:', error.message);
    }
})();

module.exports = client;