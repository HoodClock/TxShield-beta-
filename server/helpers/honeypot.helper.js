const honeypotServices = require("../services/honeypotServices");

const handleBlacklistCheck = async (context) => {
  const { fromAddress, abi, contractAddress } = context;

  if (!contractAddress) return { success: false, message: "Contract address is missing" };
  if (!abi) return { success: false, message: "ABI is missing." };

  try {
    const response = await honeypotServices.detectBlackListService(fromAddress, abi);
    return response.success
      ? { success: true, data: response }
      : { success: false, message: response.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const handleDisableTransferCheck = async (context) => {
  const { fromAddress, abi } = context;

  if (!fromAddress) return { success: false, message: "Address is missing" };
  if (!abi) return { success: false, message: "ABI is missing." };

  try {
    const response = await honeypotServices.detectDisableTransferService(fromAddress, abi);
    return response.success
      ? { success: true, data: response }
      : { success: false, message: response.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const handleFakeBalanceCheck = async (context) => {
  const { tokenAddress, abi } = context;

  if (!tokenAddress) return { success: false, message: "Token address is missing" };
  if (!abi) return { success: false, message: "ABI is missing." };

  try {
    const response = await honeypotServices.detectFakeBalanceService(tokenAddress, abi);
    return response.success
      ? { success: true, data: response }
      : { success: false, message: response.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const handleGasTrapCheck = async (context) => {
  const { userAddress, recepientAddress, value, currencySymbol } = context;

  if (!userAddress || !recepientAddress || !value || !currencySymbol) {
    return { success: false, message: "User / Recepient / Value / Currency is missing" };
  }

  try {
    const response = await honeypotServices.detecGasTrapService(
      userAddress,
      recepientAddress,
      value,
      currencySymbol
    );
    return response.success
      ? { success: true, data: response }
      : { success: false, risk: response.risk, message: response.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const handleHiddenOwnerCheck = async (context) => {
  const { contractAddress, abi } = context;

  if (!contractAddress) return { success: false, message: "Contract address is missing" };
  if (!abi) return { success: false, message: "ABI is missing." };

  try {
    const response = await honeypotServices.detectHiddenOwnerService(contractAddress, abi);
    return response.success
      ? { success: true, data: response }
      : { success: false, message: response.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const handleHighSellTaxCheck = async (context) => {
  const { fromAddress, abi } = context;

  if (!fromAddress) return { success: false, message: "Address is missing" };
  if (!abi) return { success: false, message: "ABI is missing." };

  try {
    const response = await honeypotServices.detectHighSellTaxService(fromAddress, abi);
    return response.success
      ? { success: true, data: response }
      : { success: false, message: response.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const handleBuySellCheck = async (context) => {
  const { userAddress, tokenAddress, value } = context;

  if (!userAddress || !tokenAddress || !value) {
    return { success: false, message: "User / Token / Value is missing" };
  }

  try {
    const response = await honeypotServices.detectHoneyPotBuySellService(
      userAddress,
      tokenAddress,
      value
    );
    return response.success
      ? { success: true, data: response }
      : { success: false, message: response.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const handleMintAccessCheck = async (context) => {
  const { contractAddress, abi } = context;

  if (!contractAddress) return { success: false, message: "Contract address is missing" };
  if (!abi) return { success: false, message: "ABI is missing." };

  try {
    const response = await honeypotServices.detectMintAccessService(contractAddress, abi);
    return response.success
      ? { success: true, data: response }
      : { success: false, message: response.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const handleTradingControlCheck = async (context) => {
  const { fromAddress, abi } = context;

  if (!fromAddress) return { success: false, message: "Address is missing" };
  if (!abi) return { success: false, message: "ABI is missing." };

  try {
    const response = await honeypotServices.detectTradingControlService(fromAddress, abi);
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
