"use client";

import { m } from "framer-motion";
import { FiBarChart2, FiChevronDown, FiArrowRight, FiUpload, FiDownload } from "react-icons/fi";

export default function BalanceChanges({
  itemVariants,
  toggleSection,
  expandedSections,
  simulateData,
}) {
  if (!simulateData.balances) return null;

  return (
    <m.div
      variants={itemVariants}
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative group/accordion transform-gpu"
    >
      {/* Hollow Container Background */}
      <div className="absolute inset-0 bg-black/40 rounded-2xl shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] border border-white/5 pointer-events-none transition-colors duration-300 group-hover/accordion:bg-black/60 group-hover/accordion:border-blue-500/30"></div>

      {/* Outer Bottom Glow */}
      <div className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transition-opacity duration-500 blur-[1px] ${expandedSections.balances ? "opacity-100" : "opacity-0 group-hover/accordion:opacity-50"}`}></div>

      <button
        onClick={() => toggleSection("balances")}
        className="relative z-10 p-4 sm:p-5 w-full flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-2xl"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 sm:p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover/accordion:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-shadow">
            <FiBarChart2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 group-hover/accordion:animate-pulse" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-white tracking-widest uppercase font-mono drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] text-left">
            Asset Flow Dynamics
          </h2>
        </div>
        <m.div
          animate={{ rotate: expandedSections.balances ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/10 group-hover/accordion:bg-blue-500/10 group-hover/accordion:border-blue-500/30 transition-colors"
        >
          <FiChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400/70 group-hover/accordion:text-blue-400" />
        </m.div>
      </button>

      {expandedSections.balances && (
        <m.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative z-10 px-4 sm:px-5 pb-5 pt-1"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
            {/* Sender */}
            <div className="relative overflow-hidden rounded-xl border border-red-500/20 bg-black/50 shadow-[inset_0_0_20px_rgba(239,68,68,0.05)] p-4 sm:p-5 mt-1">
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>

              <div className="relative z-10 flex items-center gap-3 mb-4 pb-3 border-b border-red-500/20">
                <div className="p-1.5 rounded bg-red-500/10 border border-red-500/30">
                  <FiUpload className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                </div>
                <h3 className="font-mono font-bold text-red-500 tracking-widest uppercase text-xs sm:text-sm">
                  Origin Address
                </h3>
              </div>

              <div className="relative z-10 space-y-3">
                {[
                  {
                    symbol: "ETH",
                    before: simulateData.balances.sender?.before?.eth,
                    after: simulateData.balances.sender?.after?.eth,
                    color: "text-red-400 font-mono drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]",
                  },
                  simulateData.transferType === "erc20" && {
                    symbol: simulateData.symbol,
                    before: simulateData.balances.sender?.before?.token,
                    after: simulateData.balances.sender?.after?.token,
                    color: "text-red-400 font-mono drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]",
                  },
                ]
                  .filter(Boolean)
                  .map((item, idx) => (
                    <m.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center justify-between group/balance p-2 sm:p-3 rounded-lg hover:bg-red-500/5 transition-colors border border-transparent hover:border-red-500/20"
                    >
                      <span className="text-gray-500 font-mono text-[10px] sm:text-xs tracking-widest uppercase group-hover/balance:text-red-400/70 transition-colors">
                        {item.symbol}
                      </span>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-gray-400 font-mono text-xs sm:text-sm line-through decoration-red-500/50">
                          {item.before || `0.0`}
                        </span>
                        <FiArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-red-500/50" />
                        <span className={`font-semibold text-sm sm:text-lg ${item.color}`}>
                          {item.after || `0.0`}
                        </span>
                      </div>
                    </m.div>
                  ))}
              </div>
            </div>

            {/* Recipient */}
            <div className="relative overflow-hidden rounded-xl border border-emerald-500/20 bg-black/50 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)] p-4 sm:p-5 mt-1 sm:mt-1">
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>

              <div className="relative z-10 flex items-center gap-3 mb-4 pb-3 border-b border-emerald-500/20">
                <div className="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                  <FiDownload className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500" />
                </div>
                <h3 className="font-mono font-bold text-emerald-500 tracking-widest uppercase text-xs sm:text-sm">
                  Destination Address
                </h3>
              </div>

              <div className="relative z-10 space-y-3">
                {[
                  {
                    symbol: "ETH",
                    before: simulateData.balances.recipient?.before?.eth,
                    after: simulateData.balances.recipient?.after?.eth,
                    color: "text-emerald-400 font-mono drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]",
                  },
                  simulateData.transferType === "erc20" && {
                    symbol: simulateData.symbol,
                    before: simulateData.balances.recipient?.before?.token,
                    after: simulateData.balances.recipient?.after?.token,
                    color: "text-emerald-400 font-mono drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]",
                  },
                ]
                  .filter(Boolean)
                  .map((item, idx) => (
                    <m.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center justify-between group/balance p-2 sm:p-3 rounded-lg hover:bg-emerald-500/5 transition-colors border border-transparent hover:border-emerald-500/20"
                    >
                      <span className="text-gray-500 font-mono text-[10px] sm:text-xs tracking-widest uppercase group-hover/balance:text-emerald-400/70 transition-colors">
                        {item.symbol}
                      </span>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-gray-400 font-mono text-xs sm:text-sm leading-none">
                          {item.before || `0.0`}
                        </span>
                        <FiArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500/50" />
                        <span className={`font-semibold text-sm sm:text-lg leading-none ${item.color}`}>
                          +{item.after || `0.0`}
                        </span>
                      </div>
                    </m.div>
                  ))}
              </div>
            </div>
          </div>
        </m.div>
      )}
    </m.div>
  );
}
