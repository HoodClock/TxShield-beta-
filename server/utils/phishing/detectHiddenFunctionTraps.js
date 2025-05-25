const { getSourceCode } = require("../../services/etherscanService");

const hiddenFunctionTrap = async (_tokenAddress) => {
  const sourceData = await getSourceCode(_tokenAddress);

  if (!sourceData || !sourceData[0] || !sourceData[0].SourceCode) {
    return { success: false, reason: "No source code found" };
  }

  const sourceCode = sourceData[0].SourceCode;

  const suspiciousFunctions = [
    "rugPull",
    "drainFunds",
    "steal",
    "emergencyWithdraw",
    "scam",
    "mintUnlimited",
    "transferOwnership"
  ];

  // Create regex pattern
  const pattern = new RegExp(`function\\s+(${suspiciousFunctions.join("|")})\\s*\\(`, "gi");

  const matches = sourceCode.match(pattern);

  if (matches && matches.length > 0){
    return{
        success: true,
        risk: true,
        message: "Suspicious functions found in contract source.",
        functions: [...new Set(matches.map(item => item.trim()))]
    }
  }else{
    return{
        success: true,
        risk: false,
        message: "No suspecious function detected."
    }
  }
};

module.exports = hiddenFunctionTrap;
