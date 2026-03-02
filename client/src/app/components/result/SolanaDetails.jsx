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
    <div className="space-y-3 sm:space-y-4 max-w-7xl mx-auto">

      {/* SECURITY VERDICT CARD */}
      <m.div
        variants={itemVariants}
        className="relative bg-[#0a0510] border border-purple-500/20 rounded-2xl overflow-hidden shadow-[inset_0_2px_15px_rgba(168,85,247,0.05)]"
      >
        <div className="relative z-10 p-3 sm:p-4 h-full">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-purple-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2 border border-purple-500/20 bg-purple-500/10 rounded-xl">
                <FiShield className="h-5 w-5 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold font-mono uppercase tracking-widest text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">Security Verdict</h3>
            </div>
            {riskLevel && (
              <span className={`px-4 py-1.5 rounded text-xs font-mono font-bold tracking-widest uppercase border ${riskColor}`}>
                {riskLevel}
              </span>
            )}
          </div>

          <div className="space-y-4">
            {/* Human Reason */}
            {humanReason && (
              <div className="p-4 sm:p-5 rounded-xl border border-white/10 bg-white/5 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-current opacity-50" style={{ color: riskColor.replace('text-', '') }}></div>
                <p className="text-sm font-mono tracking-wide text-gray-300 leading-relaxed pl-2">
                  {humanReason}
                </p>
              </div>
            )}

            {/* Security Flags */}
            {securityFlags && securityFlags.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span> Detected Threats
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {securityFlags.map((flag, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-500/10 border border-red-500/30">
                      <FiAlertOctagon className="h-4 w-4 text-red-500" />
                      <span className="text-xs font-mono tracking-wide text-red-400">{flag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Token Audit Error */}
            {tokenAudit?.error && (
              <div className="mt-4 flex items-start gap-3 p-3 rounded-lg border border-orange-500/30 bg-orange-500/10">
                <FiAlertTriangle className="h-4 w-4 text-orange-400 mt-0.5" />
                <span className="text-xs font-mono text-orange-300 leading-relaxed">System Audit: {tokenAudit.error}</span>
              </div>
            )}
          </div>
        </div>
      </m.div>

      {/* TRANSACTION DETAILS CARD */}
      <m.div
        variants={itemVariants}
        className="relative bg-[#0a0510] border border-purple-500/20 rounded-2xl overflow-hidden mt-3 shadow-[inset_0_2px_15px_rgba(168,85,247,0.05)]"
      >
        <div className="relative z-10 p-3 sm:p-4 h-full">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-purple-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl border border-purple-500/20 bg-purple-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold font-mono uppercase tracking-widest text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">Transaction Output</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex justify-between items-center px-3 py-2 bg-purple-500/5 border border-purple-500/10 rounded-lg">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gray-500">Execution Status</span>
              <span className={`text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded border ${simulation?.status === 'SUCCESS' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' : 'text-red-400 border-red-500/30 bg-red-500/10'}`}>
                {simulation?.status || 'UNKNOWN'}
              </span>
            </div>

            <div className="flex justify-between items-center px-3 py-2 bg-purple-500/5 border border-purple-500/10 rounded-lg">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gray-500">Compute Units</span>
              <span className="text-xs sm:text-sm font-mono text-pink-400 font-bold tracking-wide">{computeUnits?.toLocaleString() || 0}</span>
            </div>

            <div className="flex justify-between items-center px-3 py-2 bg-purple-500/5 border border-purple-500/10 rounded-lg">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gray-500">Wallet Balance</span>
              <span className="text-xs sm:text-sm font-mono text-purple-300 font-bold tracking-wide">{walletBalance !== undefined ? `${walletBalance} SOL` : 'N/A'}</span>
            </div>

            {estimatedChange && (
              <div className="flex justify-between items-center px-3 py-2 bg-purple-500/5 border border-purple-500/10 rounded-lg">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gray-500">Est. Net Change</span>
                <span className="text-xs sm:text-sm font-mono text-purple-300 font-bold tracking-wide">{estimatedChange}</span>
              </div>
            )}

            <div className="flex justify-between items-center px-3 py-2 bg-purple-500/5 border border-purple-500/10 rounded-lg">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gray-500">Rent Exempt Status</span>
              <span className={`text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded border ${rentExempt ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" : "text-gray-400 border-gray-500/30 bg-gray-500/10"}`}>
                {rentExempt ? "VERIFIED" : "UNVERIFIED"}
              </span>
            </div>

            {contract && (
              <div className="md:col-span-2 flex flex-col sm:flex-row justify-between sm:items-center px-3 py-2 bg-purple-500/5 border border-purple-500/10 rounded-lg">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 block mb-1 sm:mb-0">Target Contract</span>
                <span className="text-[10px] sm:text-xs text-pink-400 break-all font-mono block">
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
