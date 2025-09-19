import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaEthereum, 
  FaLink, 
  FaCoins,
  FaFire, 
  FaMoon, 
  FaBolt, 
  FaCube, 
  FaFeather,
  FaGlobe,
  FaStar,
  FaDollarSign
} from 'react-icons/fa';

function ChainDisplay() {
  // EVM Chains + Solana using only Font Awesome icons
  const evmChains = [
    { icon: <FaEthereum />, color: 'text-blue-500', name: 'Ethereum' },
    { icon: <FaDollarSign />, color: 'text-yellow-500', name: 'BNB Chain' },
    { icon: <FaCube />, color: 'text-purple-600', name: 'Polygon' },
    { icon: <FaFire />, color: 'text-red-500', name: 'Avalanche' },
    { icon: <FaBolt />, color: 'text-blue-300', name: 'Fantom' },
    { icon: <FaGlobe />, color: 'text-cyan-500', name: 'Arbitrum' },
    { icon: <FaStar />, color: 'text-red-400', name: 'Optimism' },
    { icon: <FaMoon />, color: 'text-gray-300', name: 'Moonbeam' },
    { icon: <FaFeather />, color: 'text-green-500', name: 'Celo' },
    { icon: <FaCoins />, color: 'text-purple-400', name: 'Solana' },
  ];

  // Duplicate for seamless animation
  const allChains = [...evmChains, ...evmChains];

  // Animation variants for different elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="relative py-16 overflow-hidden">
      {/* Circular Animation */}
      <div className="relative h-96 w-full max-w-6xl mx-auto">
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {allChains.slice(0, 10).map((chain, index) => {
            const angle = (index / 10) * Math.PI * 2;
            const radius = 140;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <motion.div
                key={index}
                className="absolute flex items-center justify-center"
                style={{
                  x: x,
                  y: y,
                }}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.2, zIndex: 10 }}
              >
                <div className="p-4 bg-gray-800 rounded-full border border-gray-700 shadow-lg backdrop-blur-sm">
                  <div className={`text-3xl ${chain.color}`}>
                    {chain.icon}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Inner rotating ring */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: -360 }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {allChains.slice(0, 6).map((chain, index) => {
            const angle = (index / 6) * Math.PI * 2;
            const radius = 80;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <motion.div
                key={index + 10}
                className="absolute flex items-center justify-center"
                style={{
                  x: x,
                  y: y,
                }}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.2, zIndex: 10 }}
              >
                <div className="p-3 bg-gray-800 rounded-full border border-gray-700 shadow-lg backdrop-blur-sm">
                  <div className={`text-2xl ${chain.color}`}>
                    {chain.icon}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-white/20 shadow-xl"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FaGlobe className="text-4xl text-white" />
          </motion.div>
        </div>
      </div>

      {/* Scrolling chains at bottom */}
      <motion.div 
        className="flex mt-16 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {allChains.map((chain, index) => (
          <div 
            key={index} 
            className="inline-flex items-center mx-4 p-3 bg-gray-800 rounded-lg border border-gray-700 shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`text-2xl ${chain.color} mr-2`}>
              {chain.icon}
            </div>
            <span className="text-sm text-gray-300">{chain.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default ChainDisplay;