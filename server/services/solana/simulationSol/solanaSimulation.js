const {
  PublicKey,
  LAMPORTS_PER_SOL,
  Transaction,
  VersionedTransaction,
} = require("@solana/web3.js");
const { decideChains } = require("../../../config/provider");
const { getMint } = require("@solana/spl-token")
const { checkTokenMetaDataIntegrity } = require("./advancedChecks")


const simulateSolTranscation = async (_signedTxBase64, _userAddress, _contractAddress, _amount, _currencySymbol) => {
  try {
    const provider = decideChains(_currencySymbol);

    if (!provider || !provider.simulateTransaction) {
      throw new Error("Invalid provider configuration");
    }

    // Validate and deserialize transaction
    if (!_signedTxBase64) {
      throw new Error("Signed transaction is required");
    }

    const txBuffer = Buffer.from(_signedTxBase64, "base64")
    let tx;
    try {
      tx = VersionedTransaction.deserialize(txBuffer);
    } catch (VersionedError) {
      try {
        // its fall-back
        tx = Transaction.from(txBuffer);
      } catch (legacyError) {
        console.error("Both transaction deserialization failed:", {
          versionedError: versionedError.message,
          legacyError: legacyError.message
        });
        throw new Error("Invalid transaction format - neither Versioned nor Legacy");
      }
    }

    let userWalletPublicKey, contractPublicKey;
    try {
      userWalletPublicKey = new PublicKey(_userAddress);
      contractPublicKey = new PublicKey(_contractAddress);
    } catch (pubKeyError) {
      throw new Error(`Invalid public key: ${pubKeyError.message}`);
    }


    // make sure contract exists on solana
    const existence = await contractExistenceCheck(contractPublicKey, provider);
    if (!existence.exists) {
      return { success: false, message: "Contract does not exist on Solana" };
    }

    // program type check
    let programType = existence.isProgram
      ? await programTypeDetection(contractPublicKey, provider)
      : "Regular account (not Executable)";

    // mint authority (only for SPL)
    let mintDetail = null;
    if (programType === "SPL Token Program") {
      mintDetail = await mintAuthorityCheck(contractPublicKey, provider);
    }

    // mint address for advanced Checks
    let mintAddress = null;
    if (programType === "SPL Token Program" && mintDetail?.mintAuthority !== undefined) {
      mintAddress = _contractAddress
    }

    const advancedCheckResponse = mintAddress
      ? await checkTokenMetaDataIntegrity(provider, mintAddress)
      : { error: "Not an SPL token mint" }

    // balance check
    const balance = await accountBalanceCheck(userWalletPublicKey, provider);

    // Actual simulate transaction signed by frontend wallet
    let result;
    try {
      result = await provider.simulateTransaction(tx, {
        sigVerify: false, // since it’s signed on frontend
        commitment: 'confirmed'
      });

    } catch (simError) {
      console.error("Simulation failed:", simError);
      throw new Error(`Transaction simulation failed: ${simError.message}`);
    }


    // parse results
    const computeUnits = result.value?.unitsConsumed || null;
    const programCall = parseProgramCall(result.value?.logs);
    const txError = result.value?.err || null;
    const parsedLogs = result.value?.logs || [];

    // rent exemption
    const rentExemption = await rentExemptionCheck(contractPublicKey, provider);

    return {
      success: true,
      message: "Transaction simulated successfully",
      contract: contractPublicKey.toBase58(),
      programType,
      mintDetail,
      balance,
      computeUnits,
      programCall,
      txError,
      parsedLogs,
      rentExemption,
      advancedChecks: advancedCheckResponse
    };

  } catch (error) {
    console.error("Error in simulateSolTranscation:", error);
    return { success: false, message: error.message };
  }
};


// =======================
// 🔧 HELPER FUNCTIONS
// =======================

// Check if contract exists and executable
const contractExistenceCheck = async (c_address, provider) => {
  try {
    const cPubKey = new PublicKey(c_address);
    const accountStatus = await provider.getAccountInfo(cPubKey);

    if (!accountStatus) return { exists: false, isProgram: false };
    return { exists: true, isProgram: accountStatus.executable === true };
  } catch (error) {
    return { exists: false, isProgram: false, error: error.message };
  }
};

// Detect program type
const programTypeDetection = async (c_address, provider) => {
  try {
    const cPubKey = new PublicKey(c_address);
    const accountInfo = await provider.getAccountInfo(cPubKey);

    if (!accountInfo) return "Invalid Address";
    if (!accountInfo.executable) return "Not a program (data account)";

    const knownPrograms = {
      "11111111111111111111111111111111": "System Program",
      "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA": "SPL Token Program",
      "Stake11111111111111111111111111111111111111": "Stake Program",
      "Vote111111111111111111111111111111111111111": "Vote Program"
    };

    return knownPrograms[c_address] || "Custom Program";
  } catch (error) {
    return `Error: ${error.message}`;
  }
};

// Mint authority check for SPL tokens
const mintAuthorityCheck = async (c_address, provider) => {
  try {
    const minPubKey = new PublicKey(c_address);
    const mintInfo = await getMint(provider, minPubKey);
    return {
      mintAuthority: mintInfo.mintAuthority?.toBase58() || null,
      freezeAuthority: mintInfo.freezeAuthority?.toBase58() || null
    };
  } catch (error) {
    return { error: error.message };
  }
};

// Check account balance
const accountBalanceCheck = async (_userAddress, _provider) => {
  try {
    const userPubKey = new PublicKey(_userAddress);
    const totalBalance = await _provider.getBalance(userPubKey);
    return totalBalance / LAMPORTS_PER_SOL;
  } catch (error) {
    return { error: error.message };
  }
};

// Parse invoked programs from logs
const parseProgramCall = (logs = []) => {
  return logs
    ?.filter(l => l.includes("invoke"))
    .map(l => l.split("invoke")[1]?.trim()) || [];
};

// Rent exemption status
const rentExemptionCheck = async (accountPubKey, provider) => {
  try {
    const accountInfo = await provider.getAccountInfo(accountPubKey);
    if (!accountInfo) return { exists: false, rentExempt: false };

    const rentMin = await provider.getMinimumBalanceForRentExemption(accountInfo.data.length);
    return {
      exists: true,
      rentExempt: accountInfo.lamports >= rentMin
    };
  } catch (error) {
    return { exists: false, rentExempt: false, error: error.message };
  }
};

module.exports = { simulateSolTranscation };
