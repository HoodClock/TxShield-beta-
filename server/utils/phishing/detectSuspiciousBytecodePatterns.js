const { getByteCode } = require("../../services/etherscanService");

const byteCodePattern = async (_tokenAddress) => {
  const byteCode = await getByteCode(_tokenAddress);
  if (!byteCode) {
    return {
      success: false,
      risk: null,
      reason: "Failed to fetch bytecode",
    };
  }

  const riskyPatterns = [
    /selfdestruct/i,
    /delegatecall/i,
    /callcode/i,
    /tx\.origin/i,
    /create2?/i,
  ];

  const suspeciousPattern = riskyPatterns.some((pattern) =>
    pattern.test(byteCode)
  );

  if (suspeciousPattern) {
    return {
      success: true,
      risk: true,
      reason: "Dangerous op-code found in bytecode.",
    };
  }

  return {
    success: true,
    risk: false,
    reason: "No suspicious patterns detected.",
  };
};

module.exports = byteCodePattern;
