const {getAbi} = require("../../services/etherscanService")


const blackListFunctionsLists = [
    /blacklist/i,
    /add.*Blacklist/i,
    /remove.*Blacklist/i,
    /is.*Blacklist/i,
    /ban/i,
    /block.*Address/i,
    /restrict.*Address/i
]

const detectBlackListContract = async(_address)=> {
    
    const abi = await getAbi(_address);

    if (!abi) {
        return {
          success: false,
          message: "ABI not available for this address.",
        };
      }    

    const functionNames = abi
    .filter((item)=> item.type === "functions")
    .map((item)=> item.name);

    const matchedFunctions = functionNames.filter((item)=> blackListFunctionsLists.some((pattern)=> pattern.test(item)));

    if (matchedFunctions.length > 0){
        return {
            success: true,
            risk: true,
            matchedFunctions,
            message: "Potential blacklist mechanism detected."
        }
    }

    return {
        success: true,
        risk: false,
        message: "No blacklist patterns found."
    }

}

module.exports = detectBlackListContract;