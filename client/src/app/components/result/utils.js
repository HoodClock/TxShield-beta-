export const mockSimulation = {
  checks: {
    simulateTx: {
      data: {
        success: true,
        amount: "1.5",
        symbol: "ETH",
        from: "0x742d35Cc6634C0532925a3b844Bc9e7595f1234a",
        to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
        transferType: "eth",
        gas: { estimated: 21000, priceGwei: "32.5", costUsd: "21.84" },
        balances: {
          sender: { before: { eth: "5.0" }, after: { eth: "3.5" } },
          recipient: { before: { eth: "0.2" }, after: { eth: "1.7" } },
        },
        warnings: ["High gas price detected"],
      },
    },
    byteCode: { data: { isContract: false, warnings: [] } },
    transactionHistory: {
      data: {
        success: true,
        summary: {
          totalTransfers: 142,
          lastTransferDate: "Dec 13, 2024",
          totalERC20Volume: "5,234.50",
        },
        recentTransfers: [
          {
            hash: "0xabc123def456",
            from: "0x742d35Cc...",
            to: "0x8ba1f109...",
            amount: "1.5",
            symbol: "ETH",
            date: "2 hours ago",
          },
          {
            hash: "0xdef789ghi012",
            from: "0x123abc456...",
            to: "0x789def012...",
            amount: "0.75",
            symbol: "ETH",
            date: "5 hours ago",
          },
          {
            hash: "0x456jkl789mno",
            from: "0x456xyz789...",
            to: "0xabc123def...",
            amount: "2.0",
            symbol: "ETH",
            date: "1 day ago",
          },
        ],
      },
    },
  },
};

export const mockHoneypot = {
  totalScore: "8",
  passRate: "85%",
  riskLevel: "Safe Zone",
  checks: {
    gasTrap: { data: { risk: false } },
    fakeBalance: { data: { risk: false } },
    disableTransfer: { data: { risk: false } },
    mintAccess: { data: { risk: true } },
    tradingControl: { data: { risk: false } },
    highSellTax: { data: { risk: false } },
  },
};

export const mockPhishing = {
  checks: {
    approvalScam: {
      success: true,
      data: { isScam: false, confidence: "high", reason: "No malicious approval patterns detected" }
    },
    etherForward: {
      success: true,
      data: { isScam: false, confidence: "high", reason: "Contract does not forward ether suspiciously" }
    },
    maliciousProxy: {
      success: true,
      data: { isScam: false, confidence: "high", reason: "No proxy pattern abuse detected" }
    },
    permitPhishing: {
      success: true,
      data: { isScam: false, confidence: "high", reason: "Permit signature is secure" }
    }
  },
  phishingVerdict: {
    phishingScore: 8,
    riskLevel: "Low",
    keyFindings: ["Standard ERC-20 transfer pattern", "No suspicious proxy calls", "Normal gas usage"],
    recommendedActions: ["Proceed with caution", "Verify contract address", "Check community feedback"]
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
    secondary: "cyan",
    accent: "indigo",
    rgbPrimary: "59, 130, 246",
    rgbSecondary: "6, 182, 212",
    textPrimary: "text-blue-400",
    textSecondary: "text-cyan-400",
    bgGradient: "from-blue-500/15",
    border: "rgba(59, 130, 246, 0.3)", // blue-500
    shadow: "rgba(59, 130, 246, 0.2)",
    gradText: "bg-gradient-to-r from-blue-400 to-cyan-400",
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
