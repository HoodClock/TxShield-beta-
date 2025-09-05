const honeypotHelper = require("../helpers/honeypot.helper");
const { getAbi, isContract } = require("../services/etherscanService");
const { getAddress } = require("ethers");

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
      currencySymbol,
    } = req.body;


    const contract_address = await isContract(contractAddress);

    if (!contract_address) {
      return res.status(200).json({
        success: true,
        message: "Recipient is a wallet address. Honeypot checks skipped.",
        verdict: "ℹ️ This is a wallet address. No contract risks detected.",
      });
    }

    const normalAddress = getAddress(address);
    const normalcontractAddress = getAddress(contractAddress);
    const normalTokenAddress = getAddress(tokenAddress);
    const normalRecepientAddress = getAddress(recepientAddress);

    if (
      !normalAddress ||
      !normalTokenAddress ||
      !userAddress ||
      !normalRecepientAddress ||
      !value ||
      !normalcontractAddress ||
      !currencySymbol
    ) {
      return res.status(401).json({ message: "Missing required fields." });
    }

    // ✅ Fetch ABI once only
    const abi = await getAbi(normalRecepientAddress);

    // Build context to pass to helpers
    const context = {
      abi,
      contractAddress: normalRecepientAddress,
      tokenAddress: normalTokenAddress,
      userAddress,
      recepientAddress: normalRecepientAddress,
      value,
      currencySymbol,
      fromAddress: normalAddress,
    };


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
      honeypotHelper.handleBlacklistCheck(context),
      honeypotHelper.handleDisableTransferCheck(context),
      honeypotHelper.handleFakeBalanceCheck(context),
      honeypotHelper.handleGasTrapCheck(context),
      honeypotHelper.handleHiddenOwnerCheck(context),
      honeypotHelper.handleHighSellTaxCheck(context),
      honeypotHelper.handleBuySellCheck(context),
      honeypotHelper.handleMintAccessCheck(context),
      honeypotHelper.handleTradingControlCheck(context),
    ]);

    const checkResults = [
      blackList,
      disableTransfer,
      fakeBalance,
      gasTrap,
      hiddenOwner,
      highSellTax,
      honeypotBuySell,
      mintAccess,
      tradingControl,
    ];

    const maxScore = checkResults.length * 10;

    const totalScore = checkResults.reduce((sum, check) => {
      return sum + (check?.data?.score || 0);
    }, 0);

    const totalRiskChecks = checkResults.reduce((sum, check) => {
      return sum + (check?.data?.risk === false ? 1 : 0);
    }, 0);

    const getRiskLevel = (score) => {
      if (score >= 40) return "Red Flag Zone";
      if (score >= 20 && score <= 39) return "Caution Zone";
      return "Safe Zone";
    };

    const riskLevel = getRiskLevel(totalScore);

    const verdict =
      riskLevel === "Red Flag Zone"
        ? "❌ High risk — avoid interacting with this contract."
        : riskLevel === "Caution Zone"
          ? "⚠️ Risky elements found — proceed carefully."
          : "✅ Safe to proceed. No major red flags detected.";

    return res.status(200).json({
      success: true,
      totalScore: `${totalScore} `,
      passRate: `${((totalRiskChecks / checkResults.length) * 100).toFixed(
        1
      )}%`,
      riskLevel,
      verdict,
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
