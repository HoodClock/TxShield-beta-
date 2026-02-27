"use client";

import { motion } from "framer-motion";
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
    <motion.div variants={itemVariants} className="group gradient-border-card">
      <button
        onClick={() => toggleSection("bytecode")}
        className="card-inner p-4 sm:p-6 w-full glitch-hover"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="icon-wrapper">
              <FiCode className={`h-5 w-5 ${t.textPrimary}`} />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white text-left">
              Bytecode Analysis
            </h2>
          </div>
          <motion.div
            animate={{ rotate: expandedSections.bytecode ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiChevronDown className="h-5 w-5 text-slate-400" />
          </motion.div>
        </div>
      </button>

      {expandedSections.bytecode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="card-inner p-4 sm:p-6 pt-0 space-y-4"
        >
          {isContract ? (
            <>
              {/* Verdict Summary */}
              <div className={`p-4 rounded-xl border ${isScam ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-bold ${isScam ? 'text-red-400' : 'text-emerald-400'}`}>
                    {isScam ? 'POTENTIAL SCAM DETECTED' : 'CLEAN CONTRACT'}
                  </span>
                  {confidence && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${confidence.toLowerCase() === 'high' ? 'bg-red-500/20 text-red-400' :
                        confidence.toLowerCase() === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-emerald-500/20 text-emerald-400'
                      }`}>
                      {confidence} Confidence
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {reason || 'No suspicious patterns found in bytecode analysis.'}
                </p>
              </div>

              {/* Detailed Warnings */}
              <div className="space-y-2">
                {warnings.length > 0 ? (
                  warnings.map((warning, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-all duration-200"
                    >
                      <FiAlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-xs sm:text-sm">
                        {warning}
                      </span>
                    </motion.div>
                  ))
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
                    <FiCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-emerald-300 text-xs sm:text-sm">
                      No dangerous opcodes detected
                    </span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3 p-4 bg-slate-700/30 border border-slate-600/50 rounded-lg hover:border-slate-600/80 hover:bg-slate-700/40 transition-all duration-200">
              <FiInfo className="h-4 w-4 text-slate-400 flex-shrink-0" />
              <span className="text-slate-300 text-xs sm:text-sm">
                Address is not a contract
              </span>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
