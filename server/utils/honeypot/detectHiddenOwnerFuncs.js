// using regEX for broader search
const suspiciousFunctions = [
  /set.*Tax/i,
  /set.*Fee/i,
  /set.*Limits/i,
  /withdraw/i,
  /blacklist/i,
  /add.*Blacklist/i,
  /remove.*Blacklist/i,
  /enableTrading/i,
  /disableTrading/i,
  /manual.*Swap/i,
  /manual.*Send/i,
  /set.*Router/i,
  /set.*Pair/i,
];

const detectHiddenOwnerFuncs = async (_contractAddress, _abi) => {

  if (!_abi) {
    return {
      success: false,
      message: "ABI not available for this address.",
    };
  } 

  const functionNames = _abi.filter((item) => item.type === "function").map((item) => item.name);

  const matchedFunction = functionNames.filter((func) =>
    suspiciousFunctions.some((pattern) => pattern.test(func))
  );

  if (matchedFunction.length > 0) {
    return {
      success: true,
      risk: true,
      matchedFunctions: matchedFunction,
      message: "Potential owner-only control functions found.",
    };
  }

  return {
    success: true,
    risk: false,
    message: "No suspicious owner functions detected.",
  };
};

module.exports = detectHiddenOwnerFuncs;
