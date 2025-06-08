const simulationServices = require("../services/simulationServeice");

const simulateTxHelper = async (userAddress, recepientAddress, amount) => {

  
  if (!userAddress || !recepientAddress || !amount) {
    return { success: false, message: "User / Recepient address or value is missing" };
  }

  try {
    const response = await simulationServices.getSimulateTransactionService(
      userAddress,
      recepientAddress,
      amount
    );
    return { success: true, data: response };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const byteCodeHelper = async (recepientAddress) => {
  if (!recepientAddress) {
    return { success: false, message: "Recepient address is missing" };
  }

  try {
    const response = await simulationServices.getAnalyzedCodeService(recepientAddress);
    return { success: true, data: response };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const transactionHistoryHelper = async (recepientAddress) => {
  if (!recepientAddress) {
    return { success: false, message: "Recepient address is missing" };
  }

  try {
    const response = await simulationServices.getTransactionHistory(recepientAddress);
    return { success: true, data: response };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

module.exports = {
  simulateTxHelper,
  byteCodeHelper,
  transactionHistoryHelper
}