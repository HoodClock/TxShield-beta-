const { getAbi } = require("../../services/etherscanService");

const suspiciousMintFunctions = [
  /mint/i,
  /mint.*To/i,
  /mint.*Token/i,
  /public.*Mint/i,
  /free.*Mint/i,
  /airdrop/i,
  /claim.*Token/i,
];

const detectMintAccess = async (_contractAddress) => {
  const abi = await getAbi(_contractAddress);

  if (!abi) {
    return { success: false, warning: "ABI not available" };
  }

  const mintFunctions = abi
    .filter(
      (item) =>
        item.type === "function" &&
        suspiciousMintFunctions.some((pattern) => pattern.test(item.name)) &&
        item.stateMutability !== "view" &&
        item.stateMutability !== "pure"
    )
    .map((item) => item.name);

  if (mintFunctions.length > 0) {
    return {
      success: true,
      risk: true,
      matchedFunctions: mintFunctions,
      message: "Suspicious public mint-related functions detected.",
    };
  }

  return {
    success: true,
    risk: false,
    message: "No suspicious mint access found.",
  };
};


module.exports = {detectMintAccess}