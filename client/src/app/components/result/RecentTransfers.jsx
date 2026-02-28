"use client";

import { motion } from "framer-motion";
import { FiRadio, FiChevronDown, FiExternalLink, FiHash, FiArrowRight, FiArrowLeft, FiDollarSign, FiCalendar, FiLink } from "react-icons/fi";

export default function RecentTransfers({
  itemVariants,
  toggleSection,
  expandedSections,
  recentTransfers,
}) {
  if (!recentTransfers || recentTransfers.length === 0) return null;

  return (
    <motion.div variants={itemVariants} className="group gradient-border-card">
      <button
        onClick={() => toggleSection("transfers")}
        className="card-inner p-4 sm:p-6 w-full glitch-hover"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="icon-wrapper">
              <FiRadio className="h-5 w-5 text-pink-400" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white text-left">
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
          className="card-inner p-4 sm:p-6 pt-0 overflow-x-auto no-scrollbar"
        >
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                {[
                  { label: "Hash", icon: <FiHash className="h-4 w-4" /> },
                  { label: "From", icon: <FiArrowRight className="h-4 w-4" /> },
                  { label: "To", icon: <FiArrowLeft className="h-4 w-4" /> },
                  { label: "Amount", icon: <FiDollarSign className="h-4 w-4" /> },
                  { label: "Date", icon: <FiCalendar className="h-4 w-4" /> },
                  { label: "Action", icon: <FiLink className="h-4 w-4" /> },
                ].map((header) => (
                  <th
                    key={header.label}
                    className="text-left py-3 px-3 sm:px-4 text-slate-400 font-semibold"
                  >
                    <div className="flex items-center gap-2">
                      {header.icon}
                      {header.label}
                    </div>
                  </th>
                ))}
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
  );
}
