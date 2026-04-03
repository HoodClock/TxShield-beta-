// Validator for EVM Simulation requests
const evmSimulateValidator = (body) => {
  // Support multiple naming conventions for the recipient
  const recipient = body.recepientAddress || body.recipientAddress || body.targetContractAddress;

  // Support currency or currencySymbol, default to "ETH" if missing for backward compatibility
  const currency = body.currency || body.currencySymbol || "ETH";

  // NOTE: userAddress and amount are NOT required from the client —
  // the controller uses SIMULATOR_WALLET_ADDRESS (env) and CHAIN_DEFAULT_AMOUNTS (hardcoded).
  if (!recipient) {
    return { success: false, message: "recipient address is missing (use recepientAddress, recipientAddress, or targetContractAddress)" };
  }
  if (!body.chainId) {
    return { success: false, message: "chainId is missing" };
  }

  // Inject the normalized values back into body for the controller to use
  body.normalizedRecipient = recipient;
  body.normalizedCurrency = currency;

  return true;
};

module.exports = { evmSimulateValidator };

