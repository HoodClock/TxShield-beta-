"use client";

import { m } from "framer-motion";
import { FiAlertTriangle, FiCheckCircle, FiShield, FiAlertOctagon } from "react-icons/fi";
import { themes } from "./utils";

export default function SolanaDetails({
  itemVariants,
  chain,
  data: rawData,
}) {
  const t = themes[chain] || themes.SOL;
  const data = rawData?.data || {};
  
  const {
    verdict,
    securityFlags,
    simulation,
    metadata,
    tokenAudit
  } = data;

  const { riskLevel, score, isSafe, humanReason } = verdict || {};
  const { computeUnits, walletBalance, estimatedChange } = simulation || {};
  const { contract, rentExempt } = metadata || {};

  // Risk styling
  const isCritical = riskLevel === "CRITICAL";
  const isHighRisk = riskLevel === "HIGH" || score >= 80;
  const isSafeZone = isSafe || score < 20;

  const riskColor = isCritical ? "text-red-500" : isHighRisk ? "text-orange-500" : "text-green-500";
  const riskBg = isCritical ? "bg-red-500/10" : isHighRisk ? "bg-orange-500/10" : "bg-green-500/10";
  const riskBorder = isCritical ? "border-red-500/30" : isHighRisk ? "border-orange-500/30" : "border-green-500/30";

  return (
    <div className="space-y-8 sm:space-y-12">
      
      {/* SECURITY VERDICT CARD */}
      <m.div variants={itemVariants} className="gradient-border-card p-[1px]">
        <div className="card-inner p-6 h-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="icon-wrapper">
                <FiShield className={`h-6 w-6 ${riskColor}`} />
              </div>
              <h3 className="text-xl font-bold text-white">Security Verdict</h3>
            </div>
            {riskLevel && (
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${riskBorder} ${riskBg} ${riskColor}`}>
                {riskLevel}
              </span>
            )}
          </div>

          <div className="space-y-4">
             {/* Human Reason */}
             {humanReason && (
              <div className={`p-4 rounded-xl border ${riskBorder} ${riskBg}`}>
                <p className="text-sm font-medium text-gray-200">
                  {humanReason}
                </p>
              </div>
            )}

            {/* Security Flags */}
            {securityFlags && securityFlags.length > 0 && (
              <div className="mt-4">
                <h4 className="text-xs text-gray-400 uppercase tracking-wide mb-3">Detected Threats</h4>
                <div className="flex flex-wrap gap-2">
                  {securityFlags.map((flag, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
                      <FiAlertOctagon className="h-4 w-4 text-red-400" />
                      <span className="text-xs font-mono text-red-300">{flag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Token Audit Error */}
            {tokenAudit?.error && (
               <div className="mt-2 flex items-center gap-2 text-xs text-orange-300">
                  <FiAlertTriangle className="h-3 w-3" />
                  <span>Token Audit: {tokenAudit.error}</span>
               </div>
            )}
          </div>
        </div>
      </m.div>

      {/* TRANSACTION DETAILS CARD */}
      <m.div variants={itemVariants} className="gradient-border-card p-[1px]">
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
              <span className="text-gray-400">Status</span>
              <span className={`font-bold ${simulation?.status === 'SUCCESS' ? 'text-green-400' : 'text-red-400'}`}>
                {simulation?.status || 'UNKNOWN'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-800">
              <span className="text-gray-400">Compute Units</span>
              <span className={`font-mono ${t.textSecondary}`}>{computeUnits?.toLocaleString() || 0}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-800">
              <span className="text-gray-400">Wallet Balance</span>
              <span className="text-white font-mono">{walletBalance !== undefined ? `${walletBalance} SOL` : 'N/A'}</span>
            </div>
            {estimatedChange && (
                 <div className="flex justify-between items-center py-2 border-b border-gray-800">
                 <span className="text-gray-400">Est. Change</span>
                 <span className="text-white font-mono">{estimatedChange}</span>
               </div>
            )}
            <div className="flex justify-between items-center py-2 border-b border-gray-800">
              <span className="text-gray-400">Rent Exempt</span>
              <span className={rentExempt ? "text-green-400" : "text-gray-500"}>
                {rentExempt ? "Yes" : "No / Unknown"}
              </span>
            </div>
            {contract && (
                <div className="py-2">
                <span className="text-gray-400 block mb-1">Interacting Contract</span>
                <span className="text-xs sm:text-sm text-gray-300 break-all font-mono bg-gray-900/50 p-2 rounded block border border-gray-800">
                    {contract}
                </span>
                </div>
            )}
          </div>
        </div>
      </m.div>
    </div>
  );
}
