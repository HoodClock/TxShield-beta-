const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const EtherScanURL = process.env.ETHERSCAN_API_ENDPOINT;
const EtherScanAPIKEY = process.env.ETHERSCAN_API_KEY;

const detectImpersonation = async (_tokenAddress) => {
  try {
    // 1. Get token info from Etherscan
    const tokenInfoURL = `${EtherScanURL}?module=token&action=tokeninfo&contractaddress=${_tokenAddress}&apikey=${EtherScanAPIKEY}`;
    const etherscanRes = await axios.get(tokenInfoURL);

    if (!etherscanRes.data?.result || etherscanRes.data.result.length === 0) {
      return {
        success: false,
        error: "Etherscan did not return token info",
      };
    }

    const tokenData = etherscanRes.data.result[0];
    const tokenObj = {
      name: tokenData.ContractName,
      symbol: tokenData.TokenSymbol,
      contractAddress: tokenData.ContractAddress,
    };

    // 2. Search CoinGecko for all coins
    const allCoinsRes = await axios.get(process.env.COIN_GECKO_NAME_SYMBOL_API);
    const allCoins = allCoinsRes.data;

    const coinId = allCoins.find(
      (coin) => coin.symbol.toLowerCase() === tokenObj.symbol.toLowerCase()
    )?.id;

    if (!coinId) {
      return {
        success: false,
        error: "Token symbol not found on CoinGecko",
      };
    }

    // 3. Fetch specific CoinGecko token by ID
    const specificCoinURL = process.env.COIN_GECKO_SEPECIFIC_ID.replace("{id}", coinId);
    const coinRes = await axios.get(specificCoinURL);
    const coinData = coinRes.data;

    const coinObj = {
      name: coinData.name,
      symbol: coinData.symbol,
      contractAddress: coinData.contract_address?.ethereum,
    };

    // 4. Compare details
    if (
      tokenObj.name === coinObj.name &&
      tokenObj.symbol === coinObj.symbol &&
      tokenObj.contractAddress.toLowerCase() === coinObj.contractAddress?.toLowerCase()
    ) {
      return {
        success: true,
        risk: false,
        message: "Token matches trusted contract details",
      };
    } else {
      return {
        success: true,
        risk: true,
        message: "Possible impersonation — name/symbol match but contract address differs",
      };
    }
  } catch (error) {
    console.error("detectImpersonation Error:", error.message);
    return {
      success: false,
      error: "Unhandled error during impersonation detection",
    };
  }
};

module.exports = detectImpersonation;
