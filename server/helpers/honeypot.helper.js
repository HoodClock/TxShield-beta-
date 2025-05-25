const honeypotServices = require("../services/honeypotServices");

const handleBlacklistCheck = async (address, abi) => {
  if (!address || !abi) return { success: false, message: "Address/ABI is missing" };

  try {
    const response = await honeypotServices.detectBlackListService(address, abi);
    return response.success
      ? { success: true, data: response }
      : { success: false, message: response.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const handleDisableTransferCheck = async (address, abi) => {
  if (!address || !abi) return { success: false, message: "Address/ABI is missing" };

  try {
    const response = await honeypotServices.detectDisableTransferService(address, abi);
    return response.success
      ? { success: true, data: response }
      : { success: false, message: response.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const handleFakeBalanceCheck = async (tokenAddress, abi) => {
  if (!tokenAddress || !abi) return { success: false, message: "Token address/ABI  is missing" };

  try {
    const response = await honeypotServices.detectFakeBalanceService(tokenAddress, abi);
    return response.success
      ? { success: true, data: response }
      : { success: false, message: response.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const handleGasTrapCheck = async (userAddress, recepientAddress, value) => {
  if (!userAddress || !recepientAddress || !value) {
    return { success: false, message: "User / Recepient address or value is missing" };
  }

  try {
    const response = await honeypotServices.detecGasTrapService(userAddress, recepientAddress, value);
    return response.success
      ? { success: true, data: response }
      : { success: false, risk: response.risk, message: response.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const handleHiddenOwnerCheck = async (contractAddress, abi) => {
  if (!contractAddress || !abi) return { success: false, message: "Contract/ABI is missing" };

  try {
    const response = await honeypotServices.detectHiddenOwnerService(contractAddress, abi);
    return response.success
      ? { success: true, data: response }
      : { success: false, message: response.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const handleHighSellTaxCheck = async (address, abi) => {
  if (!address || !abi) return { success: false, message: "Address/ABI is missing" };

  try {
    const response = await honeypotServices.detectHighSellTaxService(address, abi);
    return response.success
      ? { success: true, data: response }
      : { success: false, message: response.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const handleBuySellCheck = async (userAddress, tokenAddress, value) => {
  if (!userAddress || !tokenAddress || !value) {
    return { success: false, message: "User / Token address or value is missing" };
  }

  try {
    const response = await honeypotServices.detectHoneyPotBuySellService(userAddress, tokenAddress, value);
    return response.success
      ? { success: true, data: response }
      : { success: false, message: response.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const handleMintAccessCheck = async (contractAddress, abi) => {
  if (!contractAddress || !abi) return { success: false, message: "Contract address/ABI is missing" };

  try {
    const response = await honeypotServices.detectMintAccessService(contractAddress, abi);
    return response.success
      ? { success: true, data: response }
      : { success: false, message: response.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const handleTradingControlCheck = async (address, abi) => {
  if (!address || !abi) return { success: false, message: "Address/ABI is missing" };

  try {
    const response = await honeypotServices.detectTradingControlService(address, abi);
    return response.success
      ? { success: true, data: response }
      : { success: false, message: response.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

module.exports = {
  handleBlacklistCheck,
  handleDisableTransferCheck,
  handleFakeBalanceCheck,
  handleGasTrapCheck,
  handleHiddenOwnerCheck,
  handleHighSellTaxCheck,
  handleBuySellCheck,
  handleMintAccessCheck,
  handleTradingControlCheck,
};
