"use client";

import { motion } from "framer-motion";
import {
  FiCheck,
  FiAlertTriangle,
  FiInfo,
  FiArrowRight,
  FiExternalLink,
} from "react-icons/fi";

export default function ResultsDashboard({ isVisible, simulation, honeypot }) {
  if (!isVisible || !simulation || !honeypot) return null;

  // --- Honeypot Data ---
  const { totalScore, passRate, riskLevel, verdict, checks } = honeypot;
  const totalChecks = Object.keys(checks).length;
  // const passedChecks = Object.values(checks).filter((chk) => chk.data.risk === false).length;
  const passedChecks = Object.values(checks).filter(
    (chk) => chk?.data?.risk === false
  ).length;
  const ratioText = `${passedChecks}/${totalChecks}`;

  // Risk level colors with brighter variants
  const riskColorMap = {
    "Safe Zone": {
      bg: "bg-gray-200/10",
      text: "text-gray-300",
      border: "border-gray-400/30",
      pulse: "bg-gray-400",
    },
    Medium: {
      bg: "bg-gray-500/10",
      text: "text-gray-400",
      border: "border-gray-500/30",
      pulse: "bg-gray-500",
    },
    High: {
      bg: "bg-gray-700/10",
      text: "text-gray-300",
      border: "border-gray-700/30",
      pulse: "bg-gray-700",
    },
  };
  const riskStyle = riskColorMap[riskLevel] || {
    bg: "bg-gray-500/10",
    text: "text-gray-400",
    border: "border-gray-500/30",
    pulse: "bg-gray-500",
  };

  // --- Simulation Data ---
  const {
    simulateTx: { data: simulateData },
    byteCode: { data: byteData },
    transactionHistory: { data: txHistoryData },
  } = simulation.checks;

  // Execution status card
  const executionSuccess = simulateData.success;
  const executionMessage = simulateData.success
    ? "Execution simulated successfully"
    : `${simulateData.error}`;

  // Bytecode warnings
  const { isContract, warnings } = byteData;

  // Transaction history summary & recent transfers
  const summary = txHistoryData?.summary || {};
  const recentTransfers = txHistoryData?.recentTransfers || [];

  const {
    totalTransfers = "N/A",
    lastTransferDate = "N/A",
    totalERC20Volume = "N/A",
  } = summary;

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="space-y-8 p-4 sm:p-6 max-w-7xl mx-auto"
    >
      {/* Honeypot Section */}
      <motion.div
        variants={item}
        className="bg-gray-900 rounded-2xl p-6 border border-gray-700 shadow-2xl backdrop-blur-sm"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(100, 100, 100, 0.1) 0%, rgba(30, 30, 30, 0.9) 50%)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h3 className="text-3xl font-bold text-white">Honeypot Analysis</h3>
            <p className="text-sm text-gray-500">
              Smart contract security assessment
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            className={`flex items-center space-x-2 ${riskStyle.bg} px-4 py-2 rounded-full border ${riskStyle.border}`}
          >
            <span className="text-sm text-gray-400">Risk Level:</span>
            <div className="flex items-center">
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`w-2 h-2 rounded-full mr-2 ${riskStyle.pulse}`}
              />
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${riskStyle.text}`}
              >
                {riskLevel}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Honeypot Summary Tiles */}
        <motion.div
          variants={container}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {/* Total Score Tile */}
          <motion.div
            variants={item}
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-gray-700/20 flex items-center justify-center mr-3 group-hover:bg-gray-600/30 transition-colors">
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-400 group-hover:text-white transition-colors">
                  Total Score
                </h4>
              </div>
              <div className="flex items-end">
                <div className="text-4xl font-bold text-white mb-1">
                  {totalScore.trim()}
                </div>
                <div className="text-sm text-gray-500 mb-2 ml-1">/ 60</div>
              </div>
              <div className="h-1.5 w-full bg-gray-700 mt-4 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(parseFloat(totalScore) / 60) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gray-400"
                />
              </div>
            </div>
          </motion.div>

          {/* Pass Rate Tile */}
          <motion.div
            variants={item}
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-gray-700/20 flex items-center justify-center mr-3 group-hover:bg-gray-600/30 transition-colors">
                  <FiCheck className="h-6 w-6 text-gray-400" />
                </div>
                <h4 className="font-medium text-gray-400 group-hover:text-white transition-colors">
                  Pass Rate
                </h4>
              </div>
              <div className="text-4xl font-bold text-white mb-4">
                {passRate}
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                {Number(passRate.replace("%", "")) > 0 && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: passRate }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="bg-gray-400 h-1.5 rounded-full"
                  />
                )}
              </div>
            </div>
          </motion.div>

          {/* Checks Passed Tile */}
          <motion.div
            variants={item}
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-gray-700/20 flex items-center justify-center mr-3 group-hover:bg-gray-600/30 transition-colors">
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-400 group-hover:text-white transition-colors">
                  Checks Passed
                </h4>
              </div>
              <div className="text-4xl font-bold text-white mb-1">
                {ratioText}
              </div>
              <div className="text-sm text-gray-500">checks passed / total</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {Object.entries(checks).map(([name, check]) => (
                  <span
                    key={name}
                    className={`text-xs px-2 py-1 rounded-full ${
                      check?.data?.risk
                        ? "bg-gray-700/20 text-gray-300"
                        : "bg-gray-600/20 text-gray-400"
                    }`}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Honeypot Verdict */}
        <motion.div
          variants={item}
          className="mt-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg"
        >
          <h4 className="text-xl font-semibold text-gray-300 mb-4 flex items-center">
            <FiInfo className="h-5 w-5 mr-2 text-gray-400" />
            Expert Verdict
          </h4>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-gray-200 leading-relaxed text-lg"
          >
            {verdict}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Simulation Section */}
      <motion.div
        variants={item}
        className="bg-gray-900 rounded-2xl p-6 border border-gray-700 shadow-2xl backdrop-blur-sm"
        style={{
          background:
            "radial-gradient(circle at 80% 30%, rgba(100, 100, 100, 0.1) 0%, rgba(30, 30, 30, 0.9) 50%)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h3 className="text-3xl font-bold text-white">Simulation Overview</h3>
        <p className="text-sm text-gray-500 mb-8">
          Smart contract behavior analysis
        </p>

        {/* Execution Status */}
        <motion.div variants={item} className="mb-8">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: executionSuccess
                    ? [
                        "0 0 0 0 rgba(200, 200, 200, 0.7)",
                        "0 0 0 10px rgba(200, 200, 200, 0)",
                        "0 0 0 0 rgba(200, 200, 200, 0)",
                      ]
                    : [
                        "0 0 0 0 rgba(100, 100, 100, 0.7)",
                        "0 0 0 10px rgba(100, 100, 100, 0)",
                        "0 0 0 0 rgba(100, 100, 100, 0)",
                      ],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`w-4 h-4 rounded-full mr-3 ${
                  executionSuccess ? "bg-gray-400" : "bg-gray-600"
                }`}
              />
              <h5 className="text-gray-300 font-medium">Execution Status</h5>
            </div>
            <motion.p
              whileTap={{ scale: 0.95 }}
              className={`text-sm font-medium px-4 py-2 rounded-full flex items-center ${
                executionSuccess
                  ? "bg-gray-600/20 text-gray-400"
                  : "bg-gray-700/20 text-gray-300"
              }`}
            >
              {executionSuccess ? (
                <>
                  <FiCheck className="mr-2" /> {executionMessage}
                </>
              ) : (
                <>{executionMessage}</>
              )}
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Bytecode Warnings */}
        <motion.div variants={item} className="mb-8">
          <h5 className="text-xl font-semibold text-gray-300 mb-4 flex items-center">
            <FiAlertTriangle className="h-5 w-5 mr-2 text-gray-400" />
            Bytecode Analysis
          </h5>
          <motion.div
            whileHover={{ y: -2 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-700"
          >
            {isContract ? (
              warnings.length > 0 ? (
                <motion.ul className="space-y-3">
                  {warnings.map((w, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * idx }}
                      className="flex items-start bg-gray-700/10 p-3 rounded-lg border border-gray-600/20"
                    >
                      <span className="text-gray-300 mr-2 mt-0.5">⚠</span>
                      <span className="text-gray-200">{w}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center bg-gray-600/10 p-4 rounded-lg border border-gray-500/20"
                >
                  <FiCheck className="h-5 w-5 mr-2 text-gray-400" />
                  <span className="text-gray-400">
                    No dangerous opcodes detected.
                  </span>
                </motion.div>
              )
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center bg-gray-600/10 p-4 rounded-lg border border-gray-500/20"
              >
                <FiAlertTriangle className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-400">
                  Address is not a contract.
                </span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Transaction History Summary */}
        <motion.div variants={container} className="mb-8">
          <h5 className="text-xl font-semibold text-gray-300 mb-4 flex items-center">
            <svg
              className="h-5 w-5 mr-2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
              />
            </svg>
            Recent Transfers Summary
          </h5>

          {txHistoryData.success ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <motion.div
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-700 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                    Total Transfers
                  </p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {txHistoryData.summary.totalTransfers}
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-700 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                    Last Transfer Date
                  </p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {txHistoryData.summary.lastTransferDate}
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-700 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                    Total ERC-20 Volume
                  </p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {txHistoryData.summary.totalERC20Volume}
                  </p>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="text-gray-500 italic text-sm mt-2 px-2 py-3 bg-gray-800 border border-gray-700 rounded-lg">
              ⚠️ {txHistoryData.error || "No transaction history available."}
            </div>
          )}
        </motion.div>

        {/* Recent Transfers List */}
        {recentTransfers.length > 0 && (
          <motion.div variants={item}>
            <h5 className="text-xl font-semibold text-gray-300 mb-4 flex items-center">
              <svg
                className="h-5 w-5 mr-2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              5 Most Recent Transfers
            </h5>
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="overflow-x-auto rounded-xl border border-gray-700 shadow-lg"
            >
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Hash
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      From
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      To
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Symbol
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                  {recentTransfers.map((tx, idx) => (
                    <motion.tr
                      key={tx.hash}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className="hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-5 py-4 whitespace-nowrap text-sm font-mono text-gray-400">
                        <a
                          href={`https://etherscan.io/tx/${tx.hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center hover:text-gray-300 transition-colors"
                        >
                          {tx.hash.substring(0, 6)}...
                          {tx.hash.substring(tx.hash.length - 4)}
                          <FiExternalLink className="ml-1 opacity-0 group-hover:opacity-100" />
                        </a>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm font-mono text-gray-300">
                        {tx.from.substring(0, 6)}...
                        {tx.from.substring(tx.from.length - 4)}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm font-mono text-gray-300">
                        {tx.to.substring(0, 6)}...
                        {tx.to.substring(tx.to.length - 4)}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {tx.symbol}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-300">
                        {tx.amount}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-400">
                        {tx.date}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-right text-sm">
                        <a
                          href={`https://etherscan.io/tx/${tx.hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-300 transition-colors flex items-center justify-end"
                        >
                          <FiArrowRight />
                        </a>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
