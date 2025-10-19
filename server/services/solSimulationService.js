const solUtilitySimulation = require("../utils/Solana/simulationSol/solanaSimulation")

// for simulation
const getSolSimulationService = async (_from, _to, _amount, currencySymbol) => {
  console.log("The Currency : ", currencySymbol);
  return await solUtilitySimulation.simulateSolTranscation(_from, _to, _amount, currencySymbol);
};

module.exports = {getSolSimulationService}
