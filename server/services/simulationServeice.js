const utilityFunctions = require("../utils/simulation/index");

// for simulation
const getSimulateTransactionService = async (_from, _to, _amount) => {
  return await utilityFunctions.simulateTransaction(_from, _to, _amount);
};

// for contract ABI's
const getContractAbiService = async (_recepientAddress) => {
  return await utilityFunctions.getContractABI(_recepientAddress);
};

// for analyze-byte-code
const getAnalyzedCodeService = async (_recepientAddress) => {
  return await utilityFunctions.analyzeByteCode(_recepientAddress);
};

// for tx-history
const getTransactionHistory = async (_recepientAddress) => {
  return await utilityFunctions.getTransactionHistory(_recepientAddress);
};


module.exports = {
  getSimulateTransactionService,
  getContractAbiService,
  getAnalyzedCodeService,
  getTransactionHistory,
};
