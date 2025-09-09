const {ethers} = require('ethers')
const axios = require('axios')
const provider = require('../../config/provider')
const {getAbi, getByteCode} = require('../../services/etherscanService')
const callAimodel = require('../../services/aiServices')


const URL_REGEX = /https?:\/\/[^\s"']+/gi;
const MAX_URLS_BATCH = 50;
const FETCH_TIMEOUT = 5000; // 5 sec


// secure fetching JSON
async function safeFetch(url){

    try {
        const res = await axios.get(url, {timeout: FETCH_TIMEOUT, headers: {"User-Agent": "TxShield/1.0"}})
        return {ok: true, data: res.data, contentType: res.headers["content-type"] || ""}
    } catch (error) {
        return { ok: false, error: err.message || "fetch_error" };
    }

}

// extractiing urls from the safe-fetch JSON data
function extractUrls(text = ""){
    if (!text || typeof text !== 'string') return [];
    const matches = text.match(URL_REGEX) || []; 
    return matches.map(u => u.trim().replace(/[,.)]+$/,"")).filter(Boolean);
}

// now pompting Deepseek R1 model
function buildPrompt(urls){
    return `
You are a web security analyst. I will provide a list of URLs. For each URL return a JSON object with fields:
  - url: the original URL
  - label: one of "phishing", "suspicious", or "benign"
  - reason: one short sentence (max 20 words) explaining why you labeled it

Return **only** a JSON array (no extra text). Example:
[
  {"url":"https://example.xyz","label":"phishing","reason":"domain imitates metamask + contains 'airdrop' path"},
  ...
]

URLs:
${urls.join("\n")}
`;
}

// now parsing AI response into array of obj's and if the parsing fails do line-based
function parseAiResponse(raw){
    try {
        const parsedRes = JSON.parse(raw)
        if (Array.isArray(parsedRes)) return parsedRes;
    } catch (error) {
        try {
            // Remove markdown code fences and non-JSON text
            let cleaned = raw
              .replace(/```json/gi, "")
              .replace(/```/g, "")
              .replace(/^[^{\[]+/, "") // strip leading junk before JSON
              .replace(/[^}\]]+$/, ""); // strip trailing junk after JSON
      
            // Attempt parse after cleanup
            const parsed = JSON.parse(cleaned);
            if (Array.isArray(parsed)) return parsed;
          } catch {
            // If still failing, fall back to line-by-line salvage below
          }
    }

     // Final fallback: extract JSON-like objects from messy text
  const lines = raw.split("\n").map(l => l.trim()).filter(Boolean);
  const results = [];
  for (const line of lines) {
    try {
      const start = line.indexOf("{");
      const end = line.lastIndexOf("}");
      if (start >= 0 && end > start) {
        const piece = line.slice(start, end + 1);
        const obj = JSON.parse(piece);
        if (obj.url) results.push(obj);
      }
    } catch {
      // Ignore bad lines, keep going
    }
  }
  return results;
}

// Extract readable strings from bytecode
function extractStringsFromBytecode(bytecode) {
    const hex = bytecode.startsWith('0x') ? bytecode.slice(2) : bytecode;
    const buf = Buffer.from(hex, 'hex');
    const text = buf.toString('utf8');
    const printable = text.replace(/[^\x20-\x7E]+/g, '\n'); // keep readable chars
    return printable.split('\n').map(s => s.trim()).filter(Boolean);
  }
  


async function detectPhishingDomainLinks(contractAddress, currencySymbols) {
    
    if (!ethers.isAddress(contractAddress)) {
        throw new Error("Invalid contract address");
    }

    const abi = await getAbi(contractAddress, currencySymbols).catch(() => null);

    // getting name/symbol/tokenURI/ContractURI from the ABI
    let candidateTexts = [];
    if (Array.isArray(abi)) {
        const contract = new ethers.Contract(contractAddress, abi, provider);
      
        try {
          const name = await contract.name?.().catch(() => "");
          if (name) candidateTexts.push(String(name));
        } catch {}
      
        try {
          const symbol = await contract.symbol?.().catch(() => "");
          if (symbol) candidateTexts.push(String(symbol));
        } catch {}
      
        // Try token metadata URIs
        const tokenIdCandidates = [1, 0, 2]; // Multiple common IDs
        for (const tid of tokenIdCandidates) {
          try {
            if (typeof contract.tokenURI === "function") {
              const uri = await contract.tokenURI(tid).catch(() => "");
              if (uri) candidateTexts.push(String(uri));
            }
          } catch {}
      
          try {
            if (typeof contract.uri === "function") { // ERC1155 style
              const uri = await contract.uri(tid).catch(() => "");
              if (uri) candidateTexts.push(String(uri));
            }
          } catch {}
        }
      
        try {
          if (typeof contract.contractURI === "function") {
            const cu = await contract.contractURI().catch(() => "");
            if (cu) candidateTexts.push(String(cu));
          }
        } catch {}
    }else{
        // ABI not found → fallback to bytecode scanning
        const bytecode = await getByteCode(contractAddress, currencySymbols).catch(() => "");
        if (bytecode) {
            const strings = extractStringsFromBytecode(bytecode);
            candidateTexts.push(...strings);
        }
    }

    // extracting urls from on-chain strings
    let foundUrls = extractUrls(candidateTexts.join(" "));
    foundUrls = [...new Set(foundUrls)];

    // every url that looks like HTTP => try to fetch them extract more
    const httpUrls = foundUrls.filter(u => u.startsWith("http")).slice(0, MAX_URLS_BATCH);
    const extraUrls = new Set();

    // fetch in paralell to mantain concurrency 
    await Promise.all(httpUrls.map(async (url)=> {
        const res = await safeFetch(url);
        if (res.ok){
            const bodyText = (typeof res.data === 'string') ? res.data : JSON.stringify(res.data);
            extractUrls(bodyText).forEach(u => extraUrls.add(u));
        }
    }))

    // gathering total urls for the AI analyzing
    const allUrls = [...new Set([...foundUrls, ...Array.from(extraUrls)])].slice(0, MAX_URLS_BATCH);
    
    if (allUrls.length === 0){
        return {
            hasSuspiciousLinks: false,
            foundLinks: [],
            phishingMatches: [],
            aiRaw: null,
            reason: "No URL's found in on-chain metadata"
        }
    }

    // now lets model handle the All URls and fetch the malicaious and leave the false positives also
    const prompt = buildPrompt(allUrls)
    let aiRaw;
    
    try {
        aiRaw = await callAimodel(prompt);
    } catch (error) {
        return {
            hasSuspiciousLinks: false,
            foundLinks: allUrls,
            phishingMatches: [],
            aiRaw: null,
            reason: `Ai classifiaction failed ${error.message}`
        }    
    }

    // now finally parsing AI response 
    const aiResults = parseAiResponse(aiRaw)
    // Normalize: ensure url + label
    const normalized = aiResults.map(r => ({
        url: String(r.url || "").trim(),
        label: String(r.label || "suspicious").toLowerCase(),
        reason: String(r.reason || "").trim(),
    })).filter(r => r.url);
  
    const phishingMatches = normalized.filter(r => r.label === "phishing" || r.label === "suspicious");

    // now returning final response if AI found phishing, suspicious links also
    return {
        hasSuspiciousLinks: phishingMatches.length > 0,
        foundLinks: allUrls,
        phishingMatches,
        aiRaw,
        reason: phishingMatches.length ? "AI detected suspicious/phishin URLs in metadata": "No phishing URLs detected by AI"
    }

}


module.exports = detectPhishingDomainLinks
