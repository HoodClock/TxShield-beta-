const resolveImplementation = require("../resolveImplementation");

const maliciousProxy = async (_tokenAddress) => {
  try {
    const { implementationAddress, sourceCode } = await resolveImplementation(
      _tokenAddress
    );

    if (!implementationAddress) {
      return {
        success: true,
        risk: false,
        reason: "Contract is not a proxy",
      };
    }

    if (!sourceCode) {
      return {
        success: true,
        risk: true,
        reason: "Proxy implementation source code not found",
      };
    }

    const suspiciousPatterns = [
      "delegatecall",
      "selfdestruct",
      "call.value",
      "tx.origin",
    ];
    const foundSuspicious = suspiciousPatterns.some((pattern) =>
      sourceCode.toLowerCase().includes(pattern)
    );

    return {
      success: true,
      risk: foundSuspicious,
      reason: foundSuspicious
        ? "Suspicious logic found in proxy implementation"
        : "No suspicious proxy logic detected",
    };
  } catch (error) {
    console.error("Error detecting malicious proxy:", error.message);
    return {
      success: false,
      risk: null,
      reason: "Error during proxy detection",
    };
  }
};

module.exports = maliciousProxy;
