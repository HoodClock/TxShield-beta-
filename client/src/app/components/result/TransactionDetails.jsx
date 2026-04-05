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
      if (
        !simulateData?.watchedTokens ||
        simulateData.watchedTokens === "N/A" ||
        simulateData.watchedTokens === ""
      )
        return "None";

      return `${simulateData.watchedTokens.split(",").length} Tokens`;
    }, [simulateData?.watchedTokens]);

    const tokensDelta = useMemo(() => {
      if (
        !simulateData?.watchedTokensDeltas ||
        simulateData.watchedTokensDeltas === "N/A" ||
        simulateData.watchedTokensDeltas === ""
      )
        return "0";

      const value =
        simulateData.watchedTokensDeltas
          .split(",")
          .map((d) => parseFloat(d) / 1e18)
          .find((d) => d !== 0) || 0;

      return value + ` ${requestData?.symbol || "Token"}`;
    }, [simulateData?.watchedTokensDeltas, requestData?.symbol]);

    // Memoize full data array clean and outside the JSX return
    const transactionItems = useMemo(
      () => [
        {
          label: "Payload",
          value: "Contract Interaction",
          icon: (
            <FiType className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400" />
          ),
        },
        {
          label: "Value",
          value: requestData?.amount
            ? `${requestData.amount} ${requestData.symbol || "ETH"}`
            : "0.05 ETH (Proxy)",
          icon: (
            <FiHash className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400" />
          ),
        },
        {
          label: "Profit Detected",
          value: simulateData?.isProfit ? "Yes" : "No",
          icon: (
            <FiTrendingUp className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400" />
          ),
        },
        {
          label: "Target Hash",
          value: requestData?.contractAddress || "0xC02aa...756Cc2 (WETH)",
          mono: true,
          icon: (
            <FiUserCheck className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400" />
          ),
        },
        {
          label: "Simulation Output",
          value: simulateData?.success
            ? "Success"
            : simulateData?.humanReason ||
              simulateData?.errorReason ||
              "Failed",
          icon: (
            <FiZap className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400" />
          ),
        },
        {
          label: "ETH Delta",
          value: simulateData?.ethDelta || "0",
          icon: (
            <FiTrendingUp className="h-4 w-4 pl-1 text-blue-500/50 group-hover/item:text-blue-400" />
          ),
        },
        {
          label: "Token Delta",
          value: simulateData?.tokenDelta || "0",
          icon: (
            <FiTrendingUp className="h-4 w-4 pl-1 text-blue-500/50 group-hover/item:text-blue-400" />
          ),
        },
        {
          label: "Allowance Altered",
          value: simulateData?.allowanceChanged
            ? `Yes (${simulateData?.allowanceDelta || "0"})`
            : "No",
          icon: (
            <FiHash className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400" />
          ),
        },
        {
          label: "Honeypot Guard",
          value: simulateData?.isHoneypot ? "Detected" : "Safe",
          icon: (
            <FiShield className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400" />
          ),
        },
        {
          label: "Reentrancy Filter",
          value: simulateData?.isReentrancy ? "Detected" : "Safe",
          icon: (
            <FiZap className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400" />
          ),
        },
        {
          label: "Monitored Tokens",
          value: watchedTokensCount,
          icon: (
            <FiUser className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400" />
          ),
        },
        {
          label: "Tokens Delta",
          value: tokensDelta,
          mono: true,
          icon: (
            <FiTrendingUp className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400" />
          ),
        },
      ],
      [simulateData, requestData, watchedTokensCount, tokensDelta],
    );

    return (
      <m.div
        variants={itemVariants}
        className="relative bg-[#080d1a] border border-blue-500/20 rounded-2xl overflow-hidden"
      >
        <div className="relative z-10 p-4 sm:p-5 w-full flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10">
              <FiGitBranch className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-widest uppercase font-mono text-left">
              Transaction Schema
            </h2>
          </div>
        </div>

        <div className="relative z-10 px-4 sm:px-5 pb-5 mt-4">
          <div>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {transactionItems.map((item, idx) => (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group/item relative p-3 rounded-xl overflow-hidden bg-blue-950/20 border border-blue-500/10 hover:border-blue-500/30 transition-colors duration-300 flex flex-col justify-center"
                >
                  <div className="flex items-center gap-2 mb-1 pl-2">
                    {item.icon}
                    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                      {item.label}
                    </label>
                  </div>
                  <p
                    className={`text-gray-300 font-semibold pl-8 ${
                      item.mono ? "font-mono text-xs truncate" : "text-sm"
                    }`}
                  >
                    {item.value}
                  </p>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </m.div>
    );
  },
);

export default TransactionDetails;
