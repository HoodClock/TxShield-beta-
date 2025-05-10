const utilsHoneyPot = require("../utils/honeypot/index")

const detectBlackListService = async (_address)=> {
    return await utilsHoneyPot.detectBlackList(_address)
}

const detectDisableTransferService = async (_address)=> {
    return await utilsHoneyPot.detectDisableTransfer(_address)
}

const detectFakeBalanceService = async (_tokenAddress)=> {
    return await utilsHoneyPot.detectFakeBalance(_tokenAddress)
}

const detecGasTrapService = async (_from, _to, _amount)=> {
    return await utilsHoneyPot.detectGasTrap(_from, _to, _amount)
}

const detectHiddenOwnerService = async (_contractAddress)=> {
    return await utilsHoneyPot.detectHiddenOwnerFuncs(_contractAddress)
}

const detectHighSellTaxService = async (_address)=> {
    return await utilsHoneyPot.detectHighSellTax(_address)
}

const detectHoneyPotBuySellService = async (_userAddress, _tokenAddress, _amount)=> {
    return await utilsHoneyPot.detectHoneypotBuySellTrap(_userAddress,_tokenAddress,_amount)
}

const detectMintAccessService = async (_contractAddress)=> {
    return await utilsHoneyPot.detectMintAccess(_contractAddress)
}

const detectTradingControlService = async (_address)=> {
    return await utilsHoneyPot.detectTradingControl(_address)
}



module.exports = {
    detectBlackListService,
    detectDisableTransferService,
    detectFakeBalanceService,
    detecGasTrapService,
    detectHiddenOwnerService,
    detectHighSellTaxService,
    detectHoneyPotBuySellService,
    detectMintAccessService,
    detectTradingControlService
}