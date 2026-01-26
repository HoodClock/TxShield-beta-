const coinkGeckoUsd = process.env.COINGECKO_API_USD;

// Fetch Prices
async function fetchPrices(ids = ["ethereum"], vs = ["usd"]) {
  if (!coinkGeckoUsd) return {};
  try {
    const resp = await axios.get(coinkGeckoUsd, {
      params: { ids: ids.join(","), vs_currencies: vs.join(",") },
    });
    return resp.data;
  } catch (e) {
    console.error("Price fetch failed:", e.message);
    return {};
  }
}

// Format Numbers
const fmt = (val, decimals = 6) => {
  if (typeof val === "bigint") val = val.toString();
  const num = parseFloat(val);
  if (isNaN(num)) return "0";
  if (num === 0) return "0";
  if (num < 0.000001) return "< 0.000001";
  return Number(num.toFixed(decimals)).toLocaleString();
};

const safeJson = (obj) =>
  JSON.parse(
    JSON.stringify(obj, (_, v) => (typeof v === "bigint" ? v.toString() : v)),
  );

// Fixes "empty hex string" errors by ensuring valid 0x format
const toRpcHex = (value) => {
  if (!value) return "0x0";
  try {
    const bigVal = BigInt(value);
    if (bigVal === 0n) return "0x0";
    return "0x" + bigVal.toString(16);
  } catch (e) {
    console.error("Hex sanitization failed:", e);
    return "0x0";
  }
};
