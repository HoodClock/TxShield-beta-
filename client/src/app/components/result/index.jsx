"use client";

import { motion } from "framer-motion";
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
import RecentTransfers from "./RecentTransfers";
import TransactionSummary from "./TransactionSummary";
import BytecodeAnalysis from "./BytecodeAnalysis";
import BackToSimulate from "./BackToSimulate";
import { mockSimulation, mockHoneypot, mockPhishing, getRiskStyle, themes } from "./utils";

export default function ResultsDashboard({
  isVisible,
  simulation,
  honeypot,
  phishing,
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

  if (!isVisible && !finalSimulation && !finalHoneypot && !finalPhishing) return null;

  const t = themes[chain] || themes.EVM;

  // --- Honeypot Data ---
  const {
    totalScore = "0",
    passRate = "0%",
    riskLevel = "Unknown",
    checks = {},
  } = finalHoneypot || {};

  const totalChecks = Object.keys(checks).length;
  const passedChecks = Object.values(checks).filter(
    (chk) => chk?.data?.risk === false
  ).length;
  const ratioText = `${passedChecks}/${totalChecks}`;

  const riskStyle = getRiskStyle(riskLevel);

  // --- Simulation Data ---
  const simulateTxData = finalSimulation?.checks?.simulateTx || {};
  const simulateData = simulateTxData.data || {};
  const byteData = finalSimulation?.checks?.byteCode?.data || {};
  const txHistoryData = finalSimulation?.checks?.transactionHistory?.data || {};

  const executionSuccess = simulateData.success ?? false;
  const executionMessage = executionSuccess
    ? "Transaction executed successfully"
    : simulateData.warnings?.join(", ") || "Transaction would fail";

  const isContract = byteData.isContract || false;
  const warnings = [
    ...(byteData.warnings || []),
    ...(simulateData.warnings || []),
  ];

  const summary = txHistoryData.summary || {};
  const recentTransfers = txHistoryData.recentTransfers || [];

  // Gas analysis
  const gasEstimated = simulateData?.gas?.estimated || 0;
  const GAS_CAP = 200000;
  const gasPercent = Math.min(100, Math.round((gasEstimated / GAS_CAP) * 100));

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
    <div className="min-h-screen bg-black text-white p-3 sm:p-4 lg:p-6 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-full h-full bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-500/12 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-pink-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}></div>
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
          height: 40px;
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
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="max-w-7xl mx-auto space-y-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            <span className="grad-word">Security Analysis</span>
            <br />
            <span className="text-white">Report</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mx-auto px-4">
            Comprehensive blockchain transaction and contract security assessment
          </p>
        </motion.div>

        {/* === HERO STATUS SECTION === */}
        <HeroStatus 
          itemVariants={itemVariants}
          executionSuccess={executionSuccess}
          executionMessage={executionMessage}
          gasPercent={gasPercent}
          ratioText={ratioText}
        />

        {/* === MAIN GRID === */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 sm:gap-12">
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-8 sm:space-y-12">
            <TransactionDetails 
              itemVariants={itemVariants}
              toggleSection={toggleSection}
              expandedSections={expandedSections}
              simulateData={simulateData}
              gasPercent={gasPercent}
              gasEstimated={gasEstimated}
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
          <div className="space-y-8 sm:space-y-12">
            <TransactionSummary 
              itemVariants={itemVariants}
              txHistoryData={txHistoryData}
              summary={summary}
            />
          </div>
        </div>

        {/* Connector */}
        <div className="connector-line my-4"></div>

        {/* Phishing Analysis */}
        <motion.div variants={itemVariants} className="mt-8 sm:mt-12 max-w-7xl mx-auto">
          <Phishing data={finalPhishing} chain={chain} />
        </motion.div>

        {/* Connector */}
        <div className="connector-line my-4"></div>

        {/* === HONEYPOT & SECURITY ANALYSIS === */}
        <motion.div
          variants={itemVariants}
          className="max-w-7xl mx-auto space-y-8 sm:space-y-12 mt-12"
        >
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
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
              warnings={warnings}
              t={t}
            />
        </motion.div>

        {/* Detailed Honeypot Checks */}
        <motion.div variants={itemVariants} className="max-w-7xl mx-auto mt-8 sm:mt-12">
          <HoneypotChecks isVisible={isVisible} data={honeypot} chain={chain} />
        </motion.div>

        {/* AI Recommendations */}
        <motion.div variants={itemVariants} className="max-w-7xl mx-auto mt-8 sm:mt-12">
          <Recommendations
            simulationData={simulation}
            honeypotData={honeypot}
            onGenerate={onGenerateRecommendation}
            recommendation={recommendationData}
            chain={chain}
          />
        </motion.div>

        {/* Back to Simulate Button */}
        <BackToSimulate 
          itemVariants={itemVariants}
          t={t}
          chain={chain}
        />
      </motion.div>
    </div>
  );
}
