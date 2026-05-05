"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ScrambleText from "../ScrambleText";
import DataFlowBackground from "../DataFlowBackground";

import styles from "./evmSimulationForm.module.css";

export default function SimulationForm({
  onSimulateAll,
  backButtonHandler,
  onSwitchChain,
  isLoading,
}) {
  const [contractAddress, setContractAddress] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const CHAINS = [
    {
      id: 1,
      name: "Ethereum",
      symbol: "ETH",
      icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
    },
    {
      id: 56,
      name: "BNB Chain",
      symbol: "BNB",
      icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png",
    },
    {
      id: 8453,
      name: "Base",
      symbol: "ETH",
      icon: "https://avatars.githubusercontent.com/u/108554348?v=4",
    },
    {
      id: 42161,
      name: "Arbitrum",
      symbol: "ETH",
      icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png",
    },
  ];
  const [selectedChain, setSelectedChain] = useState(CHAINS[0]);

  const handleSimulate = async () => {
    if (!contractAddress) {
      alert("Please enter a contract address.");
      return;
    }

    const chainId = selectedChain.id;

    // credentials for simulation
    const _evmPayload = {
      contractAddress: contractAddress.trim(),
      chainId,
    };

    onSimulateAll(_evmPayload);
  };

  return (
    <>
      <m.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-2xl mx-auto"
      >
        <div className="relative bg-[#050505]/60 border border-white/10 backdrop-blur-3xl p-8 md:p-12 overflow-hidden flex flex-col gap-8 rounded-[40px] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          <DataFlowBackground className="opacity-10 z-0 pointer-events-none" />
          {/* Ambient Minimal Glows */}
          <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-cyan-900/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-blue-900/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          {/* Top Control Bar */}
          <div className="absolute top-6 left-6 z-20">
            {/* Go Back Button */}
            <button
              onClick={backButtonHandler}
              className="p-3 rounded-full bg-white/[0.02] hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 transition-all duration-300 group"
              title="Go Back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 group-hover:-translate-x-1 transition-transform"
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
          </div>

          <div className="relative z-10">
            <div className="text-center mb-10 flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-light text-white mb-3 tracking-[0.1em] uppercase">
                <span className="font-semibold text-cyan-400">EVM</span> Target
              </h2>
              <p className="text-gray-500 text-xs md:text-sm max-w-md mx-auto font-mono tracking-widest uppercase">
                Enter target smart contract details
              </p>
            </div>

            <div className="space-y-6 max-w-lg mx-auto relative">
              <div className="group/input relative z-[60]">
                <label className="block text-gray-400 font-medium text-[11px] uppercase tracking-[0.15em] mb-2 ml-4 group-focus-within/input:text-cyan-400 transition-colors duration-300">
                  Target Network
                </label>
                <div className="relative z-50">
                  {/* Bubbly Input Background */}
                  <div className="absolute inset-0 bg-white/[0.02] rounded-3xl border border-white/10 group-focus-within/input:border-cyan-500/50 group-focus-within/input:bg-cyan-500/[0.05] group-hover/input:bg-white/[0.04] transition-all duration-500"></div>

                  <div
                    className="relative z-10 w-full px-6 py-4 bg-transparent text-white cursor-pointer select-none"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedChain.icon}
                          alt={selectedChain.name}
                          className="w-5 h-5 rounded-full object-cover shadow-sm"
                        />
                        <span className="font-mono text-sm transition-colors group-hover:text-white">
                          {selectedChain.name}{" "}
                          <span className="text-gray-500 text-xs ml-1 opacity-70">
                            ({selectedChain.id})
                          </span>
                        </span>
                      </div>
                      <m.svg
                        animate={{ rotate: dropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500/50"
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
                      </m.svg>
                    </div>
                  </div>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <m.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-16 left-0 right-0 mt-2 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] z-50 overflow-hidden"
                      >
                        {CHAINS.map((chain) => (
                          <div
                            key={chain.id}
                            onClick={() => {
                              setSelectedChain(chain);
                              setDropdownOpen(false);
                            }}
                            className={`flex items-center gap-3 px-5 py-4 cursor-pointer transition-all duration-200 ${
                              selectedChain.id === chain.id
                                ? "bg-blue-500/20 text-white border-l-2 border-blue-500"
                                : "hover:bg-white/5 text-gray-400 hover:text-white border-l-2 border-transparent hover:border-blue-400/50"
                            }`}
                          >
                            <img
                              src={chain.icon}
                              alt={chain.name}
                              className={`w-5 h-5 rounded-full object-cover ${selectedChain.id === chain.id ? "shadow-[0_0_10px_rgba(59,130,246,0.6)]" : ""}`}
                            />
                            <span className="font-mono text-sm">
                              {chain.name}
                            </span>
                            <span className="text-xs ml-auto font-mono opacity-50">
                              ID: {chain.id}
                            </span>
                          </div>
                        ))}
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="group/input relative z-[50]">
                <label className="block text-gray-400 font-medium text-[11px] uppercase tracking-[0.15em] mb-2 ml-4 group-focus-within/input:text-cyan-400 transition-colors duration-300">
                  Target Contract Address
                </label>
                <div className="relative">
                  {/* Bubbly Input Background */}
                  <div className="absolute inset-0 bg-white/[0.02] rounded-3xl border border-white/10 group-focus-within/input:border-cyan-500/50 group-focus-within/input:bg-cyan-500/[0.05] group-hover/input:bg-white/[0.04] transition-all duration-500"></div>

                  <input
                    type="text"
                    placeholder="0x..."
                    className="relative z-10 w-full px-6 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none transition-all duration-300 font-mono text-sm tracking-wide"
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

              <div className="pt-8 relative z-[40]">
                <m.button
                  onClick={handleSimulate}
                  disabled={isLoading}
                  whileHover={isLoading ? {} : { scale: 1.02 }}
                  whileTap={isLoading ? {} : { scale: 0.95 }}
                  className={`w-full py-4 rounded-full border text-white font-medium tracking-[0.15em] uppercase text-xs sm:text-sm relative overflow-hidden group transition-all duration-500 ${
                    isLoading
                      ? "bg-white/5 border-white/10 text-white/30 cursor-not-allowed"
                      : "bg-white/5 border-white/20 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.3)] cursor-pointer"
                  }`}
                >
                  {!isLoading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-400/10 to-cyan-500/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-all"></div>
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        Simulating...
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </span>
                </m.button>
              </div>

              {/* Switch Chain Button */}
              <div className="pt-4 flex justify-center relative z-[40]">
                <button
                  onClick={onSwitchChain}
                  className="px-5 py-2 rounded-full bg-white/[0.02] hover:bg-purple-500/10 border border-white/5 hover:border-purple-500/30 transition-all duration-300 flex items-center gap-2 group"
                  title="Switch to Solana Simulation"
                >
                  <Image
                    src="https://assets.coingecko.com/coins/images/4128/small/solana.png"
                    alt="Solana"
                    width={14}
                    height={14}
                    className="w-3.5 h-3.5 rounded-full group-hover:rotate-12 transition-transform duration-300"
                  />
                  <span className="text-[10px] font-mono text-gray-500 group-hover:text-purple-400 tracking-widest uppercase transition-colors">
                    Switch to SOL
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </m.div>
    </>
  );
}
