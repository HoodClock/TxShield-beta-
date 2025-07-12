const approveScamUtils = require("../utils/phishing/detectApprovalScam");
const etherForward = require("../utils/phishing/detectEtherForward");

// for scam-approval
const ApprovalScamPhishingService = async (_from, _to, _value, _currencySymbol)=> {
    return await approveScamUtils(_from, _to, _value, _currencySymbol);
}

// for ether-forwarding
const EtherForwardPhishingService = async(_to)=> {
    return await etherForward(_to);
}

module.exports = {
    ApprovalScamPhishingService,
    EtherForwardPhishingService
}