"use client";

import { useState } from "react";
import { serialize, useAccount } from "wagmi";
import { motion } from "framer-motion";


export default function SimulationForm({ onSimulateAll, backButtonHandler }) {
  const { address: userAddress, isConnected } = useAccount();
  const [contractAddress, setContractAddress, ] = useState("");
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
    };

    // credentials for honeypot
    const honeypotData = {
      address: contractAddress,
      userAddress,
      contractAddress,
      tokenAddress: contractAddress,
      recepientAddress: contractAddress,
      value: amount,
      currencySymbol: currency,
    };

    onSimulateAll({ honeypotData, simulationData })
  };

  return (
    <>
      <style jsx>{`
        .evm-btn-gradient-anim {
          background-size: 200% auto;
          background-image: linear-gradient(to right, #627EEA 0%, #4A90E2 50%, #627EEA 100%);
          transition: background-position 0.5s ease;
        }
        .evm-btn-gradient-anim:hover {
          background-position: right center;
        }
        .evm-form-container {
          background: linear-gradient(135deg, rgba(98, 126, 234, 0.05) 0%, rgba(74, 144, 226, 0.03) 100%);
        }
        .evm-input-focus {
          border-color: #627EEA;
          box-shadow: 0 0 20px rgba(98, 126, 234, 0.2);
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type='number'] {
          -moz-appearance: textfield;
        }
      `}</style>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative p-8 mb-8 border border-[#627EEA]/40 rounded-2xl shadow-2xl max-w-4xl mx-auto overflow-hidden evm-form-container backdrop-blur-lg"
        style={{ boxShadow: "0 0 40px rgba(98, 126, 234, 0.15), inset 0 0 40px rgba(98, 126, 234, 0.03)" }}
      >
        {/* Gradient border glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#627EEA]/10 via-transparent to-[#4A90E2]/5 pointer-events-none"></div>
        
        {/* Animated background orbs - Reduced glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/3 rounded-full blur-3xl animate-pulse"></div>

        <button
          onClick={backButtonHandler}
          className="absolute top-4 left-4 text-gray-400 hover:text-white transition-all duration-300 z-20 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#627EEA] to-[#4A90E2] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.5 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm6 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm6 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#627EEA] to-[#4A90E2]">
              Ethereum Simulation
            </h2>
          </div>
          <p className="text-gray-400 mb-8 text-sm md:text-base">
            Analyze your EVM transaction with advanced security scanning and risk detection
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <label
                htmlFor="contractAddress"
                className="block text-left text-gray-200 mb-3 text-sm font-semibold"
              >
                Contract / Wallet / Token Address
              </label>
              <div className="relative group">
                <input
                  type="text"
                  id="contractAddress"
                  placeholder="0x..."
                  className="w-full px-4 py-3 border border-[#627EEA]/30 rounded-lg text-white bg-black/30 focus:outline-none focus:ring-2 focus:ring-[#627EEA] focus:border-[#627EEA] transition-all duration-300 placeholder-gray-600"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                />
                <div className="absolute right-3 top-3 group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500 hover:text-[#627EEA] cursor-pointer transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-left text-gray-200 mb-3 text-sm font-semibold"
              >
                Amount (ETH)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="amount"
                  placeholder="0.0"
                  className="w-full px-4 py-3 border border-[#627EEA]/30 rounded-lg text-white bg-black/30 focus:outline-none focus:ring-2 focus:ring-[#627EEA] focus:border-[#627EEA] transition-all duration-300 placeholder-gray-600"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </div>

          <motion.div 
            className="mt-8 flex justify-center relative"
            whileHover={{ scale: 1.02 }}
          >
            {/* Blue gradient glow around button */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#627EEA]/20 via-[#4A90E2]/20 to-[#627EEA]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-150"></div>
            
            <motion.button
              onClick={handleSimulate}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto px-8 py-4 text-white font-bold rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center evm-btn-gradient-anim relative z-10 hover:shadow-2xl hover:shadow-[#627EEA]/50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Simulate Transaction
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
