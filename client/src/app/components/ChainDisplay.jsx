import React, { useRef } from 'react'
import { motion, useInView } from "framer-motion";
import { TokenIcon } from '@web3icons/react';

function ChainSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    // List of chains to display as icons only
    const chains = [
        { id: 'eth', label: 'Ethereum', symbol: 'eth' },
        { id: 'bnb', label: 'BNB Smart Chain', symbol: 'bnb' },
        { id: 'avax', label: 'Avalanche', symbol: 'avax' },
        { id: 'matic', label: 'Polygon', symbol: 'matic' },
        { id: 'arb', label: 'Arbitrum', symbol: 'arb' },
        { id: 'op', label: 'Optimism', symbol: 'op' },
        { id: 'base', label: 'Base', symbol: 'base' },
        { id: 'linea', label: 'Linea', symbol: 'linea' },
        { id: 'mantle', label: 'Mantle', symbol: 'mantle' },
        { id: 'zke', label: 'zkSync Era', symbol: 'zke' },
        { id: 'scroll', label: 'Scroll', symbol: 'scroll' },
        { id: 'ftm', label: 'Fantom', symbol: 'ftm' },
        { id: 'celo', label: 'Celo', symbol: 'celo' },
        { id: 'aurora', label: 'Aurora', symbol: 'aurora' },
        { id: 'sol', label: 'Solana', symbol: 'sol' }
    ];

    return (
        <section ref={sectionRef} className="relative py-12 px-4 sm:px-6 overflow-hidden bg-black">
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-300">MULTI-CHAIN SUPPORT</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">Supported Blockchains</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">We support monitoring across the most widely used networks.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.05 }}
                    className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 items-center justify-center"
                >
                    {chains.map((c) => (
                        <div key={c.id} className="flex items-center justify-center">
                            <button
                                aria-label={c.label}
                                title={c.label}
                                className="w-14 h-14 rounded-full bg-white/4 border border-white/6 backdrop-blur-sm flex items-center justify-center hover:scale-105 transition-transform"
                            >
                                <TokenIcon symbol={c.symbol} variant="branded" size="28" />
                            </button>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default ChainSection;