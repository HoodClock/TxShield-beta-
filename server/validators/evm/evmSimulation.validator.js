// Validator for EVM Simulation requests
const evmSimulateValidator = (body) => {
  const { userAddress, amount, chainId } = body;
  
  // Support multiple naming conventions for the recipient
  const recipient = body.recepientAddress || body.recipientAddress || body.targetContractAddress;
  
  // Support currency or currencySymbol, default to "ETH" if missing for backward compatibility
  const currency = body.currency || body.currencySymbol || "ETH";

  if (!userAddress) {
    return { success: false, message: "userAddress is missing" };
  }
  if (!recipient) {
    return { success: false, message: "recipient address is missing (use recipientAddress or targetContractAddress)" };
  }
  if (!amount) {
    return { success: false, message: "amount is missing" };
  }
  if (!chainId) {
    return { success: false, message: "chainId is missing" };
  }

  // Inject the normalized values back into body for the controller to use
  body.normalizedRecipient = recipient;
  body.normalizedCurrency = currency;

  return true;
};

module.exports = { evmSimulateValidator };
