import React, { useRef } from 'react';
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
  FaFire,
  FaBan,
  FaCoins,
  FaEye,
  FaRobot
} from 'react-icons/fa';

function OurSolutionTxShield() {
  const ref = useRef();
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const honeypotChecks = [
    {
      title: "Blacklist Check",
      description: "Detects wallet blacklisting that blocks selling",
      example: "You buy tokens, but your wallet is blacklisted → only dev can sell",
      icon: <FaUserSlash />,
      color: "from-purple-500 to-purple-700"
    },
    {
      title: "Disable Transfer Check",
      description: "Identifies pausable transfers that can be disabled anytime",
      example: "Trading is smooth until dev calls 'disable transfer'",
      icon: <FaBan />,
      color: "from-red-500 to-red-700"
    },
    {
      title: "Fake Balance Check",
      description: "Detects contracts that show fake token balances",
      example: "Wallet shows 1,000 tokens, but selling always fails",
      icon: <FaEye />,
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Gas Trap Check",
      description: "Finds code that forces excessive gas usage on sells",
      example: "Sell fails because contract requires 5 ETH gas",
      icon: <FaGasPump />,
      color: "from-yellow-500 to-yellow-700"
    },
    {
      title: "Hidden Owner Check",
      description: "Detects secretly controlled ownership via proxy",
      example: "Hidden owner can change fees or lock trading",
      icon: <FaKey />,
      color: "from-gray-500 to-gray-700"
    },
    {
      title: "High Sell Tax Check",
      description: "Identifies huge sell fees that prevent cashing out",
      example: "You sell $100 worth of tokens and only get $1 back",
      icon: <FaPercentage />,
      color: "from-green-500 to-green-700"
    },
    {
      title: "Buy/Sell Control Check",
      description: "Detects on-demand blocking of buys or sells",
      example: "Dev opens buys, then instantly disables sells",
      icon: <FaExchangeAlt />,
      color: "from-indigo-500 to-indigo-700"
    },
    {
      title: "Mint Access Check",
      description: "Identifies unlimited minting capabilities",
      example: "Dev mints billions more tokens and dumps them",
      icon: <FaCoins />,
      color: "from-pink-500 to-pink-700"
    },
    {
      title: "Trading Control Check",
      description: "Detects trading parameter manipulation",
      example: "Dev can change trading pairs or disable exchanges",
      icon: <FaLock />,
      color: "from-teal-500 to-teal-700"
    }
  ];

  const phishingChecks = [
    {
      title: "Approve Scam Detection",
      description: "Detects unlimited token approval exploits",
      example: "You approve 100 USDT, scammer drains entire wallet",
      icon: <FaKey />,
      color: "from-red-500 to-red-700"
    },
    {
      title: "Ether Forward Scam Detection",
      description: "Identifies ETH forwarding to attacker addresses",
      example: "ETH sent to 'buy tokens' is forwarded to scammer",
      icon: <FaExchangeAlt />,
      color: "from-orange-500 to-orange-700"
    },
    {
      title: "Malicious Proxy Detection",
      description: "Detects upgradable proxy contracts",
      example: "Token looks fine today, contract swaps tomorrow",
      icon: <FaSkull />,
      color: "from-purple-500 to-purple-700"
    },
    {
      title: "Permit Scam Detection",
      description: "Identifies ERC-20 permit() signature exploits",
      example: "You sign permit message, scammer drains tokens",
      icon: <FaKey />,
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Domain Link Scam Detection",
      description: "Detects embedded phishing links in contracts",
      example: "Official site link sends to fake MetaMask page",
      icon: <FaLink />,
      color: "from-green-500 to-green-700"
    }
  ];

  const upcomingFeatures = [
    {
      title: "Address Poisoning Protection",
      description: "Prevents attacks using similar addresses",
      icon: <FaUserSlash />,
      color: "from-gray-500 to-gray-700"
    },
    {
      title: "Rug Pull Analysis",
      description: "Advanced detection of liquidity removal",
      icon: <FaHandHoldingUsd />,
      color: "from-red-500 to-red-700"
    },
    {
      title: "Malicious Approval Revocation",
      description: "Automatically revokes malicious approvals",
      icon: <FaKey />,
      color: "from-yellow-500 to-yellow-700"
    },
    {
      title: "Dusting Attack Protection",
      description: "Blocks small token transfers for tracking",
      icon: <FaDatabase />,
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Fake Token Detection",
      description: "Detects counterfeit mimicking tokens",
      icon: <FaSkull />,
      color: "from-purple-500 to-purple-700"
    },
    {
      title: "Tx Simulation Spoofing Protection",
      description: "Prevents bypassing transaction simulations",
      icon: <FaShieldAlt />,
      color: "from-indigo-500 to-indigo-700"
    },
    {
      title: "Front Running Protection",
      description: "Detects and prevents MEV bot exploitation",
      icon: <FaChartLine />,
      color: "from-pink-500 to-pink-700"
    },
    {
      title: "Wallet Risk Scoring",
      description: "Comprehensive risk assessment system",
      icon: <FaBrain />,
      color: "from-teal-500 to-teal-700"
    },
    {
      title: "Fee Manipulation Protection",
      description: "Detects and prevents fee manipulation",
      icon: <FaPercentage />,
      color: "from-green-500 to-green-700"
    },
    {
      title: "Cross-chain Bridge Assessment",
      description: "Security analysis for bridge protocols",
      icon: <FaGlobe />,
      color: "from-orange-500 to-orange-700"
    },
    {
      title: "AI Anomaly Detection",
      description: "Machine learning for unusual patterns",
      icon: <FaRobot />,
      color: "from-red-500 to-red-700"
    }
  ];

  const TimelineItem = React.memo(({ item, index, side }) => {
    const itemRef = useRef();
    const itemInView = useInView(itemRef, { once: true, amount: 0.3 });
    
    return (
      <motion.div
        ref={itemRef}
        className={`flex ${side === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col items-center mb-8`}
        initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
        animate={itemInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        {/* Timeline connector */}
        <div className="hidden md:flex flex-1 h-1 bg-gray-700"></div>
        
        {/* Timeline dot */}
        <div className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-gray-900 z-10 mx-2"></div>
        
        {/* Content card */}
        <div className={`flex-1 p-5 rounded-xl shadow-lg border border-gray-700 bg-gradient-to-br ${item.color}`}>
          <div className="flex items-start">
            <div className="p-2 rounded-lg bg-black/30 mr-3">
              {item.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-100">{item.description}</p>
            </div>
          </div>
          
          {item.example && (
            <div className="mt-3 p-2 bg-black/30 rounded border border-white/10">
              <p className="text-xs font-medium">Example:</p>
              <p className="text-xs opacity-90 mt-1">{item.example}</p>
            </div>
          )}
        </div>
      </motion.div>
    );
  });

  const TimelineSection = ({ title, icon, items, color, subtitle }) => {
    const sectionRef = useRef();
    const sectionInView = useInView(sectionRef, { once: true, amount: 0.2 });
    
    return (
      <div ref={sectionRef} className="mb-16">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-gray-800 mb-4">
            <div className={`p-2 rounded-full ${color}`}>
              {icon}
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        <div className="relative">
          {/* Vertical timeline */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 h-full hidden md:block"></div>
          
          {/* Timeline items */}
          <div className="space-y-2">
            {items.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                side={index % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={ref} className="min-h-screen text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            TxShield Security Framework
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Comprehensive protection through advanced security checks and future enhancements
          </p>
        </motion.div>

        {/* Honeypot Checks Timeline */}
        <TimelineSection
          title="Honeypot Detection"
          icon={<FaSearch className="text-xl" />}
          items={honeypotChecks}
          color="bg-purple-600"
          subtitle="9 advanced checks to detect token traps and selling restrictions"
        />

        {/* Phishing Checks Timeline */}
        <TimelineSection
          title="Phishing Protection"
          icon={<FaExclamationTriangle className="text-xl" />}
          items={phishingChecks}
          color="bg-red-600"
          subtitle="5 specialized checks to identify and prevent approval scams"
        />

        {/* Upcoming Features Timeline */}
        <TimelineSection
          title="Coming Soon"
          icon={<FaClock className="text-xl" />}
          items={upcomingFeatures}
          color="bg-blue-600"
          subtitle="11 upcoming features to expand our security capabilities"
        />

        {/* Stats Footer - Fixed */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-purple-400">9</div>
            <div className="text-sm text-gray-300">Honeypot Checks</div>
          </div>
          <div className="text-center p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-red-400">5</div>
            <div className="text-sm text-gray-300">Phishing Checks</div>
          </div>
          <div className="text-center p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-blue-400">11</div>
            <div className="text-sm text-gray-300">Upcoming Features</div>
          </div>
          <div className="text-center p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-green-400">24/7</div>
            <div className="text-sm text-gray-300">Protection</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default OurSolutionTxShield;