const resolveImplementation = require('./resolveImplementation')

const hiddenFunctionTrap = async (_tokenAddress) => {
  const { sourceCode } = await resolveImplementation(_tokenAddress);

  if (!sourceCode) {
    return { success: false, reason: "No source code found" };
  }

  const suspiciousFunctions = [
    "rugPull",
    "drainFunds",
    "steal",
    "emergencyWithdraw",
    "scam",
    "mintUnlimited",
    "transferOwnership"
  ];

  const pattern = new RegExp(`function\\s+(${suspiciousFunctions.join("|")})\\s*\\(`, "gi");

  const matches = sourceCode.match(pattern);

  if (matches && matches.length > 0) {
    return {
      success: true,
      risk: true,
      message: "Suspicious functions found in contract source.",
      functions: [...new Set(matches.map(item => item.trim()))]
    };
  } else {
    return {
      success: true,
      risk: false,
      message: "No suspicious function detected."
    };
  }
};

module.exports = hiddenFunctionTrap;
