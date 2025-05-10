


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
      honeypotServices.detectBlackListService(address),
      honeypotServices.detectDisableTransferService(address),
      honeypotServices.detectFakeBalanceService(tokenAddress),
      honeypotServices.detecGasTrapService(
        userAddress,
        recepientAddress,
        value
      ),
      honeypotServices.detectHiddenOwnerService(contractAddress),
      honeypotServices.detectHighSellTaxService(address),
      honeypotServices.detectHoneyPotBuySellService(
        userAddress,
        tokenAddress,
        value
      ),
      honeypotServices.detectMintAccessService(contractAddress),
      honeypotServices.detectTradingControlService(address),
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

  honeypotMasterController
};
