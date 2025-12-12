"use client"

import React from 'react'
import { motion } from "framer-motion";

function SimulateHeroSection({ onChainSelect }) {
    return (
        <section className="bg-black py-16 sm:py-20 relative overflow-hidden">
            <motion.div
                className="relative z-10 container mx-auto px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <style jsx>{`
                  .logo-spin { transition: transform 0.8s cubic-bezier(.2,.9,.2,1); transform-origin: 50% 50%; }
                  .simulate-chain-btn .logo-spin { transform: rotate(0deg); }
                  .simulate-chain-btn:hover .logo-spin { transform: rotate(360deg); }
                  .simulate-chain-btn { will-change: transform; }
                  .simulate-btn-shine { pointer-events: none; mix-blend-mode: screen; }
                `}</style>
                {/* Heading and Description */}
                <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-1 w-12 bg-gradient-to-r from-transparent to-[#627EEA]"></div>
                        <span className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">TRANSACTION SIMULATOR</span>
                        <div className="h-1 w-12 bg-gradient-to-l from-transparent to-[#9945FF]"></div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#627EEA] via-white to-[#9945FF]">
                            Test Before You Execute
                        </span>
                    </h1>
                    <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                        Simulate your blockchain transactions with advanced security analysis. Detect potential risks including honeypots, phishing attempts, and malicious contracts before sending real funds.
                    </p>
                </div>

                {/* Buttons Container */}
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center items-center mt-16">
                    {/* EVM Chain Card */}
                    <motion.button
                        onClick={() => onChainSelect("EVM")}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.6 }}
                        className="relative group simulate-chain-btn w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden flex-shrink-0"
                        style={{ perspective: 1000 }}
                    >
                        {/* EVM Gradient Background - Blue Dominant with Purple */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#627EEA] via-[#4A90E2] to-[#2E5BFF]"></div>
                        
                        {/* Glowing overlay - Reduced */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/8 to-cyan-500/6 opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                        
                        {/* Faint shine on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 simulate-btn-shine bg-gradient-to-r from-white/6 via-white/10 to-white/6 rounded-3xl"></div>
                        
                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/12 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300">
                                <img
                                    src="https://assets.coingecko.com/coins/images/279/small/ethereum.png"
                                    alt="Ethereum"
                                    className="w-12 h-12 sm:w-14 sm:h-14 logo-spin"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl sm:text-2xl font-bold text-white">Ethereum</h3>
                                <p className="text-white/80 text-sm mt-2">EVM Compatible</p>
                            </div>
                        </div>
                    </motion.button>

                    {/* SOL Chain Card */}
                    <motion.button
                        onClick={() => onChainSelect("SOL")}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.6 }}
                        className="relative group simulate-chain-btn w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden flex-shrink-0"
                        style={{ perspective: 1000 }}
                    >
                        {/* SOL Gradient Background - Purple Dominant with Blue */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#9945FF] via-[#7B3FF2] to-[#5A25CC]"></div>
                        
                        {/* Glowing overlay - Reduced */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/8 to-purple-500/6 opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                        
                        {/* Faint shine on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 simulate-btn-shine bg-gradient-to-r from-white/6 via-white/10 to-white/6 rounded-3xl"></div>
                        
                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/12 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300">
                                <img
                                    src="https://assets.coingecko.com/coins/images/4128/small/solana.png"
                                    alt="Solana"
                                    className="w-12 h-12 sm:w-14 sm:h-14 logo-spin"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl sm:text-2xl font-bold text-white">Solana</h3>
                                <p className="text-white/80 text-sm mt-2">SOL Network</p>
                            </div>
                        </div>
                    </motion.button>
                </div>
            </motion.div>
        </section>
    )
}

export default SimulateHeroSection
