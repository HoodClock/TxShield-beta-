"use client";

import { motion } from "framer-motion";
import { FiGitBranch, FiChevronDown, FiZap, FiType, FiHash, FiUser, FiUserCheck, FiTrendingUp, FiDollarSign } from "react-icons/fi";

export default function TransactionDetails({
  itemVariants,
  toggleSection,
  expandedSections,
  simulateData,
  gasPercent,
  gasEstimated,
  chain,
}) {
  return (
    <motion.div variants={itemVariants} className="group gradient-border-card">
      <button
        onClick={() => toggleSection("txDetails")}
        className="card-inner p-4 sm:p-6 w-full glitch-hover"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="icon-wrapper">
              <FiGitBranch className="h-5 w-5 text-purple-400" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white text-left">
              Transaction Details
            </h2>
          </div>
          <motion.div
            animate={{ rotate: expandedSections.txDetails ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiChevronDown className="h-5 w-5 text-slate-400" />
          </motion.div>
        </div>
      </button>

      {expandedSections.txDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="card-inner p-4 sm:p-6 pt-0 space-y-4"
        >
          {/* Transaction Details Fields */}
          <div className="space-y-5">
            {[
              {
                label: "Type",
                value:
                  simulateData.transferType === "eth"
                    ? "Native ETH Transfer"
                    : "Token Transfer",
                icon: <FiType className="h-4 w-4 text-gray-400 group-hover/item:text-gray-300 transition-colors" />,
              },
              {
                label: "Amount",
                value: `${simulateData.amount} ${simulateData.symbol}`,
                icon: <FiHash className="h-4 w-4 text-gray-400 group-hover/item:text-gray-300 transition-colors" />,
              },
              {
                label: "From",
                value: simulateData.from,
                mono: true,
                icon: <FiUser className="h-4 w-4 text-gray-400 group-hover/item:text-gray-300 transition-colors" />,
              },
              {
                label: "To",
                value: simulateData.to,
                mono: true,
                icon: <FiUserCheck className="h-4 w-4 text-gray-400 group-hover/item:text-gray-300 transition-colors" />,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group/item pb-4 border-b border-slate-700/30 last:pb-0 last:border-b-0"
              >
                <div className="flex items-center gap-2 mb-1">
                  {item.icon}
                  <label className="text-xs sm:text-sm font-medium text-gray-400 group-hover/item:text-gray-300 transition-colors">
                    {item.label}
                  </label>
                </div>
                <p
                  className={`text-white font-semibold mt-1 pl-6 ${item.mono ? "font-mono text-xs sm:text-sm break-all" : ""
                    } group-hover/item:text-cyan-200 transition-colors`}
                >
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Gas Analysis - Full Width Below */}
          <div className="gradient-border-card pt-2">
            <div className="card-inner p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="icon-wrapper !w-10 !h-10">
                  <FiZap className="h-4 w-4 text-yellow-400" />
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base">
                  Gas Analysis
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 items-center">
                <motion.div
                  className="gauge-circle"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="gauge-inner">
                    <div className="text-xl font-bold text-blue-400">
                      {gasPercent}%
                    </div>
                    <div className="text-xs text-slate-400">
                      {gasEstimated} gas
                    </div>
                  </div>
                </motion.div>

                <div className="space-y-3 col-span-1">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <FiTrendingUp className="text-slate-400 h-4 w-4" />
                      <span className="text-slate-400 text-xs sm:text-sm">
                        Gas Price
                      </span>
                    </div>
                    <span className="text-white font-semibold text-sm sm:text-base pl-6">
                      {simulateData?.gas?.priceGwei ?? "N/A"} Gwei
                    </span>
                  </div>
                </div>

                <div className="space-y-3 col-span-1">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <FiDollarSign className="text-slate-400 h-4 w-4" />
                      <span className="text-slate-400 text-xs sm:text-sm">
                        Total Cost
                      </span>
                    </div>
                    <span className="text-yellow-400 font-bold text-sm sm:text-base pl-6">
                      {simulateData?.gas?.costUsd
                        ? `$${simulateData.gas.costUsd}`
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
