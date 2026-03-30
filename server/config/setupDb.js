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
