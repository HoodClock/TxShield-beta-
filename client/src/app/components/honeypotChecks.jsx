"use client";

import { motion } from "framer-motion";

export default function HoneypotChecks({ isVisible, data }) {
  if (!isVisible || !data) return null;

  const checks = data.checks;

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
    <div className="bg-black rounded-xl p-6 border border-white/20 shadow-lg mb-6">
      <h4 className="text-xl font-bold text-white mb-6 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
        Honeypot Security Checks
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {Object.entries(checks).map(([key, result]) => {
          const hasData = result?.data;
          const passed = hasData ? !result.data.risk : false;
          const message = hasData
            ? result.data.message
            : result.message || "No additional information.";

          return (
            <motion.div
              key={key}
              whileHover={{ y: -3 }}
              className={
                "bg-gray-900 rounded-lg p-4 border " +
                (passed
                  ? "border-green-500/30 hover:border-green-400/50"
                  : "border-white/30 hover:border-white/50")
              }
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div
                    className={
                      "w-9 h-9 rounded-lg flex items-center justify-center mr-3 " +
                      (passed ? "bg-green-500/20" : "bg-white/20")
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={
                        "h-5 w-5 " + (passed ? "text-green-400" : "text-white")
                      }
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d={
                          passed
                            ? "M5 13l4 4L19 7"
                            : "M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"
                        }
                      />
                    </svg>
                  </div>
                  <h5 className="font-medium text-gray-200">
                    {TITLES[key] || key}
                  </h5>
                </div>
              </div>
              <div className="text-sm text-gray-400 pl-12">{message}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
