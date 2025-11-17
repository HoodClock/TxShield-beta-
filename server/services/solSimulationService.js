const solUtilitySimulation = require("../utils/Solana/simulationSol/solanaSimulation")

// for simulation
const getSolSimulationService = async (_signedTxBase64, _from, _to, _amount, currencySymbol) => {
  return await solUtilitySimulation.simulateSolTranscation(_signedTxBase64, _from, _to, _amount, currencySymbol);
};

module.exports = {getSolSimulationService}
