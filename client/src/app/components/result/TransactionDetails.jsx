"use client";

import { m } from "framer-motion";
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
    <m.div
      variants={itemVariants}
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative group/accordion transform-gpu"
    >
      {/* Hollow Container Background */}
      <div className="absolute inset-0 bg-black/40 rounded-2xl shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] border border-white/5 pointer-events-none transition-colors duration-300 group-hover/accordion:bg-black/60 group-hover/accordion:border-blue-500/30"></div>

      {/* Outer Bottom Glow */}
      <div className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transition-opacity duration-500 blur-[1px] ${expandedSections.txDetails ? "opacity-100" : "opacity-0 group-hover/accordion:opacity-50"}`}></div>

      <button
        onClick={() => toggleSection("txDetails")}
        className="relative z-10 p-4 sm:p-5 w-full flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-2xl"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 sm:p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover/accordion:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-shadow">
            <FiGitBranch className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 group-hover/accordion:animate-pulse" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-white tracking-widest uppercase font-mono drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] text-left">
            Transaction Schema
          </h2>
        </div>
        <m.div
          animate={{ rotate: expandedSections.txDetails ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/10 group-hover/accordion:bg-blue-500/10 group-hover/accordion:border-blue-500/30 transition-colors"
        >
          <FiChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400/70 group-hover/accordion:text-blue-400" />
        </m.div>
      </button>

      {expandedSections.txDetails && (
        <m.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative z-10 px-4 sm:px-5 pb-5"
        >
          <div className="pt-3 border-t border-blue-500/20">
            {/* Transaction Details Fields */}
            <div className="space-y-3">
              {[
                {
                  label: "Payload Type",
                  value:
                    simulateData.transferType === "eth"
                      ? "Native ETH Transfer"
                      : "Token Transfer",
                  icon: <FiType className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400 transition-colors" />,
                },
                {
                  label: "Value",
                  value: `${simulateData.amount} ${simulateData.symbol}`,
                  icon: <FiHash className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400 transition-colors" />,
                },
                {
                  label: "Sender Hash",
                  value: simulateData.from,
                  mono: true,
                  icon: <FiUser className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400 transition-colors" />,
                },
                {
                  label: "Target Hash",
                  value: simulateData.to,
                  mono: true,
                  icon: <FiUserCheck className="h-4 w-4 text-blue-500/50 group-hover/item:text-blue-400 transition-colors" />,
                },
              ].map((item, idx) => (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group/item relative p-2.5 sm:p-3 rounded-lg overflow-hidden bg-black/40 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/0 group-hover/item:bg-blue-500/50 transition-colors"></div>
                  <div className="flex items-center gap-2 mb-1.5 pl-2">
                    {item.icon}
                    <label className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gray-500 group-hover/item:text-blue-300 transition-colors">
                      {item.label}
                    </label>
                  </div>
                  <p
                    className={`text-gray-300 font-semibold pl-8 ${item.mono ? "font-mono text-xs sm:text-sm break-all" : "text-sm"
                      } group-hover/item:text-white transition-colors`}
                  >
                    {item.value}
                  </p>
                </m.div>
              ))}
            </div>

            {/* Gas Analysis Terminal Box */}
            <div className="mt-4 sm:mt-5 relative overflow-hidden rounded-xl border border-blue-500/20 bg-black/50 p-4 sm:p-5 shadow-[inset_0_0_20px_rgba(59,130,246,0.05)]">
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>

              <div className="relative z-10 flex items-center gap-3 mb-4 sm:mb-5">
                <div className="p-1.5 rounded bg-blue-500/10 border border-blue-500/30">
                  <FiZap className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                </div>
                <h3 className="font-mono font-bold text-blue-400 tracking-widest uppercase text-xs sm:text-sm">
                  Network Energy Analysis
                </h3>
              </div>

              <div className="relative z-10 grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-center">
                <m.div
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {/* Neon Ring Gauge */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-[#0a0a0a] border border-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle cx="50%" cy="50%" r="45%" fill="transparent" stroke="rgba(59,130,246,0.1)" strokeWidth="4" />
                      <circle
                        cx="50%" cy="50%" r="45%" fill="transparent" stroke="#3B82F6" strokeWidth="4"
                        strokeDasharray={`${2 * Math.PI * 36}`}
                        strokeDashoffset={`${2 * Math.PI * 36 * (1 - gasPercent / 100)}`}
                        className="drop-shadow-[0_0_5px_rgba(59,130,246,0.8)] transition-all duration-1000 ease-out origin-center"
                      />
                    </svg>
                    <div className="flex flex-col items-center">
                      <span className="text-blue-400 font-bold font-mono text-sm sm:text-lg">{gasPercent}%</span>
                      <span className="text-[8px] sm:text-[10px] text-blue-500/50 uppercase tracking-widest">Load</span>
                    </div>
                  </div>
                </m.div>

                <div className="space-y-3 sm:space-y-4 col-span-1">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <FiTrendingUp className="text-blue-500/50 h-3 w-3" />
                      <span className="text-blue-500/50 font-mono text-[10px] sm:text-xs uppercase tracking-widest">
                        Gas Price
                      </span>
                    </div>
                    <span className="text-white font-mono font-semibold text-base sm:text-lg drop-shadow-[0_0_5px_rgba(255,255,255,0.3)] pl-5">
                      {simulateData?.gas?.priceGwei ?? "N/A"} <span className="text-xs sm:text-sm text-gray-500">Gwei</span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-blue-500/50 font-mono text-[10px] sm:text-xs uppercase tracking-widest pl-5 hidden sm:block">
                      Estimated Units
                    </span>
                    <span className="text-gray-400 font-mono text-xs pl-5">
                      {gasEstimated} gas
                    </span>
                  </div>
                </div>

                <div className="col-span-2 lg:col-span-1 mt-2 lg:mt-0 p-2.5 sm:p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 pb-1.5 sm:pb-2 mb-1.5 sm:mb-2 border-b border-blue-500/20">
                      <FiDollarSign className="text-blue-500 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-blue-500 font-mono text-[10px] sm:text-xs uppercase tracking-widest">
                        Compute Cost
                      </span>
                    </div>
                    <span className="text-blue-400 font-mono font-bold text-xl sm:text-2xl drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]">
                      {simulateData?.gas?.costUsd
                        ? `$${simulateData.gas.costUsd}`
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </m.div>
      )}
    </m.div>
  );
}
