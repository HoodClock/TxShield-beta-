const TradingControlFunctionsNames = [
  /add.*WhiteList/i,
  /remove.*WhiteList/i,
  /is.*WhiteList/i,
  /set.*TradingEnabled/i,
  /is.*TradingEnabled/i,
  /trade/i,
  /approve.*Trader/i,
  /get.*ApprovedTrader/i,
  /revokeTraderApproval/i,
];

const detectTradingControl = async (_address, _abi) => {
  if (!_abi) {
    return {
      success: false,
      message: "ABI not available for this address.",
    };
  }

  const functionNames = _abi
    .filter((item) => item.type === "function")
    .map((item) => item.name);

  const matchedFunctions = functionNames.filter((item) =>
    TradingControlFunctionsNames.some((pattern) => pattern.test(item))
  );

  if (matchedFunctions.length > 0) {
    return {
      success: true,
      risk: true,
      matchedFunctions,
      message: "Potential trading control mechanisms detected.",
    };
  }

  return {
    success: true,
    risk: false,
    message: "No trading control mechanisms found.",
  };
};

module.exports = detectTradingControl;
