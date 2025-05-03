const { provider } = require("../../config/provider");
const axios = require("axios");

const simulateTranscation = async (
  _userAddress,
  _recipientAddress,
  _amount
) => {
  try {

    const tx = {
      from: _userAddress,
      to: _recipientAddress,
      value: _amount,
    };

    const _gasLimit = await provider.estimateGas(tx);
    tx.gas = _gasLimit.toString();

    const gasBuffers = [1.3, 1.5, 2.0]; // 30, 50, 100 %
    const simulationResults = [];

    for (const buffer of gasBuffers) {
      const txWithBuffer = {
        ...tx,
        gas: Math.ceil(_gasLimit.toNumber() * buffer).toString(),
      };

      const payload = {
        id: 1,
        jsonrpc: "2.0",
        method: "alchemy_simulateExecution",
        params: [txWithBuffer],
      };

      const simulationResponse = await axios.post(
        process.env.ETH_MAINNET_NET_URL,
        payload
      );

      const result = simulationResponse.data.result;

      simulationResults.push({
        buffer: `${(buffer - 1) * 100}%`,
        success: result.success,
        gasUsed: result.gasUsed,
        logs: result.logs,
        stateDiff: result.stateDiff,
      });
    }

    return {
      success: true,
      baseGasLimit: _gasLimit.toString(),
      simulations: simulationResults,
    };

  } catch (error) {
    console.error("Simulation Error", error);
    return { success: false, error: error.message };
  }
};

module.exports = simulateTranscation;
