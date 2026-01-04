const { simulateSolTranscation } = require('./solanaSimulation')
const { checkTokenMetaDataIntegrity } = require('./advancedChecks')
const { calculateSolanaRisk } = require('./sol-simulation-riskUtils')
const { translateSolanaError, identifyProgram } = require('../../../utils/sol-utils/solanaSimulationUtils')
const { decideChains } = require('../../../config/provider')

async function sumUpAllFeatures(_connection, _contractAddress, _userAddress, _amount, _currencySymbol) {
    try {

        // fetching the provider
        const _provider = decideChains(_currencySymbol);

        // Run Simulation and Audit in Parallel for Speed
        const [simResult, auditResult] = await Promise.all([
            simulateSolTranscation(_connection, _userAddress, _contractAddress, _amount, _currencySymbol),
            checkTokenMetaDataIntegrity(_provider, _contractAddress)
        ]);

        if (!simResult.success) {
            return { success: false, message: `Simulation Failed: ${simResult.message}` };
        }

        // Decode Program Invocations
        // we are gonna turn those messy logs into a list of real program names
        const invokedPrograms = (simResult.programCall || []).map(id => ({
            name: identifyProgram(id),
            address: id
        }));

        const cleanAudit = auditResult.success ? auditResult : {status: "Not a Token Mint", risks: []}

        // Verdict: Calculate Risk Score
        // This combines what the code DID (Simulation) with what the dev CAN DO (Audit)
        const riskVerdict = calculateSolanaRisk(simResult, simResult.mintDetail, cleanAudit);

        // SOL Balance Change
        // In a simulation, if it fails, change is 0. If it succeeds, it's the amount + fees.
        const netChange = simResult.txError ? 0 : -(parseFloat(_amount) || 0);

        // 5. Final Combined Payload
        return {
            success: true,
            verdict: {
                riskLevel: riskVerdict.riskLevel,
                score: riskVerdict.totalRiskScore,
                isSafe: riskVerdict.isSafe,
                humanReason: translateSolanaError(simResult.txError)
            },
            securityFlags: riskVerdict.flags,
            simulation: {
                status: simResult.txError ? "FAILED" : "SUCCESS",
                computeUnits: simResult.computeUnits,
                programsInvoked: invokedPrograms,
                walletBalance: simResult.balance,
                estimatedChange: `${netChange} SOL`,
                logs: simResult.parsedLogs
            },
            tokenAudit: auditResult.success ? {
                name: auditResult.name,
                symbol: auditResult.symbol,
                isMutable: auditResult.isMutable,
                mintAuthority: auditResult.mintAuthority,
                freezeAuthority: auditResult.freezeAuthority,
                risks: auditResult.risks,
                socials: auditResult.socials
            } : { error: "No Token Metadata Found" },
            metadata: {
                contract: _contractAddress,
                network: _currencySymbol,
                rentExempt: simResult.rentExemption?.rentExempt || false
            }
        };

    } catch (error) {
        console.error("TxShield SumUp Error:", error.message);
        return { success: false, error: "Internal Analysis Error" };
    }
}

module.exports = { sumUpAllFeatures }