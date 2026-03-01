"use client";

import { m } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiActivity, FiShield } from "react-icons/fi";

export default function HeroStatus({
  itemVariants,
  executionSuccess,
  executionMessage,
  gasPercent,
  ratioText,
  chain
}) {
  return (
    <m.div
      variants={itemVariants}
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative mb-6 sm:mb-8 transform-gpu"
    >
      {/* Background Glow */}
      <div className={`absolute inset-0 bg-black/40 rounded-3xl shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] border pointer-events-none ${chain === 'SOL' ? 'border-purple-500/10' : 'border-blue-500/10'}`}></div>

      <div className="relative z-10 p-4 sm:p-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-center">
          {/* Overall Status */}
          <div className="flex flex-col justify-center h-full">
            <h2 className="text-sm sm:text-base font-mono text-gray-500 uppercase tracking-widest mb-3 ml-2 font-bold opacity-80">
              Session Status
            </h2>

            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative group/status"
            >
              <div className={`absolute inset-0 bg-black/60 rounded-2xl shadow-[inset_0_2px_20px_rgba(0,0,0,0.9)] border pointer-events-none transition-colors duration-500 ${executionSuccess ? "border-emerald-500/30 group-hover/status:border-emerald-500/60" : "border-red-500/30 group-hover/status:border-red-500/60"
                }`}></div>
              {/* Bottom Glow */}
              <div className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover/status:opacity-100 transition-opacity duration-500 blur-[1px] ${executionSuccess ? "via-emerald-500/50" : "via-red-500/50"
                }`}></div>

              <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 sm:p-5">
                <div className={`p-3 sm:p-4 rounded-xl flex-shrink-0 shadow-[0_0_30px_rgba(0,0,0,0.5)] border ${executionSuccess ? "bg-emerald-500/10 border-emerald-500/30 shadow-[inset_0_0_15px_rgba(16,185,129,0.2)]" : "bg-red-500/10 border-red-500/30 shadow-[inset_0_0_15px_rgba(239,68,68,0.2)]"
                  }`}>
                  {executionSuccess ? (
                    <FiCheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  ) : (
                    <FiXCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                  )}
                </div>
                <div className="text-center sm:text-left mt-2 sm:mt-0 flex-1">
                  <p className={`font-mono text-xl sm:text-2xl font-bold tracking-tight mb-1 flex items-center justify-center sm:justify-start gap-3 ${executionSuccess ? "text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" : "text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                    }`}>
                    {executionSuccess ? "EXECUTION SUCCESS" : "CRITICAL FAILURE"}
                    {!executionSuccess && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-w w-2 bg-red-500"></span>
                      </span>
                    )}
                  </p>
                  <p className="text-gray-400 font-mono text-xs sm:text-sm leading-relaxed max-w-sm mx-auto sm:mx-0">
                    {executionMessage}
                  </p>
                </div>
              </div>
            </m.div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4 h-full pt-2 lg:pt-8 w-full">
            {/* Gas Estimate */}
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative group/stat"
            >
              <div className={`absolute inset-0 bg-black/60 rounded-2xl shadow-[inset_0_2px_15px_rgba(0,0,0,0.9)] border border-white/5 pointer-events-none transition-colors duration-500 ${chain === 'SOL' ? 'group-hover/stat:border-pink-500/30' : 'group-hover/stat:border-blue-500/30'}`}></div>
              <div className={`absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500 blur-[1px] ${chain === 'SOL' ? 'via-pink-500/50' : 'via-blue-500/50'}`}></div>

              <div className="relative z-10 p-4 sm:p-5 flex flex-col h-full justify-between">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-1.5 sm:p-2 rounded-lg border ${chain === 'SOL' ? 'bg-pink-500/10 border-pink-500/20' : 'bg-blue-500/10 border-blue-500/20'}`}>
                    <FiActivity className={chain === 'SOL' ? 'text-pink-400' : 'text-blue-400'} />
                  </div>
                  <p className="text-gray-500 font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold">
                    Network Load
                  </p>
                </div>
                <div>
                  <p className={`text-2xl sm:text-3xl font-bold font-mono drop-shadow-[0_0_10px_currentColor] ${chain === 'SOL' ? 'text-pink-400' : 'text-blue-400'}`}>
                    {gasPercent}%
                  </p>
                  <div className="w-full h-1 sm:h-1.5 bg-black rounded-full mt-3 overflow-hidden border border-white/5">
                    <div className={`h-full shadow-[0_0_10px_currentColor] ${chain === 'SOL' ? 'bg-pink-500' : 'bg-blue-500'}`} style={{ width: `${gasPercent}%` }}></div>
                  </div>
                </div>
              </div>
            </m.div>

            {/* Checks Passed */}
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="relative group/stat"
            >
              <div className={`absolute inset-0 bg-black/60 rounded-2xl shadow-[inset_0_2px_15px_rgba(0,0,0,0.9)] border border-white/5 pointer-events-none transition-colors duration-500 ${chain === 'SOL' ? 'group-hover/stat:border-purple-500/30' : 'group-hover/stat:border-cyan-500/30'}`}></div>
              <div className={`absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500 blur-[1px] ${chain === 'SOL' ? 'via-purple-500/50' : 'via-cyan-500/50'}`}></div>

              <div className="relative z-10 p-4 sm:p-5 flex flex-col h-full justify-between">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-1.5 sm:p-2 rounded-lg border ${chain === 'SOL' ? 'bg-purple-500/10 border-purple-500/20' : 'bg-cyan-500/10 border-cyan-500/20'}`}>
                    <FiShield className={chain === 'SOL' ? 'text-purple-400' : 'text-cyan-400'} />
                  </div>
                  <p className="text-gray-500 font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold">
                    Signatures
                  </p>
                </div>
                <div>
                  <p className={`text-2xl sm:text-3xl font-bold font-mono drop-shadow-[0_0_10px_currentColor] ${chain === 'SOL' ? 'text-purple-400' : 'text-cyan-400'}`}>
                    {ratioText}
                  </p>
                  <p className="text-[10px] text-gray-500 font-mono mt-2 uppercase tracking-wide">
                    Tests Passed
                  </p>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </div>
    </m.div>
  );
}
