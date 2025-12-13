"use client";

import { motion } from "framer-motion";
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
}) {
  // Score range to color
  const getZoneColor = (score) => {
    if (score >= 40) return "bg-red-500";
    if (score >= 20) return "bg-yellow-400";
    return "bg-green-500";
  };

  const gradientBorderCard = `
    p-[1px] rounded-2xl
    bg-gradient-to-br from-purple-600/40 via-blue-500/30 to-purple-600/40
  `;

  const innerContent = `
    rounded-2xl bg-black 
    border border-white/5 backdrop-blur-sm
    hover:border-purple-400/30 hover:shadow-xl hover:shadow-purple-500/20 
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
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        {/* Risk Level */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          className={gradientBorderCard}
        >
          <div className={innerContent + " p-6"}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-500/20">
                <FiShield className="h-6 w-6 text-purple-400" />
              </div>
              <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
            </div>
            <h3 className="text-sm font-medium text-slate-400 mb-1">
              Risk Level
            </h3>
            <p className="text-2xl font-bold text-purple-400">{riskLevel}</p>
          </div>
        </motion.div>

        {/* Total Score */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          className={gradientBorderCard}
        >
          <div className={innerContent + " p-6"}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-500/20">
              <FiTarget className="h-6 w-6 text-blue-400" />
            </div>
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          </div>

          <h3 className="text-sm font-medium text-slate-400 mb-1 flex items-center justify-between">
            Honeypot checks score
            <span className="text-xs text-slate-500">{zoneName}</span>
          </h3>

          <p className="text-2xl font-bold text-blue-400">{total}/60</p>

          {/* Dynamic Progress Bar */}
          <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
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
        </motion.div>

        {/* Pass Rate */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          className={gradientBorderCard}
        >
          <div className={innerContent + " p-6"}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-emerald-500/20">
                <FiCheck className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h3 className="text-sm font-medium text-slate-400 mb-1">Honeypot Pass Rate</h3>
            <p className="text-2xl font-bold text-emerald-400">{passRate}</p>
            <p className="text-sm text-slate-500 mt-1">
              {ratioText} checks passed
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default keyMatrics;
