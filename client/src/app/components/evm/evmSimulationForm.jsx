"use client";

import { useState } from "react";
import { serialize, useAccount } from "wagmi";
import { motion } from "framer-motion";

import styles from "./evmSimulationForm.module.css";

export default function SimulationForm({
  onSimulateAll,
  backButtonHandler,
  onSwitchChain,
}) {
  const { address: userAddress, isConnected } = useAccount();
  const [contractAddress, setContractAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("ETH");

  const handleSimulate = async () => {
    if (!contractAddress || !amount) {
      alert("Please enter both contract address and amount.");
      return;
    }

    const currencySymbol = currency === "ETH";

    // credentials for simulation
    const simulationData = {
      userAddress,
      recepientAddress: contractAddress,
      amount: amount,
      currencySymbol: currency,
      currency: currency,
    };

    // credentials for honeypot
    const honeypotData = {
      address: contractAddress,
      userAddress: userAddress,
      contractAddress: contractAddress,
      tokenAddress: contractAddress,
      recepientAddress: contractAddress,
      value: amount,
      currencySymbol: currency,
    };

    onSimulateAll({ honeypotData, simulationData });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="relative p-1 rounded-3xl max-w-2xl mx-auto shadow-2xl"
      >
        <div className="relative bg-black/90 backdrop-blur-xl rounded-[22px] p-6 md:p-8 overflow-hidden">
          {/* Ambient Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          {/* Blue Light Pillar Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/15 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          <button
            onClick={backButtonHandler}
            className="absolute top-5 left-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300 z-20 group"
            title="Go Back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>

          {/* Switch Chain Button (Solana Logo) */}
          <button
            onClick={onSwitchChain}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/50 transition-all duration-300 z-20 group"
            title="Switch to Solana Simulation"
          >
            <img
              src="https://assets.coingecko.com/coins/images/4128/small/solana.png"
              alt="Switch to Solana"
              className="w-6 h-6 rounded-full group-hover:scale-110 transition-transform duration-300"
            />
          </button>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 mb-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 shadow-inner shadow-blue-500/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                EVM <span className="text-blue-500">Simulation</span>
              </h2>
              <p className="text-gray-400 text-sm max-w-md mx-auto">
                Securely simulate Ethereum transactions before you sign.
              </p>
            </div>

            <div className="space-y-5 max-w-lg mx-auto">
              <div>
                <label className="block text-blue-300/80 text-[10px] font-bold uppercase tracking-wider mb-1.5 ml-1">
                  Contract / Address
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="0x..."
                    className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300 font-mono text-sm shadow-inner"
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-blue-300/80 text-[10px] font-bold uppercase tracking-wider mb-1.5 ml-1">
                  Amount (ETH)
                </label>
                <div className="relative group">
                  <input
                    type="number"
                    placeholder="0.0"
                    className={`w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300 font-mono text-sm shadow-inner ${styles.noSpinner}`}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-[10px] bg-white/10 px-2 py-0.5 rounded">
                    ETH
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <motion.button
                  onClick={handleSimulate}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-base shadow-lg evm-btn-glow relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Simulate Transaction
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                </motion.button>
              </div>
              <div className="pt-2">
                <motion.button
                  onClick={handleSimulate}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-base shadow-lg relative overflow-hidden group ${styles["evm-btn-glow"]}`}
                >
                  <span className="flex items-center justify-center gap-2">
                    Simulate Transaction
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
