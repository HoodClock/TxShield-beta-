"use client";

import { m } from "framer-motion";
import { FiArrowRight, FiUpload, FiDownload } from "react-icons/fi";

export default function BalanceChanges({
  itemVariants,
  simulateData,
}) {
  if (!simulateData || (!simulateData.ethDelta && !simulateData.tokenDelta)) return null;

  const ethDelta = parseFloat(simulateData.ethDelta || "0") / 1e18;
  const tokenDelta = parseFloat(simulateData.tokenDelta || "0"); // Assuming decimals handled elsewhere or simplified here
  const watchToken = simulateData.watchedTokens;

  return (
    <m.div
      variants={itemVariants}
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden mt-4"
    >
      <div className="relative z-10 p-4 sm:p-5 w-full flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10">
            <FiUpload className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-white tracking-widest uppercase font-mono text-left">
            Asset Flow Pipeline
          </h2>
        </div>
      </div>
      <div className="p-4 sm:p-5">

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 px-2 sm:px-4">

          {/* SENDER NODE */}
          <div className="flex-1 w-full bg-[#111111] border border-white/10 p-4 rounded-xl flex flex-col items-center justify-center relative overflow-hidden group/node">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Origin</span>
            <span className="text-sm font-mono text-white font-semibold">Your Wallet</span>
            <div className="mt-2 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <FiUpload className="text-gray-300 h-3 w-3" />
            </div>
          </div>

          {/* ASSET PIPELINE ARROW */}
          <div className="flex-1 w-full flex flex-col items-center justify-center px-4 relative">
            <div className="w-full h-px bg-white/20 relative">
              <m.div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Deltas Display floating above arrow */}
            <div className="absolute top-1/2 -translate-y-2/3 -translate-x-1/2 left-1/2 flex flex-col items-center justify-center bg-black/80 px-4 py-1.5 rounded-md border border-white/10 shadow-xl backdrop-blur-md">
              {(ethDelta !== 0 || tokenDelta !== 0) ? (
                <>
                  {ethDelta !== 0 && (
                    <span className={`font-mono text-xs sm:text-sm font-bold tracking-wide break-all text-center ${ethDelta < 0 ? 'text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]' : 'text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]'}`}>
                      {ethDelta > 0 ? '+' : ''}{ethDelta.toFixed(4)} ETH
                    </span>
                  )}
                  {tokenDelta !== 0 && (
                    <span className={`font-mono text-xs sm:text-sm font-bold tracking-wide break-all text-center ${tokenDelta < 0 ? 'text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]' : 'text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]'}`}>
                      {tokenDelta > 0 ? '+' : ''}{tokenDelta.toString()} {watchToken ? 'Token' : ''}
                    </span>
                  )}
                </>
              ) : (
                <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">No Direct Transfers</span>
              )}
            </div>
          </div>

          {/* DESTINATION NODE */}
          <div className="flex-1 w-full bg-[#111111] border border-white/10 p-4 rounded-xl flex flex-col items-center justify-center relative overflow-hidden group/node">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Destination</span>
            <span className="text-sm font-mono text-white font-semibold">Target Contract</span>
            <div className="mt-2 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <FiDownload className="text-gray-300 h-3 w-3" />
            </div>
          </div>

        </div>
      </div>
    </m.div>
  );
}
