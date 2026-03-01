import React from "react";
import { m } from "framer-motion";

const PhishingAnalysis = ({ data, chain = "EVM" }) => {
  if (!data) {
    return (
      <div className="text-center py-8 text-gray-400">
        <div className={`animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 ${chain === 'EVM' ? 'border-blue-400' : 'border-purple-400'} mx-auto mb-2`}></div>
        <p className="text-sm">Analyzing contract security...</p>
      </div>
    );
  }

  // Define colors based on chain
  const colors = chain === "EVM" ? {
    primary: "blue",
    secondary: "blue",
    accent: "sky",
    gradientFrom: "from-blue-600/40",
    gradientTo: "to-blue-600/40",
    textGradient: "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400",
    barGradient: "from-blue-400/50 via-blue-500/50 to-blue-400/50",
    border: "border-blue-500/20",
    hoverBorder: "hover:border-blue-400/30",
    hoverShadow: "hover:shadow-blue-500/20"
  } : {
    primary: "purple",
    secondary: "pink",
    accent: "fuchsia",
    gradientFrom: "from-purple-600/40",
    gradientTo: "to-purple-600/40",
    textGradient: "bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400",
    barGradient: "from-purple-400/50 via-pink-500/50 to-purple-400/50",
    border: "border-purple-500/20",
    hoverBorder: "hover:border-purple-400/30",
    hoverShadow: "hover:shadow-purple-500/20"
  };

  // Style definitions
  const gradientBorderCard = `
    p-[1px] rounded-2xl
    bg-gradient-to-br ${colors.gradientFrom} via-${colors.secondary}-500/30 ${colors.gradientTo}
  `;

  const innerContent = `
    rounded-2xl bg-black 
    border border-white/5 backdrop-blur-sm
    ${colors.hoverBorder} hover:shadow-xl ${colors.hoverShadow}
    transition-all duration-300
  `;

  const { checks: oldChecks, phishingVerdict: oldVerdict, details, riskSummery } = data;
  const checks = details || oldChecks || {};

  // Safely parse the verdict/summary
  let verdict = riskSummery || oldVerdict;

  if (typeof verdict === "string") {
    try {
      verdict = JSON.parse(verdict);
    } catch (e) {
      const jsonMatch = verdict.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        verdict = JSON.parse(jsonMatch[1]);
      } else {
        // Fallback or legacy structure
        verdict = {
          totalScore: 0,
          riskLevel: "Unknown",
          verdict: "Unable to parse verdict"
        };
      }
    }
  }

  // normalize fields from different response structures
  const phishingScore = verdict?.totalScore ?? verdict?.phishingScore ?? 0;
  let riskLevel = verdict?.riskLevel ?? "unknown";
  const summaryText = verdict?.verdict ?? "No summary available";

  // Normalize risk level for styling
  const normalizedRisk = riskLevel.toLowerCase();
  let riskColorClass = "green"; // default

  if (normalizedRisk.includes("safe") || normalizedRisk.includes("low")) {
    riskColorClass = "green";
  } else if (normalizedRisk.includes("medium")) {
    riskColorClass = "yellow";
  } else if (normalizedRisk.includes("high")) {
    riskColorClass = "orange";
  } else if (normalizedRisk.includes("critical")) {
    riskColorClass = "red";
  }

  const keyFindings = verdict?.keyFindings || []; // Legacy
  const recommendedActions = verdict?.recommendedActions || []; // Legacy

  // Process all security checks
  const securityChecks = Object.entries(checks).map(([checkName, check]) => {
    // If check has a success flag and it's false, skip? 
    if (check && check.success === false) return null;

    const formattedName = checkName
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .replace(/^./, str => str.toUpperCase());

    return {
      name: formattedName,
      isScam: check.isScam !== undefined ? check.isScam : (check.data?.isScam || false),
      confidence: check.confidence || check.data?.confidence || "none",
      reason: check.reason || check.data?.reason || "No issues found",
      details: check.details || check.checks || check.data?.checks || null,
      address: check.address || check.data?.address || null
    };
  }).filter(Boolean);

  // Count scam findings
  const scamCount = securityChecks.filter(c => c.isScam).length;
  const cleanCount = securityChecks.filter(c => !c.isScam).length;

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-4 max-w-3xl mx-auto"
    >
      {/* Risk Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono uppercase tracking-widest mb-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          <span className={`${colors.textGradient} bg-clip-text text-transparent`}>
            Phishing Analysis
          </span>
        </h2>
        <div className={`w-32 h-1 bg-gradient-to-r ${colors.barGradient} mx-auto rounded-full blur-[1px]`}></div>
      </div>

      {/* Risk Score Card */}
      <m.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ y: -4, scale: 1.01 }}
        className="relative group/phishingScore overflow-hidden rounded-2xl border border-white/5 bg-black/40 shadow-[inset_0_2px_20px_rgba(0,0,0,0.8)] hover:border-white/20 hover:bg-black/60 transition-all duration-300 transform-gpu"
      >
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>
        <div className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-${colors.secondary}-500/50 to-transparent opacity-0 group-hover/phishingScore:opacity-100 transition-opacity duration-500 blur-[1px]`}></div>

        <div className="relative z-10 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            <div className="flex-1">
              <h3 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-widest mb-2 shadow-black drop-shadow-md">Risk Assessment</h3>
              <div className="text-4xl sm:text-5xl font-mono font-bold mt-2" style={{
                background: `linear-gradient(135deg, ${phishingScore > 70 ? '#ef4444' :
                  phishingScore > 30 ? '#f59e0b' :
                    '#10b981'}, ${phishingScore > 70 ? '#991b1b' :
                      phishingScore > 30 ? '#b45309' :
                        '#065f46'})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: `drop-shadow(0 0 10px ${phishingScore > 70 ? 'rgba(239,68,68,0.4)' : phishingScore > 30 ? 'rgba(245,158,11,0.4)' : 'rgba(16,185,129,0.4)'})`
              }}>
                {phishingScore}<span className="text-2xl text-slate-600">/100</span>
              </div>
              <p className="text-gray-400 font-mono text-xs sm:text-sm mt-3 border-l-2 border-white/10 pl-3 py-1">"{summaryText}"</p>
            </div>
            <div className={`px-5 py-2.5 rounded border text-sm sm:text-base font-mono uppercase tracking-widest font-bold whitespace-nowrap shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] 
                ${riskColorClass === "red" ? "bg-red-500/10 text-red-500 border-red-500/30 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" :
                riskColorClass === "orange" ? "bg-orange-500/10 text-orange-500 border-orange-500/30 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" :
                  riskColorClass === "yellow" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/30 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" :
                    "bg-green-500/10 text-green-500 border-green-500/30 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
              }`}>
              {riskLevel}
            </div>
          </div>

          <div className="mt-5">
            <div className="w-full bg-[#0a0a0a] border border-white/5 rounded-full h-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
              <m.div
                initial={{ width: 0 }}
                animate={{ width: `${phishingScore}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className={`h-full rounded-full ${phishingScore > 70 ? 'bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_8px_rgba(239,68,68,0.8)]' :
                  phishingScore > 30 ? 'bg-gradient-to-r from-yellow-600 to-orange-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]' :
                    'bg-gradient-to-r from-green-600 to-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]'
                  }`}
              />
            </div>
          </div>

          <div className="flex justify-between text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gray-500 mt-3 pt-3 border-t border-white/5">
            <span className="flex items-center gap-1.5">
              <span className="text-red-500 font-bold">{scamCount}</span> Suspicious
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-green-500 font-bold">{cleanCount}</span> Clean
            </span>
          </div>
        </div>
      </m.div>

      {/* Security Checks */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-widest pl-2 mb-2">Scanner Modules</h3>
        <div className="space-y-3">
          {securityChecks.map((check, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -2, scale: 1.01 }}
              className={`relative group/check overflow-hidden rounded-xl border p-4 sm:p-5 transition-all duration-300 transform-gpu
              ${check.isScam
                  ? 'bg-red-500/5 border-red-500/20 hover:bg-red-500/10 hover:border-red-500/40'
                  : `bg-${colors.secondary}-500/5 border-${colors.secondary}-500/20 hover:bg-${colors.secondary}-500/10 hover:border-${colors.secondary}-500/40`
                }`}
            >    <div className={`absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover/check:opacity-100 transition-opacity ${check.isScam ? 'bg-red-500' : 'bg-emerald-500'}`}></div>

              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 flex items-center justify-center w-6 h-6 rounded bg-[#0a0a0a] border border-white/10 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                  {check.isScam ? (
                    <span className="text-red-500 text-sm drop-shadow-[0_0_5px_rgba(239,68,68,0.8)] font-bold">!</span>
                  ) : (
                    <svg className="w-3.5 h-3.5 text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h4 className={`text-sm sm:text-base font-mono font-bold tracking-wide uppercase ${check.isScam ? 'text-red-400 group-hover/phishcheck:drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]' : 'text-white'}`}>
                      {check.name}
                    </h4>
                    {check.confidence !== "none" && (
                      <span className={`text-[10px] px-2 py-0.5 rounded border border-white/10 font-mono font-semibold uppercase tracking-widest ${check.confidence.toLowerCase() === "high" ? "bg-red-500/10 text-red-500 border-red-500/30 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]" :
                        check.confidence.toLowerCase() === "medium" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/30 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]" :
                          "bg-green-500/10 text-green-500 border-green-500/30 drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]"
                        }`}>
                        Conf: {check.confidence}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-mono text-gray-400 group-hover/phishcheck:text-gray-300 transition-colors leading-relaxed mb-1">{check.reason}</p>

                  {/* Additional details */}
                  {check.details && (
                    <div className="mt-3 space-y-1.5 pl-3 border-l border-white/10 group-hover/phishcheck:border-white/20 transition-colors">
                      {Object.entries(check.details).map(([key, value]) => (
                        <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-1.5 text-[10px] sm:text-xs">
                          <span className="font-mono uppercase tracking-widest text-slate-500">{key}:</span>
                          <span className="font-mono text-slate-400">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {check.address && (
                    <div className="mt-3 text-xs font-mono bg-[#0a0a0a] p-2 rounded border border-white/5 break-all text-slate-400 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                      <span className="text-slate-500 uppercase tracking-widest block mb-1 text-[10px]">Flagged Entity:</span>
                      {check.address}
                    </div>
                  )}
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>

      {/* Key Findings */}
      {keyFindings.length > 0 && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative overflow-hidden rounded-xl border border-amber-500/20 bg-black/40 shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] mt-4"
        >
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>

          <div className="relative z-10 p-4 sm:p-5">
            <h3 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="animate-pulse w-2 h-2 rounded-full bg-amber-500"></span> Critical Findings
            </h3>
            <ul className="space-y-3">
              {keyFindings.map((finding, index) => (
                <m.li
                  key={index}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.08 * index }}
                  className="text-xs sm:text-sm font-mono text-amber-100/80 flex items-start gap-3"
                >
                  <span className="text-amber-500 font-bold mt-0.5 flex-shrink-0 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]">❯</span>
                  <span>{finding}</span>
                </m.li>
              ))}
            </ul>
          </div>
        </m.div>
      )}

      {/* Recommended Actions */}
      {recommendedActions.length > 0 && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative overflow-hidden rounded-xl border border-emerald-500/20 bg-black/40 shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] mt-3"
        >
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>

          <div className="relative z-10 p-4 sm:p-5">
            <h3 className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="animate-pulse w-2 h-2 border border-emerald-500 bg-emerald-500/50"></span> Recommended Actions
            </h3>
            <ul className="space-y-3">
              {recommendedActions.map((action, index) => (
                <m.li
                  key={index}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.08 * index + 0.2 }}
                  className="text-xs sm:text-sm font-mono text-emerald-100/80 flex items-start gap-3"
                >
                  <span className="text-emerald-500 font-bold mt-0.5 flex-shrink-0 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]">→</span>
                  <span>{action}</span>
                </m.li>
              ))}
            </ul>
          </div>
        </m.div>
      )}
    </m.div>
  );
};

export default PhishingAnalysis;