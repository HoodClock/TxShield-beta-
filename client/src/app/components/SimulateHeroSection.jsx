"use client";

import React from "react";
import { m } from "framer-motion";
import ScrambleText from "./ScrambleText";
import { SiEthereum, SiSolana } from "react-icons/si";

function SimulateHeroSection({ onChainSelect }) {
  return (
    <section className="relative h-full min-h-screen w-full bg-black overflow-hidden flex flex-col justify-center items-center">
      {/* Absolute Ambient Background to tie into the SPA feel */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      <m.div
        className="relative z-10 container mx-auto px-6 w-full max-w-7xl flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Massive Typography */}
        <div className="text-center w-full mb-12 relative cursor-default select-none">
          <m.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-light tracking-[0.1em] leading-none text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 drop-shadow-2xl"
            style={{ fontFamily: "var(--font-clash)" }}
          >
            SIMULATE
          </m.h1>
          
          <m.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-6 sm:mt-2 flex flex-col items-center justify-center gap-2"
          >
            <div className="flex items-center gap-4 text-xs sm:text-sm md:text-base font-mono tracking-[0.3em] uppercase text-gray-500">
              <span className="w-8 md:w-16 h-px bg-gradient-to-r from-transparent to-gray-600"></span>
              <ScrambleText text="Deterministic Execution Analysis" duration={2500} />
              <span className="w-8 md:w-16 h-px bg-gradient-to-l from-transparent to-gray-600"></span>
            </div>
            <p className="text-gray-600 font-mono text-[10px] md:text-xs tracking-widest uppercase mt-4 max-w-xl text-center leading-relaxed">
              Detect honeypots, phishing attempts, and malicious contracts <span className="text-cyan-500/70">before</span> broadcasting to the network.
            </p>
          </m.div>
        </div>

        {/* Minimalist Chain Selectors */}
        <div className="mt-12 md:mt-20 flex flex-col sm:flex-row gap-6 md:gap-10 items-center justify-center w-full">
          {/* EVM Selector */}
          <m.button
            onClick={() => onChainSelect("EVM")}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-64 md:w-80 h-20 md:h-24 overflow-hidden bg-white/[0.02] border border-white/10 hover:border-cyan-500/50 rounded-none transition-all duration-500 flex items-center px-6"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500/0 group-hover:bg-cyan-400 transition-all duration-300"></div>
            
            <div className="relative z-10 flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <SiEthereum className="text-2xl md:text-3xl text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                <div className="flex flex-col items-start">
                  <span className="text-lg md:text-xl font-light tracking-widest text-gray-300 group-hover:text-white transition-colors duration-300">EVM</span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 group-hover:text-cyan-500/80 transition-colors duration-300">Ethereum Network</span>
                </div>
              </div>
              <span className="text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-2 transition-all duration-300 font-mono">→</span>
            </div>
          </m.button>

          {/* SOL Selector */}
          <m.button
            onClick={() => onChainSelect("SOL")}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-64 md:w-80 h-20 md:h-24 overflow-hidden bg-white/[0.02] border border-white/10 hover:border-purple-500/50 rounded-none transition-all duration-500 flex items-center px-6"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500/0 group-hover:bg-purple-400 transition-all duration-300"></div>
            
            <div className="relative z-10 flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <SiSolana className="text-2xl md:text-3xl text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                <div className="flex flex-col items-start">
                  <span className="text-lg md:text-xl font-light tracking-widest text-gray-300 group-hover:text-white transition-colors duration-300">SOL</span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 group-hover:text-purple-500/80 transition-colors duration-300">Solana Network</span>
                </div>
              </div>
              <span className="text-gray-600 group-hover:text-purple-400 group-hover:translate-x-2 transition-all duration-300 font-mono">→</span>
            </div>
          </m.button>
        </div>
      </m.div>
    </section>
  );
}

export default SimulateHeroSection;
