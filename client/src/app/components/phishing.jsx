import React from "react";
import { motion } from "framer-motion";

const PhishingAnalysis = ({ data }) => {
  if (!data) {
    return (
      <div className="text-center py-8 text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400 mx-auto mb-2"></div>
        <p className="text-sm">Analyzing contract security...</p>
      </div>
    );
  }

  // Style definitions - Purple and Blue gradient borders with black backgrounds
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

  const { checks, phishingVerdict } = data;

  // Safely parse the verdict
  let verdict = phishingVerdict;

  if (typeof phishingVerdict === "string") {
    try {
      verdict = JSON.parse(phishingVerdict);
    } catch (e) {
      const jsonMatch = phishingVerdict.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        verdict = JSON.parse(jsonMatch[1]);
      } else {
        verdict = {
          phishingScore: 0,
          riskLevel: "unknown",
          keyFindings: [],
          recommendedActions: []
        };
      }
    }
  }

  const { phishingScore = 0, riskLevel = "unknown", keyFindings = [], recommendedActions = [] } = verdict;

  // Process all security checks
  const securityChecks = Object.entries(checks).map(([checkName, check]) => {
    if (!check.success) return null;

    const formattedName = checkName
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .replace(/^./, str => str.toUpperCase());

    return {
      name: formattedName,
      isScam: check.data?.isScam || false,
      confidence: check.data?.confidence || "none",
      reason: check.data?.reason || "No issues found",
      details: check.data?.checks || null,
      address: check.data?.address || null
    };
  }).filter(Boolean);

  // Count scam findings
  const scamCount = securityChecks.filter(c => c.isScam).length;
  const cleanCount = securityChecks.filter(c => !c.isScam).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-4xl mx-auto"
    >
      {/* Risk Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            Phishing Analysis
          </span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400/50 via-purple-500/50 to-cyan-400/50 mx-auto rounded-full"></div>
      </div>

      {/* Risk Score Card */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={gradientBorderCard}
      >
        <div className={`${innerContent} p-6 sm:p-8`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Risk Assessment</h3>
              <div className="text-5xl sm:text-6xl font-bold mt-2" style={{
                background: `linear-gradient(135deg, ${phishingScore > 70 ? '#ef4444' :
                  phishingScore > 30 ? '#f59e0b' :
                    '#10b981'}, ${phishingScore > 70 ? '#991b1b' :
                  phishingScore > 30 ? '#b45309' :
                    '#065f46'})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {phishingScore}%
              </div>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm sm:text-base font-bold whitespace-nowrap ${riskLevel === "critical" ? "bg-red-500/20 text-red-400 border border-red-500/40" :
                riskLevel === "high" ? "bg-orange-500/20 text-orange-400 border border-orange-500/40" :
                  riskLevel === "medium" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40" :
                    "bg-green-500/20 text-green-400 border border-green-500/40"
              }`}>
              {riskLevel.toUpperCase()}
            </div>
          </div>

          <div className="mt-6">
            <div className="w-full bg-slate-700/30 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${phishingScore}%` }}
                transition={{ duration: 1.2 }}
                className={`h-2 rounded-full ${phishingScore > 70 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                    phishingScore > 30 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                      'bg-gradient-to-r from-green-500 to-emerald-500'
                  }`}
              />
            </div>
          </div>

          <div className="flex justify-between text-xs sm:text-sm text-gray-400 mt-4 pt-4 border-t border-white/10">
            <span className="flex items-center gap-1">
              <span className="text-red-400 font-bold">{scamCount}</span> malicious patterns
            </span>
            <span className="flex items-center gap-1">
              <span className="text-green-400 font-bold">{cleanCount}</span> clean checks
            </span>
          </div>
        </div>
      </motion.div>

      {/* Security Checks */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider pl-2">Detailed Analysis</h3>
        <div className="space-y-3">
          {securityChecks.map((check, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className={gradientBorderCard}
            >
              <div className={`${innerContent} p-4 sm:p-5`}>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`mt-1 flex-shrink-0 text-lg font-bold ${check.isScam ? 'text-red-400' : 'text-emerald-400'
                    }`}>
                    {check.isScam ? '⚠' : '✓'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                      <h4 className={`text-base sm:text-lg font-semibold ${check.isScam ? 'text-red-400' : 'text-white'
                        }`}>
                        {check.name}
                      </h4>
                      {check.confidence !== "none" && (
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap ${check.confidence === "high" ? "bg-red-500/20 text-red-400 border border-red-500/40" :
                            check.confidence === "medium" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40" :
                              "bg-green-500/20 text-green-400 border border-green-500/40"
                          }`}>
                          {check.confidence}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{check.reason}</p>

                    {/* Additional details */}
                    {check.details && (
                      <div className="mt-3 space-y-1 pl-3 border-l-2 border-white/10">
                        {Object.entries(check.details).map(([key, value]) => (
                          <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-1 text-xs text-gray-500">
                            <span className="font-semibold text-gray-400 capitalize">{key}:</span>
                            <span className="text-gray-400">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Key Findings */}
      {keyFindings.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={gradientBorderCard}
        >
          <div className={`${innerContent} p-6 sm:p-8`}>
            <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-4">Critical Findings</h3>
            <ul className="space-y-3">
              {keyFindings.map((finding, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.08 * index }}
                  className="text-sm text-gray-300 flex items-start gap-3"
                >
                  <span className="text-amber-400 font-bold mt-0.5 flex-shrink-0">•</span>
                  <span>{finding}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Recommended Actions */}
      {recommendedActions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={gradientBorderCard}
        >
          <div className={`${innerContent} p-6 sm:p-8`}>
            <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-4">Recommended Actions</h3>
            <ul className="space-y-3">
              {recommendedActions.map((action, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.08 * index + 0.2 }}
                  className="text-sm text-gray-300 flex items-start gap-3"
                >
                  <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">→</span>
                  <span>{action}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PhishingAnalysis;