const { ethers } = require("ethers");
const axios = require("axios");
const provider = require("../config/provider");

const COIN_GECKO_NAME_SYMBOL_API = process.env.COIN_GECKO_NAME_SYMBOL_API;
const COIN_GECKO_SEPECIFIC_ID = process.env.COIN_GECKO_SEPECIFIC_ID;


const ERC20_ABI = [
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
];


async function getTokenMeta(address) {
    let symbol = "UNKNOWN";
    let decimals = 18;
  
    try {
      const contract = new ethers.Contract(address, ERC20_ABI, provider);
  
      try {
        symbol = await contract.symbol();
      } catch (_) {
        symbol = "UNKNOWN";
      }
  
      try {
        decimals = await contract.decimals();
      } catch (_) {
        decimals = 18;
      }
  
      // If both succeeded, return early
      if (symbol !== "UNKNOWN") {
        return { symbol, decimals };
      }
    } catch (_) {

    }
  
    // CoinGecko fallback
    try {
      const listResp = await axios.get(COIN_GECKO_NAME_SYMBOL_API);
      const tokenList = listResp.data;
  
      const token = tokenList.find(
        (t) =>
          t.platforms &&
          t.platforms.ethereum &&
          t.platforms.ethereum.toLowerCase() === address.toLowerCase()
      );
  
      if (!token || !token.id) return { symbol, decimals };
  
      const metaResp = await axios.get(
        COIN_GECKO_SEPECIFIC_ID.replace("{id}", token.id)
      );
  
      const tokenMeta = metaResp.data;
  
      if (tokenMeta.symbol) {
        symbol = tokenMeta.symbol.toUpperCase();
      }
  
      const cgDecimals =
        tokenMeta.detail_platforms?.ethereum?.decimals ?? null;
  
      if (cgDecimals !== null) {
        decimals = cgDecimals;
      }
  
      return { symbol, decimals };

    } catch (_) {
      return { symbol, decimals };
    }
  }

module.exports = {getTokenMeta};