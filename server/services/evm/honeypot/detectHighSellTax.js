const { ethers } = require("ethers");
const {getRiskScore} = require("../../../utils/HoneypotChecksWeight.utils")
const {decideChains} = require("../../../config/provider")
const dotenv = require("dotenv");
dotenv.config();

const taxFunctionPatterns = [
  /get.*Sell.*Tax/i,
  /calculate.*Sell.*Tax/i,
  /get.*Fee/i,
  /sell.*Fee/i,
  /get.*Tax/i,
  /calculate.*Tax/i,
];

const detectHighSellTax = async (address, _abi, _currency) => {

  const provider = decideChains(_currency)

  if (!_abi) {
    return {
      success: false,
      message: "ABI not available for this address.",
    };
  } 

  const taxFunctions = _abi.filter(
    (item) =>
      item.type === "function" &&
      item.inputs.length === 0 &&
      item.outputs.length > 0 &&
      taxFunctionPatterns.some((pattern) => pattern.test(item.name))
  );

  const contract = new ethers.Contract(address, _abi, provider);

  for (let func of taxFunctions) {
    try {
      const result = await contract[func.name]();
      const taxPercent = Number(result);
      if (taxPercent > 50) {
        return {
          success: true,
          risk: true,
          score: getRiskScore("highSellTax"),
          message: `Very high sell tax detected (>50%) in function ${func.name}`,
        };
      }
    } catch (err) {
      continue;
    }
  }

  return {
    success: true,
    risk: false,
    message: "No high sell tax found.",
  };
};

module.exports = detectHighSellTax;