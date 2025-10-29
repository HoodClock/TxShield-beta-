const {
  PublicKey,
  SystemProgram,
  Transaction,
  Keypair
} = require("@solana/web3.js");
const { decideChains } = require("../../../config/provider");

const simulateSolTranscation = async (_userAddress, _contractAddress, _amount, _currencySymbol) => {
  try {
    const provider = decideChains(_currencySymbol);
    console.log("The currency symbol :", _currencySymbol);

    const userWalletPublicKey = new PublicKey(_userAddress);
    const contractPublicKey = new PublicKey(_contractAddress);

    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: userWalletPublicKey,
        toPubkey: contractPublicKey,
        lamports: Number(_amount),
      })
    );

    // blockhash & fee payer
    const { blockhash } = await provider.getLatestBlockhash("finalized");
    tx.recentBlockhash = blockhash;
    tx.feePayer = userWalletPublicKey;

    console.log("Prepared TX:", {
      feePayer: tx.feePayer.toBase58(),
      recentBlockhash: tx.recentBlockhash,
      instructionsCount: tx.instructions.length,
    });


    // checking contract existence 
    const existence = await contractExistenceCheck(contractPublicKey, provider);
    if (!existence.exists) {
      return { success: false, message: "Contract does not exist on Solana" }
    }

    // checking program type
    let programType = existence.isProgram
      ? await programTypeDetection(contractPublicKey, provider)
      : "Regular account (not Executable)"


    // checking mint Authority
    let mintDetail = null;
    if (programType === "SPL Token Program") {
      mintDetail = await mintAuthorityCheck(contractPublicKey, provider);
    }

    // checking account balance 
    const balance = await accountBalanceCheck(userWalletPublicKey, provider);

    // dummy signing to bypass validation
    const  dummyKeypair = Keypair.generate();
    tx.partialSign(dummyKeypair);

    // just simulating not signing
    const result = await provider.simulateTransaction(tx, {
      sigVerify: false,               // dummy signature check applied already for backend
      replaceRecentBlockhash: false,  // use provided blockhash
    });

    console.log("Simulation Result:", result);

    // now parsing log with the response 
    const computeUnits = result.value?.unitsConsumed || null;
    const programCall = parseProgramCall(result.value?.logs);
    const txError = result.value?.err || null;
    const parsedLogs = result.value?.logs || [];

    // exempting rents
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
      rentExemption
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
