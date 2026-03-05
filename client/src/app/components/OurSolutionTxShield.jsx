import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import {
  FaSearch,
  FaExclamationTriangle,
  FaClock,
  FaShieldAlt,
  FaUserSlash,
  FaBan,
  FaEye,
  FaGasPump,
  FaKey,
  FaPercentage,
  FaExchangeAlt,
  FaLock,
  FaCoins,
  FaSkull,
  FaLink,
  FaHandHoldingUsd,
  FaDatabase,
  FaChartLine,
  FaBrain,
  FaGlobe,
  FaRobot,
  FaTerminal
} from 'react-icons/fa';

// Reuse the existing data structure
const SECTIONS = [
  {
    key: 'honeypot',
    title: "Honeypot Detection",
    icon: <FaSearch className="text-2xl" />,
    shortDesc: "Advanced token trap detection",
    color: "from-purple-500 to-blue-500",
    shadow: "shadow-purple-500/50",
    items: [
      { title: "Blacklist Check", icon: <FaUserSlash />, description: "Checks token and address blacklists to flag known malicious actors and previously tagged scams." },
      { title: "Transfer Control", icon: <FaBan />, description: "Detects transfer restrictions and code paths that prevent withdrawals or transfers under certain conditions." },
      { title: "Fake Balance", icon: <FaEye />, description: "Identifies contracts that fake user balances or manipulate reporting to trick interfaces and users." },
      { title: "Gas Trap", icon: <FaGasPump />, description: "Finds deceptive gas-related logic that causes transactions to fail or generate excessive fees for victims." },
      { title: "Hidden Owner", icon: <FaKey />, description: "Detects hidden owner functions and privileged roles allowing stealthy control or fund extraction." },
      { title: "High Sell Tax", icon: <FaPercentage />, description: "Flags contracts with punitive sell taxes that block token exits for holders and create traps." },
      { title: "Buy/Sell Control", icon: <FaExchangeAlt />, description: "Analyzes trading controls that can block sells while allowing buys (honeypot patterns)." },
      { title: "Mint Access", icon: <FaCoins />, description: "Checks for arbitrary minting capabilities that could dilute value or enable rug pulls." },
      { title: "Trading Control", icon: <FaLock />, description: "Detects admin-controlled trading switches and circuit-breakers used maliciously." }
    ]
  },
  {
    key: 'phishing',
    title: "Phishing Protection",
    icon: <FaExclamationTriangle className="text-2xl" />,
    shortDesc: "Approval scam prevention",
    color: "from-red-500 to-orange-500",
    shadow: "shadow-red-500/50",
    items: [
      { title: "Approve Scam", icon: <FaKey />, description: "Detects malicious approval patterns and suspicious allowance flows that enable token draining." },
      { title: "Ether Forward", icon: <FaExchangeAlt />, description: "Finds contracts or links that forward incoming Ether/assets to attacker-controlled addresses." },
      { title: "Malicious Proxy", icon: <FaSkull />, description: "Identifies proxy contracts that reroute logic to malicious implementations or hidden backdoors." },
      { title: "Permit Scam", icon: <FaKey />, description: "Detects abusive or crafted permit flows that can be used to stealthily grant approvals." },
      { title: "Domain Link", icon: <FaLink />, description: "Flags suspicious domain links and phishing URLs commonly used in social-engineering attacks." }
    ]
  },
  {
    key: 'upcoming',
    title: "Coming Soon",
    icon: <FaClock className="text-2xl" />,
    shortDesc: "Future security enhancements",
    color: "from-cyan-500 to-blue-500",
    shadow: "shadow-cyan-500/50",
    items: [
      { title: "Address Poisoning", icon: <FaUserSlash />, description: "Detects attempts to poison analytics or reputation by injecting malicious addresses or tokens." },
      { title: "Rug Pull Analysis", icon: <FaHandHoldingUsd />, description: "Analyzes token/team patterns and liquidity risks that indicate potential rug pulls." },
      { title: "Approval Revocation", icon: <FaKey />, description: "Tools to help users revoke dangerous approvals and reduce long-term exposure." },
      { title: "Dusting Protection", icon: <FaDatabase />, description: "Identifies small-value dusting attacks used to deanonymize or track wallets." },
      { title: "Fake Token", icon: <FaSkull />, description: "Detects scam tokens that impersonate popular assets or misrepresent metadata." },
      { title: "Simulation Spoofing", icon: <FaShieldAlt />, description: "Prevents attackers from spoofing results from on-chain simulations to hide malicious behavior." },
      { title: "Front Running", icon: <FaChartLine />, description: "Identifies patterns and mempool behavior that enable front-running and sandwich attacks." },
      { title: "Risk Scoring", icon: <FaBrain />, description: "Aggregated risk scores combining static and dynamic signals for quick assessment." },
      { title: "Fee Manipulation", icon: <FaPercentage />, description: "Detects fee/tax manipulation schemes used to trap or heavily penalize trades." },
      { title: "Bridge Assessment", icon: <FaGlobe />, description: "Evaluates bridge contracts for insecurity and fund-exposure risks." },
      { title: "AI Detection", icon: <FaRobot />, description: "Leverages AI to detect novel scam patterns and anomalies in behavior." }
    ]
  }
];

// Glitch/Decode Text Component for the Terminal Display
const GlitchText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

  useEffect(() => {
    let iteration = 0;
    let interval = null;

    clearInterval(interval);

    interval = setInterval(() => {
      setDisplayText(prev =>
        text.split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * 42)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
}

function OurSolutionTxShield() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  // Active section data
  const activeSection = SECTIONS[activeIndex];

  const handleSectionClick = (index) => {
    setActiveIndex(index);
    setHoveredFeature(null); // Clear the display window when switching sectors
    // Unidirectional rotation logic (always decreasing angle)
    const targetBase = index * -120;
    let delta = (targetBase - rotation) % 360;
    if (delta > 0) delta -= 360;
    if (delta === 0 && index !== activeIndex) delta = -360;
    setRotation(rotation + delta);
  };

  return (
    <div className="relative py-20 px-4 sm:px-6 overflow-hidden bg-black">
      {/* CSS Rules for Scrollbar and Sweeper */}
      <style jsx global>{`
        .custom-scrollbar-cyber::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar-cyber::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); border-radius: 4px; }
        .custom-scrollbar-cyber::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.4); border-radius: 4px; }
        .custom-scrollbar-cyber::-webkit-scrollbar-thumb:hover { background: rgba(168, 85, 247, 0.8); }
        
        @keyframes radar-sweep {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-radar {
            animation: radar-sweep 4s linear infinite;
        }
        
        .grid-bg-cyber {
            background-image: 
                linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 20px 20px;
        }
      `}</style>

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 grid-bg-cyber opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">

        {/* Header */}
        <m.div
          className="text-center mb-16 w-full flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
            <span className="text-xs text-gray-300 font-semibold tracking-wider uppercase">Threat Intelligence</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            TxShield <span className="grad-word">Core</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base font-light tracking-wide">
            Interactive defense systems. Select a tactical sector to engage protection layers.
          </p>
        </m.div>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-start justify-center w-full">

          {/* LEFT COLUMN: Cyber Radar Sandbox */}
          <div className="w-full lg:w-[450px] flex justify-center items-center relative h-[400px] sm:h-[450px] flex-shrink-0">
            {/* Radar Container */}
            <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px]">

              {/* Ambient Underglow */}
              <div className="absolute inset-0 bg-purple-500/10 blur-[80px] rounded-full"></div>

              {/* Radar Grid Lines (Concentric Circles) */}
              <div className="absolute inset-0 rounded-full border border-white/5 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
                <div className="absolute inset-[15%] rounded-full border border-white/[0.03]"></div>
                <div className="absolute inset-[30%] rounded-full border border-white/[0.03]"></div>
                <div className="absolute inset-[45%] rounded-full border border-white/[0.03] border-dashed"></div>

                {/* Crosshairs */}
                <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/[0.03] -translate-x-1/2"></div>
                <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/[0.03] -translate-y-1/2"></div>
              </div>

              {/* Sweeping Radar Line */}
              <div className="absolute inset-[5%] rounded-full overflow-hidden pointer-events-none">
                <div className="w-full h-full animate-radar origin-center"
                  style={{ background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(168, 85, 247, 0.4) 360deg)' }}>
                </div>
              </div>

              {/* Rotating Core (Nodes) */}
              <m.div
                className="w-full h-full relative"
                animate={{ rotate: rotation }}
                transition={{ type: "spring", stiffness: 45, damping: 25 }}
              >
                {/* Items */}
                {SECTIONS.map((section, index) => {
                  const angle = index * 120;
                  const isActive = activeIndex === index;

                  return (
                    <m.div
                      key={section.key}
                      className="absolute top-0 left-0 w-full h-full pointer-events-none"
                      style={{ rotate: angle }}
                    >
                      {/* Interactive Node */}
                      <div
                        className="absolute top-[3%] left-1/2 -translate-x-1/2 pointer-events-auto cursor-pointer group flex flex-col items-center"
                        onClick={() => handleSectionClick(index)}
                      >
                        {/* Node Box - Cyber Glass */}
                        <m.div
                          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all duration-300 relative overflow-hidden backdrop-blur-xl ${isActive
                            ? `scale-110 shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-[#0A0A0A] border border-white/20`
                            : `scale-90 opacity-60 hover:opacity-100 hover:scale-100 bg-[#0A0A0A]/50 border border-white/5`
                            }`}
                        >
                          {/* Active Glowing Background */}
                          {isActive && (
                            <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${section.color}`}></div>
                          )}

                          {/* Icon */}
                          <m.div
                            className={`relative z-10 ${isActive ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'text-gray-500'}`}
                            animate={{ rotate: -(rotation + angle) }}
                            transition={{ type: "spring", stiffness: 45, damping: 25 }}
                          >
                            {section.icon}
                          </m.div>

                          {/* Targeting Corners for Active Node */}
                          {isActive && (
                            <>
                              <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-white/40"></div>
                              <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-white/40"></div>
                              <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-white/40"></div>
                              <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-white/40"></div>
                            </>
                          )}
                        </m.div>
                      </div>
                    </m.div>
                  );
                })}

              </m.div>

              {/* STATIC CENTER HUB - Cyber Eye */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#050505] p-[1px] shadow-[0_0_40px_rgba(0,0,0,0.8)] z-20 pointer-events-none border border-white/10 flex items-center justify-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-black to-[#111] border border-white/5 flex items-center justify-center shadow-inner relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-500/10 blur-sm animate-pulse"></div>
                  <FaShieldAlt className="text-2xl sm:text-3xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] relative z-10" />
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Terminal Data Panes */}
          <div className="w-full lg:w-[600px] flex flex-col gap-6 flex-shrink-0">

            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight flex items-center gap-3">
                  <span className="w-2 h-6 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full"></span>
                  <GlitchText text={activeSection.title} />
                </h3>
                <p className="text-gray-400 font-medium text-xs sm:text-sm tracking-wide ml-5">{activeSection.shortDesc}</p>
              </div>
              <div className="text-right mt-2 sm:mt-0 flex items-center gap-2">
                <span className="text-xs text-purple-500 uppercase tracking-widest font-mono">Sector</span>
                <span className="text-4xl font-mono font-bold text-white/20 tracking-tighter">0{activeIndex + 1}</span>
              </div>
            </div>

            {/* Two-Pane Layout */}
            <div className="flex flex-col sm:flex-row gap-4 h-auto sm:h-[400px]">

              {/* 1. Feature List (Scrollable Terminal Window) */}
              <div className="w-full sm:w-[45%] overflow-y-auto pr-2 custom-scrollbar-cyber rounded-2xl bg-[#0c0c0c]/80 backdrop-blur-xl border border-white/5 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] p-2 h-[250px] sm:h-full">
                <div className="flex flex-col gap-1.5">
                  {activeSection.items.map((item, idx) => (
                    <m.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      onMouseEnter={() => setHoveredFeature(item)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer group relative overflow-hidden ${hoveredFeature === item
                        ? `bg-white/10 border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]`
                        : 'bg-transparent border-transparent hover:bg-white/[0.03] hover:border-white/10'
                        }`}
                    >
                      {/* Active Indicator Bar */}
                      {hoveredFeature === item && (
                        <m.div layoutId="activeFeatureBar" className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-purple-500 rounded-r-full" />
                      )}

                      <div className="flex items-center gap-3 pl-1">
                        <div className={`p-1.5 rounded-lg border transition-colors ${hoveredFeature === item
                          ? 'text-purple-400 bg-purple-500/10 border-purple-500/30'
                          : 'text-gray-500 bg-black/50 border-white/5 group-hover:text-gray-300'
                          }`}>
                          {React.cloneElement(item.icon, { className: "text-xs" })}
                        </div>
                        <div>
                          <h4 className={`text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors pt-0.5 ${hoveredFeature === item ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                            }`}>
                            {item.title}
                          </h4>
                        </div>
                      </div>
                    </m.div>
                  ))}
                </div>
              </div>

              {/* 2. Big Window (Decode Pattern Panel) */}
              <div className="w-full sm:w-[55%] relative h-[250px] sm:h-full">
                <div className="absolute inset-0 rounded-2xl bg-[#080808] border border-white/10 overflow-hidden flex flex-col shadow-[inset_0_0_40px_rgba(0,0,0,0.9)]">

                  {/* Top Bar (Terminal style) */}
                  <div className="h-8 bg-[#111] border-b border-white/5 flex items-center px-4 justify-between">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                    </div>
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">system32/txshield/analyzer</span>
                  </div>

                  <div className="p-5 sm:p-6 flex-grow flex flex-col relative z-10 w-full h-full">
                    <AnimatePresence mode="wait">
                      {hoveredFeature ? (
                        <m.div
                          key={hoveredFeature.title}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="relative z-10 flex flex-col h-full"
                        >
                          {/* Header */}
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeSection.color} p-[1px]`}>
                              <div className="w-full h-full bg-[#0A0A0A] rounded-[11px] flex items-center justify-center text-white">
                                {React.cloneElement(hoveredFeature.icon, { className: "text-lg" })}
                              </div>
                            </div>
                            <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                              <GlitchText text={hoveredFeature.title} />
                            </h4>
                          </div>

                          <div className="flex-grow">
                            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 shadow-inner">
                              <p className="text-gray-400 leading-relaxed text-sm font-medium font-mono">
                                {hoveredFeature.description}
                              </p>
                            </div>
                          </div>

                          <div className="mt-auto pt-4">
                            <div className="flex items-center justify-between text-[10px] uppercase tracking-widest pb-1 border-b border-white/10">
                              <span className="text-gray-500 flex items-center gap-2"><FaTerminal className="text-purple-500" /> Module Status</span>
                              <span className="text-green-400 font-bold flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_5px_currentColor]"></span>
                                ENGAGED
                              </span>
                            </div>
                          </div>
                        </m.div>
                      ) : (
                        <m.div
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center justify-center h-full text-center relative z-10 opacity-30"
                        >
                          <div className="w-16 h-16 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center mb-4 animate-[spin_10s_linear_infinite]">
                            <FaSearch className="text-2xl text-white animate-[spin_10s_linear_infinite_reverse]" />
                          </div>
                          <p className="text-xs uppercase tracking-[0.3em] font-mono text-white">Awaiting Assignment</p>
                          <p className="text-[10px] text-gray-500 mt-2 font-mono">Select a feature to view tactical data</p>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default OurSolutionTxShield;
