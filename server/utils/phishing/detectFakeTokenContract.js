const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const EtherScanURL = process.env.ETHERSCAN_API_ENDPOINT;
const EtherScanAPIKEY = process.env.ETHERSCAN_API_KEY;

const fakeTokenDetection = async (_tokenAddress) => {
  // getting coin list from etherscan
  const tokenInfoAPI = `${EtherScanURL}?module=token&action=tokeninfo&contractaddress=${_tokenAddress}&apikey=${EtherScanAPIKEY}`;

  const response = await axios.get(tokenInfoAPI);

  if (!response.data || !response.data.results || !response.data.results[0]) {
    return { success: false, error: "No token info found from Etherscan." };
  }

  const data = response.data.results[0];

  const tokenInfo = {
    name: data.name,
    symbol: data.symbol,
    decimals: Number(data.decimals),
    totalSupply: Number(data.totalSupply),
  };

  // getting coin list from coin gecko
  const coinList = await axios.get(process.env.COIN_GECKO_NAME_SYMBOL_API);

  // fetching coin_id and comparing both symbols
  const coinId = coinList.data.find(
    (coin) => coin.symbol.toLowerCase() === tokenInfo.symbol.toLowerCase()
  )?.id;

  // fetching full token data
  const sepecificCoinId = `${process.env.COIN_GECKO_SEPECIFIC_ID.replace(
    "{id}",
    coinId
  )}`;
  const tokenDataRes = await axios.get(sepecificCoinId);
  const tokenData = tokenDataRes.data;

  if (
    tokenInfo.name === tokenData.name &&
    tokenInfo.symbol === tokenData.symbol &&
    tokenInfo.totalSupply === tokenData.market_data?.totalSupply
  ) {
    return {
      success: true,
      risk: false,
      message: `The token associated to this token address ${_tokenAddress} is valid`,
    };
  } else {
    return {
      success: true,
      risk: true,
      message: `The token associated to this token address ${_tokenAddress} is Fake`,
    };
  }
};

module.exports = fakeTokenDetection;
