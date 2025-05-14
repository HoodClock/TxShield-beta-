const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const EtherScanURL = process.env.ETHERSCAN_API_ENDPOINT;
const EtherScanAPIKEY = process.env.ETHERSCAN_API_KEY;

const fakeTokenDetection = async (_tokenAddress) => {
  const tokenInfoAPI = `${EtherScanURL}?module=token&action=tokeninfo&contractaddress=${_tokenAddress}&apikey=${EtherScanAPIKEY}`;

  const response = await axios.get(tokenInfoAPI);

  const data = response.data.results[0];

  const tokenInfo = {
    name: data.name,
    symbol: data.symbol,
    decimals: Number(data.decimals),
    totalSupply: Number(data.totalSupply)
  }


};
