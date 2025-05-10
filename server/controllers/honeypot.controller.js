const honeypotHelper = require("../helpers/honeypot.helper");

// master controllers of all
const honeypotMasterController = async (req, res) => {
  try {
    const {
      address,
      contractAddress,
      tokenAddress,
      userAddress,
      recepientAddress,
      value,
    } = req.body;

    if (
      !address ||
      !tokenAddress ||
      !userAddress ||
      !recepientAddress ||
      !value ||
      !contractAddress
    ) {
      return res.status(401).json({ message: "Missing required fields." });
    }

    const [
      blackList,
      disableTransfer,
      fakeBalance,
      gasTrap,
      hiddenOwner,
      highSellTax,
      honeypotBuySell,
      mintAccess,
      tradingControl,
    ] = await Promise.all([
      honeypotHelper.handleBlacklistCheck(address),
      honeypotHelper.handleDisableTransferCheck(address),
      honeypotHelper.handleFakeBalanceCheck(tokenAddress),
      honeypotHelper.handleGasTrapCheck(userAddress, recepientAddress, value),
      honeypotHelper.handleHiddenOwnerCheck(contractAddress),
      honeypotHelper.handleHighSellTaxCheck(address),
      honeypotHelper.handleBuySellCheck(userAddress, tokenAddress, value),
      honeypotHelper.handleMintAccessCheck(contractAddress),
      honeypotHelper.handleTradingControlCheck(address),
    ]);

    return res.status(200).json({
      success: true,
      checks: {
        blackList,
        disableTransfer,
        fakeBalance,
        gasTrap,
        hiddenOwner,
        highSellTax,
        honeypotBuySell,
        mintAccess,
        tradingControl,
      },
    });
  } catch (err) {
    console.error("Master Honeypot Check Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  honeypotMasterController,
};
