import React, { useEffect, useRef } from 'react'
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";

function AnalysisSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
    const timelineRef = useRef(null);

    useEffect(() => {
        if (isInView) {
            // Create master timeline
            timelineRef.current = gsap.timeline();
            
            // Animate connecting lines
            timelineRef.current.fromTo(".connection-line",
                { scaleX: 0, opacity: 0 },
                { scaleX: 1, opacity: 1, duration: 1.5, ease: "power3.out", stagger: 0.2 },
                0
            );

            // Animate scam cards with stagger
            timelineRef.current.fromTo(".scam-card",
                { opacity: 0, y: 60, scale: 0.8 },
                { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)", stagger: 0.15 },
                0.5
            );

            // Animate background elements
            timelineRef.current.fromTo(".floating-icon",
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power2.out" },
                0.3
            );

            // Continuous floating animation for icons
            gsap.to(".floating-icon", {
                y: -10,
                duration: 2,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true,
                stagger: 0.2
            });

            // Pulse animation for active steps
            gsap.to(".step-pulse", {
                scale: 1.1,
                duration: 1.5,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true,
                stagger: 0.3
            });
        }
    }, [isInView]);

    const ScamJourney = ({ title, steps, color, isReversed = false }) => (
        <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-start gap-8 lg:gap-16 relative`}>
            {/* Title Section */}
            <motion.div
                initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex-1 lg:sticky lg:top-24"
            >
                <div className={`p-6 rounded-2xl border ${color.border} bg-gradient-to-br from-black to-gray-900 backdrop-blur-sm`}>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">{title}</h3>
                    <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${color.pulse} step-pulse`}></div>
                        <span className="text-gray-400 text-sm">{steps.length} step process</span>
                    </div>
                </div>
            </motion.div>

            {/* Steps Timeline */}
            <div className="flex-1 relative">
                {/* Vertical Connection Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-700 via-gray-500 to-gray-700 opacity-30 connection-line"></div>
                
                {steps.map((step, index) => (
                    <div key={index} className="relative mb-8 last:mb-0">
                        {/* Step Connector */}
                        <div className="absolute left-6 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-white z-10"></div>
                        
                        {/* Step Card */}
                        <motion.div
                            className="scam-card ml-12 p-6 rounded-xl border border-white/10 bg-gradient-to-br from-black to-gray-900 backdrop-blur-sm hover:border-white/20 transition-all duration-300 group hover:scale-105"
                            whileHover={{ y: -5 }}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${color.gradient} flex items-center justify-center text-white text-lg font-bold group-hover:scale-110 transition-transform duration-300 floating-icon`}>
                                    {step.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-sm text-gray-400">Step {index + 1}</span>
                                        <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                        <span className={`text-xs px-2 py-1 rounded-full ${color.badge} ${color.text}`}>
                                            {step.type}
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                            
                            {/* Hover Effect */}
                            <div className={`absolute inset-0 rounded-xl ${color.hover} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );

    const honeypotSteps = [
        {
            icon: "🪙",
            title: "Malicious Token Creation",
            description: "Deploy smart contract with hidden backdoors and withdrawal blockers disguised as legitimate code.",
            type: "Deployment"
        },
        {
            icon: "💧",
            title: "Fake Liquidity Pool",
            description: "Add minimal liquidity to create trading activity illusion while preventing large withdrawals.",
            type: "Setup"
        },
        {
            icon: "📢",
            title: "Social Engineering Push",
            description: "Coordinate fake influencers and bots to create artificial hype and FOMO around the token.",
            type: "Marketing"
        },
        {
            icon: "🕳️",
            title: "Deposit Trap Activation",
            description: "Allow deposits but block all withdrawal attempts through hidden contract logic.",
            type: "Execution"
        }
    ];

    const phishingSteps = [
        {
            icon: "🌐",
            title: "Clone Legitimate Platform",
            description: "Create perfect replicas of popular DEXs, wallets, or NFT markets with malicious modifications.",
            type: "Impersonation"
        },
        {
            icon: "🎣",
            title: "Urgent Action Bait",
            description: "Send fake security alerts, airdrop announcements, or limited-time offers to create urgency.",
            type: "Lure"
        },
        {
            icon: "🔑",
            title: "Credential Harvesting",
            description: "Capture wallet connections, private keys, or seed phrases through fake login portals.",
            type: "Theft"
        },
        {
            icon: "💸",
            title: "Instant Asset Drain",
            description: "Immediately transfer all accessible funds from compromised wallets to attacker addresses.",
            type: "Extraction"
        }
    ];

    const colors = {
        honeypot: {
            gradient: "bg-gradient-to-br from-red-500 to-orange-500",
            border: "border-red-500/30",
            badge: "bg-red-500/20",
            text: "text-red-300",
            hover: "bg-red-500",
            pulse: "bg-red-400"
        },
        phishing: {
            gradient: "bg-gradient-to-br from-blue-500 to-purple-500",
            border: "border-blue-500/30",
            badge: "bg-blue-500/20",
            text: "text-blue-300",
            hover: "bg-blue-500",
            pulse: "bg-blue-400"
        }
    };

    return (
        <section ref={sectionRef} className="relative py-20 px-4 sm:px-6 overflow-hidden bg-black">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-72 h-72 bg-red-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black to-black"></div>
            </div>

            {/* Binary Code Animation */}
            <div className="absolute inset-0 opacity-10 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent_50%,rgba(255,255,255,0.03)_50%)] bg-[length:50px_50px] animate-pulse"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 mb-6">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-300">ATTACK ANALYSIS</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
                            The Scammer
                        </span>
                        <br />
                        <span className="text-white">Playbook</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Understanding how attackers operate is the first step in building effective protection. 
                        Here's how modern crypto scams unfold.
                    </p>
                </motion.div>

                {/* Honeypot Journey */}
                <div className="mb-32">
                    <ScamJourney 
                        title="Honeypot Scam Strategy"
                        steps={honeypotSteps}
                        color={colors.honeypot}
                    />
                </div>

                {/* Phishing Journey */}
                <div className="mb-20">
                    <ScamJourney 
                        title="Phishing Attack Flow"
                        steps={phishingSteps}
                        color={colors.phishing}
                        isReversed={true}
                    />
                </div>

                {/* Final Outcome */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-black to-gray-900 backdrop-blur-sm relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-purple-500/5 to-blue-500/5 opacity-50"></div>
                    <div className="relative z-10">
                        <div className="text-6xl mb-4">💨</div>
                        <h3 className="text-2xl font-bold text-white mb-4">The Inevitable Outcome</h3>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
                            Both attack vectors lead to the same result: complete loss of funds. 
                            Attackers vanish with all assets, leaving victims with empty wallets and worthless tokens.
                        </p>
                        <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10">
                            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                            <span className="text-sm text-gray-300">Average loss per victim: $2,800+</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default AnalysisSection;