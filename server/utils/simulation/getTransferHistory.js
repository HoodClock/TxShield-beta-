// services/getTransferHistory.js

const axios = require("axios");
const getContractABI = require("./getContractABI");

// Helper to convert Unix‐timestamp string → human‐readable date
function formatTimestamp(ts) {
  const date = new Date(parseInt(ts, 10) * 1000);
  return date.toLocaleString("en-US", { timeZone: "UTC" });
}

const getTransferHistory = async (_recipientAddress) => {
  try {
    if (!_recipientAddress || typeof _recipientAddress !== "string") {
      throw new Error("Invalid recipient address");
    }

    const etherScan_Api_Key = process.env.ETHERSCAN_API_KEY;
    const etherScan_Endpoint = process.env.ETHERSCAN_API_ENDPOINT;

    // STEP 1: Fetch up to 10 recent ERC-20 token transfers
    const tokenTxRes = await axios.get(etherScan_Endpoint, {
      params: {
        module: "account",
        action: "tokentx",
        address: _recipientAddress,
        page: 1,
        offset: 10,
        sort: "desc",
        apikey: etherScan_Api_Key,
      },
    });

    let rawTransfers = [];
    if (tokenTxRes.data.status === "1") {
      rawTransfers = tokenTxRes.data.result.map((tx) => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        contract: tx.contractAddress,
        symbol: tx.tokenSymbol,
        tokenName: tx.tokenName,
        amount: tx.value,
        timeStamp: tx.timeStamp,
        type: "ERC-20",
      }));
    } else {
      // STEP 2: If no ERC-20, fall back to ETH transfers
      const ethTxRes = await axios.get(etherScan_Endpoint, {
        params: {
          module: "account",
          action: "txlist",
          address: _recipientAddress,
          page: 1,
          offset: 10,
          sort: "desc",
          apikey: etherScan_Api_Key,
        },
      });

      if (ethTxRes.data.status === "1") {
        rawTransfers = ethTxRes.data.result.map((tx) => ({
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          contract: null,
          symbol: "ETH",
          tokenName: "Ethereum",
          amount: tx.value,
          timeStamp: tx.timeStamp,
          type: "ETH",
        }));
      }
    }

    if (rawTransfers.length === 0) {
      return { success: false, error: "No recent transfers found" };
    }

    // STEP 3: Compute summary
    const totalTransfers = rawTransfers.length;
    // Most recent transfer = first element (sorted desc)
    const latest = rawTransfers[0];
    const lastTransferDate = formatTimestamp(latest.timeStamp);

    // Sum up “amount” for ERC-20 only (in raw wei/token units)
    const totalTokenVolume = rawTransfers
      .filter((tx) => tx.type === "ERC-20")
      .reduce((acc, tx) => acc + BigInt(tx.amount), BigInt(0));

    // Convert to string (raw) so frontend can format as needed
    const totalVolumeString = totalTokenVolume.toString();

    // STEP 4: Keep only the top 5 most recent for display
    const recentTransfers = rawTransfers.slice(0, 5).map((tx) => ({
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      symbol: tx.symbol,
      amount: tx.amount,
      date: formatTimestamp(tx.timeStamp),
      type: tx.type,
    }));

    return {
      success: true,
      summary: {
        totalTransfers,
        lastTransferDate,
        totalERC20Volume: totalVolumeString,
      },
      recentTransfers,
    };
  } catch (err) {
    console.error("Transfer History Error:", err.message);
    return { success: false, error: err.message };
  }
};

module.exports = getTransferHistory;
