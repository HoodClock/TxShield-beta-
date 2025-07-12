const provider = require("../../config/provider");
const { getAddress } = require("ethers");


const detectEtherForwarding = async (recepientAddress) => {
  try {

    console.log("To address from -> ", recepientAddress);

    const checkSumAddress = getAddress(recepientAddress);

    const bytecode = await provider.getCode(checkSumAddress);

    if (!bytecode || bytecode === "0x") {
      return {
        isScam: false,
        confidence: "low",
        reason: "Recipient is not a smart contract, unlikely to forward ETH.",
      };
    }

    const occurrences = bytecode.toLowerCase().split("f1").length - 1;

    let isScam = false;
    let confidence = "low";
    let reason = "";

    if (occurrences > 3) {
      isScam = true;
      confidence = "high";
      reason = `Bytecode contains ${occurrences} CALL opcodes (likely ETH forwarding pattern).`;
    } else if (occurrences > 1) {
      isScam = true;
      confidence = "medium";
      reason = `Bytecode contains ${occurrences} CALL opcodes, potential ETH forwarding.`;
    } else if (occurrences === 1) {
      isScam = false;
      confidence = "medium";
      reason = "Single CALL opcode found; may be normal contract behavior.";
    } else {
      isScam = false;
      confidence = "high";
      reason = "No CALL opcodes found, unlikely to forward ETH.";
    }

    return {
      isContract: true,
      isScam,
      confidence,
      reason,
      checks: {
        callOpcodeCount: occurrences,
      },
      address: recepientAddress,
    };
  } catch (error) {
    console.error("Ether forwarding detection failed:", error);
    return {
      isContract: false,
      isScam: false,
      confidence: "low",
      reason: "Analysis failed due to error.",
      error: error.message,
    };
  }
};


module.exports = detectEtherForwarding;