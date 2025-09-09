const { ethers } = require("ethers")
require("dotenv").config()


const decideChains = (chain) => {
    switch (chain) {
        case "ETH":
            return new ethers.JsonRpcProvider(process.env.ETH_MAINNET_NET_URL);

        case "BNB":
            return new ethers.JsonRpcProvider(process.env.BNB_MAINNET_NET_URL);
        
        default: 
            throw new Error ("Unsupported Chain")
    }
}

module.exports = { decideChains };