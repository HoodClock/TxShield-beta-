"use client";

import { m } from "framer-motion";
import { FiCode, FiChevronDown, FiAlertTriangle, FiCheck, FiInfo } from "react-icons/fi";

export default function BytecodeAnalysis({
  itemVariants,
  toggleSection,
  expandedSections,
  isContract,
  byteData,
  warnings,
  t,
}) {
  const { isScam, confidence, reason } = byteData || {};

  return (
    <m.div
      variants={itemVariants}
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative group/accordion transform-gpu"
    >
      {/* Hollow Container Background */}
      <div className="absolute inset-0 bg-black/40 rounded-2xl shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] border border-white/5 pointer-events-none transition-colors duration-300 group-hover/accordion:bg-black/60 group-hover/accordion:border-blue-500/30"></div>

      {/* Outer Bottom Glow */}
      <div className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transition-opacity duration-500 blur-[1px] ${expandedSections.bytecode ? "opacity-100" : "opacity-0 group-hover/accordion:opacity-50"}`}></div>

      <button
        onClick={() => toggleSection("bytecode")}
        className="relative z-10 p-4 sm:p-5 w-full flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-2xl"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 sm:p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover/accordion:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-shadow">
            <FiCode className={`h-4 w-4 sm:h-5 sm:w-5 ${t?.textPrimary || 'text-blue-400'} group-hover/accordion:animate-pulse`} />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-white tracking-widest uppercase font-mono drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] text-left">
            Source Logic Scan
          </h2>
        </div>
        <m.div
          animate={{ rotate: expandedSections.bytecode ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/10 group-hover/accordion:bg-blue-500/10 group-hover/accordion:border-blue-500/30 transition-colors"
        >
          <FiChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400/70 group-hover/accordion:text-blue-400" />
        </m.div>
      </button>

      {expandedSections.bytecode && (
        <m.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative z-10 px-4 sm:px-5 pb-5 pt-1"
        >
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
                      className="group/warning relative flex items-start gap-3 p-3.5 bg-black/40 border border-amber-500/20 rounded-lg hover:border-amber-500/40 hover:bg-amber-500/5 transition-all duration-300"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500/0 group-hover/warning:bg-amber-500/50 transition-colors"></div>
                      <FiAlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]" />
                      <span className="text-amber-100 font-mono text-xs sm:text-sm tracking-wide">
                        {warning}
                      </span>
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
        </m.div>
      )}
    </m.div>
  );
}
