"use client";

import { m } from "framer-motion";
import { useEffect, useState } from "react";
import { LuLoader2 } from "react-icons/lu";

export default function PhishingLoader({ isLoading }) {
  const [progress, setProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanComplete(true);
          return 100;
        }
        return prev + 0.5;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-950/90 backdrop-blur-sm z-[9999] flex items-center justify-center"
    >
      <m.div 
        className="w-full max-w-md p-8 text-center"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
      >
        {/* Animated scanning orb */}
        <m.div
          className="relative mx-auto mb-6 w-24 h-24"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-md" />
          <m.div
            className="w-full h-full rounded-full border-2 border-blue-400/30 flex items-center justify-center"
            animate={{
              background: [
                "conic-gradient(from 0deg, #591e8aff 0%, transparent 20%)",
                "conic-gradient(from 180deg, #6d2ba3ff 0%, transparent 20%)",
                "conic-gradient(from 360deg, #792db8ff 0%, transparent 20%)",
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <LuLoader2 className="w-8 h-8 text-blue-400 animate-spin" />
          </m.div>
        </m.div>

        {/* Progress text */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
            {scanComplete ? "Analysis Complete" : "Scanning Contract"}
          </h2>
          <p className="text-gray-400">
            {scanComplete 
              ? "Finalizing security report..."
              : "Checking for malicious patterns..."}
          </p>
        </m.div>

        {/* Minimal progress bar */}
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden mb-2">
          <m.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
          />
        </div>
        
        {/* Animated scanning dots */}
        <m.div className="flex justify-center gap-1">
          {[...Array(3)].map((_, i) => (
            <m.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-blue-400/50"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </m.div>
      </m.div>
    </m.div>
  );
}