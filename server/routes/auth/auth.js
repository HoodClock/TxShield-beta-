/**
 *  for Devs:
 * What this router file does: generates & reterives api keys
 * @deprecated: the current code was not compatible with our new POSTGRE_SQL so i remove it
 * @description: middleware to authticate request for api_key and store in database
 * @todo update to use POSTGRE_SQL
 * @async
 * @param {wallet, signature} = req.body
 * -> check if wallet & signature exists in req.body otherwise throw error right away
 * -> verify signature against wallet address
 *      => const message = "They can't exploit you if you are the exploit"
 * -> check if wallet already have a apiKey exists in database if not throw error right away || if exists [Key already exists]
 * -> if apiKey does not exist, insert it into the database
 * @generator -> const apikey = 'txs' + crypto.randomBytes(32).toString("hex");
 * -> after generating apikey apply query to insert into database (right now no payment so all apiKeys are free for every user)
 *
 * THEN MAKE ANOTHER ROUTE
 * @router GET /apikey/:wallet
 * -> check if wallet exists in database and return apiKey if not throw error right away
 * -> otherwise select apiKey from database and return it
 */

const express = require("express");
const { ethers } = require("ethers");
const crypto = require("crypto");
const pool = require("../../config/db");
const router = express.Router();

module.exports = router;
