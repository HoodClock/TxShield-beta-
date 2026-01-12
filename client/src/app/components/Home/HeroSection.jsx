"use client"

import React from 'react'
import Link from "next/link";
import { motion } from "framer-motion";
import { MdArrowRightAlt } from "react-icons/md";
import LightPillar from '../backgrounds/LightPillar';

function HeroSection() {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ border: 'none', borderTop: 'none', marginTop: 0, paddingTop: 0 }}>
            {/* Light Pillar Background */}
            <div className="absolute inset-0 z-0">
                <LightPillar 
                    topColor="#5227FF"
                    bottomColor="#FF9FFC"
                    intensity={1.0}
                    rotationSpeed={0.3}
                    glowAmount={0.005}
                    pillarWidth={3.0}
                    pillarHeight={0.4}
                    noiseIntensity={0.5}
                    pillarRotation={0}
                    interactive={false}
                    mixBlendMode="normal"
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
                                    <motion.div 
                                        className="relative h-24 sm:h-28 md:h-32 w-auto flex items-center justify-center transition-all duration-300"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1 }}
                                    >
                                        <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full opacity-50"></div>
                                        <img
                                            src="/Images/logo.png"
                                            alt="Shield Logo"
                                            className="h-full w-auto object-contain relative z-10"
                                        />
                                    </motion.div>
                                </Link>
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 tracking-tight px-2">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6B3BFF] via-[#FF1493] to-[#FF69B4] animate-gradient-x">
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
