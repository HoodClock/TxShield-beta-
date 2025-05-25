const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const EtherScanURL = process.env.ETHERSCAN_API_ENDPOINT;
const EtherScanAPIKEY = process.env.ETHERSCAN_API_KEY;

const detectImpersonation = async (_tokenAddress) => {
  const tokenInfo = `${EtherScanURL}?module=token&action=tokeninfo&contractaddress=${_tokenAddress}&apikey=${EtherScanAPIKEY}`;

  const response = await axios.get(tokenInfo);

  const responseData = response.data.results[0];

  const tokenObj = {
    name: responseData.ContractName,
    symbol: responseData.TokenSymbol,
    contractAddress: responseData.ContractAddress,
  };

  const coinGeckoApi = await axios.get(process.env.COIN_GECKO_NAME_SYMBOL_API);

  const coinId = coinGeckoApi.data.find(
    (coin) => coin.symbol.toLowerCase() === tokenObj.symbol.toLowerCase()
  )?.id;

  const sepecificCoin = process.env.COIN_GECKO_SEPECIFIC_ID.replace(
    "{id}",
    coinId
  );
  
  const sepeceficCoinRes = await axios.get(sepecificCoin);
  const coinGeckoIdData = sepeceficCoinRes.data;

  const coinObj = {
    name: coinGeckoIdData.ContractName,
    symbol: coinGeckoIdData.TokenSymbol,
    contractAddress: coinGeckoIdData.ContractAddress,
  };

  if (
    tokenObj.name === coinObj.name &&
    tokenObj.symbol === coinObj.symbol &&
    tokenObj.contractAddress === coinObj.contractAddress
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
      message:
        "Possible impersonation — name/symbol matched but contract address differs",
    };
  }
};

module.exports = detectImpersonation;
