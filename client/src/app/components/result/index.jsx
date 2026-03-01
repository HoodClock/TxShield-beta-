"use client";

import { m } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// Sub-components from parent folder
import KeyMatrics from "../keyMatrics";
import Phishing from "../phishing";
import HoneypotChecks from "../honeypotChecks";
import Recommendations from "../recomendations";

// Local sub-components
import HeroStatus from "./HeroStatus";
import TransactionDetails from "./TransactionDetails";
import BalanceChanges from "./BalanceChanges";
import BackToSimulate from "./BackToSimulate";
import RecentTransfers from "./RecentTransfers";
import TransactionSummary from "./TransactionSummary";
import BytecodeAnalysis from "./BytecodeAnalysis";
import SolanaDetails from "./SolanaDetails";
import SolanaLogs from "./SolanaLogs";
import { mockSimulation, mockHoneypot, mockPhishing, mockSolSimulation, getRiskStyle, themes } from "./utils";

export default function ResultsDashboard({
  isVisible,
  simulation,
  honeypot,
  phishing,
  solSimulation,
  onGenerateRecommendation,
  recommendationData,
  chain = "EVM",
}) {
  const router = useRouter();
  const mounted = useRef(true);

  // Use mock data for testing, real data when available
  // TESTING: Uncomment the next 3 lines to use mock data
  // const finalSimulation = mockSimulation;
  // const finalHoneypot = mockHoneypot;
  // const finalPhishing = mockPhishing;
  const finalSimulation = simulation;
  const finalHoneypot = honeypot;
  const finalPhishing = phishing;
  // const finalSolSimulation = mockSolSimulation;
  const finalSolSimulation = solSimulation;

  const [expandedSections, setExpandedSections] = useState({
    txDetails: true,
    balances: true,
    transfers: false,
    bytecode: true,
    checks: true,
    warnings: true,
  });

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const toggleSection = (section) => {
    if (!mounted.current) return;
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (!isVisible && !finalSimulation && !finalHoneypot && !finalPhishing && !finalSolSimulation) return null;

  const t = themes[chain] || themes.EVM;

  // --- EVM Data Processing ---
  const {
    totalScore = "0",
    passRate: rawPassRate = "0%",
    riskLevel = "Unknown",
    checks = {},
  } = finalHoneypot || {};

  const totalChecks = Object.keys(checks).length;
  const passedChecks = Object.values(checks).filter(
    (chk) => chk?.risk === false || chk?.data?.risk === false
  ).length;
  const evmRatioText = `${passedChecks}/${totalChecks}`;

  const calculatedPassRate = totalChecks > 0
    ? `${Math.round((passedChecks / totalChecks) * 100)}%`
    : "0%";

  const passRate = rawPassRate !== "0%" ? rawPassRate : calculatedPassRate;

  const riskStyle = getRiskStyle(riskLevel);

  const simulateData = finalSimulation?.checks?.simulateResult || {};
  const byteData = finalSimulation?.checks?.byteCodeResult || {};
  const txHistoryData = finalSimulation?.checks?.transactionHistoryResult || {};

  const evmExecutionSuccess = simulateData.success ?? false;
  const evmExecutionMessage = evmExecutionSuccess
    ? "Transaction executed successfully"
    : simulateData.warnings?.join(", ") || "Transaction would fail";

  const isContract = byteData.isContract || false;
  const warnings = [
    ...(byteData.warnings || []),
    ...(simulateData.warnings || []),
  ];

  const summary = txHistoryData.summary || {};
  const recentTransfers = txHistoryData.recentTransfers || [];

  const rawGasEstimated = simulateData?.gas?.estimated || "0";
  const evmGasEstimated = typeof rawGasEstimated === 'string'
    ? parseInt(rawGasEstimated.replace(/,/g, ''), 10)
    : rawGasEstimated;

  const EVM_GAS_CAP = 200000;
  const evmGasPercent = Math.min(100, Math.round((evmGasEstimated / EVM_GAS_CAP) * 100));


  // --- Solana Data Processing ---
  const solData = finalSolSimulation?.data || {};
  const solSimulationData = solData.simulation || {};
  const solVerdict = solData.verdict || {};

  // Check if simulation status is SUCCESS (case-insensitive if needed)
  const solExecutionSuccess = solSimulationData.status === "SUCCESS";

  // Use humanReason for failure message if available, otherwise fallback
  const solExecutionMessage = solExecutionSuccess
    ? "Transaction simulated successfully"
    : solVerdict.humanReason || solData.message || "Transaction failed";

  const solComputeUnits = solSimulationData.computeUnits || 0;

  const SOL_COMPUTE_CAP = 200000;
  const solGasPercent = Math.min(100, Math.round((solComputeUnits / SOL_COMPUTE_CAP) * 100));


  // --- Unified Status Props ---
  const executionSuccess = chain === 'SOL' ? solExecutionSuccess : evmExecutionSuccess;
  const executionMessage = chain === 'SOL' ? solExecutionMessage : evmExecutionMessage;
  const gasPercent = chain === 'SOL' ? solGasPercent : evmGasPercent;
  const ratioText = chain === 'SOL' ? "N/A" : evmRatioText;


  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen w-full bg-transparent text-white p-2 sm:p-4 relative overflow-hidden z-0">
      {/* Animated Crypto Grid/Particle Background */}
      <div className="absolute inset-0 -z-30 overflow-hidden bg-[#080B10]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        {/* Animated vertical scanning line */}
        <div className="absolute w-full h-1/2 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent -translate-y-full animate-[scan_8s_ease-in-out_infinite]"></div>
      </div>

      {/* Animated Ambient Orbs based on Chain */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {chain === 'EVM' ? (
          <>
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-full h-full bg-cyan-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
          </>
        ) : (
          <>
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-full h-full bg-pink-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
          </>
        )}
      </div>

      {/* Floating Crypto Blocks */}
      <div className="absolute inset-0 -z-[15] overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <m.div
            key={i}
            className={`absolute w-16 h-16 rounded-2xl border bg-black/40 backdrop-blur-md ${chain === 'EVM' ? 'border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 90, 180],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl`}></div>
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${chain === 'EVM' ? 'bg-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.5)]'}`}></div>
          </m.div>
        ))}
      </div>

      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }

        .crypto-block {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .gradient-border-card {
          position: relative;
          padding: 1px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(${t.rgbPrimary}, 0.5), rgba(${t.rgbSecondary}, 0.5));
          isolation: isolate;
        }
        .gradient-border-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background: linear-gradient(135deg, rgba(${t.rgbPrimary}, 0.4), rgba(${t.rgbSecondary}, 0.4));
          filter: blur(35px);
          opacity: 0;
          transition: opacity 0.5s ease;
          border-radius: 16px;
        }
        .gradient-border-card:hover::before {
          opacity: 0.35;
        }
        .card-inner {
          border-radius: 14px;
          background: #000000;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(${t.rgbPrimary}, 0.3);
          box-shadow: 0 14px 50px rgba(18, 24, 40, 0.4), inset 0 0 40px rgba(${t.rgbPrimary}, 0.02);
          transition: transform 0.3s ease;
        }
        .icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(${t.rgbPrimary}, 0.15), rgba(${t.rgbSecondary}, 0.15));
          box-shadow: 0 8px 20px rgba(${t.rgbPrimary}, 0.08);
          transition: all 0.3s ease;
        }
        .gradient-border-card:hover .icon-wrapper {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 8px 24px rgba(${t.rgbPrimary}, 0.2);
        }
        .connector-line {
          width: 2px;
          height: 24px;
          background: linear-gradient(to bottom, transparent, rgba(${t.rgbPrimary}, 0.5), transparent);
          margin: 0 auto;
        }
        .gauge-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #627EEA 0deg, ${chain === 'EVM' ? '#3B82F6' : '#9945FF'} ${gasPercent}%, rgba(255,255,255,0.05) ${gasPercent}%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(${t.rgbPrimary}, 0.2);
        }
        .gauge-inner {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: rgba(6,8,12,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .grad-word {
          background: linear-gradient(90deg, ${chain === 'EVM' ? '#3B82F6, #06B6D4' : '#A855F7, #EC4899'});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Back Button / Header */}
      <m.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="max-w-7xl mx-auto space-y-4 sm:space-y-6"
      >
        {/* Header */}
        <m.div variants={itemVariants} className="text-center mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono tracking-wider text-white mb-2">
            <span className="grad-word">SECURITY ANALYSIS</span> <span className="text-white">REPORT</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto px-4 font-mono">
            {chain} Forensics & Payload Inspection Complete
          </p>
        </m.div>

        {/* === HERO STATUS SECTION === */}
        <HeroStatus
          itemVariants={itemVariants}
          executionSuccess={executionSuccess}
          executionMessage={executionMessage}
          gasPercent={gasPercent}
          ratioText={ratioText}
          chain={chain}
        />

        {/* === MAIN GRID === */}
        <div className={`grid grid-cols-1 ${chain === 'EVM' ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-4 sm:gap-6`}>

          {chain === 'EVM' ? (
            /* ================= EVM LAYOUT ================= */
            <>
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-4">
                <TransactionDetails
                  itemVariants={itemVariants}
                  toggleSection={toggleSection}
                  expandedSections={expandedSections}
                  simulateData={simulateData}
                  gasPercent={evmGasPercent}
                  gasEstimated={evmGasEstimated}
                  chain={chain}
                />

                <BalanceChanges
                  itemVariants={itemVariants}
                  toggleSection={toggleSection}
                  expandedSections={expandedSections}
                  simulateData={simulateData}
                />

                <RecentTransfers
                  itemVariants={itemVariants}
                  toggleSection={toggleSection}
                  expandedSections={expandedSections}
                  recentTransfers={recentTransfers}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <TransactionSummary
                  itemVariants={itemVariants}
                  txHistoryData={txHistoryData}
                  summary={summary}
                />
              </div>
            </>
          ) : (
            /* ================= SOLANA LAYOUT ================= */
            <>
              {/* Left Column: Details & Advanced */}
              <div className="space-y-4">
                <SolanaDetails
                  itemVariants={itemVariants}
                  chain={chain}
                  data={finalSolSimulation}
                />
              </div>

              {/* Right Column: Logs */}
              <div className="space-y-4">
                <SolanaLogs
                  itemVariants={itemVariants}
                  chain={chain}
                  data={finalSolSimulation}
                />
              </div>
            </>
          )}

        </div>

        {/* Connector */}
        <div className="connector-line my-2"></div>

        {/* ================= EVM ONLY SECTIONS ================= */}
        {chain === 'EVM' && (
          <>
            {/* Phishing Analysis */}
            <m.div variants={itemVariants} className="mt-4 sm:mt-6 max-w-7xl mx-auto">
              <Phishing data={finalPhishing} chain={chain} />
            </m.div>

            {/* Connector */}
            <div className="connector-line my-2"></div>

            {/* === HONEYPOT & SECURITY ANALYSIS === */}
            <m.div
              variants={itemVariants}
              className="max-w-7xl mx-auto space-y-4 sm:space-y-6 mt-4 sm:mt-6"
            >
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-wider text-white mb-2 uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                  <span className="grad-word">Honeypot & Security</span> Analysis
                </h2>
              </div>

              {/* Key Metrics */}
              <KeyMatrics
                itemVariants={itemVariants}
                riskStyle={riskStyle}
                totalScore={totalScore}
                passRate={passRate}
                riskLevel={riskLevel}
                ratioText={ratioText}
                isVisible={isVisible}
                data={finalHoneypot}
                chain={chain}
              />

              {/* Bytecode Analysis */}
              <BytecodeAnalysis
                itemVariants={itemVariants}
                toggleSection={toggleSection}
                expandedSections={expandedSections}
                isContract={isContract}
                byteData={byteData}
                warnings={warnings}
                t={t}
              />
            </m.div>

            {/* Detailed Honeypot Checks */}
            <m.div variants={itemVariants} className="max-w-7xl mx-auto mt-4 sm:mt-6">
              <HoneypotChecks isVisible={isVisible} data={honeypot} chain={chain} />
            </m.div>
          </>
        )}

        {/* AI Recommendations - Common for both if data available */}
        <m.div variants={itemVariants} className="max-w-7xl mx-auto mt-4 sm:mt-6">
          <Recommendations
            simulationData={chain === 'EVM' ? simulation : solSimulation}
            honeypotData={honeypot}
            onGenerate={onGenerateRecommendation}
            recommendation={recommendationData}
            chain={chain}
          />
        </m.div>

        {/* Back to Simulate Button */}
        <BackToSimulate
          itemVariants={itemVariants}
          t={t}
          chain={chain}
        />
      </m.div>
    </div>
  );
}
