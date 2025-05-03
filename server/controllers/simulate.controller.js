const simulationALLServices = require("../services/simulationServeice");

// for simulation service
const simulateController = async (req, res) => {
  try {
    const { userAddress, recepientAddress, amount } = req.body;

    if (!userAddress || !recepientAddress || !amount) {
      return res.status(401).json({ message: "Missing Credentials" });
    }

    const result = await simulationALLServices.getSimulateTransactionService(
      userAddress,
      recepientAddress,
      amount
    );

    if (result.success) {
      return res.status(200).json({ success: true, data: result });
    } else {
      return res.status(500).json({ success: false, error: result.error });
    }
  } catch (err) {
    console.error("Controller Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// for contract-abi service
const contractABIController = async (req, res) => {
  try {
    const { recepientAddress } = req.body;

    if (!recepientAddress) {
      return res.status(401).json({ message: "Missing Credentials" });
    }

    const result = await simulationALLServices.getContractAbiService(
      recepientAddress
    );

    if (result.success) {
      return res.status(200).json({ success: true, data: result });
    } else {
      return res.status(500).json({ success: false, data: result.error });
    }
  } catch (err) {
    console.error("Controller Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// for analyzed byte code
const analyzedByteCodeController = async (req, res) => {
  try {
    const { recepientAddress } = req.body;

    if (!recepientAddress) {
      return res.status(401).json({ message: "Missing Recepient Address" });
    }

    const result = await simulationALLServices.getAnalyzedCodeService(
      recepientAddress
    );

    if (result.error) {
      return res.status(500).json({ success: false, error: result.error });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error("Controller Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// for transaction history
const transactionHistoryController = async (req, res) => {
  try {
    const { recepientAddress } = req.body;

    if (!recepientAddress) {
      return res.status(401).json({ message: "Missing Recepient Address" });
    }

    const result = await simulationALLServices.getTransactionHistory(
      recepientAddress
    );

    if (result.error) {
      return res.status(500).json({ success: false, error: result.error });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {}
};


module.exports = {
  simulateController,
  contractABIController,
  analyzedByteCodeController,
  transactionHistoryController
}