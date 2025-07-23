const {
  getAbi,
  isContract,
  getByteCode,
  getSourceCode,
} = require("../../services/etherscanService");

const getTransactionHistory = require("../simulation/getTransferHistory");

// keywords that signal phishing patterns
const SUSPICIOUS_FUNCTIONS = ["approve", "transferFrom"];
const MAX_UINT = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

const detectApprovelScam = async (
  userAddress,
  recepientAddress,
) => {
  const isSmartContract = await isContract(recepientAddress);

  if (!isSmartContract) {
    return {
      isScam: false,
      confidence: "high",
      reason: "Recepient address is not a smart contract.",
    };
  }

  const abi = await getAbi(recepientAddress);
  const sourceCodeObj = await getSourceCode(recepientAddress);
  const byteCode = await getByteCode(recepientAddress);
  const transactionHistory = await getTransactionHistory(recepientAddress);

  let suspiciousAbi = false;
  let suspiciousSource = false;
  let suspiciousHistory = false;

  // Check ABI for suspicious functions
  if (abi && Array.isArray(abi)) {
    for (const item of abi) {
      if (
        item.name &&
        SUSPICIOUS_FUNCTIONS.includes(item.name) &&
        item.type === "function"
      ) {
        suspiciousAbi = true;
        break;
      }
    }
  }

  // Check source code for suspicious patterns (like owner-only drain logic)
  if (sourceCodeObj.success && sourceCodeObj.data?.[0]?.SourceCode) {
    const code = sourceCodeObj.data[0].SourceCode;

    const lowerCode = code.toLowerCase();
    if (
      lowerCode.includes("approve(") &&
      lowerCode.includes(MAX_UINT.toLowerCase())
    ) {
      suspiciousSource = true;
    }
    if (lowerCode.includes("transferfrom") && lowerCode.includes("owner")) {
      suspiciousSource = true;
    }
  }

  // Check transaction history for multiple ERC20 transfers from other addresses
  if (transactionHistory && Array.isArray(transactionHistory)) {
    const tokenDrainTxs = transactionHistory.filter((tx) => {
      return (
        tx.method?.toLowerCase().includes("transferfrom") &&
        tx.from?.toLowerCase() !== userAddress.toLowerCase() &&
        tx.value && Number(tx.value) > 0
      );
    });

    if (tokenDrainTxs.length >= 3) {
      suspiciousHistory = true;
    }
  }

  // Decision logic
  if (suspiciousAbi || suspiciousSource || suspiciousHistory) {
    return {
      isScam: true,
      confidence: suspiciousAbi && suspiciousSource && suspiciousHistory
        ? "high"
        : "medium",
      reason: "Contract shows suspicious approval logic and draining behavior.",
    };
  }

  return {
    isScam: false,
    confidence: "medium",
    reason: "No strong phishing patterns detected in ABI or transaction history.",
  };
};

module.exports = detectApprovelScam;
