const approveScamUtils = require("../utils/phishing/detectApprovalScam");
const etherForward = require("../utils/phishing/detectEtherForward");
const detectMaliciousProxy = require("../utils/phishing/detectMaliciousProxy");

// for scam-approval
const ApprovalScamPhishingService = async (_from, _to, _value, _currencySymbol)=> {
    return await approveScamUtils(_from, _to, _value, _currencySymbol);
}

// for ether-forwarding
const EtherForwardPhishingService = async(_to)=> {
    return await etherForward(_to);
}

const MaliciousProxyPhishingService = async(_to)=> {
    return await detectMaliciousProxy(_to);
}

module.exports = {
    ApprovalScamPhishingService,
    EtherForwardPhishingService,
    MaliciousProxyPhishingService
}