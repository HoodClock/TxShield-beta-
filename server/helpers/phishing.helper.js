const phishingService = require("../services/phishingServices");

const handleApproveScam = async (_tokenAddress) => {
  if (!_tokenAddress) {
    return {
      success: false,
      message: "Token address is missing.",
    };
  }

  try {
    const response = await phishingService.approveScamService(_tokenAddress);
    return response.success
      ? { success: true, data: response }
      : { success: false, message: response.message };
  } catch (err) {
    return { success: false, err: err.message };
  }
};

const handleFakeToken = async (_tokenAddress) => {
  if (!_tokenAddress) {
    return {
      success: false,
      message: "Token address is missing.",
    };
  }

  try {
    const response = await phishingService.fakeTokenService(_tokenAddress);
    return response.success
      ? { success: true, data: response }
      : { success: false, message: response.message };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const handleHiddenFunctions = async (_tokenAddress) => {
  if (!_tokenAddress) {
    return {
      success: false,
      message: "Token address is missing.",
    };
  }

  try {
    const response = await phishingService.hiddenFunctionService(_tokenAddress);
    return response.success
    ? {success: true, data: response}
    : {success: response.success, message: response.message, reason: response.reason, risk: response.risk}
  } catch (err) {
    return {success: false, error: err.message}
  }
};

const handleImpression = async (_tokenAddress) => {
  if (!_tokenAddress) {
    return {
      success: false,
      message: "Token address is missing.",
    };
  }

  try {
    const response = await phishingService.impressionService(_tokenAddress);
    return response.success
    ? {success: true, data: response}
    : {success: response.success, message: response.message, risk: response.risk }
  } catch (err) {
    return {success: false, error: err.message}
  }
}

const handleMalicious = async (_tokenAddress)=> {
  if (!_tokenAddress) {
    return {
      success: false,
      message: "Token address is missing.",
    };
  }

 try {
   const response = await phishingService.maliciousProxyService(_tokenAddress);
   return response.success
   ? {success: true, data: response}
   : {success: response.success, reason: response.reason, risk: response.risk }
 } catch (err) {
  return {success: false, error: err.message}
 }
} 

const handleByteCode = async (_tokenAddress)=> {
  if (!_tokenAddress) {
    return {
      success: false,
      message: "Token address is missing.",
    };
  }

  try {
    const response = await phishingService.byteCodePatternService(_tokenAddress);
    return response.success
    ? {success: true, data: response}
    : {success: response.success, reason: response.reason, risk: response.risk}
  } catch (err) {
    return {success: false, error: err.message}
  }
}

module.exports = {
  handleApproveScam,
  handleFakeToken,
  handleHiddenFunctions,
  handleImpression,
  handleMalicious,
  handleByteCode
}
