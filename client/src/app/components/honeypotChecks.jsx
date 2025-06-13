"use client";

import { motion } from "framer-motion";

export default function HoneypotChecks({ isVisible, data }) {
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
            <h4 className="text-2xl font-bold text-white">Security Analysis</h4>
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

  const TITLES = {
    blackList: "Blacklist Check",
    disableTransfer: "Disable Transfer Check",
    fakeBalance: "Fake Balance Check",
    gasTrap: "Gas Trap Check",
    hiddenOwner: "Hidden Owner Check",
    highSellTax: "High Sell Tax Check",
    honeypotBuySell: "Honeypot Buy/Sell Check",
    mintAccess: "Mint Access Check",
    tradingControl: "Trading Control Check",
  };

  return (
    <div className="bg-black rounded-xl p-6 mb-6">
      {/* Header with status summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center">
          <div className="mr-4 p-2 bg-white/5 rounded-lg">
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
            <h4 className="text-2xl font-bold text-white">Security Analysis</h4>
            <p className="text-sm text-white/60">
              Honeypot vulnerability checks
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="px-3 py-1.5 bg-white/5 rounded-full flex items-center">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
            <span className="text-xs font-medium">
              {
                Object.values(checks).filter((c) => c?.data?.risk === false)
                  .length
              }{" "}
              Secure
            </span>
          </div>
          <div className="px-3 py-1.5 bg-white/5 rounded-full flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            <span className="text-xs font-medium">
              {
                Object.values(checks).filter((c) => c?.data?.risk === true)
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
          const passed = result?.data ? !result.data.risk : false;
          const message =
            result?.data?.message || result?.message || "Check completed";
          const severity = result?.data?.severity || "medium";

          // Color mapping based on severity
          const colorMap = {
            high: {
              bg: "bg-gradient-to-r from-red-900/20 to-red-900/10",
              border: "border-red-500/40",
              text: "text-red-400",
              dot: "bg-red-500",
            },
            medium: {
              bg: "bg-gradient-to-r from-amber-900/20 to-amber-900/10",
              border: "border-amber-500/40",
              text: "text-amber-400",
              dot: "bg-amber-500",
            },
            low: {
              bg: "bg-gradient-to-r from-white/5 to-white/5",
              border: "border-white/20",
              text: "text-white/80",
              dot: "bg-white/60",
            },
          };

          const colors = passed
            ? {
                bg: "bg-gradient-to-r from-emerald-900/10 to-emerald-900/5",
                border: "border-emerald-400/30",
                text: "text-emerald-400",
                dot: "bg-emerald-400",
              }
            : colorMap[severity];

          return (
            <motion.div
              key={key}
              whileHover={{ y: -2 }}
              className={`p-4 rounded-lg border ${colors.border} ${colors.bg} transition-all`}
            >
              <div className="flex items-start gap-3">
                {/* Severity dot */}
                <div
                  className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${colors.dot}`}
                ></div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h5 className={`font-medium ${colors.text}`}>
                      {TITLES[key] || key}
                    </h5>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        passed
                          ? "bg-emerald-900/30 text-emerald-300"
                          : "bg-red-900/30 text-red-300"
                      }`}
                    >
                      {passed ? "PASSED" : severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm mt-1 text-white/70">{message}</p>

                  {/* Optional progress bar for checks with scores */}
                  {result?.data?.score && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-white/50 mb-1">
                        <span>Security score</span>
                        <span>{result.data.score}/100</span>
                      </div>
                      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${colors.dot}`}
                          style={{ width: `${result.data.score}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary bar */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
            <span className="text-sm text-white/80">Secure checks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <span className="text-sm text-white/80">Medium risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-white/80">High risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white/60"></div>
            <span className="text-sm text-white/80">Low risk</span>
          </div>
        </div>
      </div>
    </div>
  );
}
