const redis = require('redis');
require('dotenv').config();

// Retrieve environment variables
const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const REDIS_DB = process.env.REDIS_DB || 0;

// Configure the client
const client = redis.createClient({
    url: REDIS_URL,
    database: REDIS_DB,
    socket: {
        // Stop reconnecting after a few tries to avoid terminal spam if Redis is missing
        reconnectStrategy: (retries) => {
            if (retries > 5) {
                console.warn('[Redis] Max retries reached. Caching will be disabled.');
                return new Error('Redis connection failed'); 
            }
            return Math.min(retries * 100, 2000);
        },
        connectTimeout: 5000
    }
});

// Handle connection events
client.on('connect', () => {
    console.log(`[Redis] Connected successfully to DB ${REDIS_DB}`);
});

client.on('error', (err) => {
    // Only log if it's not the final retry error to reduce noise
    if (err.message !== 'Redis connection failed') {
        console.error('[Redis] Connection Warning:', err.message);
    }
});

// Monkey-patch get/set to be safe when disconnected
const originalGet = client.get.bind(client);
const originalSet = client.set.bind(client);

client.get = async (...args) => {
    if (!client.isOpen) return null;
    try {
        return await originalGet(...args);
    } catch (err) {
        return null;
    }
};

client.set = async (...args) => {
    if (!client.isOpen) return null;
    try {
        return await originalSet(...args);
    } catch (err) {
        return null;
    }
};

// Connect to Redis upon module load
(async () => {
    try {
        await client.connect();
    } catch (error) {
        // Safe to ignore here as the error listener handles logging
        // and the patched methods handle the 'closed' state
    }
})();

module.exports = client;