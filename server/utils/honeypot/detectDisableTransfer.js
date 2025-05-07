const { getAbi } = require("../../services/etherscanService");

const suspiciousFunctions = [/disable.*Transfer/i, /pause/i, /lock/i];

const detectDisbaledTransfer = async (_address) => {
  const abi = await getAbi(_address);

  if (!abi) {
    return {
      success: false,
      message: "ABI not available for this address.",
    };
  }

  const functionNames = abi
    .filter(
      (item) =>
        item.type === "function" &&
        item.stateMutability !== "view" &&
        item.stateMutability !== "pure" &&
        (!item.input || item.input.length === 0) &&
        (!item.output || item.output.length === 0)
    )
    .map((item) => item.name);

  const matchedFunctions = functionNames.filter((item) =>
    suspiciousFunctions.some((pattern) => pattern.test(item))
  );

  if (matchedFunctions.length > 0) {
    return {
      success: true,
      risk: true,
      matchedFunctions,
      message: "Potential disbale transfer functions found.",
    };
  }

  return {
    success: true,
    risk: false,
    message: "No disbale trasnfer functions found",
  };
};

module.exports = detectDisbaledTransfer;