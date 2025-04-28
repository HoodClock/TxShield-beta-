const {ethers} = require("ethers")

require("dotenv").config()


const provider = new ethers.JsonRpcProvider(process.env.ETH_MAINNET_NET_URL);

module.exports = provider;