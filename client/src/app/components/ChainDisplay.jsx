import React, { useEffect, useRef } from 'react'
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { TokenIcon } from '@web3icons/react';
import OurSolutionTxShield from './OurSolutionTxShield';

function ChainSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);

    useEffect(() => {
        if (isInView && row1Ref.current && row2Ref.current) {
            // Clear any existing animations
            gsap.killTweensOf([row1Ref.current, row2Ref.current]);

            // Animate first row moving from right to left
            gsap.fromTo(row1Ref.current,
                { x: '100%' },
                { 
                    x: '-100%', 
                    duration: 20, 
                    ease: "none",
                    repeat: -1 
                }
            );

            // Animate second row moving from left to right
            gsap.fromTo(row2Ref.current,
                { x: '-100%' },
                { 
                    x: '100%', 
                    duration: 18, 
                    ease: "none",
                    repeat: -1 
                }
            );
        }
    }, [isInView]);

    const chainsRow1 = [
        { name: "Ethereum", symbol: "eth", color: "from-gray-600 to-gray-800" },
        { name: "BNB Chain", symbol: "bnb", color: "from-yellow-500 to-yellow-700" },
        { name: "Polygon", symbol: "matic", color: "from-purple-500 to-purple-700" },
        { name: "Arbitrum", symbol: "arb", color: "from-blue-400 to-blue-600" },
        { name: "Optimism", symbol: "op", color: "from-red-400 to-red-600" }
    ];

    const chainsRow2 = [
        { name: "Avalanche", symbol: "avax", color: "from-red-500 to-orange-600" },
        { name: "Fantom", symbol: "ftm", color: "from-cyan-500 to-blue-500" },
        { name: "Solana", symbol: "sol", color: "from-purple-400 to-pink-500" },
        { name: "Celo", symbol: "celo", color: "from-green-400 to-green-600" }
    ];

    const ChainRow = ({ chains, rowRef, className = "" }) => (
        <div ref={rowRef} className={`flex space-x-6 ${className} absolute left-0 right-0`}>
            {chains.map((chain, index) => (
                <motion.div
                    key={chain.name}
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${chain.color} border border-white/20 backdrop-blur-sm min-w-[100px] text-center`}>
                        <div className="text-white mb-2 flex justify-center">
                            <TokenIcon symbol={chain.symbol} variant="branded" size="32" />
                        </div>
                        <div className="text-white font-semibold text-xs">{chain.name}</div>
                    </div>
                </motion.div>
            ))}
            {/* Duplicate for seamless loop */}
            {chains.map((chain, index) => (
                <motion.div
                    key={`${chain.name}-dup`}
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${chain.color} border border-white/20 backdrop-blur-sm min-w-[100px] text-center`}>
                        <div className="text-white mb-2 flex justify-center">
                            <TokenIcon symbol={chain.symbol} variant="branded" size="32" />
                        </div>
                        <div className="text-white font-semibold text-xs">{chain.name}</div>
                    </div>
                </motion.div>
            ))}
        </div>
    );

    return (
        <section ref={sectionRef} className="relative py-20 px-4 sm:px-6 overflow-hidden bg-black">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-purple-500/5 to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Chains Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-32"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 mb-6">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-300">MULTI-CHAIN SUPPORT</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
                            Supported
                        </span>
                        <br />
                        <span className="text-white">Blockchains</span>
                    </h1>
                    
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-16">
                        TxShield provides comprehensive security across all major blockchain networks, 
                        ensuring your assets are protected wherever you transact.
                    </p>

                    {/* Animated Chains Rows */}
                    <div className="relative h-48 overflow-hidden">
                        {/* First Row - Right to Left */}
                        <div className="mb-8 relative h-24">
                            <ChainRow 
                                chains={chainsRow1} 
                                rowRef={row1Ref}
                            />
                        </div>

                        {/* Second Row - Left to Right */}
                        <div className="relative h-24">
                            <ChainRow 
                                chains={chainsRow2} 
                                rowRef={row2Ref}
                            />
                        </div>

                        {/* Gradient Overlays for Smooth Edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>
                    </div>
                </motion.div>

                {/* Our Solution Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                  <OurSolutionTxShield />
                </motion.div>
            </div>
        </section>
    );
}

export default ChainSection;