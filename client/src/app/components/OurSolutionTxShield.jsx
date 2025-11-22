import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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

  const toggleSection = (section) => {
    setOpenSection(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = {
    honeypot: {
      title: "Honeypot Detection",
      icon: <FaSearch className="text-lg" />,
      count: "9 Checks",
      description: "Advanced token trap detection",
      items: [
        { title: "Blacklist Check", icon: <FaUserSlash /> },
        { title: "Transfer Control", icon: <FaBan /> },
        { title: "Fake Balance", icon: <FaEye /> },
        { title: "Gas Trap", icon: <FaGasPump /> },
        { title: "Hidden Owner", icon: <FaKey /> },
        { title: "High Sell Tax", icon: <FaPercentage /> },
        { title: "Buy/Sell Control", icon: <FaExchangeAlt /> },
        { title: "Mint Access", icon: <FaCoins /> },
        { title: "Trading Control", icon: <FaLock /> }
      ]
    },
    phishing: {
      title: "Phishing Protection",
      icon: <FaExclamationTriangle className="text-lg" />,
      count: "5 Checks",
      description: "Approval scam prevention",
      items: [
        { title: "Approve Scam", icon: <FaKey /> },
        { title: "Ether Forward", icon: <FaExchangeAlt /> },
        { title: "Malicious Proxy", icon: <FaSkull /> },
        { title: "Permit Scam", icon: <FaKey /> },
        { title: "Domain Link", icon: <FaLink /> }
      ]
    },
    upcoming: {
      title: "Coming Soon",
      icon: <FaClock className="text-lg" />,
      count: "11 Features",
      description: "Future security enhancements",
      items: [
        { title: "Address Poisoning", icon: <FaUserSlash /> },
        { title: "Rug Pull Analysis", icon: <FaHandHoldingUsd /> },
        { title: "Approval Revocation", icon: <FaKey /> },
        { title: "Dusting Protection", icon: <FaDatabase /> },
        { title: "Fake Token", icon: <FaSkull /> },
        { title: "Simulation Spoofing", icon: <FaShieldAlt /> },
        { title: "Front Running", icon: <FaChartLine /> },
        { title: "Risk Scoring", icon: <FaBrain /> },
        { title: "Fee Manipulation", icon: <FaPercentage /> },
        { title: "Bridge Assessment", icon: <FaGlobe /> },
        { title: "AI Detection", icon: <FaRobot /> }
      ]
    }
  };

  const DropdownSection = ({ sectionKey, isOpen, onToggle }) => {
    const section = sections[sectionKey];

    return (
      <div className="mb-4 rounded-xl bg-white/4 border border-white/6 overflow-hidden backdrop-blur-sm">
        <button
          onClick={() => onToggle(sectionKey)}
          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/6 flex items-center justify-center text-white">
              {section.icon}
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
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <div className="px-6 py-4 border-t border-white/6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {section.items.map((item, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-white/5 border border-white/6 hover:bg-white/8 transition-all flex flex-col items-center text-center gap-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/6 flex items-center justify-center text-white text-sm">
                    {item.icon}
                  </div>
                  <span className="text-xs text-gray-300 font-medium">{item.title}</span>
                </div>
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              TxShield
            </span>
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