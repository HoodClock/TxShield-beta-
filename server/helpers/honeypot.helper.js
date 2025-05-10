const honeypotServices = require("../services/honeypotServices");

const handleBlacklistCheck = async (address) => {
  if (!address) return { success: false, message: "Address is missing" };

  try {
    const response = await honeypotServices.detectBlackListService(address);
    return response.success
      ? { success: true, data: response }
      : { success: false, message: response.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const handleDisableTransferCheck = async (address) => {
  if (!address) return { success: false, message: "Address is missing" };

  try {
    const response = await honeypotServices.detectDisableTransferService(address);
    return response.success
      ? { success: true, data: response }
      : { success: false, message: response.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const handleFakeBalanceCheck = async (tokenAddress) => {
  if (!tokenAddress) return { success: false, message: "Token address is missing" };

  try {
    const response = await honeypotServices.detectFakeBalanceService(tokenAddress);
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
      : { success: false, message: response.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const handleHiddenOwnerCheck = async (contractAddress) => {
  if (!contractAddress) return { success: false, message: "Contract address is missing" };

  try {
    const response = await honeypotServices.detectHiddenOwnerService(contractAddress);
    return response.success
      ? { success: true, data: response }
      : { success: false, message: response.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const handleHighSellTaxCheck = async (address) => {
  if (!address) return { success: false, message: "Address is missing" };

  try {
    const response = await honeypotServices.detectHighSellTaxService(address);
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

const handleMintAccessCheck = async (contractAddress) => {
  if (!contractAddress) return { success: false, message: "Contract address is missing" };

  try {
    const response = await honeypotServices.detectMintAccessService(contractAddress);
    return response.success
      ? { success: true, data: response }
      : { success: false, message: response.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const handleTradingControlCheck = async (address) => {
  if (!address) return { success: false, message: "Address is missing" };

  try {
    const response = await honeypotServices.detectTradingControlService(address);
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
