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

async function authMiddleware(req, res, next) {}

module.exports = authMiddleware;
