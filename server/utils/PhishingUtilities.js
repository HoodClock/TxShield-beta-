const axios = require('axios');

const URL_REGEX = /https?:\/\/[^\s"'<>()]+(?:\.[^\s"'<()]+)+/gi;
const FETCH_TIMEOUT = 5000;

/**
 * Print-safe string extraction from raw bytecode
 */
function extractStringsFromBytecode(bytecode) {
  const hex = bytecode.startsWith('0x') ? bytecode.slice(2) : bytecode;
  const buf = Buffer.from(hex, 'hex');
  let strings = [];
  let current = "";

  for (const byte of buf) {
    if (byte >= 32 && byte <= 126) {
      current += String.fromCharCode(byte);
    } else {
      if (current.length > 4) strings.push(current);
      current = "";
    }
  }
  return [...new Set(strings)];
}

/**
 * Extracts unique URLs from text using a secure Regex
 */
function extractUrls(text = "") {
  if (!text || typeof text !== 'string') return [];
  const matches = text.match(URL_REGEX) || [];
  return [...new Set(matches.map(u => u.trim().replace(/[,.)]+$/, "")))].filter(Boolean);
}

/**
 * Securely fetches content from a URL to scan for more links
 */
async function safeFetch(url) {
  try {
    const res = await axios.get(url, {
      timeout: FETCH_TIMEOUT,
      headers: { "User-Agent": "TxShield/1.0" },
      validateStatus: (status) => status < 400
    });
    return { ok: true, data: res.data };
  } catch (error) { // Fixed: variable name changed from err to error
    return { ok: false, error: error.message || "fetch_error" };
  }
}

/**
 * Cleans and parses messy AI JSON responses
 */
function parseAiResponse(raw) {
  try {
    const parsed = JSON.parse(raw.replace(/```json|```/gi, "").trim());
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {
    const results = [];
    const lines = raw.split("\n");
    for (const line of lines) {
      try {
        const start = line.indexOf("{");
        const end = line.lastIndexOf("}");
        if (start >= 0 && end > start) {
          const obj = JSON.parse(line.slice(start, end + 1));
          if (obj.url) results.push(obj);
        }
      } catch (err) {}
    }
    return results;
  }
  return [];
}

module.exports = {
  extractStringsFromBytecode,
  extractUrls,
  safeFetch,
  parseAiResponse
};