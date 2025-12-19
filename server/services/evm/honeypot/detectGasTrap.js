const { getSimulate } = require("../simulation/index");

const { getRiskScore } = require("../../../utils/HoneypotChecksWeight.utils");

const detectGasTrap = async (_from, _to, _amount, _currency) => {

  const simulationResult = await getSimulate(
    _from,
    _to,
    _amount,
    _currency
  );

  if (!simulationResult.success && simulationResult.reason === 'simulation_error') {
    return {
      success: true,
      risk: true,
      message:
        "Simulation failed — potential gas trap due to execution failure.",
    };
  }

  const estimatedGas =
    typeof simulationResult.gas.estimated === "string"
      ? parseInt(simulationResult.gas.estimated.replace(/,/g, ""))
      : Number(simulationResult.gas.estimated);

  if (estimatedGas > 300000) {
    return {
      success: true,
      risk: true,
      score: getRiskScore("gasTrap"),
      message: "High gas usage detected in single simulation.",
    };
  }

  return {
    success: true,
    risk: false,
    message: "No high gas usage detected.",
  };
};

module.exports = detectGasTrap;
