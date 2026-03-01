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
    <div className="space-y-4 sm:space-y-6">

      {/* SECURITY VERDICT CARD */}
      <m.div
        variants={itemVariants}
        whileHover={{ y: -4, scale: 1.01 }}
        className="relative group/solverdict overflow-hidden rounded-2xl border border-white/5 bg-black/40 shadow-[inset_0_2px_20px_rgba(0,0,0,0.8)] hover:border-purple-500/30 hover:bg-black/60 transition-all duration-300 transform-gpu"
      >
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>
        <div className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover/solverdict:opacity-100 transition-opacity duration-500 blur-[1px]`}></div>

        <div className="relative z-10 p-4 sm:p-5 h-full">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className={`p-2 sm:p-2.5 rounded-xl border ${riskBorder} ${riskBg} shadow-[0_0_15px_rgba(168,85,247,0.15)]`}>
                <FiShield className={`h-5 w-5 sm:h-6 sm:w-6 ${riskColor} drop-shadow-[0_0_8px_currentColor]`} />
              </div>
              <h3 className="text-base sm:text-lg font-bold font-mono uppercase tracking-widest text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">Security Verdict</h3>
            </div>
            {riskLevel && (
              <span className={`px-4 py-1.5 rounded text-xs font-mono font-bold tracking-widest uppercase border shadow-[inset_0_0_10px_currentColor] ${riskBorder} ${riskBg} ${riskColor} drop-shadow-[0_0_5px_currentColor]`}>
                {riskLevel}
              </span>
            )}
          </div>

          <div className="space-y-4">
            {/* Human Reason */}
            {humanReason && (
              <div className={`p-4 sm:p-5 rounded-xl border relative overflow-hidden ${riskBorder} ${riskBg} shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]`}>
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
                  <span className="animate-pulse w-2 h-2 rounded-full bg-red-500"></span> Detected Threats
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {securityFlags.map((flag, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-500/10 border border-red-500/30 shadow-[inset_0_0_10px_rgba(239,68,68,0.1)] hover:bg-red-500/20 transition-colors">
                      <FiAlertOctagon className="h-4 w-4 text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
                      <span className="text-xs font-mono tracking-wide text-red-400">{flag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Token Audit Error */}
            {tokenAudit?.error && (
              <div className="mt-4 flex items-start gap-3 p-3 rounded-lg border border-orange-500/30 bg-orange-500/10 shadow-[inset_0_0_10px_rgba(245,158,11,0.1)]">
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
        whileHover={{ y: -4, scale: 1.01 }}
        className="relative group/soldetails overflow-hidden rounded-2xl border border-white/5 bg-black/40 shadow-[inset_0_2px_20px_rgba(0,0,0,0.8)] hover:border-pink-500/30 hover:bg-black/60 transition-all duration-300 transform-gpu"
      >
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>
        <div className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent opacity-0 group-hover/soldetails:opacity-100 transition-opacity duration-500 blur-[1px]`}></div>

        <div className="relative z-10 p-4 sm:p-5 h-full">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="p-2 sm:p-2.5 rounded-xl border border-pink-500/20 bg-pink-500/10 shadow-[0_0_15px_rgba(236,72,153,0.15)] group-hover/soldetails:shadow-[0_0_25px_rgba(236,72,153,0.3)] transition-shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)] group-hover/soldetails:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold font-mono uppercase tracking-widest text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">Transaction Output</h3>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center px-3 py-2 sm:px-4 sm:py-3 bg-black/20 border border-white/5 rounded-lg mb-1.5 hover:border-pink-500/30 transition-colors">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gray-500">Execution Status</span>
              <span className={`text-xs sm:text-sm font-mono font-bold tracking-widest uppercase ${simulation?.status === 'SUCCESS' ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'text-red-400 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]'}`}>
                {simulation?.status || 'UNKNOWN'}
              </span>
            </div>

            <div className="flex justify-between items-center px-3 py-2 sm:px-4 sm:py-3 bg-black/20 border border-white/5 rounded-lg mb-1.5 hover:border-pink-500/30 transition-colors">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gray-500">Compute Units Used</span>
              <span className="text-xs sm:text-sm font-mono text-purple-400 font-bold tracking-wide drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">{computeUnits?.toLocaleString() || 0}</span>
            </div>

            <div className="flex justify-between items-center px-3 py-2 sm:px-4 sm:py-3 bg-black/20 border border-white/5 rounded-lg mb-1.5 hover:border-pink-500/30 transition-colors">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gray-500">Wallet Balance</span>
              <span className="text-xs sm:text-sm font-mono text-white font-bold tracking-wide">{walletBalance !== undefined ? `${walletBalance} SOL` : 'N/A'}</span>
            </div>

            {estimatedChange && (
              <div className="flex justify-between items-center px-3 py-2 sm:px-4 sm:py-3 bg-black/20 border border-white/5 rounded-lg mb-1.5 hover:border-pink-500/30 transition-colors">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gray-500">Est. Net Change</span>
                <span className="text-xs sm:text-sm font-mono text-white font-bold tracking-wide">{estimatedChange}</span>
              </div>
            )}

            <div className="flex justify-between items-center px-3 py-2 sm:px-4 sm:py-3 bg-black/20 border border-white/5 rounded-lg mb-1.5 hover:border-pink-500/30 transition-colors">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gray-500">Rent Exempt Status</span>
              <span className={`text-xs sm:text-sm font-mono font-bold tracking-widest uppercase ${rentExempt ? "text-emerald-400" : "text-gray-500"}`}>
                {rentExempt ? "VERIFIED" : "UNVERIFIED"}
              </span>
            </div>

            {contract && (
              <div className="px-3 py-2 sm:px-4 sm:py-3 bg-[#0a0a0a] border border-white/5 rounded-lg mt-3 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] hover:border-pink-500/30 transition-colors">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-600 block mb-1.5">Target Contract Address</span>
                <span className="text-xs sm:text-sm text-pink-300 break-all font-mono block drop-shadow-[0_0_5px_rgba(236,72,153,0.3)]">
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
