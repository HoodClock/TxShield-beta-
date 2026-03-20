// all evm-simulation based module
module.exports = {
  analyzeBytecode: require("./analyzeByteCode"),
  getTransferHistory: require("./getTransferHistory"),
  getSimulate: require("./simulateTx"),
};
