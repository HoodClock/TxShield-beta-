"use client"

import React from 'react'
import Link from "next/link";
import { motion } from "framer-motion";
import { MdArrowRightAlt } from "react-icons/md";
import DarkVeil from '../backgrounds/DarkVeil';

function HeroSection() {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ border: 'none', borderTop: 'none', marginTop: 0, paddingTop: 0 }}>
            {/* Dark Veil Background */}
            <div className="absolute inset-0 z-0">
                <DarkVeil 
                    hueShift={0}
                    noiseIntensity={0.02}
                    scanlineIntensity={0}
                    speed={0.5}
                    scanlineFrequency={0}
                    warpAmount={0.3}
                />
            </div>

            <motion.div
                className="text-center px-4 sm:px-6 md:px-8 max-w-4xl mx-auto relative z-10 pt-8 sm:pt-12 md:pt-16"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                {/* Centered Logo above SHIELD */}
                <Link 
                    href="/home" 
                    className="flex items-center justify-center mb-6 sm:mb-8 group pointer-events-auto"
                    style={{ margin: '0 auto' }}
                >
                    <div className="relative h-16 sm:h-20 md:h-24 w-auto flex items-center justify-center transition-all duration-300 group-hover:scale-110 animate-logo-float">
                        <img 
                            src="/Images/logo.png"
                            alt="Shield Logo"
                            className="h-full w-auto object-contain"
                        />
                    </div>
                </Link>

                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 tracking-tight px-2">
                    <span className="bg-clip-text text-transparent grad-word ">
                        SHIELD
                    </span>
                    <br />
                    <span className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-mono">
                        Every Transaction
                    </span>
                </h1>

                <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl font-mono mx-auto px-4">
                    Enterprise-grade security for your blockchain transactions.
                    Protecting against scams, honeypots, and malicious contracts.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
                    <Link
                        href="/simulate"
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 font-medium group text-center"
                    >
                        Start Protecting
                        <MdArrowRightAlt className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        href="https://txshield.gitbook.io/txshield-docs/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-white/30 rounded-lg hover:bg-white/10 transition-all duration-300 font-medium text-center"
                    >
                        Learn More
                    </Link>
                </div>
            </motion.div>
        </section>
    )
}
export default HeroSection
