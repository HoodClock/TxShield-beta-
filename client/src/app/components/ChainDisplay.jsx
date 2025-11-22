import React from 'react'
import { motion, useInView } from "framer-motion";
import { useRef } from 'react';

function ChainDisplay() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    // Chain logos using CoinGecko CDN for reliable logo sources
    const chains = [
        { id: 'eth', label: 'Ethereum', logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
        { id: 'bnb', label: 'BNB Smart Chain', logo: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' },
        { id: 'avax', label: 'Avalanche', logo: 'https://assets.coingecko.com/coins/images/12559/small/avalanche-avax-logo.png', fallback: 'https://cryptologos.cc/logos/avalanche-avax-logo.png' },
        { id: 'matic', label: 'Polygon', logo: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png' },
        { id: 'arb', label: 'Arbitrum', logo: 'https://assets.coingecko.com/coins/images/16547/small/arbitrum.png', fallback: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png' },
        { id: 'op', label: 'Optimism', logo: 'https://assets.coingecko.com/coins/images/25244/small/Optimism.png' },
        { id: 'ftm', label: 'Fantom', logo: 'https://assets.coingecko.com/coins/images/4001/small/Fantom.png' },
        { id: 'celo', label: 'Celo', logo: 'https://assets.coingecko.com/coins/images/11090/small/InjXBNx9_400x400.jpg' },
        { id: 'aurora', label: 'Aurora', logo: 'https://assets.coingecko.com/coins/images/20582/small/aurora.jpeg' },
        { id: 'sol', label: 'Solana', logo: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' }
    ];

    return (
        <section ref={sectionRef} className="relative py-16 px-4 sm:px-6 overflow-hidden bg-black">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black to-black"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 mb-6">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-300">MULTI-CHAIN SUPPORT</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">Supported <span className="grad-word">Blockchains</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">We support monitoring across the most widely used networks.</p>
                </motion.div>

                {/* Main Card with Chain Grid */}
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="rounded-2xl fancy-gradient-border subtle bg-white/4 border border-white/6 p-6 backdrop-blur-sm"
                    >
                        <div className="flex items-start gap-6">
                            {/* Chains Grid */}
                            <div className="flex-1">
                                <div className="text-sm text-gray-400 mb-1">Supported Networks</div>
                                <h3 className="text-2xl font-bold text-white mb-4">Overview</h3>
                                <p className="text-gray-400 mb-6 text-sm">A comprehensive list of blockchain networks we monitor and protect.</p>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {chains.map((chain, index) => (
                                        <motion.div
                                            key={chain.id}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                            transition={{ duration: 0.5, delay: 0.1 + index * 0.03 }}
                                            className="group"
                                        >
                                            <div className="flex flex-col items-center p-3 rounded-xl bg-white/2 border border-white/5 hover:border-purple-400/30 hover:bg-white/5 transition-all duration-300">
                                                <div className="relative mb-2">
                                                    <div className="p-[2px] rounded-full bg-gradient-to-br from-purple-500 via-indigo-600 to-cyan-400" style={{ boxShadow: '0 4px 15px rgba(79,70,229,0.12)' }}>
                                                        <div className="w-12 h-12 rounded-full bg-[#0B0B0B] flex items-center justify-center p-1.5">
                                                            <img 
                                                                src={chain.logo} 
                                                                alt={chain.label}
                                                                className="w-full h-full object-contain"
                                                                onError={(e) => {
                                                                    // Try fallback logo if available
                                                                    if (chain.fallback && e.target.src !== chain.fallback) {
                                                                        e.target.src = chain.fallback;
                                                                    } else {
                                                                        // If fallback also fails, show a placeholder
                                                                        e.target.style.display = 'none';
                                                                        const placeholder = e.target.parentElement;
                                                                        if (placeholder && !placeholder.querySelector('.logo-placeholder')) {
                                                                            const placeholderDiv = document.createElement('div');
                                                                            placeholderDiv.className = 'logo-placeholder w-full h-full rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center text-white text-xs font-bold';
                                                                            placeholderDiv.textContent = chain.label.substring(0, 2).toUpperCase();
                                                                            placeholder.appendChild(placeholderDiv);
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors duration-300 text-center leading-tight">
                                                    {chain.label}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Stats Sidebar */}
                            <div className="w-36 hidden lg:block">
                                <div className="rounded-xl bg-white/6 p-4 text-center">
                                    <div className="text-sm text-gray-400">Total Networks</div>
                                    <div className="text-3xl font-bold text-white mt-2">{chains.length}</div>
                                    <div className="text-xs text-gray-500 mt-1">active chains • supported</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default ChainDisplay;