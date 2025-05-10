const {getSimulateTransactionService} = require("../../services/simulationServeice")

const detectHoneyPot = async (_userAddress, _tokenAddres, _amount)=> {
    try {
        // for buy check
        const buyTx = await getSimulateTransactionService(_userAddress, _tokenAddres,_amount);
        const buyTxSuccess = buyTx.success
    
        // for sell check
        const sellTx = await getSimulateTransactionService(_tokenAddres, _userAddress, _amount);
        const sellTxSuccess = sellTx.success
    
        // now check if (can buy and cant sell && cant buy and can sell) its a honeypot
    
        if (buyTxSuccess && !sellTxSuccess){
            return {
                risk: true,
                message: "Honeypot detected! Can buy but can’t sell."
            }
        }else if(!buyTxSuccess && sellTxSuccess){
            return {
                success: true,
                risk: true,
                message: "Honeypot detected! Can sell but can’t buy."
            }
        }
    
        // no buy/sell honeypot found
        return{
            success: true,
            risk: false,
            message: "No honeypot detected."
        }
    } catch (error) {
        return { risk: false, message: 'Error in detecting honeypot.' };
    }
}

module.exports = detectHoneyPot;