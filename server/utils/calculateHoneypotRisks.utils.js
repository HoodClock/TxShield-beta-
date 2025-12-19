// calculating the risk-score of the honeypot each check

/**
 * @params (all checks obj)
 * @riskCalculation (Sum(Failed check weight) * 10 / max-possibilities: (650)) * 100
 * @return (structured obj)
*/

const calculateRisks = (totalScore) => {
    // percentage of totalScore
    const percentage = Math.min(((totalScore * 10) / 650) * 100)

    let riskLevel = "Safe Zone";
    let verdict = "✅ Safe to proceed.";

    if (percentage > 45) {
        riskLevel = "Red Flag Zone"
        verdict = "❌ High risk — avoid interacting with this contract.";
    } else if (percentage > 15) {
        riskLevel = "Caution Zone";
        verdict = "⚠️ Risky elements found — proceed carefully.";
    }

    return {
        totalScore: percentage.toFixed(1),
        riskLevel,
        verdict
    }

}

module.exports = { calculateRisks }