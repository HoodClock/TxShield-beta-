import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
  FaRobot,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

function OurSolutionTxShield() {
  const ref = useRef();
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const [openSection, setOpenSection] = useState({
    honeypot: true,
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
    const sectionRef = useRef();
    const sectionInView = useInView(sectionRef, { once: true, amount: 0.2 });

    const getSectionColor = (key) => {
      switch (key) {
        case 'honeypot': return 'border-l-purple-500';
        case 'phishing': return 'border-l-red-500';
        case 'upcoming': return 'border-l-blue-500';
        default: return 'border-l-gray-500';
      }
    };

    return (
      <div ref={sectionRef} className="mb-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
        {/* Dropdown Header */}
        <motion.button
          className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300"
          onClick={() => onToggle(sectionKey)}
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/10">
              {section.icon}
            </div>
            <div className="text-left">
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                <span className="px-2 py-1 text-xs font-medium bg-white/10 rounded-full text-white/80">
                  {section.count}
                </span>
              </div>
              <p className="text-white/60 text-sm mt-1">{section.description}</p>
            </div>
          </div>
          <div className="text-white/60 transition-transform duration-300">
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </motion.button>

        {/* Dropdown Content */}
        <motion.div
          initial={false}
          animate={isOpen ? {
            height: 'auto',
            opacity: 1,
            transition: { duration: 0.3, ease: "easeOut" }
          } : {
            height: 0,
            opacity: 0,
            transition: { duration: 0.2, ease: "easeIn" }
          }}
          className="overflow-hidden"
        >
          <div className="p-6 border-t border-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {section.items.map((item, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-lg bg-white/5 border-l-4 ${getSectionColor(sectionKey)} backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={sectionInView && isOpen ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                      <div className="text-white/70 group-hover:text-white">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-white group-hover:text-white/90">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div ref={ref} className="min-h-screen text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Our Solution</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              TxShield
            </span>
            <br />
            <span className="text-white">Security</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Comprehensive blockchain security framework with advanced threat detection and prevention
          </p>
        </motion.div>

        {/* Dropdown Sections */}
        <div className="space-y-6 max-w-6xl mx-auto">
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