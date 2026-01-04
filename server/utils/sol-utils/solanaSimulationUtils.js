const { LAMPORTS_PER_SOL } = require("@solana/web3.js");

/**
 * Central Dictionary for Program Identification.
 * Maps Solana program IDs to their real-world identities.
 */
const KNOWN_PROGRAMS = {
    "11111111111111111111111111111111": "System Program (SOL Transfer)",
    "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA": "SPL Token Program",
    "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb": "Token-2022 Program",
    "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL": "Associated Token Account Program",
    "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8": "Raydium Liquidity Pool V4",
    "JUP6LkbZbjS1jKKppHSfJ6S3MAs7pA4p2Gsc9oBTH6S": "Jupiter V6 Aggregator",
    "ComputeBudget111111111111111111111111111111": "Compute Budget Program",
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s": "Metaplex Metadata Program",
    "whirLbMiq69skRyH7S3En7SshYS6hQUkRRQU69shQUk": "Orca Whirlpool",
    "6EF8rrecthR5Dkzon8Nwuxe8KLpMH9p7X66X8WM5p": "Pump.fun Program"
};

/**
 * Translates InstructionErrors into plain, brutal English for TxShield users.
 */
const translateSolanaError = (err) => {
    if (!err) return "Transaction execution verified: Safe.";
    
    const errorStr = JSON.stringify(err);
    
    // Mapping signatures of common drainers and failures
    if (errorStr.includes("ReadonlyLamportChange")) return "DANGER: Malicious activity detected. This transaction is trying to drain funds from a read-only account.";
    if (errorStr.includes("InsufficientFunds")) return "ALERT: Your wallet does not have enough SOL/Tokens to complete this transaction.";
    if (errorStr.includes("AccountNotFound")) return "WARNING: The recipient account is not initialized. Sending funds here might result in loss if not careful.";
    if (errorStr.includes("SlippageExceeded") || errorStr.includes("0x1771")) return "TRADE ALERT: Slippage too high. The price moved too much, and the transaction will fail.";
    if (errorStr.includes("BlockhashNotFound")) return "NETWORK ERROR: Transaction expired. Please refresh and try again.";
    
    return `EXECUTION FAILED: ${errorStr}`;
};

/**
 * Maps account indexes to their SOL balance changes.
 * This is how you show the user: "You lose 0.5 SOL, you gain nothing."
 */
const calculateSolBalanceChanges = (preBalances, postBalances, accountKeys) => {
    if (!preBalances || !postBalances || !accountKeys) return [];

    return preBalances.map((pre, i) => {
        const post = postBalances[i] || 0;
        const diff = (post - pre) / LAMPORTS_PER_SOL;
        const address = accountKeys[i]?.toBase58 ? accountKeys[i].toBase58() : accountKeys[i];

        return {
            address,
            pre: pre / LAMPORTS_PER_SOL,
            post: post / LAMPORTS_PER_SOL,
            change: diff.toFixed(6),
            type: diff < 0 ? "OUTGOING" : (diff > 0 ? "INCOMING" : "STABLE")
        };
    }).filter(acc => parseFloat(acc.change) !== 0);
};

/**
 * Returns the Program Name or "Unknown" if it's a new/risky protocol.
 */
const identifyProgram = (programId) => {
    return KNOWN_PROGRAMS[programId] || `Unknown/Untrusted Program (${programId})`;
};

module.exports = {
    translateSolanaError,
    calculateSolBalanceChanges,
    identifyProgram
};