const sqlite3 = require('sqlite3').verbose();

// connect or create db
const db = new sqlite3.Database('../txshield.db', (err) => {
    if (err) {
        console.error('SQLite connection shows an error : ', err);
    } else {
        console.log('Successfully connected to database ✅');
    }
})

// creating table if not yet
db.run(`CREATE TABLE IF NOT EXISTS api_keys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    wallet TEXT UNIQUE,
    apiKey TEXT,
    createdAt TEXT
)`);

module.exports = db;
