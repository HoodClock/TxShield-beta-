import React, { useState, useRef } from 'react'
import { m, useInView, AnimatePresence } from "framer-motion";
import ScrambleText from "../ScrambleText";

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

    const getThemeClasses = (id, isSelected) => {
        if (id === 'honeypot') {
            return {
                border: isSelected ? 'border-cyan-500/50' : 'border-border hover:border-cyan-500/30',
                bgGlow: isSelected ? 'from-cyan-500/10 to-transparent' : 'group-hover:from-cyan-500/5 group-hover:to-transparent',
                accentBar: isSelected ? 'bg-cyan-400' : 'bg-transparent group-hover:bg-cyan-400/50',
                title: isSelected ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground',
                subtitle: isSelected ? 'text-cyan-500/80' : 'text-muted-foreground/60 group-hover:text-cyan-500/80',
                arrow: isSelected ? 'text-cyan-400 translate-x-1' : 'text-muted-foreground group-hover:text-cyan-400 group-hover:translate-x-1',
                // Internal theme
                text: 'text-cyan-400',
                line: 'from-cyan-500/20 to-cyan-500/0',
                activeRing: 'border-cyan-500 shadow-lg shadow-cyan-500/20',
                activeDot: 'bg-cyan-500',
            };
        } else {
            return {
                border: isSelected ? 'border-purple-500/50' : 'border-border hover:border-purple-500/30',
                bgGlow: isSelected ? 'from-purple-500/10 to-transparent' : 'group-hover:from-purple-500/5 group-hover:to-transparent',
                accentBar: isSelected ? 'bg-purple-400' : 'bg-transparent group-hover:bg-purple-400/50',
                title: isSelected ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground',
                subtitle: isSelected ? 'text-purple-500/80' : 'text-muted-foreground/60 group-hover:text-purple-500/80',
                arrow: isSelected ? 'text-purple-400 translate-x-1' : 'text-muted-foreground group-hover:text-purple-400 group-hover:translate-x-1',
                // Internal theme
                text: 'text-purple-400',
                line: 'from-purple-500/20 to-purple-500/0',
                activeRing: 'border-purple-500 shadow-lg shadow-purple-500/20',
                activeDot: 'bg-purple-500',
            };
        }
    };

    const theme = getThemeClasses(selectedPlaybook.id, true);

    return (
        <section ref={sectionRef} className="relative w-full h-full bg-background overflow-hidden flex flex-col justify-center transition-colors duration-700">
            {/* Ambient Background (Simulate Hero Vibe) */}
            <div className="absolute inset-0 z-0 opacity-40 dark:opacity-100 transition-opacity duration-700">
                <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-blue-500/5 dark:bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-purple-500/5 dark:bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10 flex flex-col h-full w-full py-6">
                
                {/* Sleek Header & Tab Selectors */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-6 px-4 sm:px-6 shrink-0 gap-6 w-full">
                    
                    {/* Massive Typography Header */}
                    <m.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="flex flex-col cursor-default select-none"
                    >
                        <h1 
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.1em] leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-2xl"
                            style={{ fontFamily: "var(--font-clash)" }}
                        >
                            PLAYBOOK
                        </h1>
                        <div className="mt-2 flex items-center gap-4 text-[9px] sm:text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground">
                            <ScrambleText text="Attack Vector Analysis" duration={2500} />
                            <span className="w-8 md:w-16 h-px bg-gradient-to-l from-transparent to-border"></span>
                        </div>
                    </m.div>

                    {/* Minimalist Chain Selectors (Tabs) */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center shrink-0 w-full sm:w-auto">
                        {playbooks.map((pb) => {
                            const isSelected = selected === pb.id;
                            const classes = getThemeClasses(pb.id, isSelected);
                            return (
                                <m.button
                                    key={pb.id}
                                    onClick={() => handlePlaybookChange(pb.id)}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`group relative w-full sm:w-48 h-12 overflow-hidden bg-card border ${classes.border} rounded-none transition-all duration-500 flex items-center px-3`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent ${classes.bgGlow} transition-all duration-500 pointer-events-none`}></div>
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${classes.accentBar} transition-all duration-300`}></div>
                                    
                                    <div className="relative z-10 flex items-center justify-between w-full">
                                        <div className="flex flex-col items-start text-left">
                                            <span className={`text-xs md:text-sm font-light tracking-widest transition-colors duration-300 ${classes.title}`}>{pb.title.split(' ')[0].toUpperCase()}</span>
                                            <span className={`text-[7px] font-mono uppercase tracking-[0.2em] transition-colors duration-300 ${classes.subtitle}`}>{pb.id === 'honeypot' ? 'Contract Trap' : 'Social Eng.'}</span>
                                        </div>
                                        <span className={`font-mono text-xs transition-all duration-300 ${classes.arrow}`}>→</span>
                                    </div>
                                </m.button>
                            );
                        })}
                    </div>
                </div>

                {/* Playbook Interactive Pipeline Container */}
                <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 relative z-10 transition-all duration-500 flex-1 min-h-0 flex flex-col pb-2">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-transparent relative overflow-hidden flex flex-col justify-between flex-1 min-h-0"
                    >
                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 relative z-10 w-full h-full pt-2">

                            {/* Left Col: Interactive Timeline & Alert */}
                            <div className="w-full lg:w-1/3 relative flex flex-col justify-between shrink-0">
                                <div>
                                    <h3 className="text-xs font-mono tracking-widest uppercase text-muted-foreground mb-4 pb-2 border-b border-border">Execution Sequence</h3>

                                    <div className="relative">
                                        {/* Vertical tracking line */}
                                        <div className={`absolute left-2.5 top-2 bottom-6 w-[1px] bg-gradient-to-b ${theme.line} transition-colors duration-500`}></div>

                                        <div className="space-y-4 relative z-10">
                                            {(selectedPlaybook.steps || []).map((step, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setActiveStep(i)}
                                                    className="relative flex items-center gap-4 w-full text-left group cursor-pointer"
                                                >
                                                    <div className="relative shrink-0">
                                                        <div className={`w-5 h-5 flex items-center justify-center border transition-all duration-300 relative bg-background z-10 rounded-none ${activeStep === i ? theme.activeRing : 'border-border group-hover:border-primary/50'}`}>
                                                            <div className={`w-1.5 h-1.5 transition-all duration-300 rounded-none ${activeStep === i ? theme.activeDot : 'bg-transparent group-hover:bg-foreground/20'}`}></div>
                                                        </div>
                                                    </div>

                                                    <div className="flex-1">
                                                        <div className={`text-[8px] font-mono tracking-[0.2em] transition-colors duration-300 uppercase ${activeStep === i ? theme.text : 'text-muted-foreground group-hover:text-foreground/60'}`}>
                                                            Phase 0{i + 1}
                                                        </div>
                                                        <div className={`text-xs font-light transition-colors duration-300 tracking-wide mt-0.5 ${activeStep === i ? 'text-foreground font-bold' : 'text-muted-foreground group-hover:text-foreground'}`}>
                                                            {step.title}
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Threat Level Radar Module (Sharp & Minimal) */}
                                <div className="mt-4 rounded-none border border-red-500/20 bg-card p-4 relative overflow-hidden flex flex-col gap-1.5 group hover:border-red-500/40 transition-all duration-500 shadow-lg">
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none"></div>
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 blur-[30px] rounded-full animate-pulse group-hover:opacity-100 opacity-50 transition-opacity translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
                                    
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="relative flex h-1.5 w-1.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-none h-1.5 w-1.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]"></span>
                                        </div>
                                        <div className="text-[9px] sm:text-[10px] font-mono text-red-500 tracking-widest uppercase font-bold drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">Alert: Threat Recognized</div>
                                    </div>
                                    
                                    <div className="text-xs sm:text-sm font-light text-foreground group-hover:text-red-600 transition-colors tracking-tight leading-tight">The Inevitable Outcome</div>
                                    <p className="text-muted-foreground text-[10px] font-mono leading-snug mb-1 uppercase tracking-wider">Deceptive vectors lead to instant capital extraction.</p>
                                    
                                    <div className="mt-2 pt-2 border-t border-border flex justify-between items-end relative z-10">
                                        <div>
                                            <div className="text-[8px] text-muted-foreground font-mono uppercase tracking-widest mb-0.5">Est. Capital Loss</div>
                                            <div className="text-xl font-light text-foreground font-mono tracking-tighter leading-none">$12.7M</div>
                                        </div>
                                        <div className="text-[9px] text-red-500/80 uppercase font-mono tracking-widest">3,200+ Cases</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Col: Active Step Details & Terminal */}
                            <div className="w-full lg:w-2/3 flex flex-col justify-start h-full">
                                <div className="w-full h-full relative flex-1 min-h-0">
                                    <AnimatePresence mode="wait">
                                        <m.div
                                            key={`${selected}-${activeStep}`}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                            className="h-full flex flex-col justify-start bg-card border border-border rounded-none p-5 lg:p-6 relative overflow-hidden shadow-2xl transition-colors duration-700"
                                        >
                                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>

                                            <div className="flex items-center justify-between mb-4 shrink-0">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-none border border-border ${theme.text} text-[9px] font-mono uppercase tracking-widest bg-background/50`}>
                                                    Process: {selectedPlaybook.steps[activeStep].type}
                                                </div>
                                            </div>

                                            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 leading-tight tracking-wide shrink-0">
                                                {selectedPlaybook.steps[activeStep].title}
                                            </h3>

                                            <p className="text-muted-foreground text-xs sm:text-sm font-light leading-relaxed mb-6 shrink-0">
                                                {selectedPlaybook.steps[activeStep].description}
                                            </p>

                                            {/* Simulated Terminal Readout (Sharp Minimal) */}
                                            <div className="w-full bg-muted border border-border rounded-none p-5 font-mono text-[10px] sm:text-xs text-muted-foreground overflow-hidden relative flex-1 min-h-0 flex flex-col transition-colors duration-700">
                                                <div className={`absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b ${theme.line} opacity-50`}></div>
                                                <div className="flex items-center gap-2 opacity-50 mb-3 border-b border-border pb-2 shrink-0">
                                                    <div className="w-1.5 h-1.5 rounded-none bg-red-500/50"></div>
                                                    <div className="w-1.5 h-1.5 rounded-none bg-yellow-500/50"></div>
                                                    <div className="w-1.5 h-1.5 rounded-none bg-green-500/50"></div>
                                                    <span className="text-[8px] uppercase tracking-widest ml-2 text-foreground/40">Terminal_Access.exe</span>
                                                </div>
                                                <div className="overflow-y-auto overflow-x-hidden flex-1 scrollbar-hide">
                                                    <pre className="whitespace-pre-wrap pl-2 leading-relaxed font-light text-foreground">
                                                        {terminalOutputs[selected][activeStep].split('\n').map((line, idx) => (
                                                            <div key={idx} className="flex gap-3 mb-1">
                                                                <span className="text-muted-foreground/60 select-none">~%</span>
                                                                <span className={line.includes('STATUS:') ? theme.text : ''}>{line.replace('> ', '')}</span>
                                                            </div>
                                                        ))}
                                                    </pre>
                                                </div>
                                            </div>
                                        </m.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                    </m.div>
                </div>
            </div>
        </section>
    );
}

export default AnalysisSection;