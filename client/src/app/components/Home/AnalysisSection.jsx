import React, { useState, useRef } from 'react'
import { m, useInView, AnimatePresence } from "framer-motion";

function AnalysisSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
    const [selected, setSelected] = useState('honeypot');
    const [activeStep, setActiveStep] = useState(0);

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

    const terminalOutputs = {
        honeypot: [
            "> Initializing deployment sequence...\n> Injecting obfuscated bytecode...\n> STATUS: Payload masked",
            "> Creating liquidity pool pair...\n> Calling addLiquidityETH...\n> STATUS: Trading active",
            "> Initializing targeted social campaigns...\n> Sentiment manipulation active...\n> STATUS: Hype generating",
            "> Executing restrictTransfers()...\n> Reverting all external sell txns...\n> STATUS: Trapped"
        ],
        phishing: [
            "> Cloning target repository UI...\n> Modifying Web3Provider connectors...\n> STATUS: Replica deployed",
            "> Expanding distribution channels...\n> Dispatching automated airdrop alerts...\n> STATUS: Hooks set",
            "> Intercepting wallet approval prompt...\n> Emulating signMessage payload...\n> STATUS: Permissions logged",
            "> Broadcasting sweep transaction batch...\n> Bypassing multi-sig delays...\n> STATUS: Funds extracted"
        ]
    };

    const playbooks = [
        { id: 'honeypot', title: 'Honeypot Scam Strategy', steps: honeypotSteps },
        { id: 'phishing', title: 'Phishing Attack Flow', steps: phishingSteps }
    ];

    const selectedPlaybook = playbooks.find(p => p.id === selected) || playbooks[0];

    const handlePlaybookChange = (id) => {
        setSelected(id);
        setActiveStep(0);
    };

    const themeClasses = {
        honeypot: {
            bg: 'bg-red-500/10',
            border: 'border-red-500/20',
            text: 'text-red-400',
            line: 'from-red-500/20 to-red-500/0',
            activeRing: 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]',
            activeDot: 'bg-red-500',
            glow: 'from-red-600/20 to-orange-600/20 border-red-500/50'
        },
        phishing: {
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
            text: 'text-blue-400',
            line: 'from-blue-500/20 to-blue-500/0',
            activeRing: 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]',
            activeDot: 'bg-blue-500',
            glow: 'from-blue-600/20 to-cyan-600/20 border-blue-500/50'
        }
    };
    const theme = themeClasses[selectedPlaybook.id];

    return (
        <section ref={sectionRef} className="relative py-10 px-4 sm:px-6 overflow-hidden bg-black">
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

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <m.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 px-4 sm:px-6"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.8)]"></div>
                        <span className="text-xs text-gray-300 font-semibold tracking-wider">ATTACK ANALYSIS</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 tracking-tight">
                        <span className="text-white drop-shadow-md">The <span className="grad-word">Scammer</span> Playbook</span>
                    </h2>
                    <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto tracking-wide">
                        Understanding how attackers operate is the first step in building effective protection.
                    </p>
                </m.div>

                {/* Tab Switcher */}
                <div className="flex justify-center mb-8 px-4">
                    <div className="bg-white/5 p-1 rounded-xl border border-white/10 flex items-center gap-1 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_10px_30px_-10px_rgba(0,0,0,0.5)]">
                        {playbooks.map((pb) => (
                            <button
                                key={pb.id}
                                onClick={() => handlePlaybookChange(pb.id)}
                                className={`relative px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 glitch-hover ${selected === pb.id
                                    ? "text-white shadow-lg"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {selected === pb.id && (
                                    <m.div
                                        layoutId="activeTab"
                                        className={`absolute inset-0 rounded-lg bg-gradient-to-r ${themeClasses[pb.id].glow}`}
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

                {/* Playbook Interactive Pipeline Container */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 transition-all duration-500">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="rounded-3xl bg-[#0a0a0a] backdrop-blur-2xl border border-white/5 p-6 sm:p-8 shadow-[0_30px_60px_-12px_rgba(0,0,0,1)] relative overflow-hidden"
                    >
                        {/* Subtly masked inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>

                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10 w-full mb-8">

                            {/* Left Col: Interactive Timeline */}
                            <div className="w-full lg:w-1/3 relative">
                                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-6 border-b border-white/10 pb-3">Attack Sequence</h3>

                                <div className="relative">
                                    {/* Vertical tracking line */}
                                    <div className={`absolute left-4 top-2 bottom-6 w-[2px] bg-gradient-to-b ${theme.line} transition-colors duration-500`}></div>

                                    <div className="space-y-4 relative z-10">
                                        {(selectedPlaybook.steps || []).map((step, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveStep(i)}
                                                className="relative flex items-center gap-4 w-full text-left group cursor-pointer"
                                            >
                                                <div className="relative shrink-0">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-[2px] transition-all duration-300 relative bg-[#0a0a0a] z-10 ${activeStep === i ? theme.activeRing : 'border-white/10 group-hover:border-white/30'}`}>
                                                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeStep === i ? theme.activeDot : 'bg-transparent group-hover:bg-white/20'}`}></div>
                                                    </div>
                                                </div>

                                                <div className="flex-1">
                                                    <div className={`text-[10px] font-mono tracking-wider transition-colors duration-300 font-bold uppercase mb-0.5 ${activeStep === i ? theme.text : 'text-gray-500 group-hover:text-gray-400'}`}>
                                                        Phase 0{i + 1}
                                                    </div>
                                                    <div className={`text-sm font-bold transition-colors duration-300 tracking-tight leading-tight ${activeStep === i ? 'text-white drop-shadow-md' : 'text-gray-400 group-hover:text-gray-200'}`}>
                                                        {step.title}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Col: Active Step Details & Terminal */}
                            <div className="w-full lg:w-2/3 flex flex-col justify-start">
                                <div className="w-full min-h-[280px] relative">
                                    <AnimatePresence mode="wait">
                                        <m.div
                                            key={`${selected}-${activeStep}`}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                            className="h-full flex flex-col justify-start bg-[#111] border border-white/5 rounded-2xl p-5 lg:p-6 relative overflow-hidden shadow-inner"
                                        >
                                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                                            <div className="flex items-center justify-between mb-4">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.bg} border ${theme.border} ${theme.text} text-[10px] font-mono font-bold uppercase tracking-widest shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]`}>
                                                    System Process: {selectedPlaybook.steps[activeStep].type}
                                                </div>
                                            </div>

                                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight tracking-tight drop-shadow-sm">
                                                {selectedPlaybook.steps[activeStep].title}
                                            </h3>

                                            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                                                {selectedPlaybook.steps[activeStep].description}
                                            </p>

                                            {/* Simulated Terminal Readout */}
                                            <div className="mt-auto w-full bg-[#050505] border border-white/5 rounded-xl p-4 font-mono text-xs sm:text-sm text-gray-500 overflow-hidden relative shadow-[inset_0_10px_30px_-10px_rgba(0,0,0,1)]">
                                                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${theme.line} opacity-50`}></div>
                                                <div className="flex items-center gap-2 opacity-50 mb-2 border-b border-white/5 pb-2">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                                                    <span className="text-[9px] uppercase tracking-widest ml-2">Terminal Access_</span>
                                                </div>
                                                <pre className="whitespace-pre-wrap pl-3 leading-relaxed font-bold text-gray-400">
                                                    {terminalOutputs[selected][activeStep].split('\n').map((line, idx) => (
                                                        <div key={idx} className="flex gap-2">
                                                            <span className="text-gray-700 opacity-50">~%</span>
                                                            <span className={line.includes('STATUS:') ? theme.text : ''}>{line.replace('> ', '')}</span>
                                                        </div>
                                                    ))}
                                                </pre>
                                            </div>
                                        </m.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Threat Level Radar Module */}
                        <div className="w-full rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-950/20 via-black to-red-950/20 p-5 sm:p-6 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 group hover:border-red-500/40 transition-colors duration-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_10px_30px_-10px_rgba(239,68,68,0.1)] mt-auto">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[40px] rounded-full animate-pulse group-hover:opacity-100 opacity-50 transition-opacity translate-x-1/4 -translate-y-1/4"></div>

                            <div className="relative z-10 w-full sm:w-auto text-center sm:text-left flex-1 border-r-0 sm:border-r border-white/10 pr-0 sm:pr-8">
                                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                                    <div className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]"></span>
                                    </div>
                                    <div className="text-[10px] sm:text-xs font-mono text-red-500 tracking-widest uppercase font-bold drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">Alert: Threat Recognized</div>
                                </div>
                                <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-red-100 transition-colors tracking-tight">The Inevitable Outcome</h4>
                                <p className="text-gray-400 text-xs sm:text-sm mt-1 leading-relaxed font-medium">Both vectors rely on deception to force irreversible transactions. Attackers vanish with capital instantly.</p>
                            </div>

                            <div className="relative z-10 text-center sm:text-right w-full sm:w-auto pt-4 sm:pt-0 pl-0 sm:pl-8 shrink-0">
                                <div className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Estimated Capital Loss</div>
                                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-white via-red-200 to-white bg-clip-text text-transparent font-mono tracking-tighter drop-shadow-md">$12.7M</div>
                                <div className="text-xs font-bold text-red-500/80 uppercase font-mono tracking-widest drop-shadow-[0_2px_4px_rgba(239,68,68,0.3)] mt-1">3,200+ Cases</div>
                            </div>
                        </div>

                    </m.div>
                </div>
            </div>
        </section>
    );
}

export default AnalysisSection;