import { useState } from "react";

export default function Recommendations({
  simulationData,
  honeypotData,
  onGenerate,
  recommendation,
}) {
  const [generated, setGenerated] = useState(false);

  const handleClick = async () => {
    await onGenerate();
    setGenerated(true);
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl text-white">
      <h3 className="text-2xl font-bold mb-4">AI Recommendations</h3>

      {!generated ? (
        <button
          onClick={handleClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate Recommendations
        </button>
      ) : (
        <div className="space-y-2">
          {recommendation ? (
            recommendation.split("\n").map((line, idx) => (
              <p key={idx} className="text-gray-300">
                • {line}
              </p>
            ))
          ) : (
            <p className="text-yellow-400">No recommendations available.</p>
          )}
        </div>
      )}
    </div>
  );
}
