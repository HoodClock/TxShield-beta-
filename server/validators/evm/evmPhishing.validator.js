const { isAddress } = require("ethers");

const evmPhishingValidator = (data) => {
  const { userAddress, recepientAddress, currencySymbol } = data;

  if (!userAddress || !recepientAddress || !currencySymbol) {
    return {
      success: false,
      message:
        "Missing required fields: userAddress, recepientAddress, or currencySymbol.",
    };
  }

  // BAGLEY FIX: Lowercase the addresses first.
  // This forces Ethers to just check if it's a valid 40-char hex string, bypassing the strict EIP-55 checksum check.
  if (
    !isAddress(userAddress.toLowerCase()) ||
    !isAddress(recepientAddress.toLowerCase())
  ) {
    return { success: false, message: "Invalid Ethereum address format." };
  }

  return { success: true };
};

module.exports = { evmPhishingValidator };
