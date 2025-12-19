// total-weight = 38
const phishingRiskWeights = {
    approvalScam: 10,
    etherForwarding: 3,
    maliciousProxy: 9,
    permitPhishing: 9,
    fakeDomainLink: 7
}

const getRiskWeights = (checkName) => {
    return phishingRiskWeights[checkName]
}

module.exports = {
    phishingRiskWeights,
    getRiskWeights
}