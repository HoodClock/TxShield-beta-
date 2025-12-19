const {getRiskScore} = require("../../../utils/HoneypotChecksWeight.utils")

const suspiciousFunctions = [
    /(set|fake|update|adjust|reflect|mint).*balance/i
]

const detectFakeBalance = async (_tokenAddress, _abi)=> {

    if (!_abi) {
        return {
          success: false,
          message: "ABI not available for this address.",
        };
      } 

    const functionNames = _abi.filter((items)=> items.type === "function").map((item)=> item.name);

    const mathcedFunctions = functionNames
    .filter((item)=> suspiciousFunctions.some((pattern)=> pattern.test(item)));

    if (mathcedFunctions.length > 0){
        return{
            success: true,
            risk: true,
            score: getRiskScore("fakeBalance"),
            mathcedFunctions,
            message: "Potential fake balance honeypot alert."
        }
    }

    return{
        success: true,
        risk: false,
        message: "No fake balance found."
    }

}

module.exports = detectFakeBalance;