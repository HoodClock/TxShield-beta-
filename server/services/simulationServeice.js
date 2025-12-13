const utilityFunctions = require("../utils/simulation/index");

// for simulation
const getSimulateTransactionService = async (_from, _to, _amount, _currency) => {
  return await utilityFunctions.simulateTransaction(_from, _to, _amount, _currency);
};

// for analyze-byte-code
const getAnalyzedCodeService = async (_recepientAddress, _currency) => {
  return await utilityFunctions.analyzeByteCode(_recepientAddress, _currency);
};

// for tx-history
const getTransactionHistory = async (_recepientAddress) => {
  return await utilityFunctions.getTransactionHistory(_recepientAddress);
};

module.exports = {
  getSimulateTransactionService,
  getAnalyzedCodeService,
  getTransactionHistory,
};
