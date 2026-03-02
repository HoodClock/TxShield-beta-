export const mockSimulation = {
  success: true,
  checks: {
    simulateResult: {
      success: false,
      ethDelta: "100000000000000",
      tokenDelta: "0",
      isProfit: true,
      allowanceChanged: false,
      allowanceDelta: "0",
      errorReason: "Unknown Revert (Silent)",
      returnData: "0x",
      simulatedAt: "2026-03-01T09:58:55.981Z",
      estimatedTax: "0",
      gasUsed: "60020",
      watchedTokens: "0xdAC17F958D2ee523a2206206994597C13D831ec7,0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48,0x6B175474E89094C44Da98b954EedeAC495271d0F,0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      watchedTokensDeltas: "0,0,0,0",
      isReentrancy: false,
      isHoneypot: false,
      simulation: {
        calls: [
          {
            type: "CALL",
            from: "0x2d1468a9b827c6e1f5e91943dc3b0425d187993b",
            to: "0x514910771af9ca656af840dff83e8264ecf986ca",
            value: "0x0",
            gas: "0xf4240",
            gasUsed: "0x5233",
            input: "0x",
            error: "execution reverted"
          }
        ],
        logs: []
      }
    },
    byteCodeResult: {
      isContract: true,
      isScam: true,
      confidence: "high",
      reason: "Multiple high-risk opcodes found (Opcode SELFDESTRUCT found 39 times, Opcode DELEGATECALL found 3 times, Opcode CALLCODE found 5 times, Opcode CREATE found 1 times, Opcode CALL found 10 times), indicates probable malicious intent.",
      warnings: [
        "Opcode SELFDESTRUCT found 39 times",
        "Opcode DELEGATECALL found 3 times",
        "Opcode CALLCODE found 5 times",
        "Opcode CREATE found 1 times",
        "Opcode CALL found 10 times"
      ],
      address: "0x514910771af9ca656af840dff83e8264ecf986ca"
    },
    transactionHistoryResult: {
      success: true,
      summary: {
        totalTransfers: 10,
        lastTransferDate: "2/25/2026, 7:22:23 AM",
        totalERC20Volume: "5208010000000000000000"
      },
      recentTransfers: [
        {
          hash: "0x88c286869ea605211888fd078acadc4ad5c227748755b1a90d22c99f75ca5704",
          from: "0x00e2b6d170740c15bf9fb01d0b6e77c0d4510e32",
          to: "0x514910771af9ca656af840dff83e8264ecf986ca",
          symbol: "DOG",
          amount: "1000000000000000000",
          date: "2/25/2026, 7:22:23 AM",
          type: "ERC-20"
        },
        {
          hash: "0xff224c42f41acbd69902f97260ac42b36c633b682435869c413d33f706b99267",
          from: "0x00e2b6d170740c15bf9fb01d0b6e77c0d4510e32",
          to: "0x514910771af9ca656af840dff83e8264ecf986ca",
          symbol: "DOG",
          amount: "1000000000000000000",
          date: "2/25/2026, 5:19:47 AM",
          type: "ERC-20"
        },
        {
          hash: "0xd112aa05bd62a0b55cb6d651d95b8741937b49328ebcbab2f78b472edd761b00",
          from: "0x5497b1ab5bb59b194e25764ea0b61871b122a43f",
          to: "0x514910771af9ca656af840dff83e8264ecf986ca",
          symbol: "SHIB",
          amount: "1000000000000000000",
          date: "2/22/2026, 3:07:47 AM",
          type: "ERC-20"
        }
      ]
    }
  },
  requestData: {
    amount: "1.0",
    symbol: "ETH",
    contractAddress: "0x514910771af9ca656af840dff83e8264ecf986ca",
  }
};

export const mockHoneypot = {
  success: true,
  honeypotResponse: {
    riskScore: 30,
    hasBlackListDetected: false,
    hasMintable: true,
    mintScore: 100,
    mintReason: "Catastrophic simulation failure. Contract is highly suspicious or uses revert traps.",
    hasTradingControl: false,
    buyingTax: 0,
    sellingTax: 0,
    errorReason: "Time-travel simulation failed to execute.",
    isTimeHoneypot: true,
    timeTravelScore: 30,
    timeTravelReason: "Time-travel simulation failed to execute."
  }
};

export const mockPhishing = {
  success: true,
  riskSummery: {
    totalScore: 8,
    riskLevel: "Safe Zone",
    verdict: "✅ No immediate phishing threats detected."
  },
  details: {
    approveScam: {
      isScam: true,
      confidence: "medium",
      reason: "Contract shows suspicious approval logic and draining behavior."
    },
    etherForwarding: {
      isContract: true,
      isScam: true,
      confidence: "high",
      reason: "Bytecode contains 10 CALL opcodes.",
      checks: {
        callOpcodeCount: 10
      },
      address: "0x514910771AF9Ca656af840dff83E8264EcF986CA"
    },
    proxyScam: {
      isProxy: false,
      reason: "No proxy pattern found in bytecode."
    },
    permitCheck: {
      isProxy: false,
      reason: "No permit signature found."
    },
    domainCheck: {
      hasSuspiciousLinks: false,
      foundLinks: [],
      phishingMatches: [],
      reason: "No URLs found."
    }
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
    buttonGlow: "hover:bg-blue-500/10 transition-colors duration-200",
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
    buttonGlow: "hover:bg-purple-500/10 transition-colors duration-200",
  }
};
