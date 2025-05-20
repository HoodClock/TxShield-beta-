const axios = require("axios");
require("dotenv").config();
const { getSourceCode } = require("../../services/etherscanService");

const etherScanEndpoint = process.env.ETHERSCAN_API_ENDPOINT;
const etherScanApiKey = process.env.ETHERSCAN_API_KEY;

const maliciousProxy = async (_tokenAddress) => {
  try {
    const url = `${etherScanEndpoint}?module=proxy&action=eth_getProxyImplementation&address=${_tokenAddress}&apikey=${etherScanApiKey}`;

    const proxyResponse = await axios.post(url);
    const implementationAddress = proxyResponse.data.result;

    if (
      !implementationAddress ||
      implementationAddress === "0x0000000000000000000000000000000000000000"
    ) {
      return {
        success: true,
        risk: false,
        reason: "Contract is not a proxy",
      };
    }

    const sourceCodeResult = await getSourceCode(implementationAddress);

    if (!sourceCodeResult || sourceCodeResult.length === 0) {
      return {
        success: true,
        risk: true,
        reason: "Proxy implementation source code not found",
      };
    }

    const sourceCode = sourceCodeResult[0].SourceCode || "";

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