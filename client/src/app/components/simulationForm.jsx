"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";


export default function SimulationForm({ onSimulate, onHoneypot }) {
  const { address: userAddress, isConnected } = useAccount();

  const [contractAddress, setContractAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("ETH");

  const handleSimulate = () => {
    if (!contractAddress || !amount) {
      alert("Please enter both contract address and amount");
      return;
    }

    // credentials for simulation
    const simulationData = {
      userAddress,
      recepientAddress: contractAddress,
      amount: amount,
    };

    console.log("the frontend simulation user Address:: ", simulationData.userAddress);
    console.log("the frontend simulation recepient Address:: ", simulationData.recepientAddress);

    // credentials for honeypot
    const formData = {
      address: contractAddress,
      userAddress,
      contractAddress,
      tokenAddress: contractAddress,
      recepientAddress: contractAddress,
      value: amount,
    };

    onSimulate(simulationData);
    onHoneypot(formData);
  };

  return (
    <div className="bg-[#0f172a] rounded-xl p-6 mb-8 border border-yellow-500/20 shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">
        Secure Your Transactions
      </h2>
      <p className="text-gray-400 mb-6">
        Simulate and analyze your blockchain transactions before execution with
        our advanced security checks
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <label
            htmlFor="contractAddress"
            className="block text-left text-gray-400 mb-2 text-sm font-medium"
          >
            Contract / Wallet / Token Address
          </label>
          <div className="relative">
            <input
              type="text"
              id="contractAddress"
              placeholder="0x..."
              className="w-full px-4 py-3 bg-[#1e293b] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
            />
            <div className="absolute right-3 top-3 group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500 hover:text-yellow-400 cursor-pointer transition-colors"
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
              <div className="absolute hidden group-hover:block right-0 top-full mt-2 w-64 bg-gray-800 text-gray-300 text-sm p-3 rounded-lg shadow-lg border border-yellow-500/20 z-10">
                Enter any Ethereum contract, wallet, or token address to
                analyze.
              </div>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="amount"
            className="block text-left text-gray-400 mb-2 text-sm font-medium"
          >
            Amount
          </label>
          <div className="relative">
            <input
              type="number"
              id="amount"
              placeholder="0.0"
              className="w-full px-4 py-3 bg-[#1e293b] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent pr-20"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="absolute right-3 top-3">
              <select
                className="bg-gray-800 text-gray-300 text-sm rounded px-2 py-1 border border-gray-700 focus:ring-yellow-500 focus:border-yellow-500"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option>ETH</option>
                <option>USDC</option>
                <option>USDT</option>
                <option>DAI</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <motion.button
          onClick={handleSimulate}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg shadow-yellow-500/20 flex items-center justify-center"
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
  );
}
