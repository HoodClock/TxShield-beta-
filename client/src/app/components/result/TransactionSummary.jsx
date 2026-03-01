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
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative group/summary overflow-hidden rounded-2xl border border-white/5 bg-black/40 shadow-[inset_0_2px_20px_rgba(0,0,0,0.8)] hover:border-blue-500/30 hover:bg-black/60 transition-all duration-300 transform-gpu"
    >
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>
      <div className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover/summary:opacity-100 transition-opacity duration-500 blur-[1px]`}></div>

      <div className="relative z-10 p-4 sm:p-5">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
          <div className="p-2 sm:p-2.5 rounded-xl border border-blue-500/20 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover/summary:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-shadow">
            <FiEye className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 group-hover/summary:animate-pulse drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          </div>
          <h2 className="text-sm sm:text-base font-bold font-mono tracking-widest uppercase text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
            Summary
          </h2>
        </div>

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
              className="flex justify-between items-center group/summaryRow pb-3 sm:pb-4 last:pb-0 border-b border-white/5 last:border-b-0 hover:border-blue-500/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-black/40 border border-white/5 group-hover/summaryRow:border-blue-500/30 group-hover/summaryRow:bg-blue-500/5 transition-colors">
                  {item.icon}
                </div>
                <span className="text-slate-400 font-mono text-[10px] sm:text-xs tracking-widest uppercase group-hover/summaryRow:text-blue-300 transition-colors">
                  {item.label}
                </span>
              </div>
              <span className="text-white font-mono font-bold tracking-wider text-sm group-hover/summaryRow:text-blue-400 group-hover/summaryRow:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)] transition-all">
                {item.value}
              </span>
            </m.div>
          ))}
        </div>
      </div>
    </m.div>
  );
}
