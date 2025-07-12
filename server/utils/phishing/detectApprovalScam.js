const {
  getAbi,
  isContract,
  getByteCode,
  getSourceCode,
} = require("../../services/etherscanService");

const getTransactionHistory = require("../simulation/getTransferHistory");
const aiService = require("../../services/aiServices");

const detectApprovelScam = async (
  userAddress,
  recepientAddress,
  amount,
  currencySymbol
) => {
  const isSmartcontract = await isContract(recepientAddress);

  if (!isSmartcontract)
    return {
      isScam: false,
      reason: "Recepient address is not a smart contract",
    };

  const abi = await getAbi(recepientAddress);
  const byteCode = await getByteCode(recepientAddress);
  const sourceCode = await getSourceCode(recepientAddress);
  const transacitonHistory = await getTransactionHistory(recepientAddress);

  const data = {
    abi,
    byteCode,
    sourceCode,
    transacitonHistory,
    userAddress,
    amount,
    currencySymbol,
  };

  // Fall-Back prompt scenario
  if (!abi && !sourceCode) {
    const prompt = `You are TxShield’s expert blockchain security analyst.

Task:
Determine if the target contract is a phishing approval scam — meaning it tricks users into granting unlimited allowances and later drains their tokens.

This contract has NO verified ABI or source code.
Analyze the bytecode and transaction history to detect phishing or scam patterns.

Data to analyze:
\`\`\`json
Bytecode:
${byteCode}
Transaction:
${JSON.stringify(transacitonHistory, null, 2)}
\`\`\`

Output strictly in this JSON format:
\`\`\`json
{
  "isScam": true/false,
  "confidence": "high"/"medium"/"low",
  "reason": "one-sentence summary of why"
}
\`\`\``;

    const response = await aiService(prompt);
    return JSON.parse(response);
  }

  const prompt = `
You are TxShield’s expert blockchain security analyst.

Task:
Determine if the target contract is a phishing approval scam — meaning it tricks users into granting unlimited allowances and later drains their tokens.

Process:
1. Verify it is a smart contract.
2. Check ABI for suspicious 'approve' or 'transferFrom' or any form of scammy usage without restrictions.
3. Inspect bytecode for hidden approval drains or backdoors.
4. Review source code for owner-only or hidden transfer logic.
5. Analyze recent transaction history for patterns of draining approved tokens.
6. Consider the user's transaction intent (userAddress, amount, currencySymbol).

Data to analyze:
\`\`\`json
${JSON.stringify(data, null, 2)}
\`\`\`

Output strictly in this JSON format:
\`\`\`json
{
  "isScam": true/false,
  "confidence": "high"/"medium"/"low",
  "reason": "one-sentence summary of why"
}
\`\`\`

Example:
\`\`\`json
{ "isScam": true, "confidence": "high", "reason": "Contract allows unlimited approvals and has transaction history draining user tokens." }
\`\`\`

Think step-by-step and provide only the JSON response.
`;

  const response = await aiService(prompt);

  return response;
};

module.exports = detectApprovelScam;
