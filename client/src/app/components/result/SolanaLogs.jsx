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
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative group/sollogs overflow-hidden rounded-2xl border border-white/5 bg-black/40 shadow-[inset_0_2px_20px_rgba(0,0,0,0.8)] hover:border-purple-500/30 hover:bg-black/60 transition-all duration-300 h-[calc(100%-2rem)] transform-gpu"
    >
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>
      <div className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover/sollogs:opacity-100 transition-opacity duration-500 blur-[1px]`}></div>

      <div className="relative z-10 p-4 sm:p-5 h-full flex flex-col">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10 group-hover/sollogs:border-purple-500/20 transition-colors">
          <div className="flex items-center gap-4">
            <div className="p-2 sm:p-2.5 rounded-xl border border-purple-500/20 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.15)] group-hover/sollogs:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-shadow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] group-hover/sollogs:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-bold font-mono uppercase tracking-widest text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">Execution Pipeline</h3>
          </div>
        </div>

        <div className="flex-grow space-y-4 flex flex-col">
          {programsInvoked && programsInvoked.length > 0 && (
            <div>
              <h4 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Invoked Programs
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {programsInvoked.map((prog, idx) => (
                  <div key={idx} className="flex flex-col px-3 py-1.5 rounded-lg border border-purple-500/20 bg-purple-500/5 shadow-[inset_0_0_10px_rgba(168,85,247,0.05)] hover:bg-purple-500/10 transition-colors">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-purple-300 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]">{prog.name || "Unknown Interface"}</span>
                    <span className="text-[8px] sm:text-[9px] font-mono text-gray-500 mt-1">{prog.address}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="relative flex-grow flex flex-col">
            <h4 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span> Raw RPC Logs
            </h4>
            <div className="flex-grow relative bg-[#050505] rounded-xl border border-white/5 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] overflow-hidden group/terminal hover:border-cyan-500/30 transition-colors duration-300">
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-30 pointer-events-none z-10"></div>
              <div className="absolute top-0 bottom-0 left-8 w-px bg-white/5 z-0"></div>

              <div className="absolute inset-0 p-4 font-mono text-[11px] sm:text-xs text-gray-300 overflow-y-auto no-scrollbar z-20">
                {logs && logs.length > 0 ? (
                  logs.map((log, i) => (
                    <div key={i} className="mb-1.5 hover:bg-white/5 py-0.5 rounded break-all flex group/logline transition-colors">
                      <span className="text-gray-600 inline-block w-6 flex-shrink-0 select-none group-hover/logline:text-purple-400 transition-colors">{i + 1}</span>
                      <span className={`pl-2 ${log.toLowerCase().includes("error") ||
                        log.toLowerCase().includes("failed") ||
                        log.toLowerCase().includes("instruction changed the balance of a read-only account")
                        ? "text-red-400 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)] font-bold"
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
                    <span className="animate-pulse w-2 h-2 rounded bg-gray-600"></span>
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
