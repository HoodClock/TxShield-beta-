"use client";

import { motion } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiActivity, FiShield } from "react-icons/fi";
import { themes } from "./utils";

export default function SolanaDetails({
  itemVariants,
  chain,
  data,
}) {
  const t = themes[chain] || themes.SOL;
  const {
    contract,
    programType,
    balance,
    computeUnits,
    rentExemption,
    advancedChecks,
    mintDetail
  } = data;

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Transaction Details Card */}
      <motion.div variants={itemVariants} className="gradient-border-card p-[1px]">
        <div className="card-inner p-6 h-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${t.textPrimary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Transaction Details</h3>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-800">
              <span className="text-gray-400">Program Type</span>
              <span className="text-white font-medium text-right">{programType}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-800">
              <span className="text-gray-400">Compute Units</span>
              <span className={`font-mono ${t.textSecondary}`}>{computeUnits?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-800">
              <span className="text-gray-400">User Balance</span>
              <span className="text-white font-mono">{balance !== undefined ? `${balance.toFixed(4)} SOL` : 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-800">
              <span className="text-gray-400">Rent Exempt</span>
              <span className={rentExemption?.rentExempt ? "text-green-400" : "text-red-400"}>
                {rentExemption?.rentExempt ? "Yes" : "No"}
              </span>
            </div>
            <div className="py-2">
              <span className="text-gray-400 block mb-1">Contract Address</span>
              <span className="text-xs sm:text-sm text-gray-300 break-all font-mono bg-gray-900/50 p-2 rounded block border border-gray-800">
                {contract}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Advanced Checks / Mint Info */}
      {(mintDetail || advancedChecks) && (
        <motion.div variants={itemVariants} className="gradient-border-card p-[1px]">
          <div className="card-inner p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${t.textPrimary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Security Checks</h3>
              </div>
            </div>

            <div className="space-y-4">
              {mintDetail && (
                <>
                  <div className="py-2 border-b border-gray-800">
                    <span className="text-gray-400 block text-xs uppercase tracking-wide mb-1">Mint Authority</span>
                    <span className={`block font-mono text-sm break-all ${mintDetail.mintAuthority ? 'text-red-400' : 'text-green-400'}`}>
                      {mintDetail.mintAuthority || "Revoked (Safe)"}
                    </span>
                  </div>
                  <div className="py-2 border-b border-gray-800">
                    <span className="text-gray-400 block text-xs uppercase tracking-wide mb-1">Freeze Authority</span>
                    <span className={`block font-mono text-sm break-all ${mintDetail.freezeAuthority ? 'text-orange-400' : 'text-green-400'}`}>
                      {mintDetail.freezeAuthority || "Revoked (Safe)"}
                    </span>
                  </div>
                </>
              )}

              {advancedChecks && !advancedChecks.error && (
                <div className="mt-4">
                  <h4 className={`text-sm font-semibold ${t.textSecondary} mb-2`}>Metadata Integrity</h4>
                  <pre className="bg-gray-900/50 p-3 rounded text-xs text-gray-300 overflow-x-auto border border-gray-800 no-scrollbar">
                    {JSON.stringify(advancedChecks, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
