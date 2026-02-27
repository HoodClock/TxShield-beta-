import React, { useState, useRef } from 'react'
import { motion, useInView } from "framer-motion";

function AnalysisSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState('honeypot');

    const honeypotSteps = [
        {
            title: 'Malicious Token Creation',
            description: 'Deploy smart contract with hidden backdoors and withdrawal blockers disguised as legitimate code.',
            type: 'Deployment'
        },
        {
            title: 'Fake Liquidity Pool',
            description: 'Add minimal liquidity to create trading activity illusion while preventing large withdrawals.',
            type: 'Setup'
        },
        {
            title: 'Social Engineering Push',
            description: 'Coordinate fake influencers and bots to create artificial hype and FOMO around the token.',
            type: 'Marketing'
        },
        {
            title: 'Deposit Trap Activation',
            description: 'Allow deposits but block all withdrawal attempts through hidden contract logic.',
            type: 'Execution'
        }
    ];

    const phishingSteps = [
        {
            title: 'Clone Legitimate Platform',
            description: 'Create perfect replicas of popular DEXs, wallets, or NFT markets with malicious modifications.',
            type: 'Impersonation'
        },
        {
            title: 'Urgent Action Bait',
            description: "Send fake security alerts, airdrop announcements, or limited-time offers to create urgency.",
            type: 'Lure'
        },
        {
            title: 'Credential Harvesting',
            description: 'Capture wallet connections, private keys, or seed phrases through fake login portals.',
            type: 'Theft'
        },
        {
            title: 'Instant Asset Drain',
            description: 'Immediately transfer all accessible funds from compromised wallets to attacker addresses.',
            type: 'Extraction'
        }
    ];

    const playbooks = [
        { id: 'honeypot', title: 'Honeypot Scam Strategy', steps: honeypotSteps, color: 'red' },
        { id: 'phishing', title: 'Phishing Attack Flow', steps: phishingSteps, color: 'blue' }
    ];

    const selectedPlaybook = playbooks.find(p => p.id === selected) || playbooks[0];

    const panelVariants = {
        hidden: { height: 0, opacity: 0 },
        show: { height: 'auto', opacity: 1, transition: { duration: 0.35 } }
    }


    return (
        <section ref={sectionRef} className="relative py-16 px-4 sm:px-6 overflow-hidden bg-black">
            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-72 h-72 bg-red-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black to-black"></div>
            </div>

            {/* Binary Code Animation */}
            <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent_50%,rgba(255,255,255,0.03)_50%)] bg-[length:50px_50px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6"
                >
                    <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/5 border border-white/10 mb-4 sm:mb-6">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        <span className="text-xs sm:text-sm text-gray-300">ATTACK ANALYSIS</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                        <span className="text-white">The <span className="grad-word">Scammer</span></span>
                        <br />
                        <span className="text-white">Playbook</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        Understanding how attackers operate is the first step in building effective protection.
                        Here's how modern crypto scams unfold.
                    </p>
                </motion.div>

                {/* Tab Switcher */}
                <div className="flex justify-center mb-8 sm:mb-10 px-4">
                    <div className="bg-white/5 p-1 rounded-xl border border-white/10 flex items-center gap-1 backdrop-blur-sm">
                        {playbooks.map((pb) => (
                            <button
                                key={pb.id}
                                onClick={() => setSelected(pb.id)}
                                className={`relative px-6 py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${selected === pb.id
                                        ? "text-white shadow-lg"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {selected === pb.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className={`absolute inset-0 rounded-lg bg-gradient-to-r ${pb.id === 'honeypot'
                                                ? 'from-red-600/20 to-orange-600/20 border border-red-500/50'
                                                : 'from-blue-600/20 to-cyan-600/20 border border-blue-500/50'
                                            }`}
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    {pb.id === 'honeypot' ? (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                    )}
                                    {pb.title}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Playbook details panel */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                    <motion.div
                        variants={panelVariants}
                        initial="show"
                        animate={isInView ? 'show' : 'hidden'}
                        className="rounded-[2rem] bg-black/40 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 mb-8 hover:border-purple-500/30 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.2)] transition-all duration-500 overflow-hidden shadow-2xl relative"
                    >
                        {/* Subtly masked inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>

                        <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-10 relative z-10">
                            <div className="flex-1 w-full">
                                <div className="text-xs sm:text-sm text-gray-400 font-mono tracking-widest uppercase mb-2">{selectedPlaybook.title}</div>
                                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3 sm:mb-4">Overview</h3>
                                <p className="text-gray-400 mb-4 text-sm sm:text-base">A concise breakdown of the main stages. Switch between playbooks above to see different attack vectors.</p>

                                <div className="space-y-3 sm:space-y-4">
                                    {(selectedPlaybook.steps || []).map((step, i) => (
                                        <div key={i} className="flex items-start gap-3 sm:gap-4 group/step hover:bg-white/2 rounded-lg p-2 -m-2 transition-all duration-300">
                                            <div className="flex-shrink-0">
                                                <div className="p-[2px] rounded-full bg-gradient-to-br from-purple-500 via-indigo-600 to-cyan-400 group-hover/step:from-purple-400 group-hover/step:via-cyan-400 group-hover/step:to-purple-400 transition-all duration-300" style={{ boxShadow: '0 8px 30px rgba(79,70,229,0.12)' }}>
                                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0B0B0B] flex items-center justify-center text-xs sm:text-sm font-semibold text-white group-hover/step:scale-110 transition-transform duration-300">
                                                        {i + 1}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs sm:text-sm text-gray-300 group-hover/step:text-gray-200 transition-colors">Step {i + 1} • <span className="text-xs text-gray-500">{step.type}</span></div>
                                                <div className="text-white font-semibold text-base sm:text-lg mt-1 group-hover/step:text-cyan-200 transition-colors">{step.title}</div>
                                                <div className="text-gray-400 text-xs sm:text-sm mt-1 group-hover/step:text-gray-300 transition-colors">{step.description}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full lg:w-36 mt-6 lg:mt-0">
                                <div className="rounded-xl bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-purple-500/10 border border-purple-400/20 p-4 text-center hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                                    <div className="text-xs sm:text-sm text-gray-400">Estimated Loss</div>
                                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent mt-2">$12.7M</div>
                                    <div className="text-xs text-gray-500 mt-1">reported cases • 3,200+</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-center p-4 sm:p-6 rounded-lg border border-red-500/20 bg-gradient-to-br from-red-950/20 via-black to-red-950/20 relative overflow-hidden group"
                    >
                        {/* Animated background glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        {/* Subtle border glow */}
                        <div className="absolute inset-0 border border-red-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                        <div className="relative z-10">
                            <h4 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-red-200 transition-colors">The Inevitable Outcome</h4>
                            <p className="text-gray-400 text-sm sm:text-base group-hover:text-gray-300 transition-colors">Both attack vectors lead to the same result: complete loss of funds. Attackers vanish with all assets.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default AnalysisSection;