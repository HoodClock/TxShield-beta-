const axios = require("axios");
const { ethers } = require("ethers");
const { isContract, getAbi } = require("../../services/etherscanService");

const provider = new ethers.JsonRpcProvider(process.env.ETH_MAINNET_NET_URL);

// Minimal ERC20 interface for token detection
const ERC20_ABI = [
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
];

const simulateTransaction = async (
  _userAddress,
  _recipientAddress,
  _amount
) => {
  try {
    // ─── 1. Validate Inputs 
    if (!_userAddress || !_recipientAddress || !_amount) {
      throw new Error("Missing required transaction parameters");
    }

    // Parse the amount to Wei (BigNumber)
    const value = ethers.parseUnits(_amount, "ether");

    const userBalance = await provider.getBalance(_userAddress);
    if (userBalance.lt(value)) {
      return {
        success: false,
        error: "Insufficient ETH in sender's wallet to simulate this transaction."
      };
    }

    const recipientIsContract = await isContract(_recipientAddress);

    // Attempt to detect if recipient is an ERC20 token contract
    let tokenInfo = null;
    if (recipientIsContract) {
      try {
        const tokenContract = new ethers.Contract(
          _recipientAddress,
          ERC20_ABI,
          provider
        );
        const symbol = await tokenContract.symbol();
        const decimals = await tokenContract.decimals();
        tokenInfo = { symbol, decimals };
      } catch {
        // Not an ERC20 token (or unreadable); ignore
      }
    }

    // If recipient is a contract, fetch its full ABI (for event decoding)
    let contractAbi = null;
    if (recipientIsContract) {
      contractAbi = await getAbi(_recipientAddress);
    }

    const baseTx = {
      from: _userAddress,
      to: _recipientAddress,
      value: ethers.toBeHex(value),
      data: "0x"
    };

    // Estimate gas for the baseTx (fallback to 21k if estimate fails)
    let baseGasLimit;
    try {
      baseGasLimit = await provider.estimateGas(baseTx);
    } catch {
      baseGasLimit = ethers.BigNumber.from("21000");
    }
    const gasLimitNum = Number(baseGasLimit);

    // Prepare common data for all buffer simulations
    const gasBuffers = [1.3, 1.5, 2.0];
    const simulationResults = [];
    const gasPriceHex = await provider.send("eth_gasPrice", []);
    const gasPrice = BigInt(gasPriceHex);

    const decodeLogs = (logs) => {
      if (!contractAbi) return [];

      const iface = new ethers.Interface(contractAbi);
      const decoded = [];

      for (const log of logs) {
        try {
          const parsed = iface.parseLog(log);
          decoded.push({
            name: parsed.name,
            args: parsed.args,
            address: log.address
          });
        } catch {
          // Skip logs that cannot be parsed
          continue;
        }
      }

      return decoded;
    };

    const extractBalanceChange = (stateDiff) => {
      if (!stateDiff) return null;

      const userState = stateDiff[_userAddress.toLowerCase()];
      
      if (userState && userState.balance) {

        const { old: oldBal, new: newBal } = userState.balance;
        return {
          from: ethers.formatEther(oldBal),
          to: ethers.formatEther(newBal)
        };
      }
      
      return null;
    };

    for (const buffer of gasBuffers) {
      const txWithBuffer = {
        ...baseTx,
        gas: "0x" + Math.ceil(gasLimitNum * buffer).toString(16),
        gasPrice: "0x" + gasPrice.toString(16)
      };

      const payload = {
        id: 1,
        jsonrpc: "2.0",
        method: "alchemy_simulateExecution",
        params: ["FLAT", txWithBuffer, "latest"]
      };

      let result, simulationError;

      try {
        const response = await axios.post(
          process.env.ETH_MAINNET_NET_URL,
          payload
        );

        result = response.data.result;
        simulationError = response.data.error;
      
      } catch (err) {
        simulationResults.push({
          buffer: `${Math.floor((buffer - 1) * 100)}%`,
          success: false,
          error: err.message || "Simulation RPC error"
        });
        continue;
      }

      if (!result) {
        simulationResults.push({
          buffer: `${Math.floor((buffer - 1) * 100)}%`,
          success: false,
          error: simulationError?.message || "Unknown simulation failure"
        });
        continue;
      }

      // Decode events & balance differences
      const decodedEvents = decodeLogs(result.logs);
      const balanceChange = extractBalanceChange(result.stateDiff);

      // Collect “warnings” based on recipient type
      const warnings = [];
      if (tokenInfo) {
        warnings.push(`Recipient is a token contract (${tokenInfo.symbol})`);
      } else if (!recipientIsContract) {
        warnings.push("Recipient is an EOA wallet; only ETH transfer simulated");
      }

      simulationResults.push({
        buffer: `${Math.floor((buffer - 1) * 100)}%`,
        success: result.success,
        gasUsed: result.gasUsed,
        ethBalanceChange: balanceChange,
        tokenInfo,
        events: decodedEvents,
        warnings
      });
    }

    // ─── 7. Build Final Summary Object 
    const summary = {
      success: true,
      recipientType: recipientIsContract
        ? tokenInfo
          ? "token_contract"
          : "smart_contract"
        : "wallet",
      tokenInfo, 
      baseGasLimit: baseGasLimit.toString(),
      simulations: simulationResults
    };

    return summary;
  } catch (error) {
    
    // ─── 8. Common Error Handling 
    if (
      error.code === "INSUFFICIENT_FUNDS" ||
      error?.error?.message?.includes("insufficient funds")
    ) {
      return {
        success: false,
        error:
          "The sender wallet does not have enough ETH to cover gas fees and transaction value."
      };
    }
    return { success: false, error: error.message || String(error) };
  }
};

module.exports = simulateTransaction;
