// all evm-simulation based module
module.exports = {
    analyzeByteCode: require("./analyzeByteCode"),
    getTransactionHistory: require("./getTransferHistory"),
    getSimulate: require('./simulateTx')
}