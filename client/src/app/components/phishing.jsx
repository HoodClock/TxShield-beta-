import React from "react";

const PhishingAnalysis = ({ data }) => {
  if (!data) {
    return (
      <div className="text-center py-8 text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto mb-2"></div>
        <p className="text-sm">Analyzing contract security...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {Object.entries(data.checks).map(([checkName, check]) => {
        if (!check.success) return null;
        
        const isScam = check.data?.isScam;
        const reason = check.data?.reason || "No issues found";
        const formattedName = checkName.replace(/([A-Z])/g, ' $1').trim();
        
        return (
          <div 
            key={checkName} 
            className={`p-3 rounded-lg border ${isScam ? 'border-red-500/30 bg-red-900/10' : 'border-green-500/30 bg-green-900/10'}`}
          >
            <div className="flex items-start gap-2">
              <div className={`w-2 h-2 mt-1.5 rounded-full ${isScam ? 'bg-red-500' : 'bg-green-500'}`} />
              <div>
                <h3 className="font-medium text-white">{formattedName}</h3>
                <p className="text-sm text-gray-400">{reason}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PhishingAnalysis;