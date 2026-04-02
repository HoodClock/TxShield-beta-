"use client";

import { m } from "framer-motion";
import { FiCode, FiAlertTriangle, FiCheck, FiInfo } from "react-icons/fi";

export default function BytecodeAnalysis({
  itemVariants,
  isContract,
  byteData,
  isScam,
  reason,
  warnings,
  t,
}) {
  const { confidence } = byteData || {};

  return (
    <m.div
      variants={itemVariants}
      className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden mt-4"
    >
      <div className="relative z-10 p-4 sm:p-5 w-full flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10">
            <FiCode className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-white tracking-widest uppercase font-mono text-left">
            Source Logic Scan
          </h2>
        </div>
      </div>

      <div className="relative z-10 px-4 sm:px-5 pb-5 pt-4">
        {isContract ? (
          <div className="space-y-4">
            {/* Verdict Summary Terminal Box */}
            <div className={`relative overflow-hidden rounded-xl border p-4 sm:p-5 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] ${isScam ? 'bg-black/50 border-red-500/30' : 'bg-black/50 border-emerald-500/30'}`}>
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded border ${isScam ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
                    {isScam ? <FiAlertTriangle className="h-4 w-4 text-red-500" /> : <FiCheck className="h-4 w-4 text-emerald-500" />}
                  </div>
                  <span className={`text-sm md:text-base font-bold font-mono tracking-widest ${isScam ? 'text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]' : 'text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]'}`}>
                    {isScam ? 'CRITICAL THREAT DETECTED' : 'LOGIC SIGNATURE CLEAN'}
                  </span>
                </div>
                {confidence && (
                  <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] uppercase font-bold tracking-widest border ${confidence.toLowerCase() === 'high' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
                    confidence.toLowerCase() === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' :
                      'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    }`}>
                    {confidence} Conf
                  </span>
                )}
              </div>

              <p className="relative z-10 text-xs sm:text-sm text-gray-400 font-mono leading-relaxed pl-1">
                {reason || 'No recognizable malicious opcode patterns or proxy rugs detected in execution path.'}
              </p>
            </div>

            {/* Detailed Warnings List */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest pl-1 mb-2">Scanner Logs</h3>
              {warnings.length > 0 ? (
                warnings.map((warning, idx) => (
                  <m.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`group/warning relative flex flex-col gap-1 p-3.5 bg-black/40 border rounded-lg transition-all duration-300 ${warning.threatLevel === 'HIGH' ? 'border-red-500/20 hover:border-red-500/40 hover:bg-red-500/5' : 'border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/5'}`}
                  >
                    <div className="flex items-center gap-3">
                      <FiAlertTriangle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${warning.threatLevel === 'HIGH' ? 'text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]' : 'text-amber-500 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]'}`} />
                      <span className={`font-mono text-xs sm:text-sm font-bold tracking-wide ${warning.threatLevel === 'HIGH' ? 'text-red-400' : 'text-amber-400'}`}>
                        {warning.title}
                      </span>
                    </div>
                    <p className="text-gray-400 font-mono text-[10px] sm:text-xs pl-7 leading-relaxed">
                      {warning.description}
                    </p>
                  </m.div>
                ))
              ) : (
                <div className="flex items-center gap-3 p-4 bg-black/40 border border-emerald-500/20 rounded-lg">
                  <FiCheck className="h-4 w-4 text-emerald-500 flex-shrink-0 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                  <span className="text-emerald-400/80 font-mono text-xs sm:text-sm tracking-wide">
                    0 dangerous opcodes flagged
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 bg-black/40 border border-slate-600/30 rounded-lg">
            <FiInfo className="h-4 w-4 text-slate-400 flex-shrink-0" />
            <span className="text-slate-400 font-mono text-xs sm:text-sm tracking-wide">
              Target address is an EOA (Externally Owned Account)
            </span>
          </div>
        )}
      </div>
    </m.div>
  );
}
