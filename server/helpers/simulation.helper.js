const simulationServices = require("../services/simulationServeice");

const simulateTx = async (userAddress, recepientAddress, amount) => {
  if (!userAddress || !recepientAddress || !amount) {
    return {
      success: false,
      message: "User / Recepient address or value is missing",
    };
  }

  const response = await simulationServices.getSimulateTransactionService(userAddress, recepientAddress, amount)
  

};
