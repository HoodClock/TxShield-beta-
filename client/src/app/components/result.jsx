"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  FiCheck,
  FiInfo,
  FiAlertTriangle,
  FiArrowRight,
  FiExternalLink,
  FiActivity,
  FiShield,
  FiTrendingUp,
  FiClock,
  FiDollarSign,
  FiTarget,
  FiArrowLeft,
  FiZap,
  FiEye,
  FiLock,
  FiChevronDown,
  FiCheckCircle,
  FiXCircle,
  FiCode,
  FiGitBranch,
  FiRadio,
  FiBarChart2,
  FiAward,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import KeyMatrics from "./keyMatrics";
import Phishing from "./phishing";
import TiltedCard from "./TiltedCard";
import HoneypotChecks from "./honeypotChecks";
import Recommendations from "./recomendations";

export default function ResultsDashboard({
  isVisible,
  simulation,
  honeypot,
  phishing,
  onGenerateRecommendation,
  recommendationData,
}) {
  const router = useRouter();
  const mounted = useRef(true);

  // Mock data for development/testing
  const mockSimulation = {
    checks: {
      simulateTx: {
        data: {
          success: true,
          amount: "1.5",
          symbol: "ETH",
          from: "0x742d35Cc6634C0532925a3b844Bc9e7595f1234a",
          to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
          transferType: "eth",
          gas: { estimated: 21000, priceGwei: "32.5", costUsd: "21.84" },
          balances: {
            sender: { before: { eth: "5.0" }, after: { eth: "3.5" } },
            recipient: { before: { eth: "0.2" }, after: { eth: "1.7" } },
          },
          warnings: ["High gas price detected"],
        },
      },
      byteCode: { data: { isContract: false, warnings: [] } },
      transactionHistory: {
        data: {
          success: true,
          summary: {
            totalTransfers: 142,
            lastTransferDate: "Dec 13, 2024",
            totalERC20Volume: "5,234.50",
          },
          recentTransfers: [
            {
              hash: "0xabc123def456",
              from: "0x742d35Cc...",
              to: "0x8ba1f109...",
              amount: "1.5",
              symbol: "ETH",
              date: "2 hours ago",
            },
            {
              hash: "0xdef789ghi012",
              from: "0x123abc456...",
              to: "0x789def012...",
              amount: "0.75",
              symbol: "ETH",
              date: "5 hours ago",
            },
            {
              hash: "0x456jkl789mno",
              from: "0x456xyz789...",
              to: "0xabc123def...",
              amount: "2.0",
              symbol: "ETH",
              date: "1 day ago",
            },
          ],
        },
      },
    },
  };

  const mockHoneypot = {
    totalScore: "8",
    passRate: "85%",
    riskLevel: "Safe Zone",
    checks: {
      gasTrap: { data: { risk: false } },
      fakeBalance: { data: { risk: false } },
      disableTransfer: { data: { risk: false } },
      mintAccess: { data: { risk: true } },
      tradingControl: { data: { risk: false } },
      highSellTax: { data: { risk: false } },
    },
  };

  const mockPhishing = {
    checks: {
      approvalScam: {
        success: true,
        data: { isScam: false, confidence: "high", reason: "No malicious approval patterns detected" }
      },
      etherForward: {
        success: true,
        data: { isScam: false, confidence: "high", reason: "Contract does not forward ether suspiciously" }
      },
      maliciousProxy: {
        success: true,
        data: { isScam: false, confidence: "high", reason: "No proxy pattern abuse detected" }
      },
      permitPhishing: {
        success: true,
        data: { isScam: false, confidence: "high", reason: "Permit signature is secure" }
      }
    },
    phishingVerdict: {
      phishingScore: 8,
      riskLevel: "Low",
      keyFindings: ["Standard ERC-20 transfer pattern", "No suspicious proxy calls", "Normal gas usage"],
      recommendedActions: ["Proceed with caution", "Verify contract address", "Check community feedback"]
    }
  };

  // Use mock data for testing, real data when available
  // TESTING: Uncomment the next 3 lines to use mock data
  const finalSimulation = mockSimulation;
  const finalHoneypot = mockHoneypot;
  const finalPhishing = mockPhishing;
  // const finalSimulation = simulation;
  // const finalHoneypot = honeypot;
  // const finalPhishing = phishing;
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

  // Risk level styling
  const getRiskStyle = (level) => {
    const styles = {
      "Safe Zone": {
        bg: "from-emerald-500/10 to-emerald-600/5",
        text: "text-emerald-400",
        border: "border-emerald-500/20",
        accent: "bg-emerald-500",
      },
      Medium: {
        bg: "from-amber-500/10 to-amber-600/5",
        text: "text-amber-400",
        border: "border-amber-500/20",
        accent: "bg-amber-500",
      },
      High: {
        bg: "from-red-500/10 to-red-600/5",
        text: "text-red-400",
        border: "border-red-500/20",
        accent: "bg-red-500",
      },
      Unknown: {
        bg: "from-gray-500/10 to-gray-600/5",
        text: "text-gray-400",
        border: "border-gray-500/20",
        accent: "bg-gray-500",
      },
    };
    return styles[level] || styles.Unknown;
  };

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
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-full h-full bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-500/12 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-pink-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}></div>
      </div>

      <style jsx>{`
        .gradient-border-card {
          padding: 1px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.5), rgba(147, 51, 234, 0.5));
        }
        .gradient-border-card:hover {
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.7), rgba(147, 51, 234, 0.7));
          transition: all 0.3s ease;
        }
        .card-inner {
          border-radius: 14px;
          background: #000000;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(168, 85, 247, 0.3);
          box-shadow: 0 14px 50px rgba(18, 24, 40, 0.4), inset 0 0 40px rgba(168, 85, 247, 0.02);
        }
        .icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(147, 51, 234, 0.15));
          box-shadow: 0 8px 20px rgba(168, 85, 247, 0.08);
          transition: all 0.3s ease;
        }
        .gradient-border-card:hover .icon-wrapper {
          transform: scale(1.1);
          box-shadow: 0 8px 24px rgba(168, 85, 247, 0.15);
        }
        .gauge-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #627EEA 0deg, #9945FF ${gasPercent}%, rgba(255,255,255,0.05) ${gasPercent}%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(98,126,234,0.2);
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
          background: linear-gradient(90deg, #627EEA, #9945FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Back Button */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="max-w-7xl mx-auto space-y-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            <span className="grad-word">Security Analysis</span>
            <br />
            <span className="text-white">Report</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Comprehensive blockchain transaction and contract security assessment
          </p>
        </motion.div>

        {/* === HERO STATUS SECTION === */}
        <motion.div variants={itemVariants} className="group gradient-border-card">
          <div className="card-inner p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Overall Status */}
              <div className="flex flex-col justify-center">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                  Overall Status
                </h2>
                <div className="space-y-4">
                  {/* Execution Status */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`flex items-center gap-4 p-5 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
                      executionSuccess
                        ? "bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40"
                        : "bg-red-500/10 border-red-500/20 hover:border-red-500/40"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg flex-shrink-0 ${
                        executionSuccess
                          ? "bg-emerald-500/20"
                          : "bg-red-500/20"
                      }`}
                    >
                      {executionSuccess ? (
                        <FiCheckCircle className="h-6 w-6 text-emerald-400" />
                      ) : (
                        <FiXCircle className="h-6 w-6 text-red-400" />
                      )}
                    </div>
                    <div>
                      <p
                        className={`font-bold text-base ${
                          executionSuccess
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {executionSuccess ? "Success" : "Failed"}
                      </p>
                      <p className="text-sm text-slate-400 mt-1">
                        {executionMessage}
                      </p>
                    </div>
                  </motion.div>


                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">


                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="gradient-border-card"
                >
                  <div className="card-inner p-4 sm:p-5">
                    <p className="text-slate-400 text-xs sm:text-sm mb-2">
                      Gas Estimate
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-yellow-400">
                      {gasPercent}%
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="gradient-border-card"
                >
                  <div className="card-inner p-4 sm:p-5">
                    <p className="text-slate-400 text-xs sm:text-sm mb-2">
                      Checks Passed
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-purple-400">
                      {ratioText}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* === MAIN GRID === */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 sm:gap-12">
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-8 sm:space-y-12">
            {/* COLLAPSIBLE: Transaction Details */}
            <motion.div
              variants={itemVariants}
              className="group gradient-border-card"
            >
              <button
                onClick={() => toggleSection("txDetails")}
                className="card-inner p-6 sm:p-8 w-full"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="icon-wrapper">
                      <FiGitBranch className="h-5 w-5 text-purple-400" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white text-left">
                      Transaction Details
                    </h2>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedSections.txDetails ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiChevronDown className="h-5 w-5 text-slate-400" />
                  </motion.div>
                </div>
              </button>

              {expandedSections.txDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="card-inner p-6 sm:p-8 pt-0 space-y-6"
                >
                  {/* Transaction Details Fields */}
                  <div className="space-y-5">
                    {[
                      {
                        label: "Type",
                        value:
                          simulateData.transferType === "eth"
                            ? "Native ETH Transfer"
                            : "Token Transfer",
                      },
                      {
                        label: "Amount",
                        value: `${simulateData.amount} ${simulateData.symbol}`,
                      },
                      {
                        label: "From",
                        value: simulateData.from,
                        mono: true,
                      },
                      { label: "To", value: simulateData.to, mono: true },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group/item pb-4 border-b border-slate-700/30 last:pb-0 last:border-b-0"
                      >
                        <label className="text-xs sm:text-sm font-medium text-gray-400 group-hover/item:text-gray-300 transition-colors">
                          {item.label}
                        </label>
                        <p
                          className={`text-white font-semibold mt-3 ${
                            item.mono ? "font-mono text-xs sm:text-sm break-all" : ""
                          } group-hover/item:text-cyan-200 transition-colors`}
                        >
                          {item.value}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Gas Analysis - Full Width Below */}
                  <div className="gradient-border-card pt-2">
                    <div className="card-inner p-4 sm:p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="icon-wrapper !w-10 !h-10">
                          <FiZap className="h-4 w-4 text-yellow-400" />
                        </div>
                        <h3 className="font-bold text-white text-sm sm:text-base">
                          Gas Analysis
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 items-center">
                        <motion.div
                          className="gauge-circle"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                        >
                          <div className="gauge-inner">
                            <div className="text-xl font-bold text-blue-400">
                              {gasPercent}%
                            </div>
                            <div className="text-xs text-slate-400">
                              {gasEstimated} gas
                            </div>
                          </div>
                        </motion.div>

                        <div className="space-y-3 col-span-1">
                          <div className="flex flex-col">
                            <span className="text-slate-400 text-xs sm:text-sm mb-1">
                              Gas Price
                            </span>
                            <span className="text-white font-semibold text-sm sm:text-base">
                              {simulateData?.gas?.priceGwei ?? "N/A"} Gwei
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3 col-span-1">
                          <div className="flex flex-col">
                            <span className="text-slate-400 text-xs sm:text-sm mb-1">
                              Total Cost
                            </span>
                            <span className="text-yellow-400 font-bold text-sm sm:text-base">
                              {simulateData?.gas?.costUsd
                                ? `$${simulateData.gas.costUsd}`
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* COLLAPSIBLE: Balance Changes */}
            {simulateData.balances && (
              <motion.div
                variants={itemVariants}
                className="group gradient-border-card"
              >
                <button
                  onClick={() => toggleSection("balances")}
                  className="card-inner p-6 sm:p-8 w-full"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="icon-wrapper">
                        <FiBarChart2 className="h-5 w-5 text-cyan-400" />
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-white text-left">
                        Balance Changes
                      </h2>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedSections.balances ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiChevronDown className="h-5 w-5 text-slate-400" />
                    </motion.div>
                  </div>
                </button>

                {expandedSections.balances && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="card-inner p-6 sm:p-8 pt-0 sm:pt-0"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Sender */}
                      <div className="gradient-border-card">
                        <div className="card-inner p-6 sm:p-8">
                          <h3 className="text-base sm:text-lg font-bold text-white mb-4">
                            Sender
                          </h3>
                          <div className="space-y-3">
                            {[
                              {
                                symbol: "ETH",
                                before:
                                  simulateData.balances.sender?.before?.eth,
                                after: simulateData.balances.sender?.after?.eth,
                                color: "text-red-400",
                              },
                              simulateData.transferType === "erc20" && {
                                symbol: simulateData.symbol,
                                before:
                                  simulateData.balances.sender?.before?.token,
                                after:
                                  simulateData.balances.sender?.after?.token,
                                color: "text-red-400",
                              },
                            ]
                              .filter(Boolean)
                              .map((item, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="flex items-center justify-between group/balance"
                                >
                                  <span className="text-slate-400 text-xs sm:text-sm group-hover/balance:text-gray-300 transition-colors">
                                    {item.symbol}
                                  </span>
                                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                                    <span className="text-slate-300">
                                      {item.before || `0 ${item.symbol}`}
                                    </span>
                                    <FiArrowRight className="h-3 w-3 text-slate-500" />
                                    <span
                                      className={`font-semibold ${item.color} group-hover/balance:brightness-125 transition-all`}
                                    >
                                      {item.after || `0 ${item.symbol}`}
                                    </span>
                                  </div>
                                </motion.div>
                              ))}
                          </div>
                        </div>
                      </div>

                      {/* Recipient */}
                      <div className="gradient-border-card">
                        <div className="card-inner p-6 sm:p-8">
                          <h3 className="text-base sm:text-lg font-bold text-white mb-4">
                            Recipient
                          </h3>
                          <div className="space-y-3">
                            {[
                              {
                                symbol: "ETH",
                                before:
                                  simulateData.balances.recipient?.before?.eth,
                                after:
                                  simulateData.balances.recipient?.after?.eth,
                                color: "text-emerald-400",
                              },
                              simulateData.transferType === "erc20" && {
                                symbol: simulateData.symbol,
                                before:
                                  simulateData.balances.recipient?.before
                                    ?.token,
                                after:
                                  simulateData.balances.recipient?.after?.token,
                                color: "text-emerald-400",
                              },
                            ]
                              .filter(Boolean)
                              .map((item, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="flex items-center justify-between group/balance"
                                >
                                  <span className="text-slate-400 text-xs sm:text-sm group-hover/balance:text-gray-300 transition-colors">
                                    {item.symbol}
                                  </span>
                                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                                    <span className="text-slate-300">
                                      {item.before || `0 ${item.symbol}`}
                                    </span>
                                    <FiArrowRight className="h-3 w-3 text-slate-500" />
                                    <span
                                      className={`font-semibold ${item.color} group-hover/balance:brightness-125 transition-all`}
                                    >
                                      {item.after || `0 ${item.symbol}`}
                                    </span>
                                  </div>
                                </motion.div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* COLLAPSIBLE: Recent Transfers */}
            {recentTransfers.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="group gradient-border-card"
              >
                <button
                  onClick={() => toggleSection("transfers")}
                  className="card-inner p-6 sm:p-8 w-full"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="icon-wrapper">
                        <FiRadio className="h-5 w-5 text-pink-400" />
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-white text-left">
                        Recent Transfers
                      </h2>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedSections.transfers ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiChevronDown className="h-5 w-5 text-slate-400" />
                    </motion.div>
                  </div>
                </button>

                {expandedSections.transfers && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="card-inner p-6 sm:p-8 pt-0 overflow-x-auto"
                  >
                    <table className="w-full text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-slate-700">
                          {["Hash", "From", "To", "Amount", "Date", "Action"].map(
                            (header) => (
                              <th
                                key={header}
                                className="text-left py-3 px-3 sm:px-4 text-slate-400 font-semibold"
                              >
                                {header}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {recentTransfers.slice(0, 5).map((tx, idx) => (
                          <motion.tr
                            key={`${tx.hash}-${idx}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * idx }}
                            className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-all duration-200 group/row"
                          >
                            <td className="py-3 px-3 sm:px-4">
                              <span className="font-mono text-blue-400 group-hover/row:text-blue-300 transition-colors">
                                {(tx.hash || "").substring(0, 8)}...
                              </span>
                            </td>
                            <td className="py-3 px-3 sm:px-4">
                              <span className="font-mono text-slate-300 group-hover/row:text-slate-200 transition-colors">
                                {(tx.from || "").substring(0, 6)}...
                              </span>
                            </td>
                            <td className="py-3 px-3 sm:px-4">
                              <span className="font-mono text-slate-300 group-hover/row:text-slate-200 transition-colors">
                                {(tx.to || "").substring(0, 6)}...
                              </span>
                            </td>
                            <td className="py-3 px-3 sm:px-4">
                              <span className="text-white font-semibold group-hover/row:text-cyan-200 transition-colors">
                                {tx.amount} {tx.symbol}
                              </span>
                            </td>
                            <td className="py-3 px-3 sm:px-4">
                              <span className="text-slate-400 group-hover/row:text-slate-300 transition-colors">
                                {tx.date}
                              </span>
                            </td>
                            <td className="py-3 px-3 sm:px-4 text-right">
                              <a
                                href={`https://etherscan.io/tx/${tx.hash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 transition-colors inline-block p-1"
                              >
                                <FiExternalLink className="h-4 w-4" />
                              </a>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8 sm:space-y-12">


            {/* Transaction Summary (Always visible) */}
            {txHistoryData.success && (
              <motion.div variants={itemVariants} className="group gradient-border-card">
                <div className="card-inner p-6 sm:p-8">
                  <div className="flex items-center gap-3 sm:gap-4 mb-6">
                    <div className="icon-wrapper">
                      <FiEye className="h-5 w-5 text-orange-400" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      Summary
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        label: "Total Transfers",
                        value: summary.totalTransfers || "N/A",
                      },
                      {
                        label: "Last Transfer",
                        value: summary.lastTransferDate || "N/A",
                      },
                      {
                        label: "ERC-20 Volume",
                        value: summary.totalERC20Volume || "N/A",
                      },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex justify-between items-center group/summary pb-4 last:pb-0 border-b border-slate-700/30 last:border-b-0 hover:text-cyan-200 transition-colors"
                      >
                        <span className="text-slate-400 text-xs sm:text-sm group-hover/summary:text-slate-300 transition-colors">
                          {item.label}
                        </span>
                        <span className="text-white font-semibold text-xs sm:text-sm group-hover/summary:text-cyan-200 transition-colors">
                          {item.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </div>

      {/* Phishing Analysis */}
      <motion.div variants={itemVariants} className="mt-8 sm:mt-12 max-w-7xl mx-auto">
        <Phishing data={finalPhishing} />
      </motion.div>

      {/* === HONEYPOT & SECURITY ANALYSIS === */}
      <motion.div
        variants={itemVariants}
        className="max-w-7xl mx-auto space-y-8 sm:space-y-12 mt-12"
      >
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
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
          />

          {/* Bytecode Analysis */}
          <motion.div
            variants={itemVariants}
            className="group gradient-border-card"
          >
            <button
                onClick={() => toggleSection("bytecode")}
                className="card-inner p-6 sm:p-8 w-full"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="icon-wrapper">
                      <FiCode className="h-5 w-5 text-indigo-400" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white text-left">
                      Bytecode Analysis
                    </h2>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedSections.bytecode ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiChevronDown className="h-5 w-5 text-slate-400" />
                  </motion.div>
                </div>
              </button>

              {expandedSections.bytecode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="card-inner p-6 sm:p-8 pt-0 space-y-3"
                >
                  {isContract ? (
                    warnings.length > 0 ? (
                      warnings.map((warning, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg hover:border-red-500/40 hover:bg-red-500/15 transition-all duration-200"
                        >
                          <FiAlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <span className="text-red-300 text-xs sm:text-sm">
                            {warning}
                          </span>
                        </motion.div>
                      ))
                    ) : (
                      <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:border-emerald-500/40 hover:bg-emerald-500/15 transition-all duration-200">
                        <FiCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                        <span className="text-emerald-300 text-xs sm:text-sm">
                          No dangerous opcodes detected
                        </span>
                      </div>
                    )
                  ) : (
                    <div className="flex items-center gap-3 p-4 bg-slate-700/30 border border-slate-600/50 rounded-lg hover:border-slate-600/80 hover:bg-slate-700/40 transition-all duration-200">
                      <FiInfo className="h-4 w-4 text-slate-400 flex-shrink-0" />
                      <span className="text-slate-300 text-xs sm:text-sm">
                        Address is not a contract
                      </span>
                    </div>
                  )}
                </motion.div>
              )}
          </motion.div>
      </motion.div>

      {/* Detailed Honeypot Checks */}
      <motion.div variants={itemVariants} className="max-w-7xl mx-auto mt-8 sm:mt-12">
        <HoneypotChecks isVisible={isVisible} data={honeypot} />
      </motion.div>

      {/* AI Recommendations */}
      <motion.div variants={itemVariants} className="max-w-7xl mx-auto mt-8 sm:mt-12">
        <Recommendations
          simulationData={simulation}
          honeypotData={honeypot}
          onGenerate={onGenerateRecommendation}
          recommendation={recommendationData}
        />
      </motion.div>

      {/* Back to Simulate Button */}
      <motion.div
        variants={itemVariants}
        className="max-w-7xl mx-auto flex justify-center mt-12 sm:mt-16 pb-8"
      >
        <button
          onClick={() => window.location.reload()}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-black border border-purple-500/30 rounded-lg flex items-center gap-2 hover:border-purple-400/60 hover:bg-purple-950/20 transition-all duration-300 group"
        >
          <FiArrowLeft className="h-4 w-4 text-purple-400 group-hover:text-cyan-400 transition-colors" />
          <span className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-200 transition-colors">
            Back to Simulate
          </span>
        </button>
      </motion.div>
    </motion.div>
    </div>
  );
}
