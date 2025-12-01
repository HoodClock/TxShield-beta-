"use client";

import { useState } from "react";
import { serialize, useAccount } from "wagmi";
import { motion } from "framer-motion";


export default function SimulationForm({ onSimulateAll }) {
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
          background-image: linear-gradient(to right, #627EEA 0%, #8C52FF 50%, #627EEA 100%);
          transition: background-position 0.5s ease;
        }
        .evm-btn-gradient-anim:hover {
          background-position: right center; /* change the direction of the change here */
        }
      `}</style>
      <div className="relative p-6 mb-8 border border-[#627EEA]/50 rounded-2xl shadow-xl max-w-4xl mx-auto overflow-hidden bg-gradient-to-br from-[#1C1C2E] to-[#0A0A1A] backdrop-blur-sm" // Deeper, more distinct background
        style={{ boxShadow: "0 0 80px rgba(98, 126, 234, 0.5)" }} // Even stronger blue glow
      >
        {/* Ethereum themed glow/gradient - more prominent */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#627EEA] to-[#8C52FF] opacity-15 blur-3xl rounded-2xl"></div>
        {/* Another subtle background layer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-700/10 via-transparent to-transparent opacity-5"></div>
        <h2 className="text-2xl font-bold text-white mb-6">
          Secure Your Transactions
        </h2>
        <p className="text-gray-300 mb-6">
          Simulate and analyze your blockchain transactions before execution with
          our advanced security checks
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <label
              htmlFor="contractAddress"
              className="block text-left text-gray-300 mb-2 text-sm font-medium"
            >
              Contract / Wallet / Token Address
            </label>
            <div className="relative">
              <input
                type="text"
                id="contractAddress"
                placeholder="0x..."
                className="w-full px-4 py-3 border border-blue-400/30 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
              />
              <div className="absolute right-3 top-3 group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors"
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
                <div className="absolute hidden group-hover:block right-0 top-full mt-2 w-64 bg-gray-800 text-gray-300 text-sm p-3 rounded-lg shadow-lg border border-white/20 z-10">
                  Enter any Ethereum contract, wallet, or token address to
                  analyze.
                </div>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-left text-gray-300 mb-2 text-sm font-medium"
            >
              Amount
            </label>
            <div className="relative">
              <input
                type="number"
                id="amount"
                placeholder="0.0"
                className="w-full px-4 py-3 border border-blue-400/30 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-8">
          <motion.button
            onClick={handleSimulate}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full md:w-auto px-8 py-3 text-white font-bold rounded-lg transition-all duration-300 shadow-lg shadow-[#627EEA]/40 flex items-center justify-center evm-btn-gradient-anim relative z-10"
            style={{position: 'relative'}}
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
        </div>
      </div>
    </>
  );
}
