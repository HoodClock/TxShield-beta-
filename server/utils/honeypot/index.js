module.exports = {
    detectBlackList: require('./detectBlackList'),
    detectDisableTransfer: require('./detectDisableTransfer'),
    detectFakeBalance: require('./detectFakeBalance'),
    detectGasTrap: require('./detectGasTrap'),
    detectHiddenOwnerFuncs: require('./detectHiddenOwnerFuncs'),
    detectHighSellTax: require('./detectHighSellTax'),
    detectHoneypotBuySellTrap: require('./detectHoneypotBuySellTrap'),
    detectMintAccess: require('./detectMintAccess'),
    detectTradingControl: require('./detectTradingControl'),
}