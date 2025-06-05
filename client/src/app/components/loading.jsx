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

  const [blocks, setBlocks] = useState(Array(10).fill(false));

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      setBlocks(Array(10).fill(false));
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

        // Update blocks based on progress
        const filledBlocks = Math.floor(newProgress / 10);
        setBlocks(blocks.map((_, i) => i < filledBlocks));

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
    <div className="bg-black rounded-xl p-8 mb-8 border border-gray-700 shadow-lg">
      <div className="flex flex-col items-center justify-center">
        {/* Blockchain block visualization */}
        <div className="relative w-full max-w-md mb-8">
          <div className="flex justify-center space-x-1 mb-2">
            {blocks.map((filled, i) => (
              <div
                key={i}
                className={`h-3 w-3 rounded-sm ${
                  filled ? "bg-white" : "bg-gray-700"
                }`}
              />
            ))}
          </div>

          {/* Chain connection lines */}
          <div className="absolute top-1.5 left-0 right-0 flex justify-between px-1.5">
            {blocks.slice(0, -1).map((_, i) => (
              <div
                key={i}
                className={`h-0.5 w-3 ${
                  blocks[i] && blocks[i + 1] ? "bg-white" : "bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">
          Transaction Security Scan
        </h3>
        <p className="text-gray-400 mb-4">Validating blockchain contract...</p>

        {/* Animated blocks */}
        <div className="grid grid-cols-5 gap-2 mb-6 w-40">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className={`h-4 rounded-sm transition-all duration-300 ${
                  i < Math.floor(progress / 10) ? "bg-white" : "bg-gray-700"
                }`}
              />
            ))}
        </div>

        <p className="text-sm text-gray-300 mb-6 font-mono animate-pulse">
          {currentCheck}
        </p>

        {/* Minimal progress indicator */}
        <div className="w-full max-w-md">
          <div className="flex justify-between text-xs text-gray-400 mb-1 font-mono">
            <span>BLOCKS VERIFIED</span>
            <span>{Math.floor(progress)}%</span>
          </div>
          <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
