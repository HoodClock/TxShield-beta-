"use client";

import { m } from "framer-motion";
import { FiRadio, FiExternalLink, FiHash, FiArrowRight, FiArrowLeft, FiDollarSign, FiCalendar, FiLink } from "react-icons/fi";

export default function RecentTransfers({
  itemVariants,
  recentTransfers,
}) {
  if (!recentTransfers || recentTransfers.length === 0) return null;

  return (
    <m.div
      variants={itemVariants}
      className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden mt-4"
    >
      <div className="relative z-10 p-4 sm:p-5 w-full flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10">
            <FiRadio className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-white tracking-widest uppercase font-mono text-left">
            Recent Transfers
          </h2>
        </div>
      </div>

      <div className="relative z-10 px-4 sm:px-5 pb-5 pt-4 overflow-x-auto no-scrollbar">
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
      </div>
    </m.div>
  );
}
