const { ethers } = require("ethers");
const { Connection } = require("@solana/web3.js");
require("dotenv").config();

const decideChains = (chain) => {
  switch (chain) {
    case "ETH":
      return new ethers.JsonRpcProvider(process.env.ETH_MAINNET_NET_URL);

    case "BNB":
      return new ethers.JsonRpcProvider(process.env.BNB_MAINNET_NET_URL);

    case "SOL":
      return new Connection(process.env.SOL_MAINET_NET_URL, "confirmed");

    default:
      throw new Error("Unsupported Chain");
  }
};

module.exports = { decideChains };
