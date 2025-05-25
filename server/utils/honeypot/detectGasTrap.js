const {getSimulateTransactionService} = require("../../services/simulationServeice")


const detectGasTrap = async (_from, _to, _amount)=> {

    const simulattionResult = await getSimulateTransactionService(_from, _to, _amount);

    if (!simulattionResult.success){
        return{
            success: true,
            risk: true,
            message: "Simulation failed — potential gas trap due to execution failure."
        }
    }

    const highGasCount = simulattionResult.simulations.filter((sim)=> {
        const gas = parseInt(sim.gasUsed, 16);
        return gas > 300000;
    }).length

    if (highGasCount >= 2){
        return{
            success: true,
            risk: true,
            message: "High gas used in multiple simulations"
        }
    }

    return {
        success: true,
        risk: false,
        message: "No high Gas detect in multiple simulations."
    }

}

module.exports = detectGasTrap;