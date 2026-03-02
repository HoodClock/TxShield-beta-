"use client";

import { m } from "framer-motion";
import { themes } from "./utils";

export default function SolanaLogs({
  itemVariants,
  chain,
  data: rawData,
}) {
  const t = themes[chain] || themes.SOL;
  const data = rawData?.data || {};
  const { simulation } = data;
  const { programsInvoked, logs } = simulation || {};

  return (
    <m.div
      variants={itemVariants}
      className="relative bg-[#0a0510] border border-purple-500/20 shadow-[inset_0_2px_15px_rgba(168,85,247,0.05)] rounded-2xl overflow-hidden h-[calc(100%-2rem)] mt-3 sm:mt-4"
    >
      <div className="relative z-10 p-3 sm:p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-purple-500/10">
          <div className="flex items-center gap-3">
            <div className="p-2 border border-purple-500/20 bg-purple-500/10 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-bold font-mono uppercase tracking-widest text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">Execution Schema</h3>
          </div>
        </div>

        <div className="flex-grow space-y-3 flex flex-col">
          {programsInvoked && programsInvoked.length > 0 && (
            <div>
              <h4 className="text-[10px] sm:text-xs font-mono font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Invoked Programs
              </h4>
              <div className="flex flex-wrap gap-2">
                {programsInvoked.map((prog, idx) => (
                  <div key={idx} className="flex flex-col px-3 py-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 transition-colors">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-purple-300">{prog.name || "Unknown Interface"}</span>
                    <span className="text-[8px] sm:text-[9px] font-mono text-gray-500 mt-0.5 break-all">{prog.address}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="relative flex-grow flex flex-col pt-2">
            <h4 className="text-[10px] sm:text-xs font-mono font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span> Raw RPC Logs
            </h4>
            <div className="flex-grow relative bg-[#050505] rounded-xl border border-purple-500/20 shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] overflow-hidden group/terminal">
              <div className="absolute top-0 bottom-0 left-6 w-px bg-white/5 z-0"></div>

              <div className="absolute inset-0 p-3 sm:p-4 font-mono text-[10px] sm:text-xs text-gray-300 overflow-y-auto custom-scrollbar z-20">
                {logs && logs.length > 0 ? (
                  logs.map((log, i) => (
                    <div key={i} className="mb-1.5 hover:bg-white/5 py-0.5 rounded break-all flex group/logline transition-colors">
                      <span className="text-gray-600 inline-block w-6 flex-shrink-0 select-none group-hover/logline:text-purple-400 transition-colors">{i + 1}</span>
                      <span className={`pl-2 ${log.toLowerCase().includes("error") ||
                        log.toLowerCase().includes("failed") ||
                        log.toLowerCase().includes("instruction changed the balance of a read-only account")
                        ? "text-red-400 font-bold"
                        : log.includes("invoke") || log.includes("Program log:")
                          ? "text-purple-300"
                          : "text-gray-400"
                        }`}>
                        {log.replace('Program log: ', '> ')}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-600 font-mono text-xs gap-3">
                    <span className="w-2 h-2 rounded bg-gray-600"></span>
                    Awaiting diagnostic telemetry...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
}
