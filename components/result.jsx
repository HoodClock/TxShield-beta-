export default function ResultsDashboard({ isVisible }) {
  if (!isVisible) return null

  return (
    <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">
          Transaction Analysis
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Risk Level:</span>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-400">Medium</span>
        </div>
      </div>

      {/* Simulation Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Gas Estimation */}
        <div className="bg-[#0f172a] rounded-xl p-5 border border-gray-700">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-300">Gas Estimation</h4>
          </div>
          <div className="text-2xl font-bold text-white mb-1">0.0024 ETH</div>
          <div className="text-sm text-gray-400 mb-4">(~ $4.30)</div>
          <div className="pt-3 border-t border-gray-700">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Gas Limit</span>
              <span className="font-medium text-gray-300">20000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Gas Price</span>
              <span className="font-medium text-gray-300">120 Gwei</span>
            </div>
          </div>
        </div>

        {/* Success Probability */}
        <div className="bg-[#0f172a] rounded-xl p-5 border border-gray-700">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-300">Success Probability</h4>
          </div>
          <div className="text-2xl font-bold text-white mb-3">87%</div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: "87%" }}></div>
          </div>
        </div>

        {/* Risk Meter */}
        <div className="bg-[#0f172a] rounded-xl p-5 border border-gray-700">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-300">Risk Assessment</h4>
          </div>
          <div className="flex items-center h-24">
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  className="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="3"
                />
                <path
                  className="circle-fill"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeDasharray="60, 100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-yellow-400">Medium</span>
              </div>
            </div>
            <div className="ml-6 text-left">
              <div className="text-sm text-gray-400 mb-1">Honeypot Checks</div>
              <div className="text-xl font-bold text-white mb-1">6/8</div>
              <div className="text-sm text-gray-400">Paused</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .circular-chart {
          display: block;
          margin: 10px auto;
          max-width: 80%;
          max-height: 80%;
        }
        .circle-bg {
          fill: none;
          stroke: #1e293b;
          stroke-width: 3;
        }
        .circle-fill {
          fill: none;
          stroke-width: 3;
          stroke-linecap: round;
          animation: circle-fill-animation 1s ease-in-out forwards;
        }
        @keyframes circle-fill-animation {
          0% {
            stroke-dasharray: 0, 100;
          }
        }
      `}</style>
    </div>
  )
}