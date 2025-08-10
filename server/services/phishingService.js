const approveScamUtils = require("../utils/phishing/detectApprovalScam");
const etherForward = require("../utils/phishing/detectEtherForward");
const detectMaliciousProxy = require("../utils/phishing/detectMaliciousProxy");
const detectPermitPhishing = require('../utils/phishing/detectPermitPhishing');
const detectPhishingDomainLinks = require("../utils/phishing/detectPhishingDomainLinks")

// for scam-approval
const ApprovalScamPhishingService = async (_from, _to)=> {
    return await approveScamUtils(_from, _to);
}

// for ether-forwarding
const EtherForwardPhishingService = async(_to)=> {
    return await etherForward(_to);
}

// for proxy manupilation
const MaliciousProxyPhishingService = async(_to)=> {
    return await detectMaliciousProxy(_to);
}

// for permit checking 
const PermitPhishing = async(_to)=> {
    return await detectPermitPhishing(_to)
}

// for malacious phishing domain links (on-chain + off-chain)
const PhishingDomainLinks = async(_to)=> {
    return await detectPhishingDomainLinks(_to);
}

module.exports = {
    ApprovalScamPhishingService,
    EtherForwardPhishingService,
    MaliciousProxyPhishingService,
    PermitPhishing,
    PhishingDomainLinks
}