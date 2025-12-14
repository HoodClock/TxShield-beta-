"use client";

import { motion } from "framer-motion";
import { FiBarChart2, FiChevronDown, FiArrowRight, FiUpload, FiDownload } from "react-icons/fi";

export default function BalanceChanges({
  itemVariants,
  toggleSection,
  expandedSections,
  simulateData,
}) {
  if (!simulateData.balances) return null;

  return (
    <motion.div variants={itemVariants} className="group gradient-border-card">
      <button
        onClick={() => toggleSection("balances")}
        className="card-inner p-4 sm:p-6 w-full"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="icon-wrapper">
              <FiBarChart2 className="h-5 w-5 text-cyan-400" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white text-left">
              Balance Changes
            </h2>
          </div>
          <motion.div
            animate={{ rotate: expandedSections.balances ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiChevronDown className="h-5 w-5 text-slate-400" />
          </motion.div>
        </div>
      </button>

      {expandedSections.balances && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="card-inner p-4 sm:p-6 pt-0 sm:pt-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sender */}
            <div className="gradient-border-card">
              <div className="card-inner p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <FiUpload className="h-5 w-5 text-red-400" />
                  <h3 className="text-sm sm:text-base font-bold text-white mb-4">
                    Sender
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      symbol: "ETH",
                      before: simulateData.balances.sender?.before?.eth,
                      after: simulateData.balances.sender?.after?.eth,
                      color: "text-red-400",
                    },
                    simulateData.transferType === "erc20" && {
                      symbol: simulateData.symbol,
                      before: simulateData.balances.sender?.before?.token,
                      after: simulateData.balances.sender?.after?.token,
                      color: "text-red-400",
                    },
                  ]
                    .filter(Boolean)
                    .map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center justify-between group/balance"
                      >
                        <span className="text-slate-400 text-xs sm:text-sm group-hover/balance:text-gray-300 transition-colors">
                          {item.symbol}
                        </span>
                        <div className="flex items-center gap-2 text-xs sm:text-sm">
                          <span className="text-slate-300">
                            {item.before || `0 ${item.symbol}`}
                          </span>
                          <FiArrowRight className="h-3 w-3 text-slate-500" />
                          <span
                            className={`font-semibold ${item.color} group-hover/balance:brightness-125 transition-all`}
                          >
                            {item.after || `0 ${item.symbol}`}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>

            {/* Recipient */}
            <div className="gradient-border-card">
              <div className="card-inner p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <FiDownload className="h-5 w-5 text-emerald-400" />
                  <h3 class="text-sm sm:text-base font-bold text-white mb-4">
                    Recipient
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      symbol: "ETH",
                      before: simulateData.balances.recipient?.before?.eth,
                      after: simulateData.balances.recipient?.after?.eth,
                      color: "text-emerald-400",
                    },
                    simulateData.transferType === "erc20" && {
                      symbol: simulateData.symbol,
                      before: simulateData.balances.recipient?.before?.token,
                      after: simulateData.balances.recipient?.after?.token,
                      color: "text-emerald-400",
                    },
                  ]
                    .filter(Boolean)
                    .map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center justify-between group/balance"
                      >
                        <span className="text-slate-400 text-xs sm:text-sm group-hover/balance:text-gray-300 transition-colors">
                          {item.symbol}
                        </span>
                        <div className="flex items-center gap-2 text-xs sm:text-sm">
                          <span className="text-slate-300">
                            {item.before || `0 ${item.symbol}`}
                          </span>
                          <FiArrowRight className="h-3 w-3 text-slate-500" />
                          <span
                            className={`font-semibold ${item.color} group-hover/balance:brightness-125 transition-all`}
                          >
                            {item.after || `0 ${item.symbol}`}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
