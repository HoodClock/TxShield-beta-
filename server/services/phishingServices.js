const phishingUtilities = require("../utils/phishing/index");

const approveScamService = async (_address)=> {
    return await phishingUtilities.detctApprovalScam(_address);
}

const fakeTokenService = async (_address)=> {
    return await phishingUtilities.detectFakeTokenContract(_address);
}

const hiddenFunctionService = async (_address)=> {
    return await phishingUtilities.detectHiddenFunctionTraps(_address);
}

const impressionService = async (_address)=> {
    return await phishingUtilities.detectImpression(_address);
}

const maliciousProxyService = async (_address)=> {
    return await phishingUtilities.detectMaliciousProxy(_address);
}

const byteCodePatternService = async (_address)=> {
    return await phishingUtilities.detectSuspiciousBytecodePatterns(_address);
}

module.exports = {
    approveScamService,
    fakeTokenService,
    hiddenFunctionService,
    impressionService,
    maliciousProxyService,
    byteCodePatternService
}
