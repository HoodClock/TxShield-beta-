const { decideChains } = require("../../../config/provider");
const { getAddress } = require("ethers");

const analyzeBytecode = async (contractAddress, chainId) => {
  try {
    const { provider } = decideChains(chainId);
    const checksumAddress = getAddress(contractAddress);
    const byteCode = await provider.getCode(checksumAddress);

    if (!byteCode || byteCode === "0x") {
      return {
        isContract: false,
        trustStatus: "Neutral",
        humanWarning:
          "This is a standard wallet, not a smart contract. No token logic exists here.",
        riskFlags: [],
      };
    }

    const byteCodeStr = byteCode.toLowerCase();
    const riskFlags = [];
    let severityScore = 0;

    // Translate Opcodes to Retail-Friendly Explanations
    const OPCODES = {
      SELFDESTRUCT: {
        hex: "ff",
        risk: 10,
        title: "Kill Switch Detected",
        desc: "The creator can delete this token at any time, instantly wiping its value.",
      },
      DELEGATECALL: {
        hex: "f4",
        risk: 5,
        title: "Hidden Logic (Proxy)",
        desc: "The contract can execute code from other hidden contracts. Often used in scams to change rules after launch, though sometimes used in legitimate upgradeable tokens.",
      },
      CREATE2: {
        hex: "fb",
        risk: 2,
        title: "Dynamic Deployment",
        desc: "Can spawn new contracts on the fly.",
      },
    };

    for (const [name, data] of Object.entries(OPCODES)) {
      if (byteCodeStr.includes(data.hex)) {
        riskFlags.push({
          threatLevel: data.risk >= 5 ? "HIGH" : "MEDIUM",
          title: data.title,
          description: data.desc,
        });
        severityScore += data.risk;
      }
    }

    // Determine Retail-Friendly Status
    let trustStatus = "Safe";
    let humanWarning =
      "No immediately obvious malicious opcodes detected. (Note: Always simulate transactions to be sure).";

    if (severityScore >= 10) {
      trustStatus = "Critical Risk";
      humanWarning =
        "EXTREME DANGER: This contract contains a kill-switch or severely malicious logic.";
    } else if (severityScore >= 5) {
      trustStatus = "Suspicious";
      humanWarning =
        "Caution: This contract has hidden logic or proxy capabilities. The developer could change the token's behavior.";
    }

    // Determine confidence based on severity and findings count
    const confidence =
      severityScore >= 10 ? "HIGH" : severityScore >= 5 ? "MEDIUM" : "LOW";

    return {
      isContract: true,
      trustStatus,
      humanWarning,
      riskFlags,
      confidence,
    };
  } catch (error) {
    console.error("Bytecode analysis failed:", error.message);
    return { isContract: false, trustStatus: "Unknown", error: error.message };
  }
};

module.exports = { analyzeBytecode };
