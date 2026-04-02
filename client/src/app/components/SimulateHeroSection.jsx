"use client"

import React from 'react'
import { m } from "framer-motion";
import DataFlowBackground from "./DataFlowBackground";
import ScrambleText from "./ScrambleText";
import Image from "next/image";
import "./SimulateHeroSection.module.css";
import Image from "next/image";

function SimulateHeroSection({ onChainSelect }) {
    return (
        <section className="bg-black py-16 sm:py-20 relative overflow-hidden">
            <m.div
                className="relative z-10 container mx-auto px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Heading and Description */}
                <div className="text-center mb-16 sm:mb-20 max-w-4xl mx-auto relative cursor-default">
                    {/* Background Glitch Elements */}
                    <div className="absolute top-0 left-1/4 w-32 h-[1px] bg-blue-500/30 blur-[2px]"></div>
                    <div className="absolute bottom-0 right-1/4 w-48 h-[1px] bg-purple-500/30 blur-[2px]"></div>



                    
                    {/* <div className="inline-block m-5">
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                            Security Sandbox Environment
                        </span>
                    </div> */}

                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-7xl font-bold m-13 sm:m-8 tracking-tight flex flex-col items-center gap-1 sm:gap-2">
                        <span className="grad-word leading-none">
                            TEST BEFORE
                        </span>
                        <span className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-5xl font-mono leading-tight flex items-center">
                            <ScrambleText text="YOU EXECUTE" duration={3000} loop={false} />
                            {/* Blinking Cursor Effect */}
                            <span className="inline-block w-4 sm:w-6 h-8 sm:h-12 ml-2 bg-blue-500 animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite] shadow-[0_0_15px_rgba(59,130,246,0.8)] align-middle mb-1 sm:mb-[6px] rounded-sm hidden sm:inline-block"></span>
                        </span>
                    </h1>

                    <p className="text-gray-400/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-mono tracking-wide relative">
                        <span className="absolute -left-4 top-0 text-blue-500/30 opacity-hidden sm:opacity-100">$</span>
                        Simulate your blockchain transactions with <span className="text-gray-200">advanced deterministic analysis</span>. Detect potential risks including honeypots, phishing attempts, and malicious contracts before broadcasting to the network.
                    </p>
                </div>

                {/* Buttons Container */}
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center items-center mt-16">
                    {/* EVM Chain Card */}
                    <m.button
                        onClick={() => onChainSelect("EVM")}
                        whileTap={{ scale: 0.98 }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                        className="relative group w-56 h-56 sm:w-64 sm:h-64 flex-shrink-0 p-1 rounded-3xl shadow-[0_0_40px_-15px_rgba(59,130,246,0.5)] overflow-hidden glitch-hover"
                    >
                        <div className="relative h-full w-full bg-black/60 backdrop-blur-2xl border border-blue-500/20 rounded-[28px] p-6 flex flex-col items-center justify-center gap-4 overflow-hidden group-hover:border-blue-400/50 transition-colors duration-500 shadow-inner shadow-black/80">
                            {/* Data Flow Grid Background */}
                            <DataFlowBackground className="opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

                            {/* Ambient Pulse Glows */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/30 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-blue-500/50 transition-all duration-700 delay-100"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-600/20 rounded-full blur-[50px] translate-y-1/2 -translate-x-1/2 pointer-events-none group-hover:bg-cyan-500/40 transition-all duration-700"></div>

                            {/* Center Radial Highlight */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                            {/* Inner Shine Effect (Glass Highlight) */}
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col items-center justify-center gap-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-900/30 border border-blue-500/30 rounded-full flex items-center justify-center backdrop-blur-md group-hover:bg-blue-600/20 group-hover:border-blue-400/60 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-500 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]">
                                    <Image
                                        src="https://assets.coingecko.com/coins/images/279/small/ethereum.png"
                                        alt="Ethereum"
                                        className="w-10 h-10 sm:w-12 sm:h-12 logo-spin group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="text-center group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all duration-500">
                                    <h3 className="text-xl sm:text-2xl font-bold tracking-wide text-gray-200 group-hover:text-white transition-colors duration-300">Ethereum</h3>
                                    <p className="text-cyan-400/60 text-xs font-mono uppercase tracking-widest mt-1 group-hover:text-cyan-400 transition-colors duration-300">EVM Compatible</p>
                                </div>
                            </div>
                        </div>
                    </m.button>

                    {/* SOL Chain Card */}
                    <m.button
                        onClick={() => onChainSelect("SOL")}
                        whileTap={{ scale: 0.98 }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                        className="relative group w-56 h-56 sm:w-64 sm:h-64 flex-shrink-0 p-1 rounded-3xl shadow-[0_0_40px_-15px_rgba(168,85,247,0.5)] overflow-hidden glitch-hover"
                    >
                        <div className="relative h-full w-full bg-black/60 backdrop-blur-2xl border border-purple-500/20 rounded-[28px] p-6 flex flex-col items-center justify-center gap-4 overflow-hidden group-hover:border-purple-400/50 transition-colors duration-500 shadow-inner shadow-black/80">
                            {/* Data Flow Grid Background */}
                            <DataFlowBackground className="opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

                            {/* Ambient Pulse Glows */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/30 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-purple-500/50 transition-all duration-700 delay-100"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-600/20 rounded-full blur-[50px] translate-y-1/2 -translate-x-1/2 pointer-events-none group-hover:bg-pink-500/40 transition-all duration-700"></div>

                            {/* Center Radial Highlight */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                            {/* Inner Shine Effect (Glass Highlight) */}
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col items-center justify-center gap-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-purple-900/30 border border-purple-500/30 rounded-full flex items-center justify-center backdrop-blur-md group-hover:bg-purple-600/20 group-hover:border-purple-400/60 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-500 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]">
                                    <Image
                                        src="https://assets.coingecko.com/coins/images/4128/small/solana.png"
                                        alt="Solana"
                                        className="w-10 h-10 sm:w-12 sm:h-12 logo-spin group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="text-center group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-all duration-500">
                                    <h3 className="text-xl sm:text-2xl font-bold tracking-wide text-gray-200 group-hover:text-white transition-colors duration-300">Solana</h3>
                                    <p className="text-pink-400/60 text-xs font-mono uppercase tracking-widest mt-1 group-hover:text-pink-400 transition-colors duration-300">SOL Network</p>
                                </div>
                            </div>
                        </div>
                    </m.button>
                </div>
            </m.div>
        </section>
    )
}

export default SimulateHeroSection
