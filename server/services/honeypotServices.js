const utilsHoneyPot = require("../utils/honeypot/index");

const detectBlackListService = async (_address, _abi) => {
  return await utilsHoneyPot.detectBlackList(_address, _abi);
};

const detectDisableTransferService = async (_address, _abi) => {
  return await utilsHoneyPot.detectDisableTransfer(_address, _abi);
};

const detectFakeBalanceService = async (_tokenAddress, _abi) => {
  return await utilsHoneyPot.detectFakeBalance(_tokenAddress, _abi);
};

const detecGasTrapService = async (_from, _to, _amount, _currency) => {
  return await utilsHoneyPot.detectGasTrap(_from, _to, _amount, _currency);
};

const detectHiddenOwnerService = async (_contractAddress, _abi) => {
  return await utilsHoneyPot.detectHiddenOwnerFuncs(_contractAddress, _abi);
};

const detectHighSellTaxService = async (_address, _abi) => {
  return await utilsHoneyPot.detectHighSellTax(_address, _abi);
};

const detectHoneyPotBuySellService = async (
  _userAddress,
  _tokenAddress,
  _amount
) => {
  return await utilsHoneyPot.detectHoneypotBuySellTrap(
    _userAddress,
    _tokenAddress,
    _amount
  );
};

const detectMintAccessService = async (_contractAddress, _abi) => {
  return await utilsHoneyPot.detectMintAccess(_contractAddress, _abi);
};

const detectTradingControlService = async (_address, _abi) => {
  return await utilsHoneyPot.detectTradingControl(_address, _abi);
};

module.exports = {
  detectBlackListService,
  detectDisableTransferService,
  detectFakeBalanceService,
  detecGasTrapService,
  detectHiddenOwnerService,
  detectHighSellTaxService,
  detectHoneyPotBuySellService,
  detectMintAccessService,
  detectTradingControlService,
};
