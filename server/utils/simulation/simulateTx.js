const provider = require("../../config/provider");
const { ethers } = require("ethers");
const { isContract } = require("../../services/etherscanService");
const axios = require("axios");

const coinkGeckoUsd = process.env.COINGECKO_API_USD;

async function fetchPrices(ids = ["ethereum"], vs = ["usd"]) {
  const resp = await axios.get(coinkGeckoUsd, {
    params: { ids: ids.join(","), vs_currencies: vs.join(",") },
  });
  return resp.data;
}

// Smart formatter
const fmt = (val, decimals = 6) => {
  const num = parseFloat(val);
  if (isNaN(num)) return val;
  if (num === 0) return "0";
  if (num < 0.000001) return "< 0.000001";
  return Number(num.toFixed(decimals)).toLocaleString();
};

const simulateTransfer = async (userAddress, recipientAddress, amount) => {
  try {
    if (!ethers.isAddress(userAddress)) throw new Error("Invalid user address");
    if (!ethers.isAddress(recipientAddress)) throw new Error("Invalid recipient address");
    if (isNaN(parseFloat(amount))) throw new Error("Invalid amount");

    const recipientIsContract = await isContract(recipientAddress);
    let transferType = "eth";
    let tokenContract = null;
    let decimals = 18;
    let tokenId = null;

    if (recipientIsContract) {
      try {
        tokenContract = new ethers.Contract(
          recipientAddress,
          [
            "function balanceOf(address) view returns (uint256)",
            "function symbol() view returns (string)",
            "function decimals() view returns (uint8)",
            "function transfer(address,uint256) returns (bool)",
          ],
          provider
        );

        const [symbol, decimalUnits] = await Promise.all([
          tokenContract.symbol(),
          tokenContract.decimals(),
        ]);

        if (symbol && decimalUnits) {
          transferType = "erc20";
          decimals = decimalUnits;
          tokenId = symbol.toLowerCase();
        }
      } catch {}
    }

    const value = ethers.parseUnits(amount, decimals);
    const tx = {
      from: userAddress,
      to: recipientAddress,
      value: transferType === "eth" ? value : 0n,
      data:
        transferType === "erc20"
          ? tokenContract.interface.encodeFunctionData("transfer", [recipientAddress, value])
          : "0x",
    };

    const [gasEstimate, feeData, senderBalance, recipientBalance] = await Promise.all([
      provider.estimateGas(tx).catch(() => (transferType === "eth" ? 21000n : 100000n)),
      provider.getFeeData(),
      provider.getBalance(userAddress),
      provider.getBalance(recipientAddress),
    ]);

    const gasPrice = feeData.gasPrice || feeData.maxFeePerGas || 0n;
    const gasCost = gasEstimate * gasPrice;

    const sufficientEth = senderBalance >= (transferType === "eth" ? value + gasCost : gasCost);
    const tokenBalance = transferType === "erc20" ? await tokenContract.balanceOf(userAddress) : 0n;
    const sufficientTokens = transferType !== "erc20" || tokenBalance >= value;

    const ids = ["ethereum"];
    if (tokenId) ids.push(tokenId);
    const prices = await fetchPrices(ids, ["usd"]);
    const ethUsd = prices["ethereum"].usd;
    const tokenUsd = tokenId ? prices[tokenId]?.usd ?? 0 : 0;

    const result = {
      success: sufficientEth && sufficientTokens,
      transferType,
      from: userAddress,
      to: recipientAddress,
      amount: `${fmt(ethers.formatUnits(value, decimals))} ${
        transferType === "erc20" ? await tokenContract.symbol() : "ETH"
      }`,
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
            token:
              transferType === "erc20"
                ? fmt(ethers.formatUnits(tokenBalance, decimals))
                : null,
            tokenUsd:
              transferType === "erc20"
                ? fmt(parseFloat(ethers.formatUnits(tokenBalance, decimals)) * tokenUsd)
                : null,
          },
          after: {
            eth: fmt(
              ethers.formatEther(senderBalance - (transferType === "eth" ? value + gasCost : gasCost))
            ),
            ethUsd: fmt(
              parseFloat(
                ethers.formatEther(senderBalance - (transferType === "eth" ? value + gasCost : gasCost))
              ) * ethUsd
            ),
            token:
              transferType === "erc20"
                ? fmt(ethers.formatUnits(tokenBalance - value, decimals))
                : null,
            tokenUsd:
              transferType === "erc20"
                ? fmt(
                    parseFloat(ethers.formatUnits(tokenBalance - value, decimals)) * tokenUsd
                  )
                : null,
          },
        },
        recipient: {
          before: {
            eth: fmt(ethers.formatEther(recipientBalance)),
            ethUsd: fmt(parseFloat(ethers.formatEther(recipientBalance)) * ethUsd),
            token:
              transferType === "erc20"
                ? fmt(ethers.formatUnits(await tokenContract.balanceOf(recipientAddress), decimals))
                : null,
            tokenUsd:
              transferType === "erc20"
                ? fmt(
                    parseFloat(
                      ethers.formatUnits(await tokenContract.balanceOf(recipientAddress), decimals)
                    ) * tokenUsd
                  )
                : null,
          },
          after: {
            eth: fmt(
              ethers.formatEther(recipientBalance + (transferType === "eth" ? value : 0n))
            ),
            ethUsd: fmt(
              parseFloat(
                ethers.formatEther(recipientBalance + (transferType === "eth" ? value : 0n))
              ) * ethUsd
            ),
            token:
              transferType === "erc20"
                ? fmt(
                    ethers.formatUnits(
                      (await tokenContract.balanceOf(recipientAddress)) + value,
                      decimals
                    )
                  )
                : null,
            tokenUsd:
              transferType === "erc20"
                ? fmt(
                    parseFloat(
                      ethers.formatUnits(
                        (await tokenContract.balanceOf(recipientAddress)) + value,
                        decimals
                      )
                    ) * tokenUsd
                  )
                : null,
          },
        },
      },
      warnings: [],
    };

    if (!sufficientEth)
      result.warnings.push("Insufficient ETH for gas + transfer");
    if (!sufficientTokens)
      result.warnings.push("Sender has insufficient token balance for transfer.");
    if (recipientAddress === ethers.ZeroAddress)
      result.warnings.push("Transfer to zero address");

    return result;
  } catch (error) {
    return {
      success: false,
      error: error.message,
      reason:
        error.code === "INSUFFICIENT_FUNDS"
          ? "insufficient_balance"
          : error.message.includes("revert")
          ? "contract_reverted"
          : "simulation_error",
    };
  }
};

module.exports = simulateTransfer;
