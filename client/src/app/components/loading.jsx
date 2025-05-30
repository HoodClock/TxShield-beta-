"use client"

import { useEffect, useState } from "react"

export default function LoadingState({ isLoading, onComplete }) {
  const [progress, setProgress] = useState(0)
  const [currentCheck, setCurrentCheck] = useState("Initializing security checks...")

  const securityChecks = [
    "Checking contract blacklists",
    "Analyzing gas patterns",
    "Verifying token balances",
    "Inspecting transfer restrictions",
    "Checking liquidity pools",
    "Validating contract ownership",
    "Reviewing fee structures",
    "Confirming contract verification"
  ]

  useEffect(() => {
    if (!isLoading) {
      setProgress(0)
      return
    }

    const checkInterval = setInterval(() => {
      setCurrentCheck(securityChecks[Math.floor(Math.random() * securityChecks.length)])
    }, 1500)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 8

        if (newProgress >= 100) {
          clearInterval(progressInterval)
          clearInterval(checkInterval)
          setTimeout(() => {
            onComplete()
          }, 500)
          return 100
        }

        return newProgress
      })
    }, 200)

    return () => {
      clearInterval(progressInterval)
      clearInterval(checkInterval)
    }
  }, [isLoading, onComplete])

  if (!isLoading) return null

  return (
    <div className="bg-[#1e293b] rounded-xl p-8 mb-8 border border-gray-700 shadow-lg text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin animation-delay-200"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">Analyzing Transaction</h3>
        <p className="text-gray-400 mb-1">Running security checks and simulating execution...</p>
        <p className="text-sm text-blue-400 mb-6 animate-pulse">{currentCheck}</p>

        <div className="w-full max-w-md">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.floor(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}