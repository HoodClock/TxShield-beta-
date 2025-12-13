"use client";

import { motion } from "framer-motion";
import { FiCode, FiChevronDown, FiAlertTriangle, FiCheck, FiInfo } from "react-icons/fi";

export default function BytecodeAnalysis({
  itemVariants,
  toggleSection,
  expandedSections,
  isContract,
  warnings,
  t,
}) {
  return (
    <motion.div variants={itemVariants} className="group gradient-border-card">
      <button
        onClick={() => toggleSection("bytecode")}
        className="card-inner p-6 sm:p-8 w-full"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="icon-wrapper">
              <FiCode className={`h-5 w-5 ${t.textPrimary}`} />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white text-left">
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
          className="card-inner p-6 sm:p-8 pt-0 space-y-3"
        >
          {isContract ? (
            warnings.length > 0 ? (
              warnings.map((warning, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg hover:border-red-500/40 hover:bg-red-500/15 transition-all duration-200"
                >
                  <FiAlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-red-300 text-xs sm:text-sm">
                    {warning}
                  </span>
                </motion.div>
              ))
            ) : (
              <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:border-emerald-500/40 hover:bg-emerald-500/15 transition-all duration-200">
                <FiCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span className="text-emerald-300 text-xs sm:text-sm">
                  No dangerous opcodes detected
                </span>
              </div>
            )
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
