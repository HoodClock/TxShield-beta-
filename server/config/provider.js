const { ethers } = require("ethers");
const { Connection } = require("@solana/web3.js");
require("dotenv").config();

const EVM_NETWORKS = {
  1: { name: "Ethereum", rpcUrl: process.env.ETH_MAINNET_NET_URL },
  56: { name: "BNB", rpcUrl: process.env.BNB_MAINNET_NET_URL },
  8453: { name: "Base", rpcUrl: process.env.BASE_MAINNET_NET_URL },
  42161: { name: "Arbitrum", rpcUrl: process.env.ARBITRUM_MAINNET_NET_URL },
};

const decideChains = (chainId) => {
  // Handle Solana
  if (chainId === "SOL") {
    const solRpcUrl = process.env.SOL_MAINET_NET_URL || "https://api.mainnet-beta.solana.com";
    return new Connection(solRpcUrl, "confirmed");
  }

  // Handle EVM
  const config = EVM_NETWORKS[Number(chainId)];

  if (!config) {
    throw new Error(`Unsupported Chain: ${chainId}`);
  }

  return {
    name: config.name,
    provider: new ethers.JsonRpcProvider(config.rpcUrl),
    rpcUrl: config.rpcUrl,
  };
};

module.exports = { decideChains };
