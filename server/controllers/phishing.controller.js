const phishingHelper = require("../helpers/phishing.helper");
const { getAddress } = require("ethers");

const isCheckFailed = (name, data) => {
  if (!data || typeof data !== "object") return false;

  // 1) Generic flags first
  for (const [k, v] of Object.entries(data)) {
    const key = k.toLowerCase();
    if (v === true && (key.includes("scam") || key.includes("malicious") || key.includes("phishing") || key.includes("suspicious"))) {
      return true;
    }
    if (Array.isArray(v) && v.length > 0 && (key.includes("phishing") || key.includes("matches"))) {
      return true;
    }
  }

  // 2) Heuristics per known shapes (conservative)
  if ("isScam" in data) return data.isScam === true; // approveScam, etherForwarding often include this
  if (name === "domainCheck") return data.hasSuspiciousLinks === true;
  if (name === "proxyScam") {
    const ar = data.analysisResult || {};
    if (ar && (ar.isMalicious === true || ar.malicious === true || ar.suspicious === true)) return true;
    // Proxy without implementation could be risky
    if (data.isProxy === true && data.implementationFound === false) return true;
    return false;
  }
  if (name === "permitCheck") {
    // Only fail if explicitly flagged as scam/suspicious in object
    return !!(data.isScam === true || data.suspicious === true);
  }

  return false;
};

const countAmbiguousSignals = (checks) => {
  let n = 0;
  const { approveScam, etherForwarding, proxyScam, permitCheck, domainCheck } = checks || {};

  // CALL-heavy but not flagged as scam
  if (etherForwarding && etherForwarding.checks && typeof etherForwarding.checks.callOpcodeCount === "number" && etherForwarding.isScam !== true) {
    n += 1;
  }
  // Legit proxy pattern (proxy + implementation found)
  if (proxyScam && proxyScam.isProxy === true && proxyScam.implementationFound === true) n += 1;
  // Permit present but not flagged
  if (permitCheck && (permitCheck.hasPermit === true || permitCheck.hasPermitFunction === true || permitCheck.permitDetected === true) && permitCheck.isScam !== true) n += 1;
  // Links present but not phishing
  if (domainCheck && Array.isArray(domainCheck.foundLinks) && domainCheck.foundLinks.length > 0 && domainCheck.hasSuspiciousLinks !== true) n += 1;

  return n;
};

const MasterPhishingController = async (req, res) => {
  const { userAddress, recepientAddress, currencySymbol } = req.body;

  try {
    const checkSumRecepientAddress = getAddress(recepientAddress);

    const [approveScam, etherForwarding, proxyScam, permitCheck, domainCheck] = await Promise.all([
      phishingHelper.phishingApproveScam(userAddress, recepientAddress, currencySymbol),
      phishingHelper.phishingEtherForwardScam(checkSumRecepientAddress),
      phishingHelper.phishingMaliciousProxy(checkSumRecepientAddress, currencySymbol),
      phishingHelper.phishingPermit(checkSumRecepientAddress, currencySymbol),
      phishingHelper.phishingDomainLink(checkSumRecepientAddress, currencySymbol),
    ]);

    const checks = { approveScam, etherForwarding, proxyScam, permitCheck, domainCheck };
    const totalChecks = 5;

    const failedChecks = Object.entries(checks).reduce(
      (acc, [name, check]) => acc + (isCheckFailed(name, check?.data) ? 1 : 0),
      0
    );

    let phishingScore = (failedChecks / totalChecks) * 100;

    // Conservative downgrade
    const ambiguous = countAmbiguousSignals(
      Object.fromEntries(
        Object.entries(checks).map(([name, check]) => [name, check?.data])
      )
    );

    if (failedChecks <= 2 && ambiguous > 0) {
      phishingScore = Math.min(phishingScore, 40);
    }

    // Risk mapping
    let riskLevel = "low";
    if (phishingScore >= 70) riskLevel = "critical";
    else if (phishingScore >= 50) riskLevel = "high";
    else if (phishingScore >= 30) riskLevel = "medium";

    // Confidence: fewer fails & more ambiguity → lower confidence
    let confidence = "high";
    if (failedChecks === 0) confidence = "high";
    else if (failedChecks <= 2) confidence = ambiguous > 0 ? "medium" : "medium";
    else confidence = "low";

    const phishingVerdict = {
      phishingScore: Math.round(phishingScore),
      riskLevel,
      confidence,
    };

    return res.status(200).json({
      success: true,
      checks,
      phishingVerdict,
    });
  } catch (err) {
    console.error("Phishing check error:", err.message);
    return res.status(500).json({ success: false, error: "Internal phishing analysis error" });
  }
};

module.exports = MasterPhishingController;
