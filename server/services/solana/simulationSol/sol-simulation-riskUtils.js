const SOLANA_RISK_WEIGHTS = {
    FREEZE_AUTHORITY_ENABLED: 45, // Critical: Dev can lock wallet
    MINT_AUTHORITY_ENABLED: 35,   // High: Dev can print infinite tokens
    MUTABLE_METADATA: 15,         // Medium: Metadata can be changed to a phishing link
    TX_SIMULATION_FAILED: 100,    // Critical: Transaction is broken or a drainer
    READONLY_LAMPORT_CHANGE: 90,  // Critical: Signature of a balance-draining exploit
    UNKNOWN_PROGRAM_INVOKE: 25,   // Medium: Interacting with an unverified program
    RENT_NOT_EXEMPT: 10,          // Low: Account could be purged from state
};

/** 
 * @prompt : sim_result, mintDetail, advanceChecks
 * @return : return verdict
 */


const calculateSolanaRisk = (simResult, mintDetail, advanceChecks) => {
    let score = 0
    let flags = []

    // tx_simulation_risks
    if (simResult.txError) {
        score += SOLANA_RISK_WEIGHTS.TX_SIMULATION_FAILED
        flags.push("TRANSACTION_FAILED")

        if (JSON.stringify(simResult.txError).includes("ReadonlyLamportChange")) {
            score += SOLANA_RISK_WEIGHTS.READONLY_LAMPORT_CHANGE;
            flags.push("POTENTIAL DRAINER DETECTED")
        }
    }

    // permissions_risks (ownerShip)
    if (mintDetail) {
        if (mintDetail.freezeAuthority) {
            score += SOLANA_RISK_WEIGHTS.FREEZE_AUTHORITY_ENABLED;
            flags.push("FREEZE AUTHORITY ACTIVE");
        }
        if (mintDetail.mintAuthority) {
            score += SOLANA_RISK_WEIGHTS.MINT_AUTHORITY_ENABLED;
            flags.push("MINT AUTHORITY ACTIVE");
        }
    }

    // metadata_risks
    if (advanceChecks && !advanceChecks.error) {
        if (advanceChecks.offChainData?.mutable !== false) {
            score += SOLANA_RISK_WEIGHTS.MUTABLE_METADATA;
            flags.push("MUTABLE_METADATA");
        }
    }

    // unknown_program_interaction
    if (simResult.programCall && simResult.programCall.length > 0) {
        const hasUnknown = simResult.programCall.some(p => p.includes("Unknown"));
        if (hasUnknown) {
            score += SOLANA_RISK_WEIGHTS.UNKNOWN_PROGRAM_INVOKE;
            flags.push("UNVERIFIED PROGRAM INTERACTION");
        }
    }

    // final_verdict
    let riskLevel = "SAFE"
    if (score >= 80) riskLevel = "CRITICAL"
    else if (score >= 50) riskLevel = "HIGH"
    else if (score >= 20) riskLevel = "MEDIUM"

    return {
        totalRiskScore: Math.min(score, 100),
        riskLevel,
        flags,
        isSafe: score < 50
    }
}

module.exports = { calculateSolanaRisk }
