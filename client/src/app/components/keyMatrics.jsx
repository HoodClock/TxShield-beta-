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
    gradientTo: "to-cyan-600/40",
    secondary: "cyan",
    hoverBorder: "hover:border-blue-400/30",
    hoverShadow: "hover:shadow-blue-500/20",
    iconBg1: "bg-blue-600/20",
    iconText1: "text-blue-400",
    iconBg2: "bg-cyan-600/20",
    iconText2: "text-cyan-400",
    iconBg3: "bg-emerald-500/20", // Keep pass rate green usually, or theme it
    iconText3: "text-emerald-400",
    barBg: "bg-slate-700", // or theme?
    pulseColor1: "bg-blue-500",
    pulseColor2: "bg-cyan-500",
    pulseColor3: "bg-emerald-500",
    textColor1: "text-blue-400",
    textColor2: "text-cyan-400",
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

  const checks = data.checks || {};
  if (Object.keys(checks).length === 0) {
    return (
      <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl p-6 mb-6 text-white/80 text-sm shadow-inner shadow-white/5">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-2 bg-white/10 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-amber-400"
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
            <h4 className="text-2xl font-bold text-white">Honeypot Analysis</h4>
            <p className="text-white/60 text-sm">
              No honeypot checks were detected.
            </p>
          </div>
        </div>

        <p className="text-white/70 text-sm">
          {data.verdict ||
            data.message ||
            "This contract didn’t trigger any honeypot detection scripts."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <m.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        {/* Risk Level */}
        <m.div
          whileHover={{ y: -4, scale: 1.02 }}
          className={gradientBorderCard}
        >
          <div className={innerContent + " p-4"}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${theme.iconBg1}`}>
                <FiShield className={`h-6 w-6 ${theme.iconText1}`} />
              </div>
              <div className={`h-2 w-2 rounded-full ${theme.pulseColor1} animate-pulse`} />
            </div>
            <h3 className="text-sm font-medium text-slate-400 mb-1">
              Risk Level
            </h3>
            <p className={`text-xl font-bold ${theme.textColor1}`}>{riskLevel}</p>
          </div>
        </m.div>

        {/* Total Score */}
        <m.div
          whileHover={{ y: -4, scale: 1.02 }}
          className={gradientBorderCard}
        >
          <div className={innerContent + " p-4"}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${theme.iconBg2}`}>
              <FiTarget className={`h-6 w-6 ${theme.iconText2}`} />
            </div>
            <div className={`h-2 w-2 rounded-full ${theme.pulseColor2} animate-pulse`} />
          </div>

          <h3 className="text-sm font-medium text-slate-400 mb-1 flex items-center justify-between">
            Honeypot checks score
            <span className="text-xs text-slate-500">{zoneName}</span>
          </h3>

          <p className={`text-xl font-bold ${theme.textColor2}`}>{total}/60</p>

          {/* Dynamic Progress Bar */}
          <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
            <m.div
              className={`h-full ${zoneColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${(total / 60) * 100}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          {/* Zone Color Bar (with legend) */}
          <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500" /> Safe (0–19)
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-400" /> Caution
              (20–39)
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500" /> Red Flag (40+)
            </div>
          </div>
          </div>
        </m.div>

        {/* Pass Rate */}
        <m.div
          whileHover={{ y: -4, scale: 1.02 }}
          className={gradientBorderCard}
        >
          <div className={innerContent + " p-4"}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${theme.iconBg3}`}>
                <FiCheck className={`h-6 w-6 ${theme.iconText3}`} />
              </div>
              <div className={`h-2 w-2 rounded-full ${theme.pulseColor3} animate-pulse`} />
            </div>
            <h3 className="text-sm font-medium text-slate-400 mb-1">Honeypot Pass Rate</h3>
            <p className={`text-xl font-bold ${theme.textColor3}`}>{passRate}</p>
            <p className="text-sm text-slate-500 mt-1">
              {ratioText} checks passed
            </p>
          </div>
        </m.div>
      </m.div>
    </div>
  );
}

export default keyMatrics;
