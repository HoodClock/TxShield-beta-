const {
  evmHoneypotValidator,
} = require("../../validators/evm/evmHoneypot.validator");
const {
  getAbi,
  isContract,
} = require("../../services/externals/etherscanService");
const { normalizesAddresses } = require("../../utils/normalizeAddresses");
const { calculateRisks } = require("../../utils/calculateHoneypotRisks.utils");
const {
  detectBlackList,
  detectDisableTransfer,
  detectFakeBalance,
  detectGasTrap,
  detectHiddenOwnerFuncs,
  detectHighSellTax,
  detectHoneypotBuySellTrap,
  detectMintAccess,
  detectTradingControl,
} = require("../../services/evm/honeypot/index");

// master controllers of Honeypot Services
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

    // check if it is really a contract
    const contract_address = await isContract(contractAddress, currencySymbol);

    if (!contract_address) {
      return res.status(200).json({
        success: true,
        message: "Recipient is a wallet address. Honeypot checks skipped.",
        verdict: "ℹ️ This is a wallet address. No contract risks detected.",
      });
    }

    // payload for normilizing addresses
    const addressesTobeNormalized = {
      address,
      contractAddress,
      tokenAddress,
      recepientAddress,
    };

    const normalizedAddresses = normalizesAddresses(addressesTobeNormalized);

    // payload for validation
    const validationPayload = {
      ...normalizedAddresses,
      value,
      currencySymbol,
    };
    // call the validator
    const validityOfPayload = evmHoneypotValidator(validationPayload);

    if (!validityOfPayload.success) {
      return res.status(401).json(validityOfPayload.message);
    }

    // ✅ Fetch ABI once only
    const abi = await getAbi(
      normalizedAddresses.normalrecepientAddress,
      currencySymbol,
    );

    // Build context to gather all the payload we need in all honeypot detectors (normalized_one's)
    const context = {
      abi,
      contractAddress: normalizedAddresses.normalcontractAddress,
      tokenAddress: normalizedAddresses.normaltokenAddress,
      userAddress,
      recepientAddress: normalizedAddresses.normalrecepientAddress,
      value,
      currencySymbol,
      fromAddress: normalizedAddresses.normalAddress,
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
      detectBlackList(context.contractAddress, context.abi),
      detectDisableTransfer(context.contractAddress, context.abi),
      detectFakeBalance(context.contractAddress, context.abi),
      detectGasTrap(
        context.contractAddress,
        context.userAddress,
        context.value,
        context.currencySymbol,
      ),
      detectHiddenOwnerFuncs(context.contractAddress, context.abi),
      detectHighSellTax(
        context.contractAddress,
        context.abi,
        context.currencySymbol,
      ),
      detectHoneypotBuySellTrap(
        context.contractAddress,
        context.userAddress,
        context.value,
        context.currencySymbol,
      ),
      detectMintAccess(context.contractAddress, context.abi),
      detectTradingControl(context.abi),
    ]);

    const allChecks = [
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

    const totalWeightedSum = allChecks.reduce((sum, check) => {
      return sum + (check?.risk ? check?.score || 0 : 0);
    }, 0);

    const riskSummeryWithScoring = calculateRisks(totalWeightedSum);

    // Final Result (all checks + riskScoring)
    return res.status(200).json({
      success: true,
      totalScore: riskSummeryWithScoring.totalScore,
      riskLevel: riskSummeryWithScoring.riskLevel,
      verdict: riskSummeryWithScoring.verdict,
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
