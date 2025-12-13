const { decideChains } = require("../../config/provider");
const { getAddress } = require("ethers");

const analyzeBytecode = async (_recipientAddress, _currencySymbol) => {
  try {
    const provider = decideChains(_currencySymbol)
    const checksumAddress = getAddress(_recipientAddress);
    const byteCode = await provider.getCode(checksumAddress);

    if (!byteCode || byteCode === "0x") {
      return { 
        isContract: false, 
        isScam: false, 
        confidence: "low", 
        reason: "Address is not a smart contract.", 
        warnings: [] 
      };
    }

    // opcode set
    const opCode = {
      SELFDESTRUCT: "ff",   // kill contract
      DELEGATECALL: "f4",   // execute in caller context
      CALLCODE: "f2",       // deprecated delegatecall style
      CREATE2: "fb",        // predictable contract creation
      CREATE: "f0",         // normal contract creation
      CALL: "f1"            // external calls (can siphon ETH)
    };

    const warnings = [];
    let riskScore = 0;

    for (const [name, hex] of Object.entries(opCode)) {
      const occurrences = byteCode.toLowerCase().split(hex).length - 1;

      if (occurrences > 0) {
        warnings.push(`Opcode ${name} found ${occurrences} times`);
        
        // Dynamic risk: heavier weight if repeated
        if (["SELFDESTRUCT", "CREATE2", "DELEGATECALL"].includes(name)) {
          riskScore += 2 * occurrences;
        } else {
          riskScore += 1 * occurrences;
        }
      }
    }

    // 🔥 Enhanced decision logic
    let isScam = false;
    let confidence = "low";
    let reason = "";

    if (riskScore >= 5) {
      isScam = true;
      confidence = "high";
      reason = `Multiple high-risk opcodes found (${warnings.join(", ")}), indicates probable malicious intent.`;
    } else if (riskScore >= 3) {
      isScam = true;
      confidence = "medium";
      reason = `Some risky opcodes detected: ${warnings.join(", ")}. May be unsafe.`;
    } else if (riskScore >= 1) {
      isScam = false;
      confidence = "medium";
      reason = `Minor suspicious opcodes present: ${warnings.join(", ")}. Likely okay but warrants caution.`;
    } else {
      isScam = false;
      confidence = "high";
      reason = "No dangerous opcodes found in bytecode.";
    }

    return {
      isContract: true,
      isScam,
      confidence,
      reason,
      warnings,
      address: _recipientAddress
    };
  } catch (error) {
    console.error("Bytecode analysis failed:", error);
    return { 
      isContract: false, 
      isScam: false, 
      confidence: "low", 
      reason: "Analysis failed due to error.", 
      warnings: [], 
      error: error.message 
    };
  }
};


module.exports = analyzeBytecode;
