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

  const activeSection = SECTIONS[activeIndex];

  const handleSectionClick = (index) => {
    setActiveIndex(index);
    setHoveredFeature(null);
    const targetBase = index * -120;
    let delta = (targetBase - rotation) % 360;
    if (delta > 0) delta -= 360;
    if (delta === 0 && index !== activeIndex) delta = -360;
    setRotation(rotation + delta);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between px-4 sm:px-6 overflow-hidden bg-[#050505]">
      {/* CSS Rules */}
      <style jsx global>{`
        .custom-scrollbar-cyber::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar-cyber::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); border-radius: 4px; }
        .custom-scrollbar-cyber::-webkit-scrollbar-thumb { background: rgba(34, 211, 238, 0.4); border-radius: 4px; }
        .custom-scrollbar-cyber::-webkit-scrollbar-thumb:hover { background: rgba(34, 211, 238, 0.8); }
        
        @keyframes radar-sweep {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-radar {
            animation: radar-sweep 4s linear infinite;
        }
        
        .grid-bg-cyber {
            background-image: 
                linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
            background-size: 30px 30px;
        }
      `}</style>

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 grid-bg-cyber opacity-50 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10 w-full flex flex-col h-full py-6 sm:py-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full border-b border-white/10 pb-4 mb-6 shrink-0 gap-4 pr-16">
			<div className="flex flex-col items-center md:items-start">
				<div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-white/5 border border-white/10 mb-2">
					<div className="w-1.5 h-1.5 bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
					<span className="text-[10px] text-gray-300 font-mono tracking-widest uppercase">Threat Intelligence</span>
				</div>
				<h2 className="text-4xl sm:text-5xl lg:text-6xl font-clash font-extrabold text-white tracking-widest uppercase">
					TxShield <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Core</span>
				</h2>
			</div>
			<div className="text-right flex items-center gap-4 bg-[#0a0a0a] border border-white/10 p-3">
				<div className="flex flex-col text-right hidden sm:flex">
					<span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Active Sector</span>
					<span className="text-lg font-mono font-bold text-white tracking-tighter"><GlitchText text={activeSection.title} /></span>
				</div>
				<span className="text-5xl font-clash font-bold text-white/10 hidden sm:block">0{activeIndex + 1}</span>
			</div>
        </div>

        {/* Main Content Grid: 3 Columns */}
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center w-full flex-1 min-h-0 pt-4 pb-8">

          {/* LEFT COLUMN: Feature List */}
          <div className="w-full lg:w-[320px] xl:w-[350px] shrink-0 h-[300px] lg:h-[480px] flex flex-col bg-[#050505] border border-white/10 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-xl">
			<div className="h-10 bg-[#0a0a0a] border-b border-white/5 flex items-center px-4 justify-between shrink-0">
				<span className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest">Active Filters</span>
				<span className="text-[10px] font-mono text-gray-500">{activeSection.items.length} Modules</span>
			</div>
			
			<div className="flex-1 overflow-y-auto custom-scrollbar-cyber p-2 space-y-1">
				{activeSection.items.map((item, idx) => (
				<m.div
					key={idx}
					initial={{ opacity: 0, x: -10 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: idx * 0.03 }}
					onMouseEnter={() => setHoveredFeature(item)}
					className={`p-3 rounded-lg border transition-all cursor-pointer group relative overflow-hidden ${hoveredFeature === item
					? `bg-white/5 border-white/20`
					: 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/10'
					}`}
				>
					{/* Active Indicator Bar */}
					{hoveredFeature === item && (
					<m.div layoutId="activeFeatureBar" className="absolute left-0 top-2 bottom-2 w-1 bg-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
					)}

					<div className="flex items-center gap-3 pl-2">
						<div className={`p-1.5 rounded-md border transition-colors ${hoveredFeature === item
							? 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30'
							: 'text-gray-500 bg-[#0a0a0a] border-white/5 group-hover:text-gray-400 group-hover:border-white/10'
							}`}>
							{React.cloneElement(item.icon, { className: "text-xs" })}
						</div>
						<h4 className={`text-[11px] font-mono uppercase tracking-widest transition-colors ${hoveredFeature === item ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
							{item.title}
						</h4>
					</div>
				</m.div>
				))}
			</div>
          </div>

          {/* CENTER COLUMN: Radar */}
          <div className="flex-1 w-full flex justify-center items-center relative h-[350px] lg:h-[480px] shrink-0">
            {/* Radar Container */}
            <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px]">
              
              {/* Radar Grid Lines (Concentric Circles) - Sharp Vectors */}
              <div className="absolute inset-0 rounded-full border-2 border-white/10 shadow-[inset_0_0_80px_rgba(34,211,238,0.05)]">
                <div className="absolute inset-[20%] rounded-full border border-white/10"></div>
                <div className="absolute inset-[40%] rounded-full border border-white/10"></div>
                <div className="absolute inset-[60%] rounded-full border border-white/10 border-dashed"></div>
                <div className="absolute inset-[80%] rounded-full border border-white/5"></div>

                {/* Crosshairs */}
                <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/10 -translate-x-1/2"></div>
                <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/10 -translate-y-1/2"></div>
              </div>

              {/* Sweeping Radar Line */}
              <div className="absolute inset-[2%] rounded-full overflow-hidden pointer-events-none">
                <div className="w-full h-full animate-radar origin-center"
                  style={{ background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(34, 211, 238, 0.3) 360deg)' }}>
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
                        className="absolute top-[4%] left-1/2 -translate-x-1/2 pointer-events-auto cursor-pointer flex flex-col items-center"
                        onClick={() => handleSectionClick(index)}
                      >
                        {/* Sharp Node Box */}
                        <m.div
                          className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-all duration-300 relative overflow-hidden ${isActive
                            ? `scale-110 bg-cyan-950/80 border border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]`
                            : `scale-90 opacity-50 hover:opacity-100 hover:scale-100 bg-[#0A0A0A] border border-white/20`
                            }`}
                        >
                          {/* Active Scanline */}
                          {isActive && (
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-[scan_2s_linear_infinite]"></div>
                          )}

                          {/* Icon */}
                          <m.div
                            className={`relative z-10 ${isActive ? 'text-cyan-400' : 'text-gray-500'}`}
                            animate={{ rotate: -(rotation + angle) }}
                            transition={{ type: "spring", stiffness: 45, damping: 25 }}
                          >
                            {section.icon}
                          </m.div>

                          {/* Tactical Corners */}
                          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-current opacity-50"></div>
                          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-current opacity-50"></div>
                          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-current opacity-50"></div>
                          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-current opacity-50"></div>
                        </m.div>
                      </div>
                    </m.div>
                  );
                })}
              </m.div>

              {/* STATIC CENTER HUB */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 bg-[#050505] z-20 pointer-events-none border border-white/20 flex items-center justify-center rotate-45">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#0a0a0a] border border-white/10 flex items-center justify-center relative overflow-hidden -rotate-45">
                  <FaShieldAlt className="text-2xl sm:text-3xl text-white/80 relative z-10" />
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Terminal Data Panes */}
          <div className="w-full lg:w-[320px] xl:w-[350px] shrink-0 h-[300px] lg:h-[480px] bg-[#050505] border border-white/10 flex flex-col relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-xl">
			{/* Top Bar (Terminal style) */}
			<div className="h-10 bg-[#0a0a0a] border-b border-white/5 flex items-center px-4 justify-between shrink-0">
				<div className="flex gap-1.5">
					<div className="w-2.5 h-2.5 bg-white/20"></div>
					<div className="w-2.5 h-2.5 bg-white/20"></div>
					<div className="w-2.5 h-2.5 bg-white/20"></div>
				</div>
				<span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">sys/analyzer/output</span>
			</div>

			<div className="p-5 sm:p-6 flex-grow flex flex-col relative z-10 w-full h-full overflow-y-auto custom-scrollbar-cyber">
			<AnimatePresence mode="wait">
				{hoveredFeature ? (
				<m.div
					key={hoveredFeature.title}
					initial={{ opacity: 0, x: 10 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -10 }}
					transition={{ duration: 0.2 }}
					className="relative z-10 flex flex-col h-full"
				>
					{/* Header */}
					<div className="flex items-center gap-4 mb-6">
					<div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 shrink-0">
						{React.cloneElement(hoveredFeature.icon, { className: "text-2xl" })}
					</div>
					<h4 className="text-lg font-clash font-bold text-white uppercase tracking-wider">
						<GlitchText text={hoveredFeature.title} />
					</h4>
					</div>

					<div className="flex-grow">
					<div className="border-l-2 border-cyan-500/50 pl-4 py-1">
						<p className="text-cyan-100/70 leading-relaxed text-sm font-mono">
						{hoveredFeature.description}
						</p>
					</div>
					</div>

					<div className="mt-8 pt-4 border-t border-white/10">
					<div className="flex flex-col gap-2">
						<div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-widest">
							<span className="text-gray-500">Target Vector</span>
							<span className="text-white">Smart Contract</span>
						</div>
						<div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-widest">
							<span className="text-gray-500 flex items-center gap-2"><FaTerminal className="text-cyan-500" /> Module Status</span>
							<span className="text-cyan-400 font-bold flex items-center gap-1.5">
							<span className="w-1.5 h-1.5 bg-cyan-400 animate-pulse shadow-[0_0_5px_currentColor]"></span>
							ENGAGED
							</span>
						</div>
					</div>
					</div>
				</m.div>
				) : (
				<m.div
					key="empty"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="flex flex-col items-center justify-center h-full text-center relative z-10 opacity-50"
				>
					<div className="w-16 h-16 border border-dashed border-white/20 flex items-center justify-center mb-6">
					<FaSearch className="text-2xl text-white/50" />
					</div>
					<p className="text-xs uppercase tracking-[0.3em] font-mono text-cyan-500/50">Standby Mode</p>
					<p className="text-[10px] text-gray-500 mt-2 font-mono">Select a feature vector on the left to initialize analysis</p>
				</m.div>
				)}
			</AnimatePresence>
			</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurSolutionTxShield;
