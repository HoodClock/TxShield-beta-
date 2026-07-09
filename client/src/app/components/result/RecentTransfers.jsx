"use client";

import { m } from "framer-motion";
import { FiRadio, FiExternalLink, FiHash, FiArrowRight, FiArrowLeft, FiDollarSign, FiCalendar, FiLink } from "react-icons/fi";
import CopyButton from "../CopyButton";

export default function RecentTransfers({
  itemVariants,
  recentTransfers,
}) {
  if (!recentTransfers || recentTransfers.length === 0) return null;

  return (
    <m.div
      variants={itemVariants}
      className="relative bg-card border border-border rounded-2xl overflow-hidden mt-4 transition-colors duration-700 max-w-full"
    >
      <div className="relative z-10 p-4 sm:p-5 w-full flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-4">
          <div className="p-2 sm:p-2.5 rounded-xl bg-muted border border-border">
            <FiRadio className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-foreground tracking-widest uppercase font-mono text-left">
            Recent Transfers
          </h2>
        </div>
      </div>

      <div className="relative z-10 px-2 sm:px-5 pb-5 pt-4 overflow-x-auto no-scrollbar max-w-full">
        <div className="bg-muted/50 rounded-xl border border-border p-1 overflow-hidden">
          <table className="w-full min-w-[520px] sm:min-w-0 text-[10px] sm:text-xs font-mono">
            <thead>
              <tr className="border-b border-border text-muted-foreground uppercase tracking-widest bg-card">
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
                  className="border-b border-border hover:bg-primary/10 transition-all duration-200 group/row last:border-0"
                >
                  <td className="py-2.5 px-3 sm:px-4">
                    <span className="text-blue-400 group-hover/row:text-blue-300 transition-colors break-all">
                      {(tx.hash || "").substring(0, 8)}...
                    </span>
                  </td>
                  <td className="py-2.5 px-3 sm:px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-muted-foreground group-hover/row:text-foreground transition-colors break-all">
                        {(tx.from || "").substring(0, 6)}...
                      </span>
                      <CopyButton text={tx.from} label="Copy from address" />
                    </div>
                  </td>
                  <td className="py-2.5 px-3 sm:px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-muted-foreground group-hover/row:text-foreground transition-colors break-all">
                        {(tx.to || "").substring(0, 6)}...
                      </span>
                      <CopyButton text={tx.to} label="Copy to address" />
                    </div>
                  </td>
                  <td className="py-2.5 px-3 sm:px-4">
                    <span className="text-foreground font-semibold group-hover/row:text-primary transition-colors">
                      {tx.amount} {tx.symbol}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 sm:px-4">
                    <span className="text-muted-foreground group-hover/row:text-muted-foreground/80 transition-colors whitespace-nowrap">
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
