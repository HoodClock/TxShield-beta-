const honeypotHelper = require("../helpers/honeypot.helper");
const { getAbi } = require("../services/etherscanService");

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

    console.log("master controller address credentials ::::::::::::::- ", address)


    const abi = await getAbi(address);

    console.log("Master controller ABI ::::::::::::: => ", abi);

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
      honeypotHelper.handleBlacklistCheck(address, abi),
      honeypotHelper.handleDisableTransferCheck(address, abi),
      honeypotHelper.handleFakeBalanceCheck(tokenAddress, abi),
      honeypotHelper.handleGasTrapCheck(userAddress, recepientAddress, value),
      honeypotHelper.handleHiddenOwnerCheck(contractAddress, abi),
      honeypotHelper.handleHighSellTaxCheck(address, abi),
      honeypotHelper.handleBuySellCheck(userAddress, tokenAddress, value),
      honeypotHelper.handleMintAccessCheck(contractAddress, abi),
      honeypotHelper.handleTradingControlCheck(address, abi),
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
