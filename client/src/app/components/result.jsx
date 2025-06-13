"use client";

import { motion } from "framer-motion";
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
} from "react-icons/fi";
import keyMatrics from "./keyMatrics";

export default function ResultsDashboard({ isVisible, simulation, honeypot }) {
  if (!isVisible || !simulation || !honeypot) return null;

  // --- Honeypot Data ---
  const {
    totalScore = "0",
    passRate = "0%",
    riskLevel = "Unknown",
    checks = {},
  } = honeypot || {};

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
  const simulateTxData = simulation?.checks?.simulateTx || {};
  const simulateData = simulateTxData.data || {};
  const byteData = simulation?.checks?.byteCode?.data || {};
  const txHistoryData = simulation?.checks?.transactionHistory?.data || {};

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Security Analysis Report
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Comprehensive blockchain transaction and contract security
            assessment
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Simulation Results */}
          <div className="xl:col-span-2 space-y-8">
            {/* Execution Status */}
            <motion.div
              variants={itemVariants}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6"
            >
              <div className="flex items-center mb-6">
                <FiActivity className="h-6 w-6 text-blue-400 mr-3" />
                <h2 className="text-xl font-semibold text-white">
                  Transaction Simulation
                </h2>
              </div>

              <div
                className={`flex items-center p-4 rounded-xl border ${
                  executionSuccess
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : "bg-red-500/10 border-red-500/20"
                }`}
              >
                <div
                  className={`p-2 rounded-lg mr-4 ${
                    executionSuccess ? "bg-emerald-500/20" : "bg-red-500/20"
                  }`}
                >
                  {executionSuccess ? (
                    <FiCheck className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <FiAlertTriangle className="h-5 w-5 text-red-400" />
                  )}
                </div>
                <div>
                  <p
                    className={`font-medium ${
                      executionSuccess ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {executionSuccess ? "Success" : "Failed"}
                  </p>
                  <p className="text-sm text-slate-400">{executionMessage}</p>
                </div>
              </div>
            </motion.div>

            {/* Transaction Details */}
            <motion.div
              variants={itemVariants}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6"
            >
              <div className="flex items-center mb-6">
                <FiInfo className="h-6 w-6 text-blue-400 mr-3" />
                <h2 className="text-xl font-semibold text-white">
                  Transaction Details
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Transaction Info */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-400">
                      Type
                    </label>
                    <p className="text-white font-medium">
                      {simulateData.transferType === "eth"
                        ? "Native ETH Transfer"
                        : "Token Transfer"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-400">
                      Amount
                    </label>
                    <p className="text-white font-medium">
                      {simulateData.amount} {simulateData.symbol}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-400">
                      From
                    </label>
                    <p className="text-white font-mono text-sm break-all">
                      {simulateData.from}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-400">
                      To
                    </label>
                    <p className="text-white font-mono text-sm break-all">
                      {simulateData.to}
                    </p>
                  </div>
                </div>

                {/* Gas Analysis */}
                <div className="bg-slate-700/30 rounded-xl p-4">
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                    <FiDollarSign className="h-5 w-5 text-yellow-400 mr-2" />
                    Gas Analysis
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Estimated Gas</span>
                      <span className="text-white font-medium">
                        {simulateData?.gas?.estimated} gas units
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Gas Price</span>
                      <span className="text-white font-medium">
                        {simulateData?.gas?.priceGwei ?? "N/A"} Gwei
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-600">
                      <span className="text-slate-400">Total Cost</span>
                      <span className="text-yellow-400 font-bold">
                        {simulateData?.gas?.costUsd
                          ? `$${simulateData.gas.costUsd}`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Balance Changes */}
            {simulateData.balances && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                <div className="flex items-center mb-6">
                  <FiTrendingUp className="h-6 w-6 text-blue-400 mr-3" />
                  <h2 className="text-xl font-semibold text-white">
                    Balance Changes
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Sender */}
                  <div className="bg-slate-700/30 rounded-xl p-4">
                    <h3 className="text-lg font-medium text-white mb-4">
                      Sender
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">ETH (USD)</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-slate-300">
                            {simulateData.balances.sender?.before?.eth ||
                              "0 ETH"}
                          </span>
                          <span className="text-green-300">
                            {" "}
                            ( $
                            {simulateData.balances.sender?.before?.ethUsd ||
                              "0 USD"}{" "}
                            )
                          </span>
                          <FiArrowRight className="h-4 w-4 text-slate-500" />
                          <span className="text-red-400 font-medium">
                            {simulateData.balances.sender?.after?.eth ||
                              "0 ETH"}
                          </span>
                          <span className="text-green-300">
                            {" "}
                            ( $
                            {simulateData.balances.sender?.after?.ethUsd ||
                              "0 USD"}{" "}
                            )
                          </span>
                        </div>
                      </div>
                      {simulateData.transferType === "erc20" && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">
                            {simulateData.symbol}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-300">
                              {simulateData.balances.sender?.before?.token ||
                                `0 ${simulateData.symbol}`}
                            </span>
                            <FiArrowRight className="h-4 w-4 text-slate-500" />
                            <span className="text-red-400 font-medium">
                              {simulateData.balances.sender?.after?.token ||
                                `0 ${simulateData.symbol}`}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recipient */}
                  <div className="bg-slate-700/30 rounded-xl p-4">
                    <h3 className="text-lg font-medium text-white mb-4">
                      Recipient
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">ETH (USD)</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-slate-300">
                            {simulateData.balances.recipient?.before?.eth ||
                              "0 ETH"}
                          </span>
                          <span className="text-green-300">
                            {" "}
                            (${" "}
                            {simulateData.balances.recipient?.before?.ethUsd ||
                              "0 ETH"}
                            )
                          </span>
                          <FiArrowRight className="h-4 w-4 text-slate-500" />
                          <span className="text-emerald-400 font-medium">
                            {simulateData.balances.recipient?.after?.eth ||
                              "0 ETH"}
                          </span>
                          <span className="text-green-300">
                            {" "}
                            (${" "}
                            {simulateData.balances.recipient?.after?.ethUsd ||
                              "0 ETH"}
                            )
                          </span>
                        </div>
                      </div>
                      {simulateData.transferType === "erc20" && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">
                            {simulateData.symbol}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-300">
                              {simulateData.balances.recipient?.before?.token ||
                                `0 ${simulateData.symbol}`}
                            </span>
                            <FiArrowRight className="h-4 w-4 text-slate-500" />
                            <span className="text-emerald-400 font-medium">
                              {simulateData.balances.recipient?.after?.token ||
                                `0 ${simulateData.symbol}`}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Transfers Table */}
            {recentTransfers.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6"
              >
                <div className="flex items-center mb-6">
                  <FiClock className="h-6 w-6 text-blue-400 mr-3" />
                  <h2 className="text-xl font-semibold text-white">
                    Recent Transfers
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">
                          Hash
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">
                          From
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">
                          To
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">
                          Amount
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">
                          Date
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-slate-400">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransfers.slice(0, 5).map((tx, idx) => (
                        <motion.tr
                          key={tx.hash}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx }}
                          className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <span className="font-mono text-sm text-blue-400">
                              {(tx.hash || "").substring(0, 8)}...
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-mono text-sm text-slate-300">
                              {(tx.from || "").substring(0, 6)}...
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-mono text-sm text-slate-300">
                              {(tx.to || "").substring(0, 6)}...
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-white font-medium">
                              {tx.amount} {tx.symbol}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-slate-400 text-sm">
                              {tx.date}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <a
                              href={`https://etherscan.io/tx/${tx.hash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <FiExternalLink className="h-4 w-4" />
                            </a>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Security Analysis */}
          <div className="space-y-8">
            {/* Bytecode Analysis */}
            <motion.div
              variants={itemVariants}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6"
            >
              <div className="flex items-center mb-6">
                <FiShield className="h-6 w-6 text-blue-400 mr-3" />
                <h2 className="text-xl font-semibold text-white">
                  Bytecode Analysis
                </h2>
              </div>

              {isContract ? (
                warnings.length > 0 ? (
                  <div className="space-y-3">
                    {warnings.map((warning, idx) => (
                      <div
                        key={idx}
                        className="flex items-start p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                      >
                        <FiAlertTriangle className="h-5 w-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-red-300 text-sm">{warning}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <FiCheck className="h-5 w-5 text-emerald-400 mr-3" />
                    <span className="text-emerald-300">
                      No dangerous opcodes detected
                    </span>
                  </div>
                )
              ) : (
                <div className="flex items-center p-4 bg-slate-700/30 border border-slate-600/50 rounded-lg">
                  <FiInfo className="h-5 w-5 text-slate-400 mr-3" />
                  <span className="text-slate-300">
                    Address is not a contract
                  </span>
                </div>
              )}
            </motion.div>

            {/* Security Checks */}
            <motion.div
              variants={itemVariants}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6"
            >
              <div className="flex items-center mb-6">
                <FiCheck className="h-6 w-6 text-blue-400 mr-3" />
                <h2 className="text-xl font-semibold text-white">
                  Security Checks
                </h2>
              </div>

              <div className="space-y-3">
                {Object.entries(checks).map(([name, check]) => (
                  <div
                    key={name}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      check?.data?.risk
                        ? "bg-red-500/10 border-red-500/20"
                        : "bg-emerald-500/10 border-emerald-500/20"
                    }`}
                  >
                    <div className="flex items-center">
                      {check?.data?.risk ? (
                        <FiAlertTriangle className="h-4 w-4 text-red-400 mr-3" />
                      ) : (
                        <FiCheck className="h-4 w-4 text-emerald-400 mr-3" />
                      )}
                      <span className="text-white font-medium capitalize">
                        {name.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        check?.data?.risk
                          ? "bg-red-500/20 text-red-300"
                          : "bg-emerald-500/20 text-emerald-300"
                      }`}
                    >
                      {check?.data?.risk ? "Risk" : "Safe"}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Transaction Summary */}
            {txHistoryData.success && (
              <motion.div
                variants={itemVariants}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6"
              >
                <div className="flex items-center mb-6">
                  <FiActivity className="h-6 w-6 text-blue-400 mr-3" />
                  <h2 className="text-xl font-semibold text-white">
                    Transaction Summary
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Total Transfers</span>
                    <span className="text-white font-medium">
                      {summary.totalTransfers || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Last Transfer</span>
                    <span className="text-white font-medium">
                      {summary.lastTransferDate || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">ERC-20 Volume</span>
                    <span className="text-white font-medium">
                      {summary.totalERC20Volume || "N/A"}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Key Metrics Cards */}
        <keyMatrics 
          itemVariants={itemVariants}
          riskStyle={riskStyle}
          totalScore={totalScore}
          passRate={passRate}
          riskLevel={riskLevel}
          ratioText={ratioText}
          isVisible={isVisible}
          data={honeypot}
        />

        {/* Warnings Section */}
        {simulateData.warnings?.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="bg-red-500/10 backdrop-blur-sm rounded-2xl border border-red-500/20 p-6"
          >
            <div className="flex items-center mb-4">
              <FiAlertTriangle className="h-6 w-6 text-red-400 mr-3" />
              <h2 className="text-xl font-semibold text-red-400">
                Important Warnings
              </h2>
            </div>
            <div className="space-y-3">
              {simulateData.warnings.map((warning, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-red-400 mr-3 mt-1">⚠️</span>
                  <span className="text-red-300">{warning}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
