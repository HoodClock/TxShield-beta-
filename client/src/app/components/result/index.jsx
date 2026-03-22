"use client";

import { m } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiLayout, FiShield, FiCpu, FiCode } from "react-icons/fi";

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
  requestData,
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
  const finalRequestData = requestData;
  // const finalSolSimulation = mockSolSimulation;
  const finalSolSimulation = solSimulation;

  const [activeTab, setActiveTab] = useState(chain === 'SOL' ? 'overview' : 'simulation');

  const evmTabs = [
    { id: 'simulation', label: 'Simulation', icon: FiLayout },
    { id: 'honeypot', label: 'Honeypot', icon: FiShield },
    { id: 'phishing', label: 'Phishing', icon: FiCpu },
    { id: 'bytecode', label: 'Bytecode Scanning', icon: FiCode }
  ];

  const solTabs = [
    { id: 'overview', label: 'Overview', icon: FiLayout },
    { id: 'deepdive', label: 'Deep Dive', icon: FiCpu }
  ];

  const tabs = chain === 'SOL' ? solTabs : evmTabs;

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);



  if (!isVisible && !finalSimulation && !finalHoneypot && !finalPhishing && !finalSolSimulation) return null;

  const t = themes[chain] || themes.EVM;

  // --- EVM Data Processing ---
  const honeypotRes = finalHoneypot?.honeypotResponse || {};

  // Calculate risk level from risk score mapping (similar to getRiskStyle expectations)
  const riskScore = honeypotRes.riskScore || 0;
  let riskLevel = "Unknown";
  if (riskScore < 20) riskLevel = "Safe Zone";
  else if (riskScore < 50) riskLevel = "Medium";
  else riskLevel = "High";

  // Re-map the flat booleans back to a "passed" count for the UI metric
  const checkFlags = [
    { passed: !honeypotRes.hasBlackListDetected },
    { passed: !honeypotRes.hasMintable },
    { passed: !honeypotRes.hasTradingControl },
    { passed: !(honeypotRes.buyingTax > 10 || honeypotRes.sellingTax > 10) },
    { passed: !honeypotRes.isTimeHoneypot }
  ];

  const totalChecks = 5;
  const passedChecks = checkFlags.filter(c => c.passed).length;
  const evmRatioText = `${passedChecks}/${totalChecks}`;

  const calculatedPassRate = `${Math.round((passedChecks / totalChecks) * 100)}%`;
  const passRate = calculatedPassRate;
  const totalScore = riskScore.toString();

  const riskStyle = getRiskStyle(riskLevel);

  const simulateData = finalSimulation?.checks?.simulateResult || {};
  const byteData = finalSimulation?.checks?.byteCodeResult || {};
  const txHistoryData = finalSimulation?.checks?.transactionHistoryResult || {};

  const evmExecutionSuccess = simulateData.success ?? false;
  const evmExecutionMessage = evmExecutionSuccess
    ? "Transaction executed successfully"
    : simulateData.errorReason || "Transaction would fail";

  const isContract = byteData.isContract || false;
  const warnings = [
    ...(byteData.warnings || []),
  ];

  const summary = txHistoryData.summary || {};
  const recentTransfers = txHistoryData.recentTransfers || [];

  const rawGasEstimated = simulateData?.gasUsed || "0";
  const evmGasEstimated = typeof rawGasEstimated === 'string'
    ? parseInt(rawGasEstimated, 10)
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
    <div className={`min-h-screen pt-[104px] pb-24 bg-[#0a0a0a]`}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" />

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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono tracking-wider mb-2">
            <span className={`text-transparent bg-clip-text ${t.gradText}`}>SECURITY ANALYSIS</span> <span className="text-white">REPORT</span>
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
        <div className="grid grid-cols-1 gap-4 sm:gap-6">

          {chain === 'EVM' ? (
            /* ================= EVM LAYOUT ================= */
            <div className={`relative w-full rounded-3xl border border-blue-500/30 bg-[#0a1931]/80 backdrop-blur-2xl overflow-hidden p-4 sm:p-6 shadow-[0_0_80px_rgba(59,130,246,0.15)]`}>
              {/* Tab Navigation */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-4 bg-blue-950/30 p-2 rounded-2xl border border-blue-500/20 shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)] backdrop-blur-md">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 
                        ${isActive ? `text-${t.primary}-400 bg-${t.primary}-500/10 shadow-[inset_0_0_10px_rgba(59,130,246,0.2)]` : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                      {isActive && (
                        <m.div
                          layoutId="activeTabBadge"
                          className="absolute inset-0 border border-blue-500/30 rounded-xl"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <Icon className={isActive ? "text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" : ""} />
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Conditionally Render Sections Based on Active Tab */}
              <m.div
                key={activeTab}
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={containerVariants}
                className="space-y-4"
              >
                {/* --- SIMULATION TAB --- */}
                {activeTab === 'simulation' && (
                  <div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                      <div className="lg:col-span-2 space-y-4">
                        <TransactionDetails
                          itemVariants={itemVariants}
                          simulateData={simulateData}
                          requestData={finalRequestData || mockSimulation.requestData}
                          gasPercent={gasPercent}
                          gasEstimated={evmGasEstimated}
                          chain={chain}
                        />
                        <BalanceChanges
                          itemVariants={itemVariants}
                          simulateData={simulateData}
                        />
                      </div>
                      <div className="space-y-4">
                        <TransactionSummary
                          itemVariants={itemVariants}
                          txHistoryData={txHistoryData}
                          summary={summary}
                        />
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-6">
                      <RecentTransfers
                        itemVariants={itemVariants}
                        recentTransfers={recentTransfers}
                      />
                    </div>

                  </div>
                )}

                {/* --- HONEYPOT TAB --- */}
                {activeTab === 'honeypot' && (
                  <div className="space-y-4 max-w-7xl mx-auto">
                    <div className="text-center mb-4">
                      <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-wider text-white mb-2 uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                        <span className="grad-word">Honeypot & Security</span> Analysis
                      </h2>
                    </div>

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

                    <HoneypotChecks isVisible={isVisible} data={finalHoneypot} chain={chain} />
                  </div>
                )}

                {/* --- PHISHING TAB --- */}
                {activeTab === 'phishing' && (
                  <div className="space-y-4 max-w-7xl mx-auto">
                    <Phishing data={finalPhishing} chain={chain} />
                  </div>
                )}

                {/* --- BYTECODE SCANNING TAB --- */}
                {activeTab === 'bytecode' && (
                  <div className="max-w-7xl mx-auto">
                    <BytecodeAnalysis
                      itemVariants={itemVariants}
                      isContract={isContract}
                      byteData={byteData}
                      warnings={warnings}
                      t={t}
                    />
                  </div>
                )}
              </m.div>
            </div>
          ) : (
            /* ================= SOLANA LAYOUT ================= */
            <>
              {/* Tab Navigation for Solana */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-4 bg-black/40 p-2 rounded-2xl border border-white/5 shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)] backdrop-blur-md">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 
                        ${isActive ? 'text-purple-400 bg-purple-500/10 shadow-[inset_0_0_10px_rgba(168,85,247,0.2)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                      {isActive && (
                        <m.div
                          layoutId="activeTabBadgeSol"
                          className="absolute inset-0 border border-purple-500/30 rounded-xl"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <Icon className={isActive ? "text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" : ""} />
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <m.div
                key={`sol-${activeTab}`}
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={containerVariants}
                className="space-y-4"
              >
                {/* --- OVERVIEW TAB (SOLANA) --- */}
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <SolanaDetails
                      itemVariants={itemVariants}
                      chain={chain}
                      data={finalSolSimulation}
                    />
                  </div>
                )}

                {/* --- DEEP DIVE TAB (SOLANA) --- */}
                {activeTab === 'deepdive' && (
                  <div className="space-y-4">
                    <SolanaLogs
                      itemVariants={itemVariants}
                      chain={chain}
                      data={finalSolSimulation}
                    />
                  </div>
                )}

                {/* AI INSIGHTS TAB (SOLANA) REMOVED */}
              </m.div>
            </>
          )}
        </div>

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
