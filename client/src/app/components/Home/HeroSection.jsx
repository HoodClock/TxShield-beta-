"use client"

import React, { Suspense } from 'react'
import Link from "next/link";
import { m } from "framer-motion";
import { MdArrowRightAlt } from "react-icons/md";
import dynamic from 'next/dynamic';
import ScrambleText from '../ScrambleText';
import HeroBackground from '../backgrounds/HeroBackground';

function HeroSection() {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black" style={{ border: 'none', borderTop: 'none', marginTop: 0, paddingTop: 0 }}>
            {/* High-Performance Crypto Background */}
            <HeroBackground className="z-0" />

            <m.div
                className="text-center px-4 sm:px-6 md:px-8 max-w-4xl mx-auto relative z-10 pt-8 sm:pt-12 md:pt-16"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ willChange: 'transform, opacity' }}
            >
                {/* Centered Logo above SHIELD */}
                <Link
                    href="/home"
                    className="flex items-center justify-center mb-0 sm:mb-2 pointer-events-auto"
                    style={{ margin: '0 auto' }}
                >
                    <m.div
                        className="relative h-16 sm:h-20 w-auto flex items-center justify-center transition-all duration-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="absolute inset-0 bg-cyan-500/10 rounded-full opacity-50 max-sm:hidden" style={{ filter: 'blur(48px)' }}></div>
                        <img
                            src="/Images/logo.png"
                            alt="Shield Logo"
                            className="h-full w-auto object-contain relative z-10"
                            loading="eager"
                            decoding="async"
                            width={128}
                            height={128}
                        />
                    </m.div>
                </Link>
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight px-2 flex flex-col items-center gap-1 sm:gap-2">
                    <span className="grad-word leading-none">
                        SHIELD
                    </span>
                    <span className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-5xl font-mono leading-tight">
                        <ScrambleText text="Every Transaction" duration={3000} loop={false} />
                    </span>
                </h1>

                <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl font-mono mx-auto px-4 mt-2">
                    <ScrambleText
                        text="Enterprise-grade security for your blockchain transactions. Protecting against scams, honeypots, and malicious contracts."
                        duration={4000}
                        delay={0.3}
                        loop={false}
                    />
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
                    <Link
                        href="/simulate"
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium group text-center relative overflow-hidden hero-primary-btn glitch-hover"
                    >
                        {/* Gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white"></div>
                        {/* Shimmer effect - hidden on mobile for performance */}
                        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
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
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-center relative overflow-hidden hero-secondary-btn group border border-white/30 hover:border-white/50 transition-all duration-300 glitch-hover"
                    >
                        {/* Animated gradient border glow on hover - hidden on mobile for performance */}
                        <div className="hidden sm:block absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/50 via-cyan-500/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" style={{ filter: 'blur(8px)' }}></div>
                        {/* Text */}
                        <span className="relative z-10 text-white">
                            Learn More
                        </span>
                    </Link>
                </div>
            </m.div>
        </section >
    )
}
export default HeroSection
