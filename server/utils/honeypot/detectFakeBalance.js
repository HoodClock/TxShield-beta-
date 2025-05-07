const {getAbi} = require("../../services/etherscanService")

const suspiciousFunctions = [
    /(set|fake|update|adjust|reflect|mint).*balance/i
]

const detectFakeBalance = async (_tokenAddress)=> {

    const abi = await getAbi(_tokenAddress);

    const functionNames = abi
    .filter((items)=> items.type === "function")
    .map((item)=> item.name);

    const mathcedFunctions = functionNames
    .filter((item)=> suspiciousFunctions.some((pattern)=> pattern.test(item)));

    if (mathcedFunctions.length > 0){
        return{
            success: true,
            risk: true,
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