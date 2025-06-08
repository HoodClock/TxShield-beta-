const provider = require("../../config/provider");
const { ethers } = require("ethers");
const { isContract } = require("../../services/etherscanService");

const simulateTransfer = async (userAddress, recipientAddress, amount) => {
  try {
    // 1. Input Validation
    if (!ethers.isAddress(userAddress)) throw new Error("Invalid user address");
    if (!ethers.isAddress(recipientAddress))
      throw new Error("Invalid recipient address");
    if (isNaN(parseFloat(amount))) throw new Error("Invalid amount");

    // 2. Detect Transfer Type
    const recipientIsContract = await isContract(recipientAddress);
    let transferType = "eth";
    let tokenContract = null;
    let decimals = 18;

    // Check if recipient is likely an ERC20 token
    if (recipientIsContract) {
      try {
        tokenContract = new ethers.Contract(
          recipientAddress,
          [
            "function balanceOf(address) view returns (uint256)",
            "function symbol() view returns (string)",
            "function decimals() view returns (uint8)",
            "function transfer(address,uint256) returns (bool)",
          ],
          provider
        );

        // Test for ERC20 compliance
        const [symbol, decimalUnits] = await Promise.all([
          tokenContract.symbol(),
          tokenContract.decimals(),
        ]);

        if (symbol && decimalUnits) {
          transferType = "erc20";
          decimals = decimalUnits;
        }
      } catch {
        // Fall through to ETH transfer if not a token
      }
    }

    // 3. Prepare Transaction
    const value = ethers.parseUnits(amount, decimals);
    const tx = {
      from: userAddress,
      to: recipientAddress,
      value: transferType === "eth" ? value : 0n,
      data:
        transferType === "erc20"
          ? tokenContract.interface.encodeFunctionData("transfer", [
              recipientAddress,
              value,
            ])
          : "0x",
    };

    // 4. Execute Simulation
    const [gasEstimate, feeData, senderBalance, recipientBalance] =
      await Promise.all([
        provider
          .estimateGas(tx)
          .catch(() => (transferType === "eth" ? 21000n : 100000n)),
        provider.getFeeData(),
        provider.getBalance(userAddress),
        provider.getBalance(recipientAddress),
      ]);

    const gasPrice = feeData.gasPrice || feeData.maxFeePerGas || 0n;

    const gasCost = gasEstimate * gasPrice;
    const sufficientEth =
      senderBalance >= (transferType === "eth" ? value + gasCost : gasCost);
    const tokenBalance =
      transferType === "erc20"
        ? await tokenContract.balanceOf(userAddress)
        : 0n;
    const sufficientTokens = transferType !== "erc20" || tokenBalance >= value;

    // 5. Build Result
    const result = {
      success: sufficientEth && sufficientTokens,
      transferType,
      from: userAddress,
      to: recipientAddress,
      amount: ethers.formatUnits(value, decimals),
      symbol: transferType === "erc20" ? await tokenContract.symbol() : "ETH",
      gas: {
        estimated: gasEstimate.toString(),
        price: ethers.formatUnits(gasPrice, "gwei"),
        cost: ethers.formatUnits(gasCost, "ether"),
      },
      balances: {
        sender: {
          before: {
            eth: ethers.formatEther(senderBalance),
            token:
              transferType === "erc20"
                ? ethers.formatUnits(tokenBalance, decimals)
                : null,
          },
          after: {
            eth: ethers.formatEther(
              senderBalance -
                (transferType === "eth" ? value + gasCost : gasCost)
            ),
            token:
              transferType === "erc20"
                ? ethers.formatUnits(tokenBalance - value, decimals)
                : null,
          },
        },
        recipient: {
          before: {
            eth: ethers.formatEther(recipientBalance),
            token:
              transferType === "erc20"
                ? ethers.formatUnits(
                    await tokenContract.balanceOf(recipientAddress),
                    decimals
                  )
                : null,
          },
          after: {
            eth: ethers.formatEther(
              recipientBalance + (transferType === "eth" ? value : 0n)
            ),
            token:
              transferType === "erc20"
                ? ethers.formatUnits(
                    (await tokenContract.balanceOf(recipientAddress)) + value,
                    decimals
                  )
                : null,
          },
        },
      },
      warnings: [],
    };

    // Add warnings
    if (!sufficientEth)
      result.warnings.push("Insufficient ETH for gas + transfer");
    if (!sufficientTokens) result.warnings.push("Insufficient token balance");
    if (recipientAddress === ethers.ZeroAddress)
      result.warnings.push("Transfer to zero address");

    return result;
  } catch (error) {
    return {
      success: false,
      error: error.message,
      reason:
        error.code === "INSUFFICIENT_FUNDS"
          ? "insufficient_balance"
          : error.message.includes("revert")
          ? "contract_reverted"
          : "simulation_error",
    };
  }
};

module.exports = simulateTransfer;
