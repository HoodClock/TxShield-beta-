const { ethers } = require('ethers')
const { getAbi, getByteCode } = require('../../externals/etherscanService')
const callAimodel = require('../../externals/aiServices')
const { decideChains } = require('../../../config/provider')
const { extractStringsFromBytecode, extractUrls, safeFetch, parseAiResponse } = require('../../../utils/PhishingUtilities')
const MAX_URLS_BATCH = 50;

/**
 * AI Prompt Builder
 */
const buildPrompt = (urls) => `
You are a web security analyst. I will provide a list of URLs. For each URL return a JSON object with fields:
  - url: the original URL
  - label: one of "phishing", "suspicious", or "benign"
  - reason: one short sentence (max 20 words) explaining why you labeled it

Return **only** a JSON array (no extra text).
URLs:
${urls.join("\n")}
`;

/**
 * Main Phishing Domain Detector
 */
async function detectPhishingDomainLinks(contractAddress, currencySymbol, chainId) {
  const { provider } = decideChains(chainId);

  // 1. Data Collection Phase
  const abi = await getAbi(contractAddress, currencySymbol).catch(() => null);
  let candidateTexts = [];

  if (Array.isArray(abi)) {
    const contract = new ethers.Contract(contractAddress, abi, provider);

    // Get metadata strings (Name, Symbol, URIs)
    const metadataCalls = [
      contract.name?.().catch(() => ""),
      contract.symbol?.().catch(() => ""),
      contract.contractURI?.().catch(() => ""),
      contract.tokenURI?.(1).catch(() => ""), // Sample token IDs
      contract.uri?.(1).catch(() => "")
    ];

    const results = await Promise.all(metadataCalls);
    candidateTexts = results.filter(r => typeof r === "string" && r.length > 0);
  } else {
    // Fallback: Scan Bytecode
    const bytecode = await getByteCode(contractAddress, currencySymbol).catch(() => "");
    if (bytecode) candidateTexts.push(...extractStringsFromBytecode(bytecode));
  }

  // 2. URL Extraction & Recursive Fetching
  let foundUrls = extractUrls(candidateTexts.join(" "));
  const httpUrls = foundUrls.filter(u => u.startsWith("http")).slice(0, MAX_URLS_BATCH);
  const extraUrls = new Set();

  await Promise.all(httpUrls.map(async (url) => {
    const res = await safeFetch(url);
    if (res.ok) {
      const bodyText = typeof res.data === 'string' ? res.data : JSON.stringify(res.data);
      extractUrls(bodyText).forEach(u => extraUrls.add(u));
    }
  }));

  const allUrls = [...new Set([...foundUrls, ...Array.from(extraUrls)])].slice(0, MAX_URLS_BATCH);

  if (allUrls.length === 0) {
    return { hasSuspiciousLinks: false, foundLinks: [], phishingMatches: [], reason: "No URLs found." };
  }

  // 3. AI Analysis Phase
  try {
    const aiRaw = await callAimodel(buildPrompt(allUrls));
    const aiResults = parseAiResponse(aiRaw);

    const normalized = aiResults.map(r => ({
      url: String(r.url || "").trim(),
      label: String(r.label || "suspicious").toLowerCase(),
      reason: String(r.reason || "").trim(),
    })).filter(r => r.url);

    const phishingMatches = normalized.filter(r => r.label === "phishing" || r.label === "suspicious");

    return {
      hasSuspiciousLinks: phishingMatches.length > 0,
      foundLinks: allUrls,
      phishingMatches,
      reason: phishingMatches.length ? "AI detected phishing URLs" : "No phishing detected"
    };
  } catch (error) {
    return { hasSuspiciousLinks: false, foundLinks: allUrls, reason: `AI Error: ${error.message}` };
  }
}

module.exports = detectPhishingDomainLinks;