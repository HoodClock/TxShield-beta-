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
                                    className="flex items-center justify-center mb-6 sm:mb-8 pointer-events-auto"
                                    style={{ margin: '0 auto' }}
                                >
                                    <div className="relative h-24 sm:h-28 md:h-32 w-auto flex items-center justify-center transition-all duration-300">
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
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium group text-center relative overflow-hidden hero-primary-btn"
                    >
                        {/* Gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white"></div>
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        {/* Text */}
                        <span className="relative z-10 text-black flex items-center justify-center">
                            Start Protecting
                            <MdArrowRightAlt className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>

                    <Link
                        href="https://txshield.gitbook.io/txshield-docs/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-center relative overflow-hidden hero-secondary-btn group border border-white/30 hover:border-white/50 transition-all duration-300"
                    >
                        {/* Animated gradient border glow on hover */}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/50 via-cyan-500/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"></div>
                        {/* Text */}
                        <span className="relative z-10 text-white">
                            Learn More
                        </span>
                    </Link>
                </div>
            </motion.div>
        </section>
    )
}
export default HeroSection
