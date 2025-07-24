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

  const { checks, phishingVerdict } = data;
  
  // Safely parse the verdict
  let verdict;
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
      className="space-y-6 max-w-2xl mx-auto"
    >
      {/* Risk Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          Security Analysis
        </h2>
        <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-400/50 to-purple-500/50 mx-auto mb-4"></div>
      </div>

      {/* Risk Score Card */}
      <motion.div 
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        className="bg-gray-900/50 border border-gray-800 rounded-xl p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-medium text-gray-400">Risk Assessment</h3>
            <div className="text-3xl font-bold mt-1" style={{
              color: phishingScore > 70 ? '#ef4444' : 
                    phishingScore > 30 ? '#f59e0b' : 
                    '#10b981'
            }}>
              {phishingScore}%
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
            riskLevel === "critical" ? "bg-red-500/20 text-red-400" :
            riskLevel === "high" ? "bg-orange-500/20 text-orange-400" :
            riskLevel === "medium" ? "bg-yellow-500/20 text-yellow-400" :
            "bg-green-500/20 text-green-400"
          }`}>
            {riskLevel.toUpperCase()}
          </div>
        </div>

        <div className="w-full bg-gray-800 rounded-full h-1.5 mb-2">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${phishingScore}%` }}
            transition={{ duration: 1 }}
            className={`h-1.5 rounded-full ${
              phishingScore > 70 ? 'bg-red-500' :
              phishingScore > 30 ? 'bg-yellow-500' :
              'bg-green-500'
            }`}
          />
        </div>

        <div className="flex justify-between text-xs text-gray-400">
          <span>{scamCount} malicious patterns</span>
          <span>{cleanCount} clean checks</span>
        </div>
      </motion.div>

      {/* Security Checks */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Detailed Analysis</h3>
        <div className="space-y-3">
          {securityChecks.map((check, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${
                check.isScam ? 'border-red-500/20 bg-red-900/5' : 'border-gray-700 bg-gray-800/10'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 flex-shrink-0 ${
                  check.isScam ? 'text-red-500' : 'text-cyan-400'
                }`}>
                  {check.isScam ? '✖' : '✓'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-medium ${
                      check.isScam ? 'text-red-400' : 'text-gray-300'
                    }`}>
                      {check.name}
                    </h4>
                    {check.confidence !== "none" && (
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        check.confidence === "high" ? "bg-red-500/10 text-red-400" :
                        check.confidence === "medium" ? "bg-yellow-500/10 text-yellow-400" :
                        "bg-green-500/10 text-green-400"
                      }`}>
                        {check.confidence}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{check.reason}</p>
                  
                  {/* Additional details */}
                  {check.details && (
                    <div className="mt-2 space-y-1">
                      {Object.entries(check.details).map(([key, value]) => (
                        <div key={key} className="flex text-xs text-gray-500">
                          <span className="font-medium mr-1">{key}:</span>
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
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
          className="space-y-3"
        >
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Critical Findings</h3>
          <ul className="space-y-2 pl-5">
            {keyFindings.map((finding, index) => (
              <motion.li 
                key={index}
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-sm text-gray-300 list-disc"
              >
                {finding}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Recommended Actions */}
      {recommendedActions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="border border-red-500/20 bg-red-900/10 rounded-lg p-4"
        >
          <h3 className="text-sm font-medium text-red-400 mb-2">Recommended Actions</h3>
          <ul className="space-y-2 pl-5">
            {recommendedActions.map((action, index) => (
              <motion.li 
                key={index}
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.1 * index + 0.2 }}
                className="text-sm text-gray-300 list-disc"
              >
                {action}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PhishingAnalysis;