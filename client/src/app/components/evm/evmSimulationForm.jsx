"use client";

import { useState } from "react";
<<<<<<< HEAD
import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";
=======
import Image from "next/image";
import { useAccount } from "wagmi";
import { m } from "framer-motion";
>>>>>>> 2b8ce27548758e8d2162cf2fbd583c584e69af4a
import ScrambleText from "../ScrambleText";
import DataFlowBackground from "../DataFlowBackground";

export default function SimulationForm({
  onSimulateAll,
  backButtonHandler,
  onSwitchChain,
}) {
<<<<<<< HEAD
  const [contractAddress, setContractAddress] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
=======
  const { address: userAddress } = useAccount();
  const [contractAddress, setContractAddress] = useState("");
  const DEFAULT_SIMULATION_AMOUNT = "0.05";
>>>>>>> 2b8ce27548758e8d2162cf2fbd583c584e69af4a

  const CHAINS = [
    { id: 1, name: "Ethereum", symbol: "ETH", icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png" },
    { id: 56, name: "BNB Chain", symbol: "BNB", icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png" },
    { id: 8453, name: "Base", symbol: "ETH", icon: "https://avatars.githubusercontent.com/u/108554348?v=4" },
    { id: 42161, name: "Arbitrum", symbol: "ETH", icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png" },
  ];
  const [selectedChain, setSelectedChain] = useState(CHAINS[0]);

  const handleSimulate = async () => {
<<<<<<< HEAD
    if (!contractAddress) {
      alert("Please enter a contract address.");
      return;
    }

=======
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
>>>>>>> 2b8ce27548758e8d2162cf2fbd583c584e69af4a
    const chainId = selectedChain.id;

    // credentials for simulation
    const simulationData = {
<<<<<<< HEAD
      recepientAddress: contractAddress.trim(),
=======
      userAddress,
      contractAddress: contractAddress.trim(),
      recepientAddress: contractAddress.trim(),
      amount: DEFAULT_SIMULATION_AMOUNT,
      currencySymbol,
      currency,
>>>>>>> 2b8ce27548758e8d2162cf2fbd583c584e69af4a
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
<<<<<<< HEAD
                className="w-4 h-4 rounded-full group-hover:rotate-12 transition-transform duration-300"
=======
                className="rounded-full group-hover:rotate-12 transition-transform duration-300"
                priority
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
>>>>>>> 2b8ce27548758e8d2162cf2fbd583c584e69af4a
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

            <div className="space-y-6 max-w-lg mx-auto relative">
              <div className="group/input relative z-[60]">
                <label className="block text-blue-400 font-mono text-xs uppercase tracking-widest mb-2 ml-1 opacity-80 group-focus-within/input:opacity-100 group-focus-within/input:text-blue-300 transition-all duration-300">
                  Target Network
                </label>
                <div className="relative z-50">
                  <div className="absolute inset-0 bg-black/40 rounded-xl shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] pointer-events-none transition-colors duration-300 group-focus-within/input:bg-black/60 border border-white/5 group-focus-within/input:border-blue-500/30"></div>
                  <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-500 blur-[1px]"></div>

                  <div 
                    className="relative z-10 w-full px-5 py-4 rounded-xl bg-transparent text-white cursor-pointer select-none"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={selectedChain.icon} alt={selectedChain.name} className="w-5 h-5 rounded-full object-cover shadow-sm" />
                        <span className="font-mono text-sm transition-colors group-hover:text-white">{selectedChain.name} <span className="text-gray-500 text-xs ml-1 opacity-70">({selectedChain.id})</span></span>
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
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
                        className="absolute top-16 left-0 right-0 mt-2 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] z-50 overflow-hidden"
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
                            <img src={chain.icon} alt={chain.name} className={`w-5 h-5 rounded-full object-cover ${selectedChain.id === chain.id ? 'shadow-[0_0_10px_rgba(59,130,246,0.6)]' : ''}`} />
                            <span className="font-mono text-sm">{chain.name}</span>
                            <span className="text-xs ml-auto font-mono opacity-50">ID: {chain.id}</span>
                          </div>
                        ))}
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="group/input relative z-[50]">
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

<<<<<<< HEAD


              <div className="pt-6 relative z-[40]">
=======
              <div className="pt-6 relative z-50">
>>>>>>> 2b8ce27548758e8d2162cf2fbd583c584e69af4a
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
