const { phishingRiskWeights } = require('./PhishingChecksWeight.utils')

const calculatePhishingRisks = (checkResult) => {
    let totalWeightedScore = 0
    const maxPossibleScore = 380

    const weightMap = {
        approveScam: 'approvalScam',
        etherForwarding: 'etherForwarding',
        proxyScam: 'maliciousProxy',
        permitCheck: 'permitPhishing',
        domainCheck: 'fakeDomainLink'
    }

    // getting weight for every check
    checkResult.forEach(({ name, data }) => {
        const weightKey = weightMap[name]
        const weight = phishingRiskWeights[weightKey] || 0

        const isScam = data?.isScam || data?.isProxy || data?.unlimitedApprovalRisk || data?.hasSuspiciousLinks;

        if (isScam) {
            totalWeightedScore += (weight * 10)
        }
    })

    const percentage = Math.min((totalWeightedScore / maxPossibleScore) * 100, 100)

    let riskLevel = "Safe Zone"
    let verdict = "✅ No immediate phishing threats detected."

    if (percentage >= 60) {
        riskLevel = "Critical Risk"
        verdict = "❌ High Phishing Probability: This contract exhibits known theft patterns."
    } else if (percentage >= 25) {
        riskLevel = "Caution Zone"
        verdict = "⚠️ Suspicious Activity: Unusual permissions or proxy patterns detected."
    }

    return {
        totalScore: Math.round(percentage),
        riskLevel,
        verdict
    }
}

module.exports = {
    calculatePhishingRisks
}

