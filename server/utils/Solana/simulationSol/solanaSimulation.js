const { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } = require("@solana/web3.js")
const { decideChains } = require("../../../config/provider")
const { getMint } = require("@solana/spl-token")

const simulateSolTranscation = async (_contracAddress, _userAddress, _amount, _currencySymbol) => {

    const provider = decideChains(_currencySymbol);

    // making public keys of addresses
    const userWalletPublicKey = new PublicKey(_userAddress)
    const contractPublicKey = new PublicKey(_contracAddress)

    // making tx-object
    const tx = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: userWalletPublicKey,
            toPubkey: contractPublicKey,
            lamports: Number(_amount)
        })
    )

    // get the recent blockhash & get payer
    const { blockhash } = await provider.getLatestBlockhash('finalized')
    tx.recentBlockhash = blockhash
    tx.feePayer = userWalletPublicKey

    // now convert this into randome words (serilization -> base64)
    const serilizedTx = tx.serialize({ requireAllSignatures: false })
    const base64Tx = serilizedTx.toString("base64")

    // now checking contract existence
    const existence = contractExistenceCheck(_currencySymbol, provider);

    if (!(await existence).exists) return { error: "Contract does not exist on Solana" }

    let programType = existence.isProgram
        ? await programTypeDetection(_contracAddress, provider)
        : "Regular Account (not Executable)"


    // mintAuthority check
    let mintDetail = null;
    if (programType === "SPL Token Program") {
        await mintAuthorityCheck(_contracAddress, provider);
    }

    // Balance
    const balance = await accountBalanceCheck(_userAddress, provider);

    // now calling actual simulation
    const result = await provider.simulateTransaction(tx, {
        sigVerify: false,
        replaceRecentBlockhash: false
    })

    // compute units from result
    const computeUnits = result.value.err || null

    // program call and filtering 
    const programCall = parseProgramCall(result.value.logs);

    // error detection 
    const txError = result.value.err || null

    // parsed logs 
    const parsedLogs = result.value.logs || []


    // Rent Exemtion Check
    const rentExemption = await rentExemptionCheck(contractPublicKey, provider);

    // FINAL RESULTS
    return {
        contract: _contracAddress,
        programType,
        mintDetail,
        balance,
        computeUnits,
        programCall,
        txError,
        parsedLogs,
        rentExemption
    }
}


// HELPER FUNCTIONS

// is program exists on SOL & executable
const contractExistenceCheck = async (c_address, provider) => {
    try {
        const cPubKey = new PublicKey(c_address)

        const accountStaus = await provider.getAccountInfo(cPubKey);

        if (accountStaus === null) {
            return {
                exists: false,
                isProgram: false
            }
        }

        return {
            exists: true,
            isProgram: accountStaus.executable === true
        }
    } catch (error) {
        return { exists: false, isProgram: false, error: error.message }
    }
}

// check if program is SPL-Token, SystemProgram, or custom
const programTypeDetection = async (c_address, provider) => {
    try {
        const cPubKey = new PublicKey(c_address);

        const accountInfo = await provider.getAccountInfo(cPubKey);

        if (accountInfo === null) {
            return "Invlaid Address"
        } else if (accountInfo.executable === false) {
            return "Not a program (just a data account)"
        } else {
            const knownPrograms = {
                "11111111111111111111111111111111": "System Program",
                "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA": "SPL Token Program",
                "Stake11111111111111111111111111111111111111": "Stake Program",
                "Vote111111111111111111111111111111111111111": "Vote Program"
            };

            return knownPrograms[c_address] || "Custom Program";
        }
    } catch (error) {
        return `Error ${error.message}`
    }
}

// check if minting of SPL-tokens infinite or not
const mintAuthorityCheck = async (c_address, provider) => {

    try {
        const minPubKey = new PublicKey(c_address);

        const mintInfo = await getMint(provider, minPubKey);

        return {
            mintAuthority: mintInfo.mintAuthority?.toBase58() || null,
            freezeAuthority: mintInfo.freezeAuthority?.toBase58() || null
        }
    } catch (error) {
        return { error: error.message }
    }
}

// account balance check
const accountBalanceCheck = async (_userAddress, _provider) => {
    try {
        const userPubKey = new PublicKey(_userAddress);

        const totalBalance = await _provider.getBalance(userPubKey);

        return totalBalance / LAMPORTS_PER_SOL;

    } catch (error) {
        return { error: error.message }
    }
}


// parsing programs from the logs 
const parseProgramCall = (logs = []) => {
    return logs
        .filter(l => l.includes("invoke"))
        .map(l => l.split("invoke")[1]?.trim())
}

const rentExemptionCheck = async (accountPubKey, provider) => {
    try {
        const accountInfo = await provider.getAccountInfo(accountPubKey)
        if (!accountInfo) return { exists: false, rentExempt: false }

        const mintRent = await provider.getMinimumBalanceForRentExemption(accountInfo.data.length);

        return {
            exists: true,
            rentExempt: accountInfo.lamports >= mintRent
        }
    } catch (error) {
        return { exists: false, rentExempt: false, error: error.message }
    }
}


module.exports = { simulateSolTranscation }