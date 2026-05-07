"use client";

import React from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import { SiEthereum, SiSolana, SiPolygon, SiBinance } from 'react-icons/si';

const chains = [
    { name: 'ETHEREUM', icon: <SiEthereum className="text-cyan-400 w-4 h-4" /> },
    { name: 'SOLANA', icon: <SiSolana className="text-purple-400 w-4 h-4" /> },
    { name: 'BASE', icon: <Image src="/Images/logos/base.svg" width={16} height={16} alt="Base" /> },
    { name: 'BINANCE', icon: <SiBinance className="text-yellow-400 w-4 h-4" /> },
    { name: 'POLYGON', icon: <SiPolygon className="text-purple-500 w-4 h-4" /> },
    { name: 'SCROLL', icon: <Image src="/Images/logos/scroll.svg" width={16} height={16} alt="Scroll" className="dark:invert opacity-80" /> },
    { name: 'MANTLE', icon: <Image src="/Images/logos/mantle.svg" width={16} height={16} alt="Mantle" /> },
    { name: 'LINEA', icon: <Image src="/Images/logos/linea.svg" width={16} height={16} alt="Linea" /> },
];

export default function ChainTicker() {
    // Duplicate the chains array enough times to create a seamless infinite loop
    const tickerItems = [...chains, ...chains, ...chains, ...chains];

    return (
        <div className="absolute bottom-[72px] sm:bottom-[80px] left-0 w-full overflow-hidden border-t border-border/5 bg-background/40 backdrop-blur-md py-3 z-10 flex transition-colors duration-700">
            {/* Absolute fades on edges to make it look seamless */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none"></div>

            <m.div 
                className="flex w-[200%] sm:w-[150%] md:w-[100%]"
                animate={{ x: [0, "-50%"] }}
                transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            >
                {tickerItems.map((chain, index) => (
                    <div key={index} className="flex items-center gap-3 px-6 sm:px-8 shrink-0">
                        <span className="text-muted-foreground font-mono text-[10px] tracking-[0.2em] hidden sm:block">PROTECTING</span>
                        <div className="flex items-center gap-2">
                            {chain.icon}
                            <span className="text-foreground font-mono text-[10px] sm:text-xs tracking-[0.2em] font-bold">{chain.name}</span>
                        </div>
                        <span className="text-cyan-500/30 ml-2 sm:ml-4 font-mono text-[10px]">///</span>
                    </div>
                ))}
            </m.div>
        </div>
    );
}
