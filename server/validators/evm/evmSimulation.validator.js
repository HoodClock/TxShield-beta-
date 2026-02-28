// need to do the validation of userAddress, recepientAddress

const evmSimulateValidator = (body) => {
  const { userAddress, recepientAddress, amount, currency } = body;

  try {
    if (!userAddress || !recepientAddress || !amount || !currency) {
      return {
        success: false,
        message: "User / Recepient address or value is missing",
      };
    }

    return true;
  } catch (err) {
    return { success: false, error: err.message };
  }
};

module.exports = { evmSimulateValidator };
