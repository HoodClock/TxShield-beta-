const { provider } = require("../../config/provider");
const axios = require("axios")

const simulateTranscation = async (_userAddress, _recipientAddress, _amount) => {
    
    try {
        const tx = {
            from: _userAddress,
            to: _recipientAddress,
            value: _amount
        }
    
        const _gasLimit = await provider.estimateGas(tx)    
    
        tx.gas = _gasLimit.toLocaleString();
    
    
        const payload = {
            id: 1,
            jsonrpc: "2.0",
            method: "alchemy_simulateExecution",
            params: [tx]
        }
    
        const response = await axios.post(process.env.ETH_MAINNET_NET_URL, payload);
    
        const returnData = response.data.result;

        return {
            success: returnData.success,
            gasUsed: returnData.gasUsed,
            stateDiff: returnData.stateDiff,
            logs: returnData.logs
            // what more i can send i mean i want to give the full maximum advanced level simulation results like everything man 
        }

    } catch (error) {
        console.error("Simulation Error", error);
        return { success: false, error: error.message };
    }
};


module.exports = simulateTranscation;
