const { getSourceCode } = require("../../services/etherscanService");

const resolveImplementation = async (_contractAddress) => {
  try {
    const source = await getSourceCode(_contractAddress);

    if (
      source.success &&
      Array.isArray(source.data) &&
      source.data[0]
    ) {
      const contractData = source.data[0]; // FIXED: source.data, not source[0]
      const contractSource = contractData.SourceCode;
      const implementationAddress = contractData.Implementation;

      // Case 1: Proxy contract with implementation
      if (
        implementationAddress &&
        implementationAddress !== "0x"
      ) {
        const implSource = await getSourceCode(implementationAddress);

        if (
          implSource.success &&
          Array.isArray(implSource.data) &&
          implSource.data[0] &&
          implSource.data[0].SourceCode
        ) {
          return {
            implementationAddress,
            sourceCode: implSource.data[0].SourceCode,
          };
        }

        return {
          implementationAddress,
          sourceCode: null,
        };
      }

      // Case 2: Non-proxy, use source of given contract
      if (contractSource) {
        return {
          implementationAddress: _contractAddress,
          sourceCode: contractSource,
        };
      }
    }

    return { implementationAddress: null, sourceCode: null };
  } catch (err) {
    console.error("resolveImplementation error:", err.message);
    return { implementationAddress: null, sourceCode: null };
  }
};

module.exports = resolveImplementation;
