import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import {
  FaShieldAlt,
  FaSearch,
  FaExclamationTriangle,
  FaExchangeAlt,
  FaGasPump,
  FaLock,
  FaUserSlash,
  FaPercentage,
  FaChartLine,
  FaHandHoldingUsd,
  FaSkull,
  FaLink,
  FaKey,
  FaGlobe,
  FaDatabase,
  FaBrain,
  FaClock,
  FaBan,
  FaCoins,
  FaEye,
  FaRobot
} from 'react-icons/fa';

function OurSolutionTxShield() {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Start all sections collapsed by default
  const [openSection, setOpenSection] = useState({
    honeypot: false,
    phishing: false,
    upcoming: false
  });

  // Track expanded feature per section (only one at a time per section)
  const [expandedFeature, setExpandedFeature] = useState({
    honeypot: null,
    phishing: null,
    upcoming: null
  });

  const toggleSection = (section) => {
    setOpenSection(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleFeature = (sectionKey, index) => {
    setExpandedFeature(prev => ({
      ...prev,
      [sectionKey]: prev[sectionKey] === index ? null : index
    }));
  };

  const sections = {
    honeypot: {
      title: "Honeypot Detection",
      icon: <FaSearch className="text-lg" />,
      count: "9 Checks",
      description: "Advanced token trap detection",
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
    phishing: {
      title: "Phishing Protection",
      icon: <FaExclamationTriangle className="text-lg" />,
      count: "5 Checks",
      description: "Approval scam prevention",
      items: [
        { title: "Approve Scam", icon: <FaKey />, description: "Detects malicious approval patterns and suspicious allowance flows that enable token draining." },
        { title: "Ether Forward", icon: <FaExchangeAlt />, description: "Finds contracts or links that forward incoming Ether/assets to attacker-controlled addresses." },
        { title: "Malicious Proxy", icon: <FaSkull />, description: "Identifies proxy contracts that reroute logic to malicious implementations or hidden backdoors." },
        { title: "Permit Scam", icon: <FaKey />, description: "Detects abusive or crafted permit flows that can be used to stealthily grant approvals." },
        { title: "Domain Link", icon: <FaLink />, description: "Flags suspicious domain links and phishing URLs commonly used in social-engineering attacks." }
      ]
    },
    upcoming: {
      title: "Coming Soon",
      icon: <FaClock className="text-lg" />,
      count: "11 Features",
      description: "Future security enhancements",
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
  };

  const DropdownSection = ({ sectionKey, isOpen, onToggle }) => {
    const section = sections[sectionKey];
    const isExpanded = expandedFeature[sectionKey];

    return (
      <div className="mb-4 rounded-xl bg-white/4 border border-white/6 overflow-hidden backdrop-blur-sm">
        <button
          onClick={() => onToggle(sectionKey)}
          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-all fancy-gradient-border subtle"
        >
          <div className="flex items-center gap-4">
            <div className="p-[2px] rounded-full fancy-gradient-border subtle">
              <div className="w-10 h-10 rounded-full bg-white/6 flex items-center justify-center text-white">
                {section.icon}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-white text-lg">{section.title}</h3>
                <span className="text-xs text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                  {section.count}
                </span>
              </div>
              <p className="text-gray-400 text-sm mt-1">{section.description}</p>
            </div>
          </div>
          <div className="text-gray-400 text-lg transition-transform">
            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
          </div>
        </button>

        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="px-6 py-4 border-t border-white/6 feature-surface">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {section.items.map((item, index) => (
                <motion.div
                  key={index}
                  layout
                  onClick={() => toggleFeature(sectionKey, index)}
                  className="cursor-pointer"
                >
                  <motion.div
                    initial={false}
                    animate={isExpanded === index ? { height: 'auto' } : { height: 'auto' }}
                    className="rounded-lg fancy-gradient-border subtle overflow-hidden bg-white/3 border border-white/6"
                  >
                    {/* Card header - always visible */}
                    <div className="p-3 flex flex-col items-center text-center gap-2 hover:bg-white/5 transition-all">
                      <div className="p-[2px] rounded-full fancy-gradient-border subtle">
                        <div className="w-8 h-8 rounded-full bg-white/6 flex items-center justify-center text-white text-sm">
                          {item.icon}
                        </div>
                      </div>
                      <span className="text-xs text-gray-300 font-medium">{item.title}</span>
                      {isExpanded !== index && (
                        <div className="text-[10px] text-gray-500 mt-1">Click to explore</div>
                      )}
                    </div>

                    {/* Expanded description */}
                    <AnimatePresence>
                      {isExpanded === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden border-t border-white/6"
                        >
                          <div className="p-3 text-left">
                            <p className="text-xs text-gray-400 leading-relaxed">{item.description}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div ref={ref} className="relative py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300 uppercase">Our Solution</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">
            <span className="grad-word">TxShield</span>
            {' '}
            <span className="text-white">Security</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Multi-layered detection systems designed to protect your assets.
          </p>
        </motion.div>

        <div className="space-y-4 max-w-4xl mx-auto">
          <DropdownSection
            sectionKey="honeypot"
            isOpen={openSection.honeypot}
            onToggle={toggleSection}
          />

          <DropdownSection
            sectionKey="phishing"
            isOpen={openSection.phishing}
            onToggle={toggleSection}
          />

          <DropdownSection
            sectionKey="upcoming"
            isOpen={openSection.upcoming}
            onToggle={toggleSection}
          />
        </div>
      </div>
    </div>
  );
}

export default OurSolutionTxShield;