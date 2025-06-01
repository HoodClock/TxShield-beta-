"use client";

import { useEffect, useState } from "react";

export default function LoadingState({ isLoading, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentCheck, setCurrentCheck] = useState(
    "Initializing security checks..."
  );

  const securityChecks = [
    "Checking contract blacklists",
    "Analyzing gas patterns",
    "Verifying token balances",
    "Inspecting transfer restrictions",
    "Checking liquidity pools",
    "Validating contract ownership",
    "Reviewing fee structures",
    "Confirming contract verification",
  ];

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      return;
    }

    const checkInterval = setInterval(() => {
      setCurrentCheck(
        securityChecks[Math.floor(Math.random() * securityChecks.length)]
      );
    }, 1500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 8;

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          clearInterval(checkInterval);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }

        return newProgress;
      });
    }, 200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(checkInterval);
    };
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <div className="bg-[#0f172a] rounded-xl p-8 mb-8 border border-yellow-500/20 shadow-lg text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-3 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin animation-delay-200"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15l8-8m0 0h-8m8 0v8m-8-8l-8-8m0 0h8m-8 0v8"
              />
            </svg>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-yellow-400 mb-2">
          TxShield Analysis
        </h3>
        <p className="text-gray-400 mb-1">
          Scanning contract for vulnerabilities...
        </p>
        <p className="text-sm text-yellow-400 mb-6 animate-pulse">
          {currentCheck}
        </p>

        <div className="w-full max-w-md">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.floor(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
