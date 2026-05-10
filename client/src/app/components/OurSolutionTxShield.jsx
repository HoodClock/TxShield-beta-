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

const MempoolVisualizer = ({ activeFeature, activeIndex }) => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Distribute particles mainly in an elliptical band
    const newParticles = Array.from({ length: 90 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 45; // 0 to 45% radius
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle) * 0.6; // Flatten y to make it an ellipse

      return {
        id: i,
        x,
        y,
        size: Math.random() * 3 + 1.5,
        baseOpacity: Math.random() * 0.5 + 0.1,
        isThreat: Math.random() > 0.85, 
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 2,
      };
    });
    setParticles(newParticles);
  }, []);

  const isActive = !!activeFeature;
  const themeColors = [
    { bg: "bg-purple-500", text: "text-purple-500", border: "border-purple-500", shadow: "shadow-[0_0_15px_#a855f7]", line: "rgba(168, 85, 247, 0.3)" },
    { bg: "bg-red-500", text: "text-red-500", border: "border-red-500", shadow: "shadow-[0_0_15px_#ef4444]", line: "rgba(239, 68, 68, 0.3)" },
    { bg: "bg-cyan-500", text: "text-cyan-500", border: "border-cyan-500", shadow: "shadow-[0_0_15px_#06b6d4]", line: "rgba(6, 182, 212, 0.3)" },
  ];
  const t = themeColors[activeIndex] || themeColors[0];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center pointer-events-none">
      {/* Background Globe / Core */}
      <div className="absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full border border-border/40 bg-card/10 shadow-[inset_0_0_50px_rgba(var(--primary),0.05)] backdrop-blur-[2px]" />
      
      {/* Latitude/Longitude lines */}
      <div className="absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full border border-border/20 rotate-45 transition-transform duration-[20s] ease-linear" style={{ transform: 'rotateX(70deg) rotateZ(45deg)' }} />
      <div className="absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full border border-border/20 -rotate-45 transition-transform duration-[20s] ease-linear" style={{ transform: 'rotateX(70deg) rotateZ(-45deg)' }} />

      {/* Threat detected connections */}
      {isActive && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {particles.filter(p => p.isThreat).map((p, i) => (
             <m.line
               key={i}
               x1="50%"
               y1="50%"
               x2={`${p.x}%`}
               y2={`${p.y}%`}
               stroke={t.line}
               strokeWidth="1"
               initial={{ pathLength: 0, opacity: 0 }}
               animate={{ pathLength: 1, opacity: 1 }}
               transition={{ duration: 0.5, delay: Math.random() * 0.3 }}
             />
          ))}
        </svg>
      )}

      {/* Particles */}
      {particles.map((p) => {
        const activeThreat = isActive && p.isThreat;
        return (
          <div
            key={p.id}
            className={`absolute rounded-full transition-all duration-300 ${
              activeThreat 
                ? t.bg + ' ' + t.shadow
                : 'bg-primary/30 dark:bg-primary/40'
            }`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: activeThreat ? 1 : p.baseOpacity,
              transform: activeThreat ? 'scale(1.5)' : 'scale(1)',
            }}
          />
        );
      })}

      {/* Scanning Rings when active (Optimized) */}
      {isActive && (
        <>
          <div className={`absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full border border-dashed ${t.border}/30 animate-[spin_10s_linear_infinite] z-0`} />
          <div className={`absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full bg-transparent border border-solid ${t.border}/40 animate-ping-radar z-0`} />
        </>
      )}

      {/* Center Reticle */}
      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 relative z-20 bg-background border ${isActive ? t.border : 'border-border'}`}>
        <FaSearch className={`text-xl transition-colors duration-300 ${isActive ? t.text : 'text-muted-foreground'}`} />
      </div>
    </div>
  );
}

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
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const activeSection = SECTIONS[activeIndex];

  const handleSectionClick = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
      setHoveredFeature(null);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between px-4 sm:px-6 overflow-hidden bg-background transition-colors duration-700">
      {/* CSS Rules */}
      <style jsx global>{`
        .custom-scrollbar-cyber::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar-cyber::-webkit-scrollbar-track { background: var(--muted); border-radius: 4px; }
        .custom-scrollbar-cyber::-webkit-scrollbar-thumb { background: var(--primary); opacity: 0.4; border-radius: 4px; }
        .custom-scrollbar-cyber::-webkit-scrollbar-thumb:hover { background: var(--primary); }
        
        @keyframes radar-sweep {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-radar {
            animation: radar-sweep 4s linear infinite;
        }

        @keyframes ping-radar {
            0% { transform: scale(0.1); opacity: 0.6; }
            80%, 100% { transform: scale(1); opacity: 0; }
        }
        .animate-ping-radar {
            animation: ping-radar 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .grid-bg-cyber {
            background-image: 
                linear-gradient(to right, var(--foreground) 0.05 1px, transparent 1px),
                linear-gradient(to bottom, var(--foreground) 0.05 1px, transparent 1px);
            background-size: 30px 30px;
        }
      `}</style>

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 grid-bg-cyber opacity-20 pointer-events-none transition-opacity duration-700"></div>

      <div className="max-w-[1400px] mx-auto relative z-10 w-full flex flex-col h-full py-6 sm:py-8 transition-colors duration-700">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full border-b border-border pb-4 mb-6 shrink-0 gap-4 pr-24 lg:pr-32">
			<div className="flex flex-col items-center md:items-start">
				<div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-card border border-border mb-2">
					<div className="w-1.5 h-1.5 bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
					<span className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase">Threat Intelligence</span>
				</div>
				<h2 className="text-4xl sm:text-5xl lg:text-6xl font-clash font-extrabold text-foreground tracking-widest uppercase">
					TxShield <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Core</span>
				</h2>
			</div>
			<div className="text-right flex items-center bg-card border border-border p-3 px-5">
				<div className="flex flex-col text-right hidden sm:flex">
					<span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">Active Sector</span>
					<span className="text-lg font-mono font-bold text-foreground tracking-tighter"><GlitchText text={activeSection.title} /></span>
				</div>
			</div>
        </div>

        {/* Main Content Grid: 2 Columns */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center w-full flex-1 min-h-0 pt-4 pb-8">

          {/* LEFT COLUMN: Feature List */}
          <div className="w-full lg:flex-1 lg:max-w-[400px] h-[300px] lg:h-[480px] flex flex-col bg-background border border-border relative overflow-hidden shadow-2xl rounded-xl transition-colors duration-700">
			<div className="h-10 bg-card border-b border-border flex items-center px-4 justify-between shrink-0">
				<span className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest">Active Filters</span>
				<span className="text-[10px] font-mono text-muted-foreground">{activeSection.items.length} Modules</span>
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
					? `bg-primary/5 border-primary/20`
					: 'bg-transparent border-transparent hover:bg-muted/50 hover:border-border'
					}`}
				>
					{/* Active Indicator Bar */}
					{hoveredFeature === item && (
					<m.div layoutId="activeFeatureBar" className="absolute left-0 top-2 bottom-2 w-1 bg-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
					)}

					<div className="flex items-center gap-3 pl-2">
						<div className={`p-1.5 rounded-md border transition-colors ${hoveredFeature === item
							? 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30'
							: 'text-muted-foreground bg-muted border-border group-hover:text-foreground group-hover:border-primary/20'
							}`}>
							{React.cloneElement(item.icon, { className: "text-xs" })}
						</div>
						<h4 className={`text-[11px] font-mono uppercase tracking-widest transition-colors ${hoveredFeature === item ? 'text-foreground font-bold' : 'text-muted-foreground group-hover:text-foreground'}`}>
							{item.title}
						</h4>
					</div>
				</m.div>
				))}
			</div>
          </div>

          {/* RIGHT COLUMN: Terminal Data Panes */}
          <div className="w-full lg:flex-1 lg:max-w-[400px] h-[300px] lg:h-[480px] bg-background border border-border flex flex-col relative overflow-hidden shadow-2xl rounded-xl transition-colors duration-700">
			{/* Top Bar (Terminal style with Tabs) */}
			<div className="h-10 bg-card border-b border-border flex items-center px-4 justify-between shrink-0">
				<div className="flex gap-2 sm:gap-3 pointer-events-auto">
					 {SECTIONS.map((section, idx) => {
						const isActiveTab = activeIndex === idx;
						let tabColor = "text-cyan-400 border-cyan-400";
						if (idx === 0) tabColor = "text-purple-400 border-purple-400";
						if (idx === 1) tabColor = "text-red-400 border-red-400";
						
						return (
						  <button 
							key={section.key} 
							onClick={() => handleSectionClick(idx)}
							className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-wider transition-colors px-2 py-1 border-b-2 ${isActiveTab ? `${tabColor} font-bold` : 'text-muted-foreground hover:text-foreground border-transparent'}`}
						  >
							{section.title.split(' ')[0]}
						  </button>
						)
					 })}
				</div>
				<span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">sys/analyzer/output</span>
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
					<div className="w-12 h-12 bg-muted/50 border border-border flex items-center justify-center text-cyan-400 shrink-0">
						{React.cloneElement(hoveredFeature.icon, { className: "text-2xl" })}
					</div>
					<h4 className="text-lg font-clash font-bold text-foreground uppercase tracking-wider">
						<GlitchText text={hoveredFeature.title} />
					</h4>
					</div>

					<div className="flex-grow">
					<div className="border-l-2 border-cyan-500/50 pl-4 py-1">
						<p className="text-foreground/70 leading-relaxed text-sm font-mono italic">
						{hoveredFeature.description}
						</p>
					</div>
					</div>

					<div className="mt-8 pt-4 border-t border-border">
					<div className="flex flex-col gap-2">
						<div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-widest">
							<span className="text-muted-foreground">Target Vector</span>
							<span className="text-foreground">Smart Contract</span>
						</div>
						<div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-widest">
							<span className="text-muted-foreground flex items-center gap-2"><FaTerminal className="text-cyan-500" /> Module Status</span>
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
					<div className="w-16 h-16 border border-dashed border-border flex items-center justify-center mb-6">
					<FaSearch className="text-2xl text-muted-foreground/50" />
					</div>
					<p className="text-xs uppercase tracking-[0.3em] font-mono text-cyan-500/50">Standby Mode</p>
					<p className="text-[10px] text-muted-foreground mt-2 font-mono">Select a feature vector on the left to initialize analysis</p>
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
