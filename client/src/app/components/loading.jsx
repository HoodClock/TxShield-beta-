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
    <div className="bg-black border border-white/10 rounded-xl p-8">
      <div className="max-w-md mx-auto text-center">
        <h3 className="text-xl font-medium mb-4">Analyzing Transaction</h3>

        <div className="relative mb-6">
          <div className="w-full bg-white/10 h-1 rounded-full">
            <div
              className="absolute top-0 left-0 h-1 bg-white rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-right text-xs mt-1">{Math.round(progress)}%</div>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-6">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className={`h-2 ${
                  i < progress / 10 ? "bg-white" : "bg-white/10"
                }`}
              />
            ))}
        </div>

        <p className="text-sm text-gray-400">
          Scanning contract bytecode and transaction patterns...
        </p>
      </div>
    </div>
  );
}
