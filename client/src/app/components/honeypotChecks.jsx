"use client";

import { m } from "framer-motion";
import { useState } from "react";
import Tooltip from "./Tooltip";

export default function HoneypotChecks({ isVisible, data, chain = "EVM" }) {
  if (!isVisible || !data) return null;

  const [expandedChecks, setExpandedChecks] = useState({});

  const honeypotData = data.honeypotResponse || {};

  // Map flat boolean flags to the old 'checks' style array for the UI grid
  const checks = {
    blackList: {
      risk: honeypotData.hasBlackListDetected,
      description: honeypotData.hasBlackListDetected ? "Blacklist functionality detected in contract." : "No blacklist functionality detected.",
    },
    mintAccess: {
      risk: honeypotData.hasMintable,
      description: honeypotData.mintReason || (honeypotData.hasMintable ? "Owner can mint infinite tokens." : "No minting functionality detected."),
      score: honeypotData.mintScore,
    },
    tradingControl: {
      risk: honeypotData.hasTradingControl,
      description: honeypotData.hasTradingControl ? "Trading can be paused or restricted." : "No trading control detected.",
    },
    highTax: {
      risk: honeypotData.buyingTax > 10 || honeypotData.sellingTax > 10,
      description: `Buy Tax: ${honeypotData.buyingTax || 0}%, Sell Tax: ${honeypotData.sellingTax || 0}%`,
    },
    timeHoneypot: {
      risk: honeypotData.isTimeHoneypot,
      description: honeypotData.timeTravelReason || (honeypotData.isTimeHoneypot ? "Time-travel simulation failed." : "Time-travel simulation passed."),
      score: honeypotData.timeTravelScore,
    }
  };

  // Theme configuration
  const theme = chain === "EVM" ? {
    gradientFrom: "from-blue-600/40",
    gradientTo: "to-blue-600/40",
    secondary: "blue",
    hoverBorder: "hover:border-blue-400/30",
    hoverShadow: "hover:shadow-blue-500/20",
    iconColor: "text-blue-400",
    headerText: "text-white" // Keep white for header title usually
  } : {
    gradientFrom: "from-purple-600/40",
    gradientTo: "to-purple-600/40",
    secondary: "pink", // or keep as is for SOL
    hoverBorder: "hover:border-purple-400/30",
    hoverShadow: "hover:shadow-purple-500/20",
    iconColor: "text-amber-400", // Original was amber-400, maybe keep it or change?
    headerText: "text-white"
  };

  // If chain is EVM, maybe icon should be blue? The original icon was amber-400 (warning shield).
  // Keeping amber for shield is fine as it signifies security/warning irrespective of chain color.
  // But the borders/gradients should change.

  if (Object.keys(checks).length === 0) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-6 mb-4 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>
        <div className="relative z-10 flex items-center gap-4 mb-4">
          <div className="p-2 border border-amber-500/20 bg-amber-500/10 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-xl font-bold font-mono tracking-widest uppercase text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">Honeypot Analysis</h4>
            <p className="text-gray-400 font-mono text-sm mt-1">
              No honeypot checks were detected.
            </p>
          </div>
        </div>

        <p className="relative z-10 text-gray-500 font-mono text-sm pl-16">
          {data.verdict ||
            data.message ||
            "This contract didn’t trigger any honeypot detection scripts."}
        </p>
      </div>
    );
  }


  const RISK_HELP = {
    blackList: "A blacklist lets the contract owner freeze specific wallets so they cannot transfer tokens.",
    mintAccess: "Unauthorized minting means someone can create new tokens, diluting holders.",
    tradingControl: "Trading controls can pause buys/sells or restrict who can trade.",
    highTax: "Extreme buy/sell taxes can trap value or make selling impractical.",
    timeHoneypot: "A time-based honeypot may allow buys early, then block sells after a delay.",
    honeypotBuySell: "A honeypot allows you to buy the token, but prevents you from ever selling it.",
    disableTransfer: "Transfers can be disabled so tokens cannot leave the wallet.",
    fakeBalance: "The contract may show a fake balance that cannot be withdrawn or sold.",
    gasTrap: "A gas trap makes sell transactions fail by consuming more gas than available.",
    hiddenOwner: "Ownership may be obfuscated, hiding who can change critical permissions.",
  };

  const TITLES = {
    blackList: "Blacklist Check",
    disableTransfer: "Disable Transfer Check",
    fakeBalance: "Fake Balance Check",
    gasTrap: "Gas Trap Check",
    hiddenOwner: "Hidden Owner Check",
    highTax: "Extreme Tax Check",
    honeypotBuySell: "Honeypot Buy/Sell Check",
    mintAccess: "Mint Access Check",
    tradingControl: "Trading Control Check",
    timeHoneypot: "Time-Travel Simulation",
  };

  return (
    <div className="relative group/honeypot mb-6">
      {/* Hollow Container Background */}
      <div className="absolute inset-0 bg-black/40 rounded-2xl shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] border border-white/5 pointer-events-none transition-colors duration-300 group-hover/honeypot:bg-black/60 group-hover/honeypot:border-blue-500/30"></div>

      {/* Outer Bottom Glow */}
      <div className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-${theme.secondary}-500/50 to-transparent opacity-0 group-hover/honeypot:opacity-100 transition-opacity duration-500 blur-[1px]`}></div>

      <div className="relative z-10 p-3 sm:p-4">
        {/* Header with status summary */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2 pb-3 border-b border-white/10 group-hover/honeypot:border-blue-500/30 transition-colors duration-300">
          <div className="flex items-center">
            <div className={`p-2 rounded-xl border border-${theme.secondary}-500/20 mr-3 ${theme.gradientFrom.replace('from-', 'bg-').replace('/40', '/10')}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${theme.iconColor} drop-shadow-[0_0_8px_currentColor]`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-bold font-mono tracking-widest uppercase text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">Detailed Security Analysis</h4>
              <p className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mt-0.5">
                Honeypot Signatures
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/20 rounded-lg flex items-center shadow-[inset_0_0_10px_rgba(16,185,129,0.05)]">
              <span className="relative flex h-1.5 w-1.5 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]">
                {
                  Object.values(checks).filter((c) => c?.data?.risk === false || c?.risk === false)
                    .length
                }{" "}
                Secure
              </span>
            </div>
            <div className="px-3 py-1.5 bg-red-500/5 border border-red-500/20 rounded-lg flex items-center shadow-[inset_0_0_10px_rgba(239,68,68,0.05)]">
              <span className="relative flex h-1.5 w-1.5 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-400 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">
                {
                  Object.values(checks).filter((c) => c?.data?.risk === true || c?.risk === true)
                    .length
                }{" "}
                Vulnerable
              </span>
            </div>
          </div>
        </div>

        {/* Checks grid with severity indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(checks).map(([key, result]) => {
            const resultData = result?.data !== undefined ? result.data : result;
            const passed = resultData ? !resultData.risk : false;
            const message = resultData?.description || result?.description || resultData?.message || result?.message || (passed ? "Signature passed" : "Vulnerability detected");

            // Color mapping based on status
            const colors = passed
              ? {
                text: "text-emerald-400",
                border: "border-emerald-500/20",
                bgHover: "hover:bg-emerald-500/5",
                borderHover: "hover:border-emerald-500/40",
                dot: "bg-emerald-500",
                tag: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
              }
              : {
                text: "text-red-400",
                border: "border-red-500/30",
                bgHover: "hover:bg-red-500/5",
                borderHover: "hover:border-red-500/50",
                dot: "bg-red-500",
                tag: "bg-red-500/10 border-red-500/30 text-red-400",
              };

            return (
              <m.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative group/check overflow-hidden bg-black/40 border ${colors.border} rounded-xl p-3 transition-all duration-300 cursor-pointer ${colors.bgHover} ${colors.borderHover}`}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover/check:opacity-100 transition-opacity ${colors.dot}`}></div>

                <div className="flex items-start gap-3">
                  {/* Status Indicator */}
                  <div className="mt-0.5 relative flex items-center justify-center w-5 h-5 rounded bg-[#0a0a0a] border border-white/10 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                    {passed ? (
                      <svg className={`w-3 h-3 ${colors.text} drop-shadow-[0_0_5px_currentColor]`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <svg className={`w-3 h-3 ${colors.text} drop-shadow-[0_0_5px_currentColor]`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h5 className={`font-mono font-bold tracking-wide uppercase text-xs ${colors.text} group-hover/check:drop-shadow-[0_0_8px_currentColor] transition-all`}>
                        {TITLES[key] || key}
                      </h5>
                      <span className={`text-[8px] px-1.5 py-0.5 rounded border font-mono uppercase tracking-widest whitespace-nowrap ${colors.tag}`}>
                        {passed ? "CLEAN" : "CRIT"}
                      </span>
                    </div>
                    <p className="font-mono text-[10px] sm:text-xs text-gray-400 group-hover/check:text-gray-300 transition-colors leading-relaxed">
                      {message}
                    </p>

                    {/* Optional progress bar for checks with scores */}
                    {resultData?.score && (
                      <div className="mt-2 pt-2 border-t border-white/5">
                        <div className="flex justify-between font-mono text-[8px] text-gray-500 uppercase tracking-widest mb-1">
                          <span>Confidence Score</span>
                          <span>{resultData.score} {resultData.totalScore}</span>
                        </div>
                        <div className="w-full bg-[#0a0a0a] border border-white/5 h-1 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${colors.dot} shadow-[0_0_5px_currentColor]`}
                            style={{ width: `${resultData.score}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
