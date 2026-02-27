"use client"

import React from 'react'
import { motion } from "framer-motion";
import "./SimulateHeroSection.module.css";

function SimulateHeroSection({ onChainSelect }) {
    return (
        <section className="bg-black py-16 sm:py-20 relative overflow-hidden">
            <motion.div
                className="relative z-10 container mx-auto px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Heading and Description */}
                <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">

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
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                        className="relative group w-56 h-56 sm:w-64 sm:h-64 flex-shrink-0 p-[1px] rounded-3xl bg-gradient-to-br from-blue-500/30 via-blue-600/10 to-blue-400/5 shadow-2xl overflow-hidden"
                    >
                        <div className="relative h-full w-full bg-black/90 backdrop-blur-xl rounded-[23px] p-6 flex flex-col items-center justify-center gap-4 overflow-hidden">
                            {/* Ambient Backgrounds */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-blue-600/30 transition-all duration-500"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-600/10 rounded-full blur-[40px] translate-y-1/2 -translate-x-1/2 pointer-events-none group-hover:bg-cyan-600/20 transition-all duration-500"></div>

                            {/* Shine Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-r from-white/10 via-white/20 to-white/10"></div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-all duration-300 shadow-inner shadow-blue-500/10">
                                    <img
                                        src="https://assets.coingecko.com/coins/images/279/small/ethereum.png"
                                        alt="Ethereum"
                                        className="w-10 h-10 sm:w-12 sm:h-12 logo-spin"
                                    />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">Ethereum</h3>
                                    <p className="text-gray-400 text-sm mt-1 group-hover:text-gray-300 transition-colors">EVM Compatible</p>
                                </div>
                            </div>
                        </div>
                    </motion.button>

                    {/* SOL Chain Card */}
                    <motion.button
                        onClick={() => onChainSelect("SOL")}
                        whileTap={{ scale: 0.98 }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                        className="relative group w-56 h-56 sm:w-64 sm:h-64 flex-shrink-0 p-[1px] rounded-3xl bg-gradient-to-br from-purple-500/30 via-purple-600/10 to-pink-400/5 shadow-2xl overflow-hidden"
                    >
                        <div className="relative h-full w-full bg-black/90 backdrop-blur-xl rounded-[23px] p-6 flex flex-col items-center justify-center gap-4 overflow-hidden">
                            {/* Ambient Backgrounds */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-purple-600/30 transition-all duration-500"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-600/10 rounded-full blur-[40px] translate-y-1/2 -translate-x-1/2 pointer-events-none group-hover:bg-pink-600/20 transition-all duration-500"></div>

                            {/* Shine Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-r from-white/10 via-white/20 to-white/10"></div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-purple-500/10 border border-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-purple-500/20 group-hover:border-purple-500/30 transition-all duration-300 shadow-inner shadow-purple-500/10">
                                    <img
                                        src="https://assets.coingecko.com/coins/images/4128/small/solana.png"
                                        alt="Solana"
                                        className="w-10 h-10 sm:w-12 sm:h-12 logo-spin"
                                    />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">Solana</h3>
                                    <p className="text-gray-400 text-sm mt-1 group-hover:text-gray-300 transition-colors">SOL Network</p>
                                </div>
                            </div>
                        </div>
                    </motion.button>
                </div>
            </motion.div>
        </section>
    )
}

export default SimulateHeroSection
