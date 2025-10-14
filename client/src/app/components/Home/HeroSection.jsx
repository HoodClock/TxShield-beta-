import React from 'react'
import Link from "next/link";
import { motion } from "framer-motion";
import { MdArrowRightAlt } from "react-icons/md";

function HeroSection() {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0A0A0A] to-black"></div>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-white/3 blur-3xl"></div>

            <motion.div
                className="text-center px-4 max-w-4xl mx-auto relative z-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        SHIELD
                    </span>
                    <br />
                    <span className="text-white text-4xl md:text-6xl lg:text-7xl font-mono">
                        Every Transaction
                    </span>
                </h1>

                <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl font-mono mx-auto">
                    Enterprise-grade security for your blockchain transactions.
                    Protecting against scams, honeypots, and malicious contracts.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/simulate"
                        className="px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 font-medium group"
                    >
                        Start Protecting
                        <MdArrowRightAlt className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <button className="px-8 py-4 border border-white/30 rounded-lg hover:bg-white/10 transition-all duration-300 font-medium">
                        Learn More
                    </button>
                </div>
            </motion.div>
        </section>
    )
}
export default HeroSection
