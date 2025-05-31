"use client";

export default function ResultsDashboard({ isVisible, data }) {
  if (!isVisible || !data) return null;
  
  const { totalScore, passRate, riskLevel, verdict, checks } = data;

  // Count how many checks passed vs. total:
  const totalChecks = Object.keys(checks).length;
  const passedChecks = Object.values(checks).filter(
    (chk) => chk.data.risk === false
  ).length;
  const ratioText = `${passedChecks}/${totalChecks}`;

  // We can choose a color based on riskLevel (simple example):
  const riskColorMap = {
    "Safe Zone": "green-400",
    "Medium": "yellow-400",
    "High": "red-400",
    // add more if needed
  };
  const badgeColor = riskColorMap[riskLevel] || "gray-400";

  return (
    <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700 shadow-lg mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">
          Transaction Analysis
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Risk Level:</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium bg-${badgeColor}/20 text-${badgeColor}`}
          >
            {riskLevel}
          </span>
        </div>
      </div>

      {/* Summary Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Total Score */}
        <div className="bg-[#0f172a] rounded-xl p-5 border border-gray-700">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4"
                />
              </svg>
            </div>
            <h4 className="font-medium text-gray-300">Total Score</h4>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {totalScore.trim()}
          </div>
          <div className="text-sm text-gray-400 mb-4">/ 10</div>
        </div>

        {/* Pass Rate */}
        <div className="bg-[#0f172a] rounded-xl p-5 border border-gray-700">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h4 className="font-medium text-gray-300">Pass Rate</h4>
          </div>
          <div className="text-2xl font-bold text-white mb-3">
            {passRate}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            {/* Convert "88.9%" → 88.9 (number) for styling */}
            {Number(passRate.replace("%", "")) > 0 && (
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: passRate,
                }}
              />
            )}
          </div>
        </div>

        {/* Passed Checks / Total */}
        <div className="bg-[#0f172a] rounded-xl p-5 border border-gray-700">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01"
                />
              </svg>
            </div>
            <h4 className="font-medium text-gray-300">Checks Passed</h4>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {ratioText}
          </div>
          <div className="text-sm text-gray-400">checks passed / total</div>
        </div>
      </div>

      {/* Verdict Text */}
      <div className="mt-4">
        <h4 className="text-lg font-medium text-gray-300 mb-2">Verdict</h4>
        <p className="text-white">{verdict}</p>
      </div>
    </div>
  );
}
