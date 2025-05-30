export default function Recommendations({ isVisible }) {
  if (!isVisible) return null

  const recommendations = [
    "High gas consumption detected - consider adjusting gas limit",
    "Low liquidity may cause price slippage - reduce trade size",
    "Contract has not been renounced - be cautious of admin functions",
  ]

  return (
    <div className="bg-[#1e293b] rounded-xl p-6 border border-yellow-500/30 shadow-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        <div className="ml-4">
          <h4 className="text-lg font-semibold text-yellow-400 mb-3">Recommendations</h4>
          <ul className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <svg className="flex-shrink-0 h-4 w-4 text-yellow-400 mt-1 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-300">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}