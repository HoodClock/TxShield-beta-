import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  FaRobot
} from 'react-icons/fa';

// Reuse the existing data structure
const SECTIONS = [
  {
    key: 'honeypot',
    title: "Honeypot Detection",
    icon: <FaSearch className="text-2xl" />,
    shortDesc: "Advanced token trap detection",
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

function OurSolutionTxShield() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  // Active section data
  const activeSection = SECTIONS[activeIndex];

  const handleSectionClick = (index) => {
    setActiveIndex(index);
    // Unidirectional rotation logic (always decreasing angle)
    const targetBase = index * -120;
    let delta = (targetBase - rotation) % 360;
    if (delta > 0) delta -= 360;
    if (delta === 0 && index !== activeIndex) delta = -360;
    setRotation(rotation + delta);
  };

  return (
    <div className="relative py-20 px-4 sm:px-6 overflow-hidden">
      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
            .custom-scrollbar-purple::-webkit-scrollbar {
            width: 6px;
            }
            .custom-scrollbar-purple::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.02);
            border-radius: 4px;
            }
            .custom-scrollbar-purple::-webkit-scrollbar-thumb {
            background: #333;
            border-radius: 4px;
            border: 1px solid rgba(255,255,255,0.1);
            }
            .custom-scrollbar-purple::-webkit-scrollbar-thumb:hover {
            background: #444;
            }
        `}</style>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#0A0A0A] border border-white/10 mb-4">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400 uppercase tracking-[0.2em]">Our Solution</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            TxShield <span className="grad-word">Core</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm font-light tracking-wide">
            Interactive defense systems. Select a sector to engage protection layers.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT COLUMN: The Wheel */}
          <div className="lg:col-span-5 flex justify-center items-center relative h-[360px] sm:h-[420px]">
            {/* Wheel Container */}
            <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px]">

              {/* Subtle ambient glow (reduced) */}
              <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full"></div>

              {/* Rotating Core */}
              <motion.div
                className="w-full h-full relative"
                animate={{ rotate: rotation }}
                transition={{ type: "spring", stiffness: 40, damping: 25 }}
              >
                {/* MATTE BLACK WHEEL BODY */}
                <div className="absolute inset-0 rounded-full bg-[#050505] overflow-hidden">
                  {/* Thin Gradient Rim Border */}
                  <div className="absolute inset-0 rounded-full border border-white/5"></div>

                  {/* Gradient Ring using pseudo element for clean border effect */}
                  <div className="absolute inset-0 rounded-full border-[1px] border-transparent"
                    style={{
                      background: 'linear-gradient(#050505, #050505) padding-box, linear-gradient(135deg, #1e3a8a 0%, #050505 50%, #4c1d95 100%) border-box'
                    }}
                  ></div>

                  {/* Separator Lines (at 0, 120, 240) - Sharp Gradients */}
                  {[0, 120, 240].map((deg) => (
                    <div
                      key={deg}
                      className="absolute top-1/2 left-1/2 w-full h-[1px]"
                      style={{ transform: `translate(-50%, -50%) rotate(${deg - 90}deg) translateY(-50%)` }}
                    >
                      {/* Gradient Line from Center to Edge */}
                      <div className="w-1/2 h-full mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                    </div>
                  ))}
                </div>

                {/* Items */}
                {SECTIONS.map((section, index) => {
                  const angle = index * 120;
                  const isActive = activeIndex === index;

                  return (
                    <motion.div
                      key={section.key}
                      className="absolute top-0 left-0 w-full h-full pointer-events-none"
                      style={{ rotate: angle }}
                    >
                      {/* Content Container */}
                      <div
                        className="absolute top-[8%] left-1/2 -translate-x-1/2 pointer-events-auto cursor-pointer group flex flex-col items-center"
                        onClick={() => handleSectionClick(index)}
                      >
                        {/* Icon Box - Matte Black with Gradient Border */}
                        <motion.div
                          className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 relative overflow-hidden ${isActive ? 'scale-110' : 'opacity-50 hover:opacity-100'
                            }`}
                        >
                          {/* Icon Background & Border */}
                          <div className={`absolute inset-0 ${isActive ? 'bg-[#0A0A0A]' : 'bg-[#0A0A0A]'}`}></div>

                          {/* Active Border Gradient */}
                          {isActive && (
                            <div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-br from-blue-500 to-purple-600">
                              <div className="w-full h-full bg-[#0A0A0A] rounded-xl"></div>
                            </div>
                          )}
                          {!isActive && (
                            <div className="absolute inset-0 rounded-xl border border-white/10"></div>
                          )}

                          {/* Icon */}
                          <motion.div
                            className={`relative z-10 ${isActive ? 'text-white' : 'text-gray-500'}`}
                            animate={{ rotate: -(rotation + angle) }}
                            transition={{ type: "spring", stiffness: 40, damping: 25 }}
                          >
                            {section.icon}
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}

              </motion.div>

              {/* STATIC CENTER HUB - Sleek Matte Black */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-[#050505] p-[1px] shadow-2xl z-20 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, #1e3a8a, #050505, #4c1d95)'
                }}
              >
                <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center">
                    <FaShieldAlt className="text-2xl text-gray-200" />
                  </div>
                </div>
              </div>

              {/* Minimal Indicator Line */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-gradient-to-b from-blue-500 to-transparent z-20"></div>

            </div>
          </div>

          {/* RIGHT COLUMN: Features List & Big Window */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/5 pb-3">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">{activeSection.title}</h3>
                <p className="text-gray-500 font-medium text-xs tracking-wide">{activeSection.shortDesc}</p>
              </div>
              <div className="text-right mt-2 sm:mt-0">
                <span className="text-3xl font-mono font-bold text-[#1a1a1a]">{String(activeIndex + 1).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Two-Pane Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[380px]">

              {/* 1. Feature List (Scrollable) */}
              <div className="overflow-y-auto pr-2 custom-scrollbar-purple">
                <div className="flex flex-col gap-2">
                  {activeSection.items.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      onMouseEnter={() => setHoveredFeature(item)}
                      className={`p-3 rounded border transition-all cursor-pointer group ${hoveredFeature === item
                          ? 'bg-white/5 border-blue-500/30'
                          : 'bg-transparent border-white/5 hover:border-white/10'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded transition-colors ${hoveredFeature === item ? 'text-blue-400' : 'text-gray-600 group-hover:text-gray-400'}`}>
                          {React.cloneElement(item.icon, { className: "text-xs" })}
                        </div>
                        <div>
                          <h4 className={`text-xs font-semibold uppercase tracking-wider transition-colors ${hoveredFeature === item ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                            {item.title}
                          </h4>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 2. Big Window (Description Panel) */}
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-[#080808] border border-white/5 overflow-hidden flex flex-col p-6">

                  {/* Very subtle noise texture or gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/2 to-transparent pointer-events-none"></div>

                  <AnimatePresence mode="wait">
                    {hoveredFeature ? (
                      <motion.div
                        key={hoveredFeature.title}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10 flex flex-col h-full"
                      >
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded bg-[#111] flex items-center justify-center text-blue-500 border border-white/5">
                            {React.cloneElement(hoveredFeature.icon, { className: "text-sm" })}
                          </div>
                          <h4 className="text-lg font-bold text-white tracking-tight">{hoveredFeature.title}</h4>
                        </div>

                        <div className="flex-grow">
                          <p className="text-gray-400 leading-relaxed text-sm font-light">
                            {hoveredFeature.description}
                          </p>
                        </div>

                        <div className="mt-auto pt-4 border-t border-dashed border-white/10">
                          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-gray-600">
                            <span>Status</span>
                            <span className="text-blue-500 flex items-center gap-1.5">
                              <span className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></span>
                              Active
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center h-full text-center relative z-10 opacity-20"
                      >
                        <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mb-3">
                          <FaSearch className="text-xl text-white" />
                        </div>
                        <p className="text-xs uppercase tracking-widest text-white">Select a feature</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

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
