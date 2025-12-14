"use client";

import { motion } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiActivity, FiShield } from "react-icons/fi";

export default function HeroStatus({ 
  itemVariants, 
  executionSuccess, 
  executionMessage, 
  gasPercent, 
  ratioText 
}) {
  return (
    <motion.div variants={itemVariants} className="group gradient-border-card">
      <div className="card-inner p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overall Status */}
          <div className="flex flex-col justify-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
              Overall Status
            </h2>
            <div className="space-y-4">
              {/* Execution Status */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`flex items-center gap-4 p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
                  executionSuccess
                    ? "bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40"
                    : "bg-red-500/10 border-red-500/20 hover:border-red-500/40"
                }`}
              >
                <div
                  className={`p-3 rounded-lg flex-shrink-0 ${
                    executionSuccess ? "bg-emerald-500/20" : "bg-red-500/20"
                  }`}
                >
                  {executionSuccess ? (
                    <FiCheckCircle className="h-6 w-6 text-emerald-400" />
                  ) : (
                    <FiXCircle className="h-6 w-6 text-red-400" />
                  )}
                </div>
                <div>
                  <p
                    className={`font-bold text-base ${
                      executionSuccess ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {executionSuccess ? "Success" : "Failed"}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    {executionMessage}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="gradient-border-card"
            >
              <div className="card-inner p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2">
                  <FiActivity className="text-yellow-400" />
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Gas Estimate
                  </p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-yellow-400">
                  {gasPercent}%
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="gradient-border-card"
            >
              <div className="card-inner p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2">
                  <FiShield className="text-purple-400" />
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Checks Passed
                  </p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-purple-400">
                  {ratioText}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
