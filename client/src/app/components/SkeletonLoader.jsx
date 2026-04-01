"use client";

import { m } from "framer-motion";
import { FiLayout, FiShield, FiCpu, FiCode, FiZap } from "react-icons/fi";

export default function SkeletonLoader({ isLoading }) {
  if (!isLoading) return null;

  const pulseTransition = {
    opacity: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full mt-12 mb-24 max-w-7xl mx-auto space-y-4 sm:space-y-6"
    >
      {/* Header Skeleton */}
      <div className="text-center mb-4 sm:mb-6 flex flex-col items-center">
        <m.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={pulseTransition.opacity}
          className="h-10 w-64 bg-gray-800 rounded-lg mb-3"
        />
        <m.div
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ ...pulseTransition.opacity, delay: 0.2 }}
          className="h-4 w-48 bg-gray-800 rounded-lg"
        />
      </div>

      {/* HeroStatus Skeleton */}
      <m.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ ...pulseTransition.opacity, delay: 0.1 }}
        className="w-full h-24 sm:h-32 bg-blue-900/10 border border-blue-500/20 rounded-2xl"
      />

      {/* Main Grid Block */}
      <div className="relative w-full rounded-3xl border border-blue-500/20 bg-[#0a1931]/50 p-4 sm:p-6">
        
        {/* Tab Navigation Skeleton */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4 bg-blue-950/20 p-2 rounded-2xl border border-blue-500/10">
          {[...Array(4)].map((_, i) => (
            <m.div
              key={i}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ ...pulseTransition.opacity, delay: i * 0.1 }}
              className="h-10 w-32 bg-gray-800 rounded-xl"
            />
          ))}
        </div>

        {/* Dashboard Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          
          <div className="lg:col-span-2 space-y-4">
            {/* TransactionDetails Skeleton */}
            <div className="relative bg-[#080d1a] border border-blue-500/10 rounded-2xl overflow-hidden p-4 sm:p-5">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                <m.div className="h-6 w-48 bg-gray-800 rounded-md" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={pulseTransition.opacity} />
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-2">
                {[...Array(12)].map((_, i) => (
                  <m.div
                    key={i}
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ ...pulseTransition.opacity, delay: i * 0.05 }}
                    className="h-14 bg-gray-900 rounded-xl"
                  />
                ))}
              </div>

              {/* Gas Analysis Banner Skeleton */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-xl border border-blue-500/10 bg-[#080d1a]">
                <m.div className="h-12 w-32 bg-gray-900 rounded-lg" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={pulseTransition.opacity} />
                <m.div className="h-12 w-48 bg-gray-900 rounded-lg" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={pulseTransition.opacity} />
              </div>
            </div>

            {/* BalanceChanges Skeleton */}
            <m.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ ...pulseTransition.opacity, delay: 0.3 }}
              className="h-48 bg-[#080d1a] border border-blue-500/10 rounded-2xl"
            />
          </div>

          <div className="space-y-4">
            {/* TransactionSummary Skeleton */}
            <m.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ ...pulseTransition.opacity, delay: 0.4 }}
              className="h-96 bg-[#080d1a] border border-blue-500/10 rounded-2xl"
            />
          </div>

        </div>
      </div>
    </m.div>
  );
}
