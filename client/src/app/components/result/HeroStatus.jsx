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
      whileHover={{ y: -2, scale: 1.005 }}
      className="relative mb-4 sm:mb-6 transform-gpu"
    >
      {/* Flat Background */}
      <div className="absolute inset-0 bg-black/40 rounded-2xl border border-white/10 pointer-events-none"></div>

      <div className="relative z-10 p-3 sm:p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 items-center">
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
              <div className="absolute inset-0 bg-black/60 rounded-2xl border border-white/10 pointer-events-none transition-colors duration-500"></div>

              <div className="relative z-10 flex items-center gap-3 p-3">
                <div className="p-2 rounded-xl flex-shrink-0 border bg-white/5 border-white/10">
                  {executionSuccess ? (
                    <FiCheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
                  ) : (
                    <FiXCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-mono text-base sm:text-lg font-bold tracking-tight flex items-center gap-2 text-white">
                    {executionSuccess ? "EXECUTION SUCCESS" : "CRITICAL FAILURE"}
                  </p>
                  <p className="text-gray-400 font-mono text-[10px] sm:text-xs truncate max-w-xs block">
                    {executionMessage}
                  </p>
                </div>
              </div>
            </m.div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3 h-full pt-1 lg:pt-0 w-full items-center">
            {/* Gas Estimate */}
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative group/stat"
            >
              <div className="absolute inset-0 bg-black/60 rounded-2xl border border-white/10 pointer-events-none transition-colors duration-500"></div>

              <div className="relative z-10 p-3 sm:p-4 flex flex-col h-full justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg border flex items-center justify-center bg-white/5 border-white/10">
                    <FiActivity className="h-3 w-3 text-gray-300" />
                  </div>
                  <p className="text-gray-500 font-mono text-[9px] uppercase tracking-widest font-bold">
                    Network
                  </p>
                </div>
                <div>
                  <p className="text-xl font-bold font-mono text-white">
                    {gasPercent}%
                  </p>
                  <div className="w-full h-1 sm:h-1 bg-black rounded-full mt-2 overflow-hidden border border-white/5">
                    <div className="h-full bg-white" style={{ width: `${gasPercent}%` }}></div>
                  </div>
                </div>
              </div>
            </m.div>

            {/* Contract Safety Gauge */}
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative group/stat"
            >
              <div className="absolute inset-0 bg-black/60 rounded-2xl border border-white/10 pointer-events-none transition-colors duration-500"></div>

              <div className="relative z-10 p-3 sm:p-4 flex flex-col h-full justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <FiShield className="text-gray-300 h-3 w-3" />
                  </div>
                  <p className="text-gray-500 font-mono text-[9px] uppercase tracking-widest font-bold">
                    Safety Context
                  </p>
                </div>
                <div>
                  <p className="text-xl sm:text-xl font-bold font-mono text-white leading-tight mt-1 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                    {ratioText}
                  </p>
                  <div className="w-full h-1 sm:h-1 bg-black rounded-full mt-2 overflow-hidden border border-white/5">
                    <div className="h-full bg-white" style={{ width: ratioText.includes('Fail') ? '0%' : '100%' }}></div>
                  </div>
                </div>
              </div>
            </m.div>

          </div>
        </div>
      </div>
    </m.div>
  );
}
