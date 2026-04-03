"use client";

<<<<<<< HEAD
import React, { useMemo } from "react";
=======
import { memo, useMemo } from "react";
>>>>>>> 2b8ce27548758e8d2162cf2fbd583c584e69af4a
import { m } from "framer-motion";
import {
  FiGitBranch,
  FiZap,
  FiType,
  FiHash,
  FiUser,
  FiUserCheck,
  FiTrendingUp,
  FiDollarSign,
  FiShield,
} from "react-icons/fi";

<<<<<<< HEAD
const TransactionDetails = React.memo(({
=======
function TransactionDetails({
>>>>>>> 2b8ce27548758e8d2162cf2fbd583c584e69af4a
  itemVariants,
  simulateData,
  requestData,
  gasPercent,
  gasEstimated,
<<<<<<< HEAD
  chain,
}) => {
=======
}) {
  const valueLabel = useMemo(() => {
    if (requestData?.amount) {
      return `${requestData.amount} ${requestData.symbol || "ETH"}`;
    }

    return "0.05 ETH (Proxy)";
  }, [requestData?.amount, requestData?.symbol]);

  const monitoredTokensLabel = useMemo(() => {
    const watchedTokens = simulateData?.watchedTokens;

    if (!watchedTokens || watchedTokens === "N/A") {
      return "None";
    }

    return `${watchedTokens.split(",").length} Tokens`;
  }, [simulateData?.watchedTokens]);

  const tokensDeltaLabel = useMemo(() => {
    const watchedTokensDeltas = simulateData?.watchedTokensDeltas;

    if (!watchedTokensDeltas || watchedTokensDeltas === "N/A") {
      return "0";
    }

    const nonZeroDelta =
      watchedTokensDeltas
        .split(",")
        .map((delta) => parseFloat(delta) / 1e18)
        .find((delta) => delta !== 0) || 0;

    return `${nonZeroDelta} WETH`;
  }, [simulateData?.watchedTokensDeltas]);

  const strokeDasharray = useMemo(() => `${2 * Math.PI * 22}`, []);
  const strokeDashoffset = useMemo(
    () => `${2 * Math.PI * 22 * (1 - gasPercent / 100)}`,
    [gasPercent],
  );

  const detailItems = useMemo(
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
        value: valueLabel,
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
          : simulateData?.errorReason || "Failed",
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
        value: monitoredTokensLabel,
        icon: (
          <FiUser className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400" />
        ),
      },
      {
        label: "Tokens Delta",
        value: tokensDeltaLabel,
        icon: (
          <FiTrendingUp className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400" />
        ),
        mono: true,
      },
    ],
    [
      monitoredTokensLabel,
      requestData?.contractAddress,
      simulateData?.allowanceChanged,
      simulateData?.allowanceDelta,
      simulateData?.errorReason,
      simulateData?.ethDelta,
      simulateData?.isHoneypot,
      simulateData?.isProfit,
      simulateData?.isReentrancy,
      simulateData?.success,
      simulateData?.tokenDelta,
      tokensDeltaLabel,
      valueLabel,
    ],
  );

>>>>>>> 2b8ce27548758e8d2162cf2fbd583c584e69af4a
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
<<<<<<< HEAD
            {useMemo(() => [
              {
                label: "Payload",
                value: "Contract Interaction",
                icon: <FiType className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400" />,
              },
              {
                label: "Value",
                value: requestData?.amount ? `${requestData.amount} ${requestData.symbol || "ETH"}` : "0.05 ETH (Proxy)",
                icon: <FiHash className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400" />,
              },
              {
                label: "Profit Detected",
                value: simulateData.isProfit ? "Yes" : "No",
                icon: <FiTrendingUp className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400" />,
              },
              {
                label: "Target Hash",
                value: requestData?.contractAddress || "0xC02aa...756Cc2 (WETH)",
                mono: true,
                icon: <FiUserCheck className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400" />,
              },
              {
                label: "Simulation Output",
                value: simulateData?.success ? "Success" : (simulateData?.humanReason || simulateData?.errorReason || "Failed"),
                icon: <FiZap className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400" />,
              },
              {
                label: "ETH Delta",
                value: simulateData?.ethDelta || "0",
                icon: <FiTrendingUp className="h-4 w-4 pl-1 text-blue-500/50 group-hover/item:text-blue-400" />,
              },
              {
                label: "Token Delta",
                value: simulateData?.tokenDelta || "0",
                icon: <FiTrendingUp className="h-4 w-4 pl-1 text-blue-500/50 group-hover/item:text-blue-400" />,
              },
              {
                label: "Allowance Altered",
                value: simulateData?.allowanceChanged ? `Yes (${simulateData?.allowanceDelta || '0'})` : "No",
                icon: <FiHash className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400" />,
              },
              {
                label: "Honeypot Guard",
                value: simulateData?.isHoneypot ? "Detected" : "Safe",
                icon: <FiShield className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400" />,
              },
              {
                label: "Reentrancy Filter",
                value: simulateData?.isReentrancy ? "Detected" : "Safe",
                icon: <FiZap className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400" />,
              },
              {
                label: "Monitored Tokens",
                value: (!simulateData?.watchedTokens || simulateData?.watchedTokens === "N/A" || simulateData?.watchedTokens === "") ? "None" : `${simulateData.watchedTokens.split(',').length} Tokens`,
                icon: <FiUser className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400" />,
              },
              {
                label: "Tokens Delta",
                value: (!simulateData?.watchedTokensDeltas || simulateData?.watchedTokensDeltas === "N/A" || simulateData?.watchedTokensDeltas === "") 
                  ? "0" 
                  : (simulateData.watchedTokensDeltas.split(",").map(d => parseFloat(d) / 1e18).find(d => d !== 0) || 0) + ` ${requestData?.symbol || "Token"}`,
                icon: <FiTrendingUp className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400" />,
                mono: true,
              },
            ], [simulateData, requestData]).map((item, idx) => (
=======
            {detailItems.map((item, idx) => (
>>>>>>> 2b8ce27548758e8d2162cf2fbd583c584e69af4a
              <m.div
                key={item.label}
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

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-xl border border-blue-500/20 bg-[#080d1a] overflow-hidden relative">
            <div className="flex items-center gap-4 relative z-10 w-full sm:w-auto">
              <div className="relative w-12 h-12 rounded-full flex items-center justify-center bg-black border border-white/10">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    fill="transparent"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="3"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    fill="transparent"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000 ease-out origin-center"
                  />
                </svg>
                <span className="text-white font-bold font-mono text-xs">
                  {gasPercent}%
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-mono font-bold uppercase tracking-widest text-[10px] flex items-center gap-1">
                  <FiZap className="h-3 w-3" /> Network Energy
                </span>
                <span className="text-gray-400 font-mono text-[10px]">
                  Limit: {gasEstimated}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 relative z-10 w-full sm:w-auto justify-end divide-x divide-white/10">
              <div className="flex flex-col items-end pr-4">
                <span className="text-gray-500 uppercase tracking-widest font-mono text-[10px]">
                  Gas Used
                </span>
                <span className="font-mono font-semibold text-white text-sm">
                  {simulateData?.gasUsed ?? "N/A"}
                </span>
              </div>
              <div className="flex flex-col items-end pl-4">
                <span className="text-gray-300 uppercase tracking-widest font-mono text-[10px] flex items-center gap-1">
                  <FiDollarSign className="h-3 w-3" /> Est. Tax
                </span>
                <span className="font-mono font-bold text-gray-200 text-sm">
                  {simulateData?.estimatedTax
                    ? `${simulateData.estimatedTax} BPS`
                    : "0 BPS"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
<<<<<<< HEAD
});

export default TransactionDetails;
=======
}

function arePropsEqual(prevProps, nextProps) {
  return (
    prevProps.gasPercent === nextProps.gasPercent &&
    prevProps.gasEstimated === nextProps.gasEstimated &&
    prevProps.requestData?.amount === nextProps.requestData?.amount &&
    prevProps.requestData?.symbol === nextProps.requestData?.symbol &&
    prevProps.requestData?.contractAddress ===
      nextProps.requestData?.contractAddress &&
    prevProps.simulateData?.success === nextProps.simulateData?.success &&
    prevProps.simulateData?.errorReason === nextProps.simulateData?.errorReason &&
    prevProps.simulateData?.isProfit === nextProps.simulateData?.isProfit &&
    prevProps.simulateData?.ethDelta === nextProps.simulateData?.ethDelta &&
    prevProps.simulateData?.tokenDelta === nextProps.simulateData?.tokenDelta &&
    prevProps.simulateData?.allowanceChanged ===
      nextProps.simulateData?.allowanceChanged &&
    prevProps.simulateData?.allowanceDelta ===
      nextProps.simulateData?.allowanceDelta &&
    prevProps.simulateData?.isHoneypot ===
      nextProps.simulateData?.isHoneypot &&
    prevProps.simulateData?.isReentrancy ===
      nextProps.simulateData?.isReentrancy &&
    prevProps.simulateData?.watchedTokens ===
      nextProps.simulateData?.watchedTokens &&
    prevProps.simulateData?.watchedTokensDeltas ===
      nextProps.simulateData?.watchedTokensDeltas &&
    prevProps.simulateData?.gasUsed === nextProps.simulateData?.gasUsed &&
    prevProps.simulateData?.estimatedTax ===
      nextProps.simulateData?.estimatedTax
  );
}

export default memo(TransactionDetails, arePropsEqual);
>>>>>>> 2b8ce27548758e8d2162cf2fbd583c584e69af4a
