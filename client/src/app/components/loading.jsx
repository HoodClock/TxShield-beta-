"use client";

import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Loader2, ShieldAlert, Code2, Cpu, Lock, Network, ScanEye } from "lucide-react";

const analysisSteps = [
  {
    title: "Initializing Blockchain Scanner",
    description: "Connecting to decentralized nodes",
    icon: <Network className="text-blue-400" />,
    duration: 5
  },
  {
    title: "Downloading Contract Bytecode",
    description: "Fetching from Ethereum mainnet",
    icon: <Code2 className="text-purple-400" />,
    duration: 8
  },
  {
    title: "Decompiling Smart Contract",
    description: "Reverse engineering EVM opcodes",
    icon: <Cpu className="text-yellow-400" />,
    duration: 12
  },
  {
    title: "Identifying Suspicious Patterns",
    description: "Scanning for known attack vectors",
    icon: <ScanEye className="text-orange-400" />,
    duration: 15
  },
  {
    title: "Checking Privileged Functions",
    description: "Analyzing owner controls",
    icon: <Lock className="text-red-400" />,
    duration: 10
  },
  {
    title: "Validating Findings",
    description: "Cross-referencing with threat database",
    icon: <ShieldAlert className="text-green-400" />,
    duration: 10
  }
];

export default function PhishingLoader({ isLoading, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [subProgress, setSubProgress] = useState(0);
  const [blocks, setBlocks] = useState([]);
  const controls = useAnimation();

  // Blockchain animation
  useEffect(() => {
    if (!isLoading) return;

    const blockInterval = setInterval(() => {
      setBlocks(prev => {
        const newBlock = {
          id: Date.now(),
          x: Math.random() * 100,
          speed: 0.5 + Math.random() * 2
        };
        return [...prev.slice(-15), newBlock];
      });
    }, 800);

    return () => clearInterval(blockInterval);
  }, [isLoading]);

  // Step progress animation
  useEffect(() => {
    if (!isLoading) {
      setCurrentStep(0);
      setSubProgress(0);
      setBlocks([]);
      return;
    }

    let startTime = Date.now();
    const totalDuration = analysisSteps.reduce((sum, step) => sum + step.duration, 0);
    let accumulatedTime = 0;

    const stepIntervals = analysisSteps.map((step, index) => {
      accumulatedTime += step.duration;
      
      return setTimeout(() => {
        setCurrentStep(index);
        controls.start({
          scale: [1, 1.1, 1],
          transition: { duration: 0.5 }
        });
      }, (accumulatedTime / totalDuration) * 84000); // 84 seconds total
    });

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / 84000) * 100, 100);
      setSubProgress(progress);

      if (progress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => onComplete(), 500);
      }
    }, 100);

    return () => {
      clearInterval(progressInterval);
      stepIntervals.forEach(interval => clearTimeout(interval));
    };
  }, [isLoading, onComplete, controls]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gray-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-hidden"
      >
        {/* Floating blockchain nodes */}
        {blocks.map(block => (
          <motion.div
            key={block.id}
            initial={{ y: -20, x: `${block.x}%`, opacity: 0 }}
            animate={{ 
              y: "120vh",
              opacity: [0, 1, 0],
              transition: { 
                duration: block.speed,
                ease: "linear"
              }
            }}
            className="absolute top-0 h-2 w-2 rounded-full bg-blue-400/30"
          />
        ))}

        {/* Main loader container */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 w-full max-w-2xl overflow-hidden"
        >
          {/* Glowing border effect */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 rounded-2xl p-[2px] pointer-events-none"
            style={{
              background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
              backgroundSize: '300% 300%',
              zIndex: -1
            }}
          />

          <div className="flex flex-col items-center text-center mb-8">
            <motion.div
              animate={controls}
              className="relative mb-6"
            >
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-lg" />
              <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
            </motion.div>

            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
              Deep Contract Analysis
            </h2>
            <p className="text-gray-400 max-w-md">
              Performing comprehensive security scan of smart contract
            </p>
          </div>

          {/* Current step indicator */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                animate={{
                  rotate: 360,
                  transition: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              >
                {analysisSteps[currentStep].icon}
              </motion.div>
              <div className="text-left flex-1">
                <h3 className="text-lg font-medium text-white">
                  {analysisSteps[currentStep].title}
                </h3>
                <p className="text-sm text-gray-400">
                  {analysisSteps[currentStep].description}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${subProgress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Scan Progress</span>
              <span>{Math.floor(subProgress)}%</span>
            </div>
          </div>

          {/* Blockchain visualization */}
          <div className="relative h-16 rounded-lg bg-gray-900/50 border border-gray-700 overflow-hidden">
            {/* Chain links */}
            <motion.div
              animate={{
                x: [0, -100],
                transition: {
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              className="absolute inset-y-0 left-0 flex items-center gap-2"
            >
              {[...Array(20)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-8 h-8 rounded-full border-2 border-blue-400 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                  </div>
                  <div className="w-16 h-1 bg-blue-400" />
                </div>
              ))}
            </motion.div>

            {/* Scanning beam */}
            <motion.div
              initial={{ left: "0%" }}
              animate={{ left: "100%" }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-0 w-32 h-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
            />
          </div>

          {/* Status message */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
            className="text-center text-xs text-gray-500 mt-6"
          >
            This deep analysis typically takes 1-2 minutes. Please don't close this window.
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}