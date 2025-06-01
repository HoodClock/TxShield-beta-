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

    const abi = await getAbi(address);

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
        : "✅ Safe to proceed with caution. No major red flags detected.";

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
