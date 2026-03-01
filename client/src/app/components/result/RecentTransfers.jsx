"use client";

import { m } from "framer-motion";
import { FiRadio, FiChevronDown, FiExternalLink, FiHash, FiArrowRight, FiArrowLeft, FiDollarSign, FiCalendar, FiLink } from "react-icons/fi";

export default function RecentTransfers({
  itemVariants,
  toggleSection,
  expandedSections,
  recentTransfers,
}) {
  if (!recentTransfers || recentTransfers.length === 0) return null;

  return (
    <m.div
      variants={itemVariants}
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative group/accordion transform-gpu"
    >
      {/* Hollow Container Background */}
      <div className="absolute inset-0 bg-black/40 rounded-2xl shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] border border-white/5 pointer-events-none transition-colors duration-300 group-hover/accordion:bg-black/60 group-hover/accordion:border-blue-500/30"></div>

      {/* Outer Bottom Glow */}
      <div className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transition-opacity duration-500 blur-[1px] ${expandedSections.transfers ? "opacity-100" : "opacity-0 group-hover/accordion:opacity-50"}`}></div>

      <button
        onClick={() => toggleSection("transfers")}
        className="relative z-10 p-4 sm:p-5 w-full flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-2xl"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 sm:p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover/accordion:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-shadow">
            <FiRadio className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 group-hover/accordion:animate-pulse" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-white tracking-widest uppercase font-mono drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] text-left">
            Recent Transfers
          </h2>
        </div>
        <m.div
          animate={{ rotate: expandedSections.transfers ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/10 group-hover/accordion:bg-blue-500/10 group-hover/accordion:border-blue-500/30 transition-colors"
        >
          <FiChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400/70 group-hover/accordion:text-blue-400" />
        </m.div>
      </button>

      {expandedSections.transfers && (
        <m.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 px-4 sm:px-5 pb-5 pt-1 overflow-x-auto no-scrollbar"
        >
          <div className="bg-black/50 rounded-xl border border-white/5 p-1 overflow-hidden">
            <table className="w-full text-[10px] sm:text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-gray-500 uppercase tracking-widest bg-white/5">
                  {[
                    { label: "Hash", icon: <FiHash className="h-3 w-3" /> },
                    { label: "From", icon: <FiArrowRight className="h-3 w-3" /> },
                    { label: "To", icon: <FiArrowLeft className="h-3 w-3" /> },
                    { label: "Amount", icon: <FiDollarSign className="h-3 w-3" /> },
                    { label: "Date", icon: <FiCalendar className="h-3 w-3" /> },
                    { label: "Trace", icon: <FiLink className="h-3 w-3" /> },
                  ].map((header) => (
                    <th
                      key={header.label}
                      className="text-left py-2 px-3 sm:px-4 font-semibold"
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
                  <m.tr
                    key={`${tx.hash}-${idx}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    className="border-b border-white/5 hover:bg-blue-500/10 transition-all duration-200 group/row last:border-0"
                  >
                    <td className="py-2.5 px-3 sm:px-4">
                      <span className="text-blue-400 group-hover/row:text-blue-300 transition-colors">
                        {(tx.hash || "").substring(0, 8)}...
                      </span>
                    </td>
                    <td className="py-2.5 px-3 sm:px-4">
                      <span className="text-gray-400 group-hover/row:text-gray-200 transition-colors">
                        {(tx.from || "").substring(0, 6)}...
                      </span>
                    </td>
                    <td className="py-2.5 px-3 sm:px-4">
                      <span className="text-gray-400 group-hover/row:text-gray-200 transition-colors">
                        {(tx.to || "").substring(0, 6)}...
                      </span>
                    </td>
                    <td className="py-2.5 px-3 sm:px-4">
                      <span className="text-white font-semibold group-hover/row:text-blue-200 transition-colors">
                        {tx.amount} {tx.symbol}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 sm:px-4">
                      <span className="text-gray-500 group-hover/row:text-gray-400 transition-colors whitespace-nowrap">
                        {tx.date}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 sm:px-4">
                      <a
                        href={`https://etherscan.io/tx/${tx.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500/70 hover:text-blue-400 transition-colors inline-flex p-1 rounded hover:bg-blue-500/20"
                      >
                        <FiExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </a>
                    </td>
                  </m.tr>
                ))}
              </tbody>
            </table>
          </div>
        </m.div>
      )}
    </m.div>
  );
}
