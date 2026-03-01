export const mockSimulation = {
  checks: {
    simulateResult: {
      success: false,
      amount: "1.5",
      symbol: "ETH",
      from: "0x742d35Cc6634C0532925a3b844Bc9e7595f1234a",
      to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
      transferType: "eth",
      gas: { estimated: 285000, priceGwei: "45.2", costUsd: "48.12" },
      balances: {
        sender: { before: { eth: "5.0" }, after: { eth: "3.5" } },
        recipient: { before: { eth: "0.2" }, after: { eth: "1.7" } },
      },
      warnings: ["High gas consumption detected", "Transaction reverts under specific slippage conditions"],
    },
    byteCodeResult: {
      isContract: true,
      warnings: [
        "Unverified contract source code",
        "Contains self-destruct function capability",
        "Owner can mint infinite tokens",
      ],
    },
    transactionHistoryResult: {
      summary: {
        totalTransfers: 1420,
        lastTransferDate: "Just now",
        totalERC20Volume: "52,340.50",
      },
      recentTransfers: [
        {
          hash: "0xabc123def4561234567890abcdef1234567890abc",
          from: "0x742d...1234",
          to: "0x8ba1...DBA72",
          amount: "1.5",
          symbol: "ETH",
          date: "2 mins ago",
        },
        {
          hash: "0xdef789ghi0129876543210fedcba09876543210fed",
          from: "0x123a...bc456",
          to: "0x789d...f0123",
          amount: "0.75",
          symbol: "ETH",
          date: "15 mins ago",
        },
        {
          hash: "0x456jkl789mno5555555555555555555555555555",
          from: "0x456x...z7890",
          to: "0xabc1...f4567",
          amount: "12.0",
          symbol: "USDT",
          date: "1 hour ago",
        },
      ],
    },
  },
};

export const mockHoneypot = {
  totalScore: "15",
  passRate: "50%",
  riskLevel: "High",
  checks: {
    gasTrap: { data: { risk: true, description: "Gas cost exceeds absolute max threshold" } },
    fakeBalance: { data: { risk: false, description: "Balances map correctly" } },
    disableTransfer: { data: { risk: true, description: "Transfer function is paused by owner" } },
    mintAccess: { data: { risk: true, description: "Owner can arbitrarily mint tokens" } },
    tradingControl: { data: { risk: false, description: "No anti-whale limits detected" } },
    highSellTax: { data: { risk: false, description: "Sell tax is 0%" } },
  },
};

export const mockPhishing = {
  checks: {
    approvalScam: {
      success: true,
      data: { isScam: true, confidence: "high", reason: "Requests infinite max approval to EOA address" }
    },
    etherForward: {
      success: true,
      data: { isScam: false, confidence: "low", reason: "Contract does not forward ether suspiciously" }
    },
    maliciousProxy: {
      success: true,
      data: { isScam: true, confidence: "high", reason: "Implementation logic can be replaced unverified" }
    },
    permitPhishing: {
      success: true,
      data: { isScam: false, confidence: "low", reason: "Permit signature is secure" }
    }
  },
  phishingVerdict: {
    phishingScore: 82,
    riskLevel: "High",
    keyFindings: ["Suspicious infinite token allowance", "Proxy implementation can be rugged", "Unverified source code matching known scam signatures"],
    recommendedActions: ["DO NOT SIGN THIS TRANSACTION", "Revoke any existing approvals to this contract", "Report address on block explorer"]
  }
};

export const mockSolSimulation = {
  data: {
    message: "Simulation completed successfully",
    verdict: {
      humanReason: "A suspicious program interaction was detected. Proceed with caution.",
      action: "WARN"
    },
    simulation: {
      status: "SUCCESS",
      computeUnits: 84500,
      programsInvoked: [
        { name: "System Program", id: "11111111111111111111111111111111" },
        { name: "Token Program", id: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" },
        { name: "Unknown Program", id: "Raydium...SwapV4" }
      ],
      logs: [
        "Program 11111111111111111111111111111111 invoke [1]",
        "Program 11111111111111111111111111111111 success",
        "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
        "Program log: Instruction: Transfer",
        "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success"
      ],
      changes: [
        { owner: "7h1S...User", mint: "USDC...", pre: "150.00", post: "50.00", diff: "-100.00" },
        { owner: "7h1S...User", mint: "SOL...", pre: "1.25", post: "1.50", diff: "+0.25" }
      ]
    }
  }
};

export const getRiskStyle = (level) => {
  const styles = {
    "Safe Zone": {
      bg: "from-emerald-500/10 to-emerald-600/5",
      text: "text-emerald-400",
      border: "border-emerald-500/20",
      accent: "bg-emerald-500",
    },
    Medium: {
      bg: "from-amber-500/10 to-amber-600/5",
      text: "text-amber-400",
      border: "border-amber-500/20",
      accent: "bg-amber-500",
    },
    High: {
      bg: "from-red-500/10 to-red-600/5",
      text: "text-red-400",
      border: "border-red-500/20",
      accent: "bg-red-500",
    },
    Unknown: {
      bg: "from-gray-500/10 to-gray-600/5",
      text: "text-gray-400",
      border: "border-gray-500/20",
      accent: "bg-gray-500",
    },
  };
  return styles[level] || styles.Unknown;
};

export const themes = {
  EVM: {
    primary: "blue",
    secondary: "blue",
    accent: "indigo",
    rgbPrimary: "59, 130, 246",
    rgbSecondary: "59, 130, 246",
    textPrimary: "text-blue-400",
    textSecondary: "text-blue-400",
    bgGradient: "from-blue-500/15",
    border: "rgba(59, 130, 246, 0.3)", // blue-500
    shadow: "rgba(59, 130, 246, 0.2)",
    gradText: "bg-gradient-to-r from-blue-400 to-blue-400",
    buttonGlow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
  },
  SOL: {
    primary: "purple",
    secondary: "pink",
    accent: "fuchsia",
    rgbPrimary: "168, 85, 247",
    rgbSecondary: "236, 72, 153",
    textPrimary: "text-purple-400",
    textSecondary: "text-pink-400",
    bgGradient: "from-purple-500/15",
    border: "rgba(168, 85, 247, 0.3)", // purple-500
    shadow: "rgba(168, 85, 247, 0.2)",
    gradText: "bg-gradient-to-r from-purple-400 to-pink-400",
    buttonGlow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]",
  }
};
