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

                {/* Dropdown playbook selector */}
                <div className="max-w-3xl mx-auto mb-8 sm:mb-10 px-4 sm:px-6">
                    <div className="relative">
                        <button
                            onClick={() => setOpen(!open)}
                            className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-3 rounded-xl bg-white/4 border border-white/6 backdrop-blur-sm fancy-gradient-border subtle"
                        >
                            <div className="text-left flex-1 min-w-0">
                                <div className="text-xs sm:text-sm text-gray-400">Select Playbook</div>
                                <div className="text-base sm:text-lg font-semibold text-white truncate">{selectedPlaybook.title}</div>
                            </div>
                            <div className="text-gray-400 flex-shrink-0">{open ? '▴' : '▾'}</div>
                        </button>

                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={open ? 'show' : 'hidden'}
                            variants={panelVariants}
                            className="absolute left-0 right-0 mt-3 z-20 fancy-dropdown"
                        >
                            <div className="fancy-inner rounded-xl bg-white/4 border border-white/6 backdrop-blur-sm shadow-md">
                                {playbooks.map(pb => (
                                    <button
                                        key={pb.id}
                                        onClick={() => { setSelected(pb.id); setOpen(false); }}
                                        className={`w-full text-left px-4 py-3 rounded-md mb-2 transition fancy-gradient-border subtle ${selected === pb.id ? 'bg-white/6 border-white/10' : 'hover:bg-white/5'}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm text-gray-300">{pb.title}</div>
                                            <div className="text-xs text-gray-400">{pb.id === 'honeypot' ? '4 step process' : '4 step process'}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Playbook details panel */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <motion.div
                        variants={panelVariants}
                        initial="show"
                        animate={isInView ? 'show' : 'hidden'}
                        className="rounded-2xl fancy-gradient-border subtle bg-white/4 border border-white/6 p-4 sm:p-6 backdrop-blur-sm mb-8"
                    >
                        <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-6">
                            <div className="flex-1 w-full">
                                <div className="text-xs sm:text-sm text-gray-400 mb-1">{selectedPlaybook.title}</div>
                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Overview</h3>
                                <p className="text-gray-400 mb-4 text-sm sm:text-base">A concise breakdown of the main stages. Expand the dropdown to switch playbooks.</p>

                                <div className="space-y-3 sm:space-y-4">
                                    {(selectedPlaybook.steps || []).map((step, i) => (
                                        <div key={i} className="flex items-start gap-3 sm:gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="p-[2px] rounded-full bg-gradient-to-br from-purple-500 via-indigo-600 to-cyan-400" style={{ boxShadow: '0 8px 30px rgba(79,70,229,0.12)' }}>
                                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0B0B0B] flex items-center justify-center text-xs sm:text-sm font-semibold text-white">
                                                        {i + 1}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs sm:text-sm text-gray-300">Step {i + 1} • <span className="text-xs text-gray-500">{step.type}</span></div>
                                                <div className="text-white font-semibold text-base sm:text-lg mt-1">{step.title}</div>
                                                <div className="text-gray-400 text-xs sm:text-sm mt-1">{step.description}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full lg:w-36 mt-6 lg:mt-0">
                                <div className="rounded-xl bg-white/6 p-4 text-center">
                                    <div className="text-xs sm:text-sm text-gray-400">Estimated Impact</div>
                                    <div className="text-2xl sm:text-3xl font-bold text-white mt-2">$12.7M</div>
                                    <div className="text-xs text-gray-500 mt-1">reported cases • 3,200+</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-center p-4 sm:p-6 rounded-lg border border-white/10 bg-gradient-to-br from-black to-gray-900/50"
                    >
                        <h4 className="text-base sm:text-lg font-semibold text-white mb-2">The Inevitable Outcome</h4>
                        <p className="text-gray-400 text-sm sm:text-base">Both attack vectors lead to the same result: complete loss of funds. Attackers vanish with all assets.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default AnalysisSection;