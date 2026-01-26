const getSimulate = require("../simulation/simulateTx");

const { getRiskScore } = require("../../../utils/HoneypotChecksWeight.utils");

const detectGasTrap = async (_from, _to, _amount, _currency) => {
  const simulationResult = await getSimulate(_from, _to, _amount, _currency);

  if (
    !simulationResult.success &&
    simulationResult.reason === "simulation_infrastructure_error"
  ) {
    return {
      success: false,
      risk: false,
      message: "Simulation API failed, skipping gas check.",
    };
  }

  // Check for Execution Revert (Contract Rejected the Tx)
  if (!simulationResult.success) {
    // If the tx reverted, it consumes gas but doesn't complete.
    // This is often a sign of a trap, or just a bad tx.
    // We can flag it as a potential risk or just report the failure.
    return {
      success: true,
      risk: true,
      message: `Simulation failed: ${simulationResult.error || "Execution Reverted"}`,
      score: getRiskScore("gasTrap"), // Assign partial risk for failure
    };
  }

  // We only reach here if success === true, so 'financials' from simulateTx MUST exist.
  const gasUsedStr = simulationResult.financials?.gas?.used || "0";

  // Handle string formatting (remove commas) or raw number
  const estimatedGas =
    typeof gasUsedStr === "string"
      ? parseInt(gasUsedStr.replace(/,/g, ""))
      : Number(gasUsedStr);

  if (estimatedGas > 300000) {
    return {
      success: true,
      risk: true,
      score: getRiskScore("gasTrap"),
      message: `High gas usage detected: ${estimatedGas}`,
    };
  }

  return {
    success: true,
    risk: false,
    message: "No high gas usage detected.",
  };
};

module.exports = detectGasTrap;
