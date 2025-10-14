import React, { useEffect, useRef } from 'react'
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { gsap } from "gsap";

function StatsSection() {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    useEffect(() => {
        if (isInView) {
            // Animate background elements
            gsap.to(".bg-glow-1", {
                duration: 2,
                x: 100,
                y: -50,
                ease: "power2.inOut",
                repeat: -1,
                yoyo: true
            });

            gsap.to(".bg-glow-2", {
                duration: 2.5,
                x: -80,
                y: 70,
                ease: "power2.inOut",
                repeat: -1,
                yoyo: true
            });

            // Stagger card animations
            gsap.fromTo(cardsRef.current,
                { opacity: 0, y: 80 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    stagger: 0.3,
                    ease: "power3.out"
                }
            );

            // Floating animation for stat numbers
            gsap.to(".stat-number", {
                y: -10,
                duration: 2,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true
            });
        }
    }, [isInView]);

    const addToRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <section ref={sectionRef} className="relative py-20 px-4 sm:px-6 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="bg-glow-1 absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="bg-glow-2 absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black to-black"></div>
            </div>

            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute inset-0 bg-[length:100px_100px] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] animate-pulse"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 mb-6">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-300">SECURITY ALERT</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
                            The Growing Threat
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        As DeFi adoption accelerates, sophisticated scams are evolving at an alarming rate. 
                        Stay protected with real-time threat detection.
                    </p>
                </motion.div>

                {/* 2023 Stats */}
                <div ref={addToRefs} className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 mb-20">
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-block px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-sm mb-4">
                            2023 BREAKOUT
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white leading-tight">
                            Honeypot Scams <br className="hidden sm:block" />
                            <span className="text-gray-400">Emerged</span>
                        </h2>
                        <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-400 mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span>3,200+ Cases</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                <span>$12.7M Lost</span>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm max-w-md">
                            Sophisticated contracts that appeared legitimate but blocked withdrawals, 
                            trapping funds permanently through hidden malicious code.
                        </p>
                    </div>

                    <div className="flex-1 relative group">
                        <div className="relative p-8 rounded-2xl overflow-hidden border border-red-500/20 bg-gradient-to-br from-black to-red-900/10 backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.1),transparent_50%)]"></div>
                            
                            <div className="relative z-10 text-center">
                                <div className="stat-number text-6xl sm:text-7xl font-bold mb-2 text-white">
                                    $<CountUp end={12.7} decimals={1} duration={2.5} />
                                    <span className="text-2xl text-gray-400 ml-1">M</span>
                                </div>
                                <div className="text-gray-400 text-lg mb-4">Total Losses</div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
                                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-red-300">3,200+ reported cases</span>
                                </div>
                            </div>

                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </div>
                </div>

                {/* 2024 Stats */}
                <div ref={addToRefs} className="flex flex-col lg:flex-row-reverse items-center gap-8 sm:gap-12 mb-20">
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-4">
                            2024 ESCALATION
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white leading-tight">
                            Advanced Threats <br className="hidden sm:block" />
                            <span className="text-gray-400">Multiplied</span>
                        </h2>
                        <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-400 mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span>5,800+ Cases</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                <span>$23.4M Lost</span>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm max-w-md">
                            Attackers refined techniques with "soft honeypots" allowing partial withdrawals 
                            to appear legitimate before locking all funds.
                        </p>
                    </div>

                    <div className="flex-1 relative group">
                        <div className="relative p-8 rounded-2xl overflow-hidden border border-purple-500/20 bg-gradient-to-br from-black to-purple-900/10 backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(168,85,247,0.1),transparent_50%)]"></div>
                            
                            <div className="relative z-10 text-center">
                                <div className="stat-number text-6xl sm:text-7xl font-bold mb-2 text-white">
                                    $<CountUp end={23.4} decimals={1} duration={2.5} />
                                    <span className="text-2xl text-gray-400 ml-1">M</span>
                                </div>
                                <div className="text-gray-400 text-lg mb-4">Total Losses</div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-purple-300">5,800+ reported cases</span>
                                </div>
                            </div>

                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </div>
                </div>

                {/* Current Stats */}
                <div ref={addToRefs} className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 mb-20">
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-block px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-sm mb-4">
                            CURRENT THREAT
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white leading-tight">
                            Revert Transactions <br className="hidden sm:block" />
                            <span className="text-gray-400">Silent Drain</span>
                        </h2>
                        <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-400 mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span>Ongoing Attacks</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                <span>$8.2M Annual</span>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm max-w-md">
                            Contracts that appear to execute normally but silently revert after taking fees, 
                            gradually draining wallets without obvious signs.
                        </p>
                    </div>

                    <div className="flex-1 relative group">
                        <div className="relative p-8 rounded-2xl overflow-hidden border border-orange-500/20 bg-gradient-to-br from-black to-orange-900/10 backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(249,115,22,0.1),transparent_50%)]"></div>
                            
                            <div className="relative z-10 text-center">
                                <div className="stat-number text-6xl sm:text-7xl font-bold mb-2 text-white">
                                    $<CountUp end={8.2} decimals={1} duration={2.5} />
                                    <span className="text-2xl text-gray-400 ml-1">M</span>
                                </div>
                                <div className="text-gray-400 text-lg mb-4">Annual Losses</div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-orange-300">Active threat ongoing</span>
                                </div>
                            </div>

                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <motion.div
                    ref={addToRefs}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mt-16 p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                    <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
                        Don't Become The Next Victim
                    </h3>
                    <p className="text-gray-400 mb-6 max-w-2xl mx-auto relative z-10">
                        Join the thousands of smart investors who trust TxShield to detect and prevent 
                        malicious transactions before they can cause harm.
                    </p>
                    <button className="px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 font-medium relative z-10 hover:scale-105 transform">
                        Start Protecting Now
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

export default StatsSection;