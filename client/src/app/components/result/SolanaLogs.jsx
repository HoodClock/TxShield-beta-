"use client";

import { motion } from "framer-motion";
import { themes } from "./utils";

export default function SolanaLogs({
  itemVariants,
  chain,
  data,
}) {
  const t = themes[chain] || themes.SOL;
  const { programCall, parsedLogs } = data;

  return (
    <motion.div variants={itemVariants} className="gradient-border-card p-[1px] h-full">
      <div className="card-inner p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${t.textPrimary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Program Logs</h3>
          </div>
        </div>

        <div className="flex-grow space-y-4">
          {programCall && programCall.length > 0 && (
            <div className="mb-4">
              <h4 className="text-gray-400 text-sm mb-2 uppercase tracking-wide">Invoked Programs</h4>
              <div className="flex flex-wrap gap-2">
                {programCall.map((prog, idx) => (
                  <span key={idx} className={`px-2 py-1 rounded-md text-xs font-mono border border-${t.primary}-500/30 bg-${t.primary}-500/10 text-${t.primary}-300`}>
                    {prog}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="bg-black/40 rounded-xl border border-gray-800 p-4 font-mono text-xs text-gray-300 h-96 overflow-y-auto no-scrollbar">
            {parsedLogs && parsedLogs.length > 0 ? (
              parsedLogs.map((log, i) => (
                <div key={i} className="mb-1 hover:bg-white/5 px-1 rounded">
                  <span className="text-gray-600 mr-2">{i + 1}</span>
                  <span className={log.includes("Error") || log.includes("failed") ? "text-red-400" : "text-gray-300"}>
                    {log}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 mt-10">No logs available</div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
