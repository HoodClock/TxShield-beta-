const honeypotServices = require("../services/honeypotServices");
const {isContract} = require("../services/etherscanService")

const handleBlacklistCheck = async (address, abi) => {
  
  if (!address) return { success: false, message: "Address is missing" };

  const contractCheck = await isContract(address);


  if (!contractCheck) {
    return {
      success: false,
      message: "The provided address is a wallet address. Honeypot checks are applicable only to smart contracts.",
    };
  }


  if (!abi) {
    return {
      success: false,
      message: "ABI is missing. Honeypot checks require a verified contract address.",
    };
  }

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
  if (!address) return { success: false, message: "Address is missing" };

  const contractCheck = await isContract(address);
  if (!contractCheck) {
    return {
      success: false,
      message: "The provided address is a wallet. This check is only valid for smart contracts.",
    };
  }

  if (!abi) {
    return { success: false, message: "ABI is missing." };
  }

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
  if (!tokenAddress) return { success: false, message: "Token address is missing" };

  const contractCheck = await isContract(tokenAddress);
  if (!contractCheck) {
    return {
      success: false,
      message: "The provided token address is a wallet. This check is only valid for token contracts.",
    };
  }

  if (!abi) {
    return { success: false, message: "ABI is missing." };
  }

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
  if (!contractAddress) return { success: false, message: "Contract address is missing" };

  const contractCheck = await isContract(contractAddress);
  if (!contractCheck) {
    return {
      success: false,
      message: "The provided address is not a smart contract.",
    };
  }

  if (!abi) {
    return { success: false, message: "ABI is missing." };
  }

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
  if (!address) return { success: false, message: "Address is missing" };

  const contractCheck = await isContract(address);
  if (!contractCheck) {
    return {
      success: false,
      message: "The provided address is a wallet.",
    };
  }

  if (!abi) {
    return { success: false, message: "ABI is missing." };
  }

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
  if (!contractAddress) return { success: false, message: "Contract address is missing" };

  const contractCheck = await isContract(contractAddress);
  if (!contractCheck) {
    return {
      success: false,
      message: "Provided address is not a contract.",
    };
  }

  if (!abi) {
    return { success: false, message: "ABI is missing." };
  }

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
  if (!address) return { success: false, message: "Address is missing" };

  const contractCheck = await isContract(address);
  if (!contractCheck) {
    return {
      success: false,
      message: "The provided address is not a contract.",
    };
  }

  if (!abi) {
    return { success: false, message: "ABI is missing." };
  }

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
