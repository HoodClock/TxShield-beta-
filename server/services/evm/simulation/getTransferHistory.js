const axios = require("axios");

const EXPLORER_CONFIG = {
  1: {
    url: "https://api.etherscan.io/api",
    key: process.env.ETHERSCAN_API_KEY,
  },
  56: {
    url: "https://api.bscscan.com/api",
    key: process.env.ETHERSCAN_API_KEY,
  },
  8453: {
    url: "https://api.basescan.org/api",
    key: process.env.ETHERSCAN_API_KEY,
  },
  42161: {
    url: "https://api.arbiscan.io/api",
    key: process.env.ETHERSCAN_API_KEY,
  },
};

function formatTimestamp(ts) {
  const date = new Date(parseInt(ts, 10) * 1000);
  return date.toLocaleString("en-US", { timeZone: "UTC" });
}

const getTransferHistory = async (targetAddress, chainId) => {
  try {
    const explorer = EXPLORER_CONFIG[Number(chainId)];
    if (!explorer || !explorer.key) {
      // If we don't have an API key for this chain, fail gracefully
      return {
        success: false,
        activityPulse: "Unknown (Explorer Not Configured)",
      };
    }

    // Fetch ERC-20 token transfers
    const response = await axios.get(explorer.url, {
      params: {
        module: "account",
        action: "tokentx",
        contractaddress: targetAddress, // Look for transfers OF this token
        page: 1,
        offset: 50, // Get a larger sample size to determine activity
        sort: "desc",
        apikey: explorer.key,
      },
    });

    const transfers = response.data.result;

    if (response.data.status !== "1" || !transfers || transfers.length === 0) {
      return {
        success: true,
        activityPulse: "Dead / No Activity",
        message:
          "No recent token transfers found. If this is a new token, no one is trading it.",
        recentTransfers: [],
      };
    }

    // Analyze the pulse of the token
    const latestTxTime = parseInt(transfers[0].timeStamp, 10);
    const currentTime = Math.floor(Date.now() / 1000);
    const timeSinceLastTx = currentTime - latestTxTime;

    let activityPulse = "Active";
    if (timeSinceLastTx < 3600) {
      // Under 1 hour
      activityPulse = "Highly Active (Hot)";
    } else if (timeSinceLastTx > 86400 * 7) {
      // Over 7 days
      activityPulse = "Abandoned / Dead";
    }

    // Count unique addresses interacting with it
    const uniqueWallets = new Set();
    transfers.forEach((tx) => {
      uniqueWallets.add(tx.from);
      uniqueWallets.add(tx.to);
    });

    // Format top 5 for the frontend to show a quick preview
    const recentSample = transfers.slice(0, 5).map((tx) => ({
      hash: tx.hash,
      from: `${tx.from.substring(0, 6)}...${tx.from.substring(38)}`,
      to: `${tx.to.substring(0, 6)}...${tx.to.substring(38)}`,
      date: formatTimestamp(tx.timeStamp),
    }));

    return {
      success: true,
      activityPulse,
      summary: {
        totalAnalyzed: transfers.length,
        uniqueWalletsInteracting: uniqueWallets.size,
        lastTrade: formatTimestamp(latestTxTime),
      },
      recentSample,
    };
  } catch (err) {
    console.error("Transfer History Error:", err.message);
    return { success: false, error: "Failed to fetch on-chain history." };
  }
};

module.exports = { getTransferHistory };
