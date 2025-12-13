"use client";

import { motion } from "framer-motion";
import { FiEye } from "react-icons/fi";

export default function TransactionSummary({
  itemVariants,
  txHistoryData,
  summary,
}) {
  if (!txHistoryData.success) return null;

  return (
    <motion.div variants={itemVariants} className="group gradient-border-card">
      <div className="card-inner p-6 sm:p-8">
        <div className="flex items-center gap-3 sm:gap-4 mb-6">
          <div className="icon-wrapper">
            <FiEye className="h-5 w-5 text-orange-400" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white">Summary</h2>
        </div>

        <div className="space-y-4">
          {[
            {
              label: "Total Transfers",
              value: summary.totalTransfers || "N/A",
            },
            {
              label: "Last Transfer",
              value: summary.lastTransferDate || "N/A",
            },
            {
              label: "ERC-20 Volume",
              value: summary.totalERC20Volume || "N/A",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex justify-between items-center group/summary pb-4 last:pb-0 border-b border-slate-700/30 last:border-b-0 hover:text-cyan-200 transition-colors"
            >
              <span className="text-slate-400 text-xs sm:text-sm group-hover/summary:text-slate-300 transition-colors">
                {item.label}
              </span>
              <span className="text-white font-semibold text-xs sm:text-sm group-hover/summary:text-cyan-200 transition-colors">
                {item.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
