const {
  PublicKey,
  LAMPORTS_PER_SOL,
  Transaction,
  VersionedTransaction,
} = require("@solana/web3.js");
const { decideChains } = require("../../../config/provider");
const { getMint } = require("@solana/spl-token");

const simulateSolTranscation = async (_signedTxBase64, _userAddress, _contractAddress, _amount, _currencySymbol) => {
  try {
    const provider = decideChains(_currencySymbol);
    if (!provider) throw new Error("Invalid provider configuration");

    // Deserialization Logic
    const txBuffer = Buffer.from(_signedTxBase64, "base64");
    let tx;
    try {
      tx = VersionedTransaction.deserialize(txBuffer);
    } catch {
      try {
        tx = Transaction.from(txBuffer);
      } catch (err) {
        throw new Error("Invalid transaction format: Failed to deserialize.");
      }
    }

    const userWalletPublicKey = new PublicKey(_userAddress);
    const contractPublicKey = new PublicKey(_contractAddress);

    // Pre-Simulation Checks
    const existence = await contractExistenceCheck(contractPublicKey, provider);
    const programType = existence.isProgram
      ? await programTypeDetection(contractPublicKey, provider)
      : "Regular account";

    let mintDetail = null;
    if (programType.includes("Token Program")) {
      mintDetail = await mintAuthorityCheck(contractPublicKey, provider);
    }

    // Execution (The Simulation)
    // replaceRecentBlockhash: true is the KEY to simulate with 0 SOL
    const simulationOptions = {
      sigVerify: false,
      commitment: 'confirmed',
      replaceRecentBlockhash: true
    };

    const result = await provider.simulateTransaction(tx, simulationOptions);
    const simValue = result.value;

    if (!simValue) throw new Error("Simulation returned empty response.");

    // Forensics & Balance Extraction
    // We capture the state change of the user wallet specifically
    const balance = await accountBalanceCheck(userWalletPublicKey, provider);

    return {
      success: true,
      message: "Simulation Completed",
      contract: contractPublicKey.toBase58(),
      programType,
      mintDetail,
      balance,
      computeUnits: simValue.unitsConsumed || 0,
      programCall: parseProgramCall(simValue.logs),
      txError: simValue.err,
      parsedLogs: simValue.logs || [],
      // Essential for sumUpAllFeatures forensics:
      accounts: tx.message.staticAccountKeys || [],
      preBalances: [], // Placeholder: handled by connection in sumUpAllFeatures
      postBalances: simValue.accounts || [],
      rentExemption: await rentExemptionCheck(contractPublicKey, provider)
    };

  } catch (error) {
    console.error("Simulation BEAST Error:", error.message);
    return { success: false, message: error.message };
  }
};

// =======================
// HELPER FUNCTIONS (Optimized)
// =======================

const contractExistenceCheck = async (cPubKey, provider) => {
  const accountStatus = await provider.getAccountInfo(cPubKey);
  return { exists: !!accountStatus, isProgram: accountStatus?.executable === true };
};

const programTypeDetection = async (cPubKey, provider) => {
  const knownPrograms = {
    "11111111111111111111111111111111": "System Program",
    "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA": "SPL Token Program",
    "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb": "Token-2022 Program",
    "ComputeBudget111111111111111111111111111111": "Compute Budget"
  };
  const addr = cPubKey.toBase58();
  if (knownPrograms[addr]) return knownPrograms[addr];

  const info = await provider.getAccountInfo(cPubKey);
  return info?.executable ? "Custom Program" : "Data Account";
};

const mintAuthorityCheck = async (cPubKey, provider) => {
  try {
    const mintInfo = await getMint(provider, cPubKey);
    return {
      mintAuthority: mintInfo.mintAuthority?.toBase58() || null,
      freezeAuthority: mintInfo.freezeAuthority?.toBase58() || null,
      decimals: mintInfo.decimals
    };
  } catch { return null; }
};

const accountBalanceCheck = async (pubKey, provider) => {
  const bal = await provider.getBalance(pubKey);
  return bal / LAMPORTS_PER_SOL;
};

const parseProgramCall = (logs = []) => {
  return [...new Set(
    logs
      .filter(l => l.includes("invoke") && l.includes("Program"))
      .map(l => {
        const parts = l.split("Program ");
        if (parts.length > 1) {
          return parts[1].split(" invoke")[0].trim();
        }
        return null;
      })
      .filter(addr => addr !== null)
  )];
};

const rentExemptionCheck = async (pubKey, provider) => {
  const info = await provider.getAccountInfo(pubKey);
  if (!info) return { exists: false, rentExempt: false };
  const min = await provider.getMinimumBalanceForRentExemption(info.data.length);
  return { exists: true, rentExempt: info.lamports >= min };
};

module.exports = { simulateSolTranscation };