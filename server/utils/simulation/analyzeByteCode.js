const { provider } = require("../../config/provider");

const analyzeBytecode = async (_recipientAddress) => {
  try {
    const byteCode = await provider.getCode(_recipientAddress);
    if (!byteCode || byteCode === "0x") {
      return { isContract: false, warnings: [] };
    }

    const opCode = {
      SELFDESTRUCT: "ff",
      DELEGATECALL: "f4",
      CALLCODE: "f2",
      CREATE2: "fb",
    };

    const warnings = [];
    for (const [name, hex] of Object.entries(opCode)) {
      if (byteCode.toLowerCase().includes(hex)) {
        warnings.push(`Dangerous opCode detected: ${name}`);
      }
    }

    return { isContract: true, warnings };
  } catch (error) {
    console.error("Bytecode analysis failed:", error);
    return { isContract: false, warnings: [], error: error.message };
  }
};

module.exports = analyzeBytecode;