export default function HoneypotChecks({ isVisible }) {
  if (!isVisible) return null

  const checks = [
    {
      title: "Blacklist Check",
      passed: true,
      description: "The address is not blacklisted. No restrictions found.",
    },
    {
      title: "Gas Trap",
      passed: false,
      description: "High gas consumption detected. Potential gas trap identified.",
    },
    {
      title: "Transfer Lock",
      passed: true,
      description: "No transfer restrictions found. Tokens can be freely moved.",
    },
    {
      title: "Liquidity Check",
      passed: false,
      description: "Low liquidity detected. Potential for price impact.",
    },
    {
      title: "Fake Balance",
      passed: true,
      description: "Tokens balance matches expected value. No discrepancies found.",
    },
    {
      title: "Hidden Owner",
      passed: true,
      description: "No hidden ownership detected. Contract ownership is transparent.",
    },
    {
      title: "Sell Tax",
      passed: true,
      description: "No excessive sell tax detected. Standard fees apply.",
    },
    {
      title: "Contract Verification",
      passed: true,
      description: "Contract source code verified on Etherscan.",
    },
  ]

  return (
    <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700 shadow-lg mb-6">
      <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        Honeypot Security Checks
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {checks.map((check, index) => (
          <div
            key={index}
            className="bg-[#0f172a] rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${check.passed ? "bg-green-500/20" : "bg-red-500/20"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${check.passed ? "text-green-400" : "text-red-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={check.passed ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} />
                  </svg>
                </div>
                <h5 className="font-medium text-gray-300">{check.title}</h5>
              </div>
              <button className="text-gray-500 hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <div className="text-sm text-gray-400 pl-11">{check.description}</div>
          </div>
        ))}
      </div>

      {/* <div className="mt-6">
        <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-lg hover:from-blue-500 hover:to-indigo-600 transition-colors shadow-lg shadow-blue-500/20">
          Proceed with Transaction
        </button>
      </div> */}
    </div>
  )
}