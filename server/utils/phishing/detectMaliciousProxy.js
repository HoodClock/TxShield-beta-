const { isContract, getByteCode } = require("../../services/etherscanService");
const provider = require("../../config/provider");
const { ethers } = require("ethers");
const anaylyzeBytecode = require("../simulation/analyzeByteCode");
const aiService = require("../../services/aiServices"); // an ai service which accepts the prompt (Deepseek R-1)

const detectMaliciousProxy = async (_recepientAddress) => {
  const contractAddress = await isContract(_recepientAddress);
  if (!contractAddress)
    return {
      isProxy: false,
      reason: "The recepient address is not a smart contract.",
    };

  const byteCode = await getByteCode(_recepientAddress);
  if (!byteCode || byteCode === "0x")
    return { isProxy: false, reason: "no bytecode found." };

  // check EIP-1167 proxy
  const proxyPattern = [
    "363d3d373d3d3d363d73", // Minimal proxy EIP-1167
    "5af43d82803e903d91602b57fd5bf3", // Mainnet often seen proxy
    "3d602d80600a3d3981f3", // another varient of proxy
  ];

  const isLikelyProxy = proxyPattern.some((pattern) =>
    byteCode.toLowerCase().includes(pattern)
  );

  if (!isLikelyProxy)
    return { isProxy: false, reason: "No proxy pattern found in bytecode." };

  // now check EIP-1967 proxy
  const IMPLEMENTATION_SLOT = ethers.hexlify(
    BigInt(
      ethers.keccak256(ethers.toUtf8Bytes("eip1967.proxy.implementation"))
    ) - 1n
  );

  const implRaw = await provider.getStorage(
    _recepientAddress,
    IMPLEMENTATION_SLOT
  );
  const implementationAddress = "0x" + implRaw.slice(-40); // last 20 bytes

  const isValid = ethers.isAddress(implementationAddress);

  if (!isValid) {
    return {
      isProxy: true,
      implementationFound: false,
      reason: "Proxy pattern found, but invalid implementation address.",
    };
  }

  // now check Implementation bytecode
  const implementationBytecode = await getByteCode(implementationAddress);

  const analysisResult = await anaylyzeBytecode(implementationBytecode);

  // now genrating AI summery of the whole data
  const prompt = `
Analyze this smart contract based on the following bytecode and flags.

Bytecode analysis result:
- isContract: ${analysisResult.isContract}
- isScam: ${analysisResult.isScam}
- Confidence: ${analysisResult.confidence}
- Reason: ${analysisResult.reason}
- Warnings: ${analysisResult.warnings.join(", ")}

Provide a short summary a user can understand about whether this proxy’s implementation is safe or suspicious.
`;

  const aiSummery = await aiService(prompt);

  return {
    isProxy: true,
    implementationFound: true,
    implementationAddress,
    analysisResult,
    aiSummery,
    reason:
      "Proxy pattern and implementation address found. Analysis complete.",
  };
};

module.exports = detectMaliciousProxy