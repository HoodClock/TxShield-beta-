const solSimulationService = require("../services/solSimulationService")

const simulateSOLTxHelper = async (signedTxBase64, userAddress, recepientAddress, amount, currencySymbol) => {

  if (!signedTxBase64 || !userAddress || !recepientAddress || !amount || !currencySymbol) {
    return { success: false, message: "User / Recepient address / amount or currency symbol is missing" };
  }

  try {
    const response = await solSimulationService.getSolSimulationService(
      signedTxBase64,
      userAddress,
      recepientAddress,
      amount,
      currencySymbol
    );
    return { success: true, data: response };
  } catch (err) {
    return { success: false, error: err.message };
  }
};


module.exports = {
    simulateSOLTxHelper
}