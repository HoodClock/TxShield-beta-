import React, { useRef } from 'react';
import { m, useInView } from "framer-motion";
import Image from "next/image";
function ChainDisplay() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    // Chain logos using CoinGecko CDN for reliable logo sources
    // Doubled for seamless CSS marquee looping
    const baseChains = [
        { id: 'eth', label: 'Ethereum', logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png', color: 'bg-blue-500' },
        { id: 'bnb', label: 'BNB Chain', logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png', color: 'bg-yellow-500' },
        { id: 'avax', label: 'Avalanche', logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/avalanchec/info/logo.png', color: 'bg-red-500' },
        { id: 'matic', label: 'Polygon', logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png', color: 'bg-purple-500' },
        { id: 'arb', label: 'Arbitrum', logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png', color: 'bg-cyan-500' },
        { id: 'op', label: 'Optimism', logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/info/logo.png', color: 'bg-red-600' },
        { id: 'ftm', label: 'Fantom', logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/fantom/info/logo.png', color: 'bg-blue-600' },
        { id: 'celo', label: 'Celo', logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/celo/info/logo.png', color: 'bg-green-500' },
        { id: 'aurora', label: 'Aurora', logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/aurora/info/logo.png', color: 'bg-green-400' },
        { id: 'sol', label: 'Solana', logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png', color: 'bg-green-300' }
    ];

    // Duplicate array to ensure the scroll loop is perfectly seamless
    const scrollChains = [...baseChains, ...baseChains];

    // CSS Keyframes and styling injected dynamically for the marquee
    const marqueeStyle = `
        @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 1rem)); } /* -50% shifts exactly one full base array length, minus gap */
        }
        .animate-marquee {
            animation: scroll 30s linear infinite; /* Smooth, continuous horizontal scroll */
        }
        .animate-marquee:hover {
            animation-play-state: paused; /* Pause on hover for easier viewing */
        }
    `;

    return (
        <section ref={sectionRef} className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden bg-black">
            {/* Inject Marquee CSS */}
            <style>{marqueeStyle}</style>

            <div className="max-w-7xl mx-auto relative z-10 w-full flex flex-col items-center">

                {/* Section Header */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 sm:mb-12 w-full max-w-2xl"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
                        <span className="text-xs text-gray-300 font-semibold tracking-wider uppercase">Native RPC Integrations</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">
                        <span className="text-white drop-shadow-md">Supported <span className="grad-word">Networks</span></span>
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">
                        EVM & Solana compatible. Simulating transactions across the most active Web3 subnets.
                    </p>
                </m.div>

                {/* Streamlined Glass Marquee Container */}
                <m.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full relative"
                >
                    {/* The "Glass Tube" container */}
                    <div className="relative w-full rounded-[2rem] bg-[#0c0c0c]/80 backdrop-blur-xl border border-white/10 p-4 sm:p-6 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] overflow-hidden">

                        {/* Inner shadow overlay for depth */}
                        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] pointer-events-none rounded-[2rem] z-20"></div>

                        {/* Faded Gradient Masks for Seamless Edge Scrolling */}
                        <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0c0c0c] to-transparent z-10 pointer-events-none rounded-l-[2rem]"></div>
                        <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0c0c0c] to-transparent z-10 pointer-events-none rounded-r-[2rem]"></div>

                        {/* Scrolling Marquee Track */}
                        <div className="flex gap-4 sm:gap-8 w-max animate-marquee relative z-0 py-2 items-center">
                            {scrollChains.map((chain, index) => (
                                <div
                                    key={`${chain.id}-${index}`}
                                    className="flex items-center gap-3 sm:gap-4 px-5 sm:px-6 py-3 sm:py-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-purple-500/50 transition-all duration-300 group cursor-default shadow-inner"
                                >
                                    {/* Inner Node Pulse */}
                                    <div className={`relative flex items-center justify-center`}>
                                        <div className="absolute inset-0 bg-white/20 blur-md rounded-full group-hover:bg-purple-500/40 transition-colors duration-300"></div>
                                      

                                        <Image
                                            src={chain.logo}
                                            alt={chain.label}
                                            width={40}   // ✅ REQUIRED
                                            height={40}  // ✅ REQUIRED
                                            className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-full relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                const placeholder = e.target.parentElement;
                                                if (placeholder && !placeholder.querySelector('.logo-placeholder')) {
                                                    const placeholderDiv = document.createElement('div');
                                                    placeholderDiv.className = 'logo-placeholder w-full h-full absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center text-white text-[10px] font-bold z-10';
                                                    placeholderDiv.textContent = chain.label.substring(0, 2).toUpperCase();
                                                    placeholder.appendChild(placeholderDiv);
                                                }
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-400 group-hover:text-white transition-colors whitespace-nowrap tracking-wide">
                                        {chain.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Glowing highlight trace underneath the container */}
                    <div className="absolute -bottom-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent blur-[1px]"></div>
                </m.div>

            </div>
        </section>
    );
}

export default ChainDisplay;