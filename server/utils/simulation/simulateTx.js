const provider = require("../../config/provider");
const { ethers } = require("ethers");
const { isContract } = require("../../services/etherscanService");
const { getTokenMeta } = require("../../services/getTokenMetaService");
const axios = require("axios");
require("dotenv").config();


const coinkGeckoUsd = process.env.COINGECKO_API_USD;

async function fetchPrices(ids = ["ethereum"], vs = ["usd"]) {
  if (!coinkGeckoUsd) throw new Error("COINGECKO_API_USD is missing!");
  const resp = await axios.get(coinkGeckoUsd, {
    params: { ids: ids.join(","), vs_currencies: vs.join(",") },
  });
  return resp.data;
}

const fmt = (val, decimals = 6) => {
  if (typeof val === "bigint") val = val.toString();
  const num = parseFloat(val);
  if (isNaN(num)) return val.toString();
  if (num === 0) return "0";
  if (num < 0.000001) return "< 0.000001";
  return Number(num.toFixed(decimals)).toLocaleString();
};

const safeJson = (obj) =>
  JSON.parse(JSON.stringify(obj, (_, v) => (typeof v === 'bigint' ? v.toString() : v)));

const simulateTransfer = async (userAddress, recipientAddress, amount, currency) => {
  try {
    if (!ethers.isAddress(userAddress)) throw new Error("Invalid user address");
    if (!ethers.isAddress(recipientAddress)) throw new Error("Invalid recipient address");
    if (isNaN(parseFloat(amount))) throw new Error("Invalid amount");

    let transferType = "eth";
    let tokenContract = null;
    let decimals = 18;
    let tokenId = "ethereum";

    if (currency && currency !== "ETH") {
      tokenContract = new ethers.Contract(currency, [
        "function balanceOf(address) view returns (uint256)",
        "function symbol() view returns (string)",
        "function decimals() view returns (uint8)",
        "function transfer(address,uint256) returns (bool)"
      ], provider);
      const meta = await getTokenMeta(currency);
      decimals = Number(meta.decimals);
      tokenId = meta.symbol.toLowerCase();
      transferType = "erc20";
    }

    const recipientIsContract = await isContract(recipientAddress);
    if (!tokenContract && recipientIsContract && currency !== "ETH") {
      tokenContract = new ethers.Contract(recipientAddress, [
        "function balanceOf(address) view returns (uint256)",
        "function symbol() view returns (string)",
        "function decimals() view returns (uint8)",
        "function transfer(address,uint256) returns (bool)"
      ], provider);
      const meta = await getTokenMeta(recipientAddress);
      decimals = Number(meta.decimals);
      tokenId = meta.symbol.toLowerCase();
      transferType = "erc20";
    }

    const value = ethers.parseUnits(amount, decimals);

    const tx = {
      from: userAddress,
      to: recipientAddress,
      value: transferType === "eth" ? value : 0n,
      data: transferType === "erc20"
        ? tokenContract.interface.encodeFunctionData("transfer", [recipientAddress, value])
        : "0x"
    };

    const [gasEstimate, feeData, senderBalance, recipientBalance] = await Promise.all([
      provider.estimateGas(tx).catch(() => (transferType === "eth" ? 21000n : 100000n)),
      provider.getFeeData(),
      provider.getBalance(userAddress),
      provider.getBalance(recipientAddress)
    ]);

    const gasPrice = feeData.gasPrice || feeData.maxFeePerGas || 0n;
    const gasCost = gasEstimate * gasPrice;

    const sufficientEth = senderBalance >= (transferType === "eth" ? value + gasCost : gasCost);
    const tokenBalance = transferType === "erc20"
      ? await tokenContract.balanceOf(userAddress)
      : 0n;
    const recipientTokenBalance = transferType === "erc20"
      ? await tokenContract.balanceOf(recipientAddress)
      : 0n;
    const sufficientTokens = transferType !== "erc20" || tokenBalance >= value;

    const ids = ["ethereum"];
    if (tokenId !== "ethereum") ids.push(tokenId);
    const prices = await fetchPrices(ids, ["usd"]);

    const ethUsd = prices["ethereum"]?.usd ?? 0;
    const tokenUsd = tokenId !== "ethereum" ? prices[tokenId]?.usd ?? 0 : 0;

    const result = {
      success: sufficientEth && sufficientTokens,
      transferType,
      from: userAddress,
      to: recipientAddress,
      amount: `${fmt(ethers.formatUnits(value, decimals))} ${transferType === "erc20" ? tokenId.toUpperCase() : "ETH"}`,
      gas: {
        estimated: fmt(gasEstimate),
        priceGwei: fmt(ethers.formatUnits(gasPrice, "gwei")),
        costEth: fmt(ethers.formatUnits(gasCost, "ether")),
        costUsd: fmt(Number(ethers.formatUnits(gasCost, "ether")) * ethUsd),
      },
      balances: {
        sender: {
          before: {
            eth: fmt(ethers.formatEther(senderBalance)),
            ethUsd: fmt(parseFloat(ethers.formatEther(senderBalance)) * ethUsd),
            token: transferType === "erc20"
              ? fmt(ethers.formatUnits(tokenBalance, decimals))
              : null,
            tokenUsd: transferType === "erc20"
              ? fmt(parseFloat(ethers.formatUnits(tokenBalance, decimals)) * tokenUsd)
              : null
          },
          after: {
            eth: fmt(ethers.formatEther(senderBalance - (transferType === "eth" ? value + gasCost : gasCost))),
            ethUsd: fmt(parseFloat(ethers.formatEther(senderBalance - (transferType === "eth" ? value + gasCost : gasCost))) * ethUsd),
            token: transferType === "erc20"
              ? fmt(ethers.formatUnits(tokenBalance - value, decimals))
              : null,
            tokenUsd: transferType === "erc20"
              ? fmt(parseFloat(ethers.formatUnits(tokenBalance - value, decimals)) * tokenUsd)
              : null
          }
        },
        recipient: {
          before: {
            eth: fmt(ethers.formatEther(recipientBalance)),
            ethUsd: fmt(parseFloat(ethers.formatEther(recipientBalance)) * ethUsd),
            token: transferType === "erc20"
              ? fmt(ethers.formatUnits(recipientTokenBalance, decimals))
              : null,
            tokenUsd: transferType === "erc20"
              ? fmt(parseFloat(ethers.formatUnits(recipientTokenBalance, decimals)) * tokenUsd)
              : null
          },
          after: {
            eth: fmt(ethers.formatEther(recipientBalance + (transferType === "eth" ? value : 0n))),
            ethUsd: fmt(parseFloat(ethers.formatEther(recipientBalance + (transferType === "eth" ? value : 0n))) * ethUsd),
            token: transferType === "erc20"
              ? fmt(ethers.formatUnits(recipientTokenBalance + value, decimals))
              : null,
            tokenUsd: transferType === "erc20"
              ? fmt(parseFloat(ethers.formatUnits(recipientTokenBalance + value, decimals)) * tokenUsd)
              : null
          }
        }
      },
      warnings: []
    };

    if (!sufficientEth) result.warnings.push("Insufficient ETH for gas + transfer");
    if (!sufficientTokens) result.warnings.push("Insufficient token balance");
    if (recipientAddress === ethers.ZeroAddress) result.warnings.push("Transfer to zero address");

    return safeJson(result);

  } catch (error) {
    return {
      success: false,
      error: error.message,
      reason:
        error.code === "INSUFFICIENT_FUNDS" ? "insufficient_balance" :
        error.message.includes("revert") ? "contract_reverted" :
        "simulation_error"
    };
  }
};

module.exports = simulateTransfer;
