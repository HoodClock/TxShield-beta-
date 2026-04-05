"use client";

import { m } from "framer-motion";
import { FiEye, FiRepeat, FiClock, FiPieChart } from "react-icons/fi";

export default function TransactionSummary({
  itemVariants,
  txHistoryData,
  summary,
}) {
  if (!txHistoryData.success) return null;

  return (
    <m.div
      variants={itemVariants}
      className="relative bg-[#080d1a] border border-blue-500/20 rounded-2xl overflow-hidden"
    >
      <div className="relative z-10 p-4 sm:p-5 w-full flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10">
            <FiEye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-white tracking-widest uppercase font-mono text-left">
            Summary
          </h2>
        </div>
      </div>

      <div className="relative z-10 p-4 sm:p-5 pt-4">

        <div className="space-y-3 sm:space-y-4">
          {[
            {
              label: "Total Transfers",
              value: summary.totalTransfers || "N/A",
              icon: <FiRepeat className="h-4 w-4 text-slate-500 group-hover/summaryRow:text-blue-400 transition-colors" />,
            },
            {
              label: "Last Transfer",
              value: summary.lastTransferDate || "N/A",
              icon: <FiClock className="h-4 w-4 text-slate-500 group-hover/summaryRow:text-blue-400 transition-colors" />,
            },
            {
              label: "ERC-20 Volume",
              value: summary.totalERC20Volume || "N/A",
              icon: <FiPieChart className="h-4 w-4 text-slate-500 group-hover/summaryRow:text-blue-400 transition-colors" />,
            },
          ].map((item, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex justify-between items-center pb-3 sm:pb-4 last:pb-0 border-b border-white/5 last:border-b-0 hover:bg-white/5 px-2 -mx-2 rounded transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-black border border-white/5">
                  {item.icon}
                </div>
                <span className="text-gray-400 font-mono text-[10px] sm:text-xs tracking-widest uppercase">
                  {item.label}
                </span>
              </div>
              <span className="text-white font-mono font-bold tracking-wider text-sm">
                {item.value}
              </span>
            </m.div>
          ))}
        </div>
      </div>
    </m.div>
  );
}
