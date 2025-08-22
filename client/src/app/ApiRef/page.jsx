// "use client";

// import React, { useState } from "react";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { useAccount, useSignMessage } from "wagmi";
// import { authConnect as AuthApiConnect } from "@/api/api";

// function Page() {
//   const { address, isConnected } = useAccount();
//   const { signMessageAsync } = useSignMessage();
//   const [apiKey, setApiKey] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleGenerateKey = async () => {
//     if (!isConnected || !address) return;

//     try {
//       setLoading(true);

//       const message = "They can't exploit you if you are the exploit";
//       const signature = await signMessageAsync({ message });

//       const res = await AuthApiConnect({ wallet: address, signature });

//       setApiKey(res.data.apiKey);
//     } catch (err) {
//       console.error("Error generating API key:", err);
//       alert("Failed to generate API key");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(apiKey);
//     alert("API key copied to clipboard!");
//   };

//   return (
//     <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden">
//       {/* Mesh grid background */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:40px_40px]" />

//       {/* Content */}
//       <div className="relative z-10 w-full max-w-2xl mx-auto p-8 rounded-2xl bg-black/80 border border-white/10 shadow-xl backdrop-blur">
//         <h1 className="text-4xl font-extrabold text-center mb-6 tracking-wide">
//           TxShield API Dashboard
//         </h1>
//         <p className="text-center text-gray-400 mb-10">
//           Securely generate and manage your API key to integrate TxShield into your platform.
//         </p>

//         {!apiKey ? (
//           <div className="flex flex-col items-center space-y-6">
//             {/* Wallet connect */}
//             <ConnectButton />

//             {/* Generate key */}
//             {isConnected && (
//               <button
//                 onClick={handleGenerateKey}
//                 disabled={loading}
//                 className="w-full px-6 py-3 bg-gradient-to-r from-white to-gray-300 text-black font-semibold rounded-xl hover:from-gray-200 hover:to-white transition-all shadow-lg"
//               >
//                 {loading ? "Generating..." : "Generate API Key"}
//               </button>
//             )}

//             {/* Docs link */}
//             <button
//               onClick={() =>
//                 window.open("https://txshield.gitbook.io/txshield-docs/", "_blank")
//               }
//               className="w-full px-6 py-3 bg-transparent border border-white rounded-xl hover:bg-white/10 transition-all"
//             >
//               View Documentation
//             </button>
//           </div>
//         ) : (
//           <div className="flex flex-col items-center space-y-6">
//             <p className="text-lg text-gray-300">Your API Key</p>

//             <div className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gradient-to-r from-white to-gray-200 text-black shadow-inner">
//               <span className="truncate max-w-xs">{apiKey}</span>
//               <button
//                 onClick={handleCopy}
//                 className="ml-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
//               >
//                 Copy
//               </button>
//             </div>

//             <button
//               onClick={() => setApiKey(null)}
//               className="text-sm text-gray-400 hover:text-white transition"
//             >
//               Generate a new key?
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Page;


// deepseek code 
"use client";

import React, { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSignMessage } from "wagmi";
import { authConnect as AuthApiConnect } from "@/api/api";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from 'react-dom-confetti';

function Page() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (apiKey) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [apiKey]);

  const handleGenerateKey = async () => {
    if (!isConnected || !address) return;

    try {
      setLoading(true);

      const message = "They can't exploit you if you are the exploit";
      const signature = await signMessageAsync({ message });

      const res = await AuthApiConnect({ wallet: address, signature });

      setApiKey(res.data.apiKey);
    } catch (err) {
      console.error("Error generating API key:", err);
      alert("Failed to generate API key");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Confetti configuration
  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-100"></div>
      
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 animate-pulse"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
            }}
            animate={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-gray-900 to-black border border-white/10 shadow-2xl backdrop-blur-xl"
      >
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
        >
          TxShield API Dashboard
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center text-gray-400 mb-12 text-lg"
        >
          Securely generate and manage your API key to integrate TxShield into your platform.
        </motion.p>

        <div className="flex justify-center mb-10">
          <ConnectButton />
        </div>

        {!apiKey ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col items-center space-y-8"
          >
            {/* Generate key */}
            {isConnected && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerateKey}
                disabled={loading}
                className="w-full px-8 py-4 bg-gradient-to-r from-white to-gray-300 text-black font-bold rounded-xl hover:from-gray-200 hover:to-white transition-all duration-300 shadow-2xl relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </span>
                  ) : "Generate API Key"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            )}

            {/* Docs link */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open("https://txshield.gitbook.io/txshield-docs/", "_blank")}
              className="w-full px-8 py-4 bg-transparent border border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300 group"
            >
              <span className="flex items-center justify-center">
                View Documentation
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-8"
          >
            {/* Confetti effect */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
              <Confetti active={showConfetti} config={confettiConfig} />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xl font-semibold text-green-400">API Key Generated Successfully!</p>
              </div>
              <p className="text-gray-400">Your API key is ready to use</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-full"
            >
              <label className="block text-sm font-medium text-gray-400 mb-2">Your API Key</label>
              <div className="flex items-center justify-between w-full px-6 py-4 rounded-xl bg-gradient-to-r from-white/5 to-gray-800/50 border border-white/10 shadow-inner relative overflow-hidden group">
                <span className="truncate max-w-xs font-mono">{apiKey}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className="ml-4 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-all flex items-center"
                >
                  {copied ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setApiKey(null)}
              className="text-sm text-gray-400 hover:text-white transition flex items-center group"
            >
              Generate a new key
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Page;