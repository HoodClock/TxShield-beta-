"use client";

import { m } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiLayout, FiShield, FiCpu, FiCode } from "react-icons/fi";

// Sub-components from parent folder
import KeyMatrics from "../keyMatrics";
import Phishing from "../phishing";
import HoneypotChecks from "../honeypotChecks";

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
import { getRiskStyle, themes } from "./utils";

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
  const finalSimulation = simulation;
  const finalHoneypot = honeypot;
  const finalPhishing = phishing;
  const finalRequestData = requestData;
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
  const riskScore = honeypotRes.riskScore || 0;
  let riskLevel = "Unknown";
  if (riskScore < 20) riskLevel = "Safe Zone";
  else if (riskScore < 50) riskLevel = "Medium";
  else riskLevel = "High";

  const totalChecks = 5;
  const passedChecks = [
    !honeypotRes.hasBlackListDetected,
    !honeypotRes.hasMintable,
    !honeypotRes.hasTradingControl,
    !(honeypotRes.buyingTax > 10 || honeypotRes.sellingTax > 10),
    !honeypotRes.isTimeHoneypot
  ].filter(Boolean).length;
  const evmRatioText = `${passedChecks}/${totalChecks}`;

  const calculatedPassRate = `${Math.round((passedChecks / totalChecks) * 100)}%`;
  const passRate = calculatedPassRate;
  const totalScore = riskScore.toString();
  const riskStyle = getRiskStyle(riskLevel);

  const simulateData = (finalSimulation?.checks?.simulateResult || finalSimulation?.simulateResult) || {};
  const byteData = (finalSimulation?.checks?.byteCodeResult || finalSimulation?.byteCodeResult) || {};
  const txHistoryData = (finalSimulation?.checks?.transactionHistoryResult || finalSimulation?.transactionHistoryResult) || {};

  const evmExecutionSuccess = simulateData.success ?? false;
  const evmExecutionMessage = evmExecutionSuccess ? "Transaction executed successfully" : simulateData.errorReason || "Transaction would fail";

  const isContract = byteData.isContract || false;
  const isScam = byteData.trustStatus === "Critical Risk";
  const reason = byteData.humanWarning;
  const warnings = byteData.riskFlags || [];

  const summary = txHistoryData.summary || {};
  const recentTransfers = (txHistoryData.recentTransfers || txHistoryData.recentSample) || [];

  const rawGasEstimated = simulateData?.gasUsed || "0";
  const evmGasEstimated = typeof rawGasEstimated === 'string' ? parseInt(rawGasEstimated, 10) : rawGasEstimated;
  const EVM_GAS_CAP = 200000;
  const evmGasPercent = Math.min(100, Math.round((evmGasEstimated / EVM_GAS_CAP) * 100));

  // --- Solana Data Processing ---
  const solData = finalSolSimulation?.data || {};
  const solSimulationData = solData.simulation || {};
  const solVerdict = solData.verdict || {};
  const solExecutionSuccess = solSimulationData.status === "SUCCESS";
  const solExecutionMessage = solExecutionSuccess ? "Transaction simulated successfully" : solVerdict.humanReason || solData.message || "Transaction failed";
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
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen pt-[100px] sm:pt-[120px] pb-16 sm:pb-24 px-3 sm:px-6 bg-background relative overflow-x-hidden transition-colors duration-700">
      
      {/* --- KINETIC AMBIENT BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50 dark:opacity-100">
        <m.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-purple-600/20 to-transparent rounded-full"
        />
        <m.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-blue-600/20 to-transparent rounded-full"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <m.div 
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent z-10 opacity-50"
        />
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .grad-text-premium {
          background: linear-gradient(135deg, #3b82f6 0%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <m.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6"
      >
        {/* Header */}
        <m.div variants={itemVariants} className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-md mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-blue-400/80">Diagnostic Protocol Active</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-clash tracking-tight mb-4">
            <span className="grad-text-premium">ANALYSIS</span> <span className="text-foreground/90">REPORT</span>
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-muted-foreground font-mono text-[10px] uppercase tracking-[0.2em]">
            <span>{chain} ENGINE v4.0.2</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>ENCRYPTED_PAYLOAD_READY</span>
          </div>
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

        {/* === MAIN CONTENT === */}
        <div className="space-y-8">
          {/* Tab Navigation */}
          <m.div variants={itemVariants} className="flex justify-center">
            <div className="flex p-1.5 bg-card/60 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-x-auto no-scrollbar">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-6 py-3 rounded-xl font-clash text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 flex items-center gap-3 whitespace-nowrap
                      ${isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'}`}
                  >
                    {isActive && (
                      <m.div
                        layoutId="activeTabGlow"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-border rounded-xl"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-primary" : "text-muted-foreground/30"}`} />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </m.div>

          {/* Render Sections */}
          <m.div
            key={activeTab}
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="w-full"
          >
            {chain === 'EVM' ? (
              /* ================= EVM LAYOUT ================= */
              <div className="space-y-6">
                {/* --- SIMULATION TAB --- */}
                {activeTab === 'simulation' && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      <div className="md:col-span-2 lg:col-span-2 space-y-4 sm:space-y-6 min-w-0">
                        <TransactionDetails
                          itemVariants={itemVariants}
                          simulateData={simulateData}
                          requestData={finalRequestData}
                          gasPercent={gasPercent}
                          gasEstimated={evmGasEstimated}
                          chain={chain}
                        />
                        <BalanceChanges
                          itemVariants={itemVariants}
                          simulateData={simulateData}
                        />
                      </div>
                      <div className="space-y-4 sm:space-y-6 min-w-0">
                        <TransactionSummary
                          itemVariants={itemVariants}
                          txHistoryData={txHistoryData}
                          summary={summary}
                        />
                        <RecentTransfers
                          itemVariants={itemVariants}
                          recentTransfers={recentTransfers}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* --- HONEYPOT TAB --- */}
                {activeTab === 'honeypot' && (
                  <div className="space-y-6 max-w-7xl mx-auto">
                    <div className="text-center mb-4">
                      <h2 className="text-xl sm:text-2xl font-bold font-clash tracking-tight text-foreground mb-2 uppercase">
                        Honeypot & Security Analysis
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
                  <div className="space-y-6 max-w-7xl mx-auto">
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
                      isScam={isScam}
                      reason={reason}
                      warnings={warnings}
                      t={t}
                    />
                  </div>
                )}
              </div>
            ) : (
              /* ================= SOLANA LAYOUT ================= */
              <div className="space-y-6">
                {activeTab === 'overview' && (
                  <SolanaDetails
                    itemVariants={itemVariants}
                    chain={chain}
                    data={finalSolSimulation}
                  />
                )}
                {activeTab === 'deepdive' && (
                  <SolanaLogs
                    itemVariants={itemVariants}
                    chain={chain}
                    data={finalSolSimulation}
                  />
                )}
              </div>
            )}
          </m.div>
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
