"use client";

export default function HoneypotChecks({ isVisible, data }) {
  if (!isVisible || !data) return null;

  // data.checks is an object whose keys are e.g. "blackList", "gasTrap", etc.
  const checks = data.checks;

  // A little map from API‐key → user‐friendly title:
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
    <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700 shadow-lg mb-6">
      <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-blue-400"
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
          // result.data.risk is a boolean (true = risky, false = safe)
          const passed = !result.data.risk;
          const message = result.data.message;

          return (
            <div
              key={key}
              className={
                "bg-[#0f172a] rounded-lg p-4 border " +
                (passed
                  ? "border-green-500 hover:border-green-400"
                  : "border-red-500 hover:border-red-400")
              }
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div
                    className={
                      "w-8 h-8 rounded-lg flex items-center justify-center mr-3 " +
                      (passed ? "bg-green-500/20" : "bg-red-500/20")
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={
                        "h-4 w-4 " +
                        (passed ? "text-green-400" : "text-red-400")
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
                            ? "M5 13l4 4L19 7" // check mark
                            : "M6 18L18 6M6 6l12 12" // X
                        }
                      />
                    </svg>
                  </div>
                  <h5 className="font-medium text-gray-300">
                    {TITLES[key] || key}
                  </h5>
                </div>
                {/* optional “toggle” icon if you want expand/collapse */}
                <button className="text-gray-500 hover:text-blue-400 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-sm text-gray-400 pl-11">{message}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
