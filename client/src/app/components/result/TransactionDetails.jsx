"use client";

import React, { useMemo } from "react";
import { m } from "framer-motion";
import {
  FiGitBranch,
  FiZap,
  FiType,
  FiHash,
  FiUser,
  FiUserCheck,
  FiTrendingUp,
  FiShield,
  FiActivity,
  FiAlertCircle
} from "react-icons/fi";

const TransactionDetails = React.memo(
  ({
    itemVariants,
    simulateData,
    requestData,
    gasPercent,
    gasEstimated,
    chain,
  }) => {
    // Memoize expensive calculations
    const watchedTokensCount = useMemo(() => {
      if (!simulateData?.watchedTokens || simulateData.watchedTokens === "N/A" || simulateData.watchedTokens === "")
        return "None";
      return `${simulateData.watchedTokens.split(",").length} Tokens`;
    }, [simulateData?.watchedTokens]);

    const tokensDelta = useMemo(() => {
      if (!simulateData?.watchedTokensDeltas || simulateData.watchedTokensDeltas === "N/A" || simulateData.watchedTokensDeltas === "")
        return "0";
      const value = simulateData.watchedTokensDeltas.split(",").map((d) => parseFloat(d) / 1e18).find((d) => d !== 0) || 0;
      return value + ` ${requestData?.symbol || "Token"}`;
    }, [simulateData?.watchedTokensDeltas, requestData?.symbol]);

    // PRESERVING ALL 12 ORIGINAL DATA POINTS
    const transactionItems = useMemo(
      () => [
        { label: "Payload", value: "Contract Interaction", icon: <FiType className="w-3.5 h-3.5 text-blue-400" /> },
        { label: "Value", value: requestData?.amount ? `${requestData.amount} ${requestData.symbol || "ETH"}` : "0.05 ETH (Proxy)", icon: <FiHash className="w-3.5 h-3.5 text-blue-400" /> },
        { label: "Profit Detected", value: simulateData?.isProfit ? "Yes" : "No", icon: <FiTrendingUp className="w-3.5 h-3.5 text-blue-400" /> },
        { label: "Target Hash", value: requestData?.contractAddress || "0xC02aa...756Cc2", mono: true, icon: <FiUserCheck className="w-3.5 h-3.5 text-blue-400" /> },
        { label: "Simulation Output", value: simulateData?.success ? "Success" : simulateData?.humanReason || simulateData?.errorReason || "Failed", icon: <FiZap className="w-3.5 h-3.5 text-blue-400" /> },
        { label: "ETH Delta", value: simulateData?.ethDelta || "0", icon: <FiTrendingUp className="w-3.5 h-3.5 text-blue-400" /> },
        { label: "Token Delta", value: simulateData?.tokenDelta || "0", icon: <FiTrendingUp className="w-3.5 h-3.5 text-blue-400" /> },
        { label: "Allowance Altered", value: simulateData?.allowanceChanged ? `Yes (${simulateData?.allowanceDelta || "0"})` : "No", icon: <FiHash className="w-3.5 h-3.5 text-blue-400" /> },
        { label: "Honeypot Guard", value: simulateData?.isHoneypot ? "Detected" : "Safe", icon: <FiShield className="w-3.5 h-3.5 text-blue-400" /> },
        { label: "Reentrancy Filter", value: simulateData?.isReentrancy ? "Detected" : "Safe", icon: <FiZap className="w-3.5 h-3.5 text-blue-400" /> },
        { label: "Monitored Tokens", value: watchedTokensCount, icon: <FiUser className="w-3.5 h-3.5 text-blue-400" /> },
        { label: "Tokens Delta", value: tokensDelta, mono: true, icon: <FiTrendingUp className="w-3.5 h-3.5 text-blue-400" /> },
      ],
      [simulateData, requestData, watchedTokensCount, tokensDelta]
    );

    return (
      <m.div
        variants={itemVariants}
        className="relative h-full flex flex-col p-6 rounded-3xl bg-card/40 backdrop-blur-3xl border border-border overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -z-10 group-hover:bg-blue-500/10 transition-colors duration-500" />
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0">
            <FiGitBranch className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-clash font-bold text-foreground tracking-tight">TRANSACTION SCHEMA</h2>
            <p className="font-mono text-[9px] text-muted-foreground tracking-wider">FORENSIC_GRID_V2</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto no-scrollbar pr-1">
          {transactionItems.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-muted border border-border hover:border-blue-500/20 hover:bg-card transition-all duration-300 group/item"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1 rounded-md bg-card border border-border group-hover/item:border-blue-500/30 transition-colors">
                  {item.icon}
                </div>
                <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted-foreground font-bold leading-none">{item.label}</span>
              </div>
              <div className={`font-mono text-[10px] md:text-xs font-semibold truncate ${item.mono ? "text-blue-500" : "text-foreground"}`}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
          <span className="font-mono text-[8px] text-muted-foreground/30 uppercase tracking-[0.4em]">Reference: PROTOCOL_ALPHA_SCAN</span>
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-blue-400/20" />
            <div className="w-1 h-1 rounded-full bg-purple-400/20" />
          </div>
        </div>
      </m.div>
    );
  }
);

export default TransactionDetails;
