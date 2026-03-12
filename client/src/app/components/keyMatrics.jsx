"use client";

import { m } from "framer-motion";
import React from "react";
import { FiCheck, FiShield, FiTarget } from "react-icons/fi";

function keyMatrics({
  itemVariants,
  riskStyle,
  totalScore,
  passRate,
  riskLevel,
  ratioText,
  isVisible,
  data,
  chain = "EVM"
}) {
  // Theme configuration
  const theme = chain === "EVM" ? {
    gradientFrom: "from-blue-600/40",
    gradientTo: "to-blue-600/40",
    secondary: "blue",
    hoverBorder: "hover:border-blue-400/30",
    hoverShadow: "hover:shadow-blue-500/20",
    iconBg1: "bg-blue-600/20",
    iconText1: "text-blue-400",
    iconBg2: "bg-blue-600/20",
    iconText2: "text-blue-400",
    iconBg3: "bg-emerald-500/20", // Keep pass rate green usually, or theme it
    iconText3: "text-emerald-400",
    barBg: "bg-slate-700", // or theme?
    pulseColor1: "bg-blue-500",
    pulseColor2: "bg-blue-500",
    pulseColor3: "bg-emerald-500",
    textColor1: "text-blue-400",
    textColor2: "text-blue-400",
    textColor3: "text-emerald-400"
  } : {
    gradientFrom: "from-purple-600/40",
    gradientTo: "to-pink-600/40",
    secondary: "pink",
    hoverBorder: "hover:border-purple-400/30",
    hoverShadow: "hover:shadow-purple-500/20",
    iconBg1: "bg-purple-600/20",
    iconText1: "text-purple-400",
    iconBg2: "bg-pink-600/20",
    iconText2: "text-pink-400",
    iconBg3: "bg-emerald-500/20",
    iconText3: "text-emerald-400",
    barBg: "bg-slate-700",
    pulseColor1: "bg-purple-500",
    pulseColor2: "bg-pink-500",
    pulseColor3: "bg-emerald-500",
    textColor1: "text-purple-400",
    textColor2: "text-pink-400",
    textColor3: "text-emerald-400"
  };

  // Score range to color (Keep logic but maybe adjust colors if needed)
  const getZoneColor = (score) => {
    if (score >= 40) return "bg-red-500";
    if (score >= 20) return "bg-yellow-400";
    return "bg-green-500";
  };

  const gradientBorderCard = `
    p-[1px] rounded-2xl
    bg-gradient-to-br ${theme.gradientFrom} via-${theme.secondary}-500/30 ${theme.gradientTo}
  `;

  const innerContent = `
    rounded-2xl bg-black 
    border border-white/5 backdrop-blur-sm
    ${theme.hoverBorder} hover:shadow-xl ${theme.hoverShadow}
    transition-all duration-300
  `;

  const total = Number.parseFloat(totalScore) || 0;
  const zoneColor = getZoneColor(total);
  const zoneName =
    total >= 40 ? "Red Flag Zone" : total >= 20 ? "Caution Zone" : "Safe Zone";

  if (!isVisible || !data) return null;

  const honeypotRes = data.honeypotResponse || data.checks || {};
  if (Object.keys(honeypotRes).length === 0) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-6 mb-6 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
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
            data.honeypotResponse?.errorReason ||
            data.honeypotResponse?.mintReason ||
            "This contract didn't trigger any honeypot detection scripts."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <m.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8"
      >
        {/* Risk Level */}
        <m.div
          whileHover={{ y: -4, scale: 1.01 }}
          className="relative group/metric overflow-hidden rounded-xl border border-white/5 bg-black/40 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] hover:border-white/20 hover:bg-black/60 transition-all duration-300 transform-gpu"
        >
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>
          <div className={`absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-${theme.secondary}-500/50 to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity duration-500 blur-[1px]`}></div>

          <div className="relative z-10 p-3 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-xl border border-${theme.secondary}-500/20 ${theme.iconBg1}`}>
                <FiShield className={`h-5 w-5 ${theme.iconText1} drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]`} />
              </div>
              <div className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme.pulseColor1} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${theme.pulseColor1}`}></span>
              </div>
            </div>
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">
                Threat Level Assessment
              </h3>
              <p className={`text-xl sm:text-2xl font-bold font-mono tracking-wide ${theme.textColor1} drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]`}>
                {riskLevel}
              </p>
            </div>
          </div>
        </m.div>

        {/* Total Score */}
        <m.div
          whileHover={{ y: -4, scale: 1.01 }}
          className="relative group/metric overflow-hidden rounded-xl border border-white/5 bg-black/40 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] hover:border-white/20 hover:bg-black/60 transition-all duration-300 transform-gpu"
        >
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>
          <div className={`absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-${theme.secondary}-500/50 to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity duration-500 blur-[1px]`}></div>

          <div className="relative z-10 p-3 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-xl border border-${theme.secondary}-500/20 ${theme.iconBg2}`}>
                <FiTarget className={`h-5 w-5 ${theme.iconText2} drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]`} />
              </div>
              <div className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme.pulseColor2} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${theme.pulseColor2}`}></span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-end justify-between mb-1">
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                  Suspicion Index
                </h3>
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                  {zoneName}
                </span>
              </div>

              <p className={`text-xl sm:text-2xl font-bold font-mono tracking-wide ${theme.textColor2} drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]`}>
                {total}<span className="text-sm text-slate-600">/60</span>
              </p>

              {/* Dynamic Neon Progress Bar */}
              <div className="mt-4 h-1.5 bg-black rounded-full overflow-hidden border border-white/5">
                <m.div
                  className={`h-full ${zoneColor} shadow-[0_0_8px_currentColor]`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(total / 60) * 100}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>

              {/* Zone Legend */}
              <div className="mt-3 flex items-center justify-between text-[10px] sm:text-xs font-mono tracking-widest text-slate-500 uppercase">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]" /> 0-19
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_5px_rgba(250,204,21,0.8)]" /> 20-39
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]" /> 40+
                </div>
              </div>
            </div>
          </div>
        </m.div>

        {/* Pass Rate */}
        <m.div
          whileHover={{ y: -4, scale: 1.01 }}
          className="relative group/metric overflow-hidden rounded-xl border border-white/5 bg-black/40 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] hover:border-white/20 hover:bg-black/60 transition-all duration-300 transform-gpu"
        >
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>
          <div className={`absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-${theme.secondary}-500/50 to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity duration-500 blur-[1px]`}></div>

          <div className="relative z-10 p-3 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-xl border border-${theme.secondary}-500/20 ${theme.iconBg3}`}>
                <FiCheck className={`h-5 w-5 ${theme.iconText3} drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]`} />
              </div>
              <div className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme.pulseColor3} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${theme.pulseColor3}`}></span>
              </div>
            </div>
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">
                Validation Success
              </h3>
              <p className={`text-xl sm:text-2xl font-bold font-mono tracking-wide ${theme.textColor3} drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]`}>
                {passRate}
              </p>
              <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-emerald-500/50 mt-1">
                {ratioText} Signatures
              </p>
            </div>
          </div>
        </m.div>
      </m.div>
    </div>
  );
}

export default keyMatrics;
