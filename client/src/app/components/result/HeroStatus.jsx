"use client";

import { m } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiActivity, FiShield, FiAlertTriangle } from "react-icons/fi";

export default function HeroStatus({
  itemVariants,
  executionSuccess,
  executionMessage,
  gasPercent,
  ratioText,
  chain
}) {
  return (
    <m.div
      variants={itemVariants}
      className="relative w-full mb-8 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* --- PRIMARY VERDICT MODULE (GLASS) --- */}
        <div className="lg:col-span-6 relative group">
          <div className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-r ${executionSuccess ? 'from-emerald-500/20 via-cyan-500/20 to-emerald-500/20' : 'from-red-500/20 via-orange-500/20 to-red-500/20'} blur-sm opacity-50`} />
          
          <div className="relative h-full p-8 rounded-3xl bg-card/40 backdrop-blur-3xl border border-border flex flex-col justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)] bg-[length:100%_4px] animate-[scan_4s_linear_infinite] pointer-events-none opacity-20" />
            
            <div className="relative z-10 flex items-center gap-6">
              <m.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 shrink-0 ${executionSuccess ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}
              >
                {executionSuccess ? (
                  <FiCheckCircle className="w-10 h-10 text-emerald-400" />
                ) : (
                  <FiAlertTriangle className="w-10 h-10 text-red-500" />
                )}
              </m.div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-widest uppercase ${executionSuccess ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    Verdict Confirmed
                  </span>
                  <div className={`w-1.5 h-1.5 rounded-full ${executionSuccess ? 'bg-emerald-400' : 'bg-red-400'} animate-pulse`} />
                </div>
                <h2 className="text-3xl sm:text-4xl font-clash font-bold tracking-tight text-foreground mb-1 uppercase">
                  {executionSuccess ? "SAFE PASSAGE" : "CRITICAL ALERT"}
                </h2>
                <p className="font-mono text-[11px] text-muted-foreground leading-tight uppercase opacity-60">
                  {executionMessage}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECONDARY TELEMETRY MODULES --- */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Network Load / Gas */}
          <div className="relative group p-6 rounded-3xl bg-card/40 backdrop-blur-3xl border border-border flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full blur-3xl -z-10" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0">
                <FiActivity className="w-5 h-5 text-blue-400" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Network Telemetry</span>
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="font-mono text-[10px] text-muted-foreground uppercase">GAS_USAGE</span>
                <span className="font-mono text-xl font-bold text-foreground">{gasPercent}%</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden border border-border">
                <m.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${gasPercent}%` }}
                  transition={{ duration: 1, ease: "circOut" }}
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                />
              </div>
            </div>
          </div>

          {/* Safety Context / Checks */}
          <div className="relative group p-6 rounded-3xl bg-card/40 backdrop-blur-3xl border border-border flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-full blur-3xl -z-10" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0">
                <FiShield className="w-5 h-5 text-purple-400" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Safety Integrity</span>
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="font-mono text-[10px] text-muted-foreground uppercase">HEURISTIC_PASS</span>
                <span className="font-mono text-xl font-bold text-foreground">{ratioText}</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden border border-border">
                <m.div 
                  initial={{ width: 0 }}
                  animate={{ width: ratioText.includes('Fail') || ratioText === "N/A" ? '10%' : '100%' }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className={`h-full bg-gradient-to-r ${ratioText.includes('Fail') ? 'from-red-500 to-orange-500' : 'from-purple-400 to-cyan-400'} shadow-[0_0_10px_rgba(168,85,247,0.3)]`} 
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </m.div>
  );
}
