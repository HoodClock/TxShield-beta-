"use client";

import { useState } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { m } from "framer-motion";
import ScrambleText from "../ScrambleText";
import DataFlowBackground from "../DataFlowBackground";

export default function SimulationForm({
  onSimulateAll,
  backButtonHandler,
  onSwitchChain,
}) {
  const { address: userAddress } = useAccount();
  const [contractAddress, setContractAddress] = useState("");
  const DEFAULT_SIMULATION_AMOUNT = "0.05";

  const CHAINS = [
    { id: 1, name: "Ethereum", symbol: "ETH" },
    { id: 56, name: "BNB Chain", symbol: "BNB" },
    { id: 8453, name: "Base", symbol: "ETH" },
    { id: 42161, name: "Arbitrum", symbol: "ETH" },
  ];
  const [selectedChain, setSelectedChain] = useState(CHAINS[0]);

  const handleSimulate = async () => {
    console.log("Submit button clicked!", {
      userAddress,
      contractAddress,
    });

    if (!userAddress) {
      alert("Please connect your wallet first.");
      return;
    }

    if (!contractAddress) {
      alert("Please enter your contract address");
      return;
    }

    const currencySymbol = selectedChain.symbol;
    const currency = selectedChain.symbol;
    const chainId = selectedChain.id;

    // credentials for simulation
    const simulationData = {
      userAddress,
      contractAddress: contractAddress.trim(),
      recepientAddress: contractAddress.trim(),
      amount: DEFAULT_SIMULATION_AMOUNT,
      currencySymbol,
      currency,
      chainId,
    };

    // credentials for honeypot
    const honeypotData = {
      contractAddress: contractAddress.trim(),
      chainId: chainId,
    };

    onSimulateAll({ honeypotData, simulationData });
  };

  return (
    <>
      <m.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="relative p-1 rounded-3xl max-w-2xl mx-auto shadow-2xl"
      >
        <div className="relative bg-black/40 border border-white/10 backdrop-blur-2xl rounded-[32px] p-8 md:p-10 overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)]">
          <DataFlowBackground className="opacity-10 z-0" />
          {/* Ambient Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          {/* Blue Light Pillar Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/15 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          {/* Top Control Bar */}
          <div className="absolute top-5 left-5 flex items-center gap-3 z-20">
            {/* Go Back Button */}
            <button
              onClick={backButtonHandler}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300 group glitch-hover"
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

            {/* Switch Chain Button */}
            <button
              onClick={onSwitchChain}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/50 transition-all duration-300 flex items-center gap-2 group glitch-hover"
              title="Switch to Solana Simulation"
            >
              <Image
                src="https://assets.coingecko.com/coins/images/4128/small/solana.png"
                alt="Solana"
                width={16}
                height={16}
                className="rounded-full group-hover:rotate-12 transition-transform duration-300"
                priority
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
              />
              <span className="text-xs font-mono text-gray-400 group-hover:text-purple-300 transition-colors">
                Switch to SOL
              </span>
            </button>
          </div>

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
                <ScrambleText text="EVM" className="inline-block" />{" "}
                <span className="text-blue-500">Simulation</span>
              </h2>
              <p className="text-gray-400 text-sm max-w-md mx-auto">
                Securely simulate Ethereum transactions before you sign.
              </p>
            </div>

            <div className="space-y-6 max-w-lg mx-auto">
              <div className="group/input">
                <label className="block text-blue-400 font-mono text-xs uppercase tracking-widest mb-2 ml-1 opacity-80 group-focus-within/input:opacity-100 group-focus-within/input:text-blue-300 transition-all duration-300">
                  Target Network
                </label>
                <div className="relative">
                  <div className="absolute inset-0 bg-black/40 rounded-xl shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] pointer-events-none transition-colors duration-300 group-focus-within/input:bg-black/60 border border-white/5 group-focus-within/input:border-blue-500/30"></div>
                  <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-500 blur-[1px]"></div>

                  <select
                    className="relative z-10 w-full px-5 py-4 rounded-xl bg-transparent text-white focus:outline-none transition-all duration-300 font-mono text-sm appearance-none cursor-pointer"
                    value={selectedChain.id}
                    onChange={(e) => {
                      const chain = CHAINS.find(
                        (c) => c.id === Number(e.target.value),
                      );
                      setSelectedChain(chain);
                    }}
                  >
                    {CHAINS.map((chain) => (
                      <option
                        key={chain.id}
                        value={chain.id}
                        className="bg-[#0a0a0a] text-white font-mono"
                      >
                        {chain.name} ({chain.id})
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500/50 group-focus-within/input:text-blue-400 transition-colors pointer-events-none z-20">
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
                        strokeWidth={1.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="group/input">
                <label className="block text-blue-400 font-mono text-xs uppercase tracking-widest mb-2 ml-1 opacity-80 group-focus-within/input:opacity-100 group-focus-within/input:text-blue-300 transition-all duration-300">
                  Target Contract
                </label>
                <div className="relative">
                  {/* Hollow Input Background */}
                  <div className="absolute inset-0 bg-black/40 rounded-xl shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] pointer-events-none transition-colors duration-300 group-focus-within/input:bg-black/60 border border-white/5 group-focus-within/input:border-blue-500/30"></div>

                  {/* Bottom Glow Element */}
                  <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-500 blur-[1px]"></div>

                  <input
                    type="text"
                    placeholder="0x..."
                    className="relative z-10 w-full px-5 py-4 rounded-xl bg-transparent text-white placeholder-gray-600 focus:outline-none transition-all duration-300 font-mono text-sm"
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500/50 group-focus-within/input:text-blue-400 transition-colors pointer-events-none z-20">
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

              <div className="pt-6 relative z-50">
                <m.button
                  onClick={handleSimulate}
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-blue-600/20 border border-blue-500/50 text-white font-bold tracking-widest uppercase text-sm shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:bg-blue-600/40 relative overflow-hidden group glitch-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 pointer-events-auto"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-all"></div>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Execute Simulation
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 group-hover:translate-x-1 group-hover:text-blue-300 transition-all"
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
                </m.button>
              </div>
            </div>
          </div>
        </div>
      </m.div>
    </>
  );
}
