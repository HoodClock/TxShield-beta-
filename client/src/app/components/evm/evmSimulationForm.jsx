"use client";

import { useState } from "react";
import { m } from "framer-motion";
import ScrambleText from "../ScrambleText";
import DataFlowBackground from "../DataFlowBackground";
import Image from "next/image";
import styles from "./evmSimulationForm.module.css";

export default function SimulationForm({
  onSimulateAll,
  backButtonHandler,
  onSwitchChain,
}) {
  // ❌ Removed wallet (wagmi)

  const [contractAddress, setContractAddress] = useState("");

  const CHAINS = [
    { id: 1, name: "Ethereum", symbol: "ETH" },
    { id: 56, name: "BNB Chain", symbol: "BNB" },
    { id: 8453, name: "Base", symbol: "ETH" },
    { id: 42161, name: "Arbitrum", symbol: "ETH" },
  ];
  const [selectedChain, setSelectedChain] = useState(CHAINS[0]);

  const handleSimulate = async () => {
    console.log("Submit button clicked!", {
      contractAddress,
    });

    if (!contractAddress) {
      alert("Please enter contract address.");
      return;
    }

    const currencySymbol = selectedChain.symbol;
    const currency = selectedChain.symbol;
    const chainId = selectedChain.id;

    // ✅ fallback user (safe dummy)
    const userAddress = "0x0000000000000000000000000000000000000000";

    // credentials for simulation
    const simulationData = {
      userAddress,
      recepientAddress: contractAddress.trim(),
      amount: "0", // ✅ fixed amount
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

          {/* UI unchanged above */}

          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 mb-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 shadow-inner shadow-blue-500/10">
                <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
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

              {/* ✅ Network selector (unchanged) */}
              <div className="group/input">
                <label className="block text-blue-400 font-mono text-xs uppercase tracking-widest mb-2 ml-1">
                  Target Network
                </label>

                <select
                  className="w-full px-5 py-4 rounded-xl bg-black text-white font-mono text-sm"
                  value={selectedChain.id}
                  onChange={(e) => {
                    const chain = CHAINS.find(
                      (c) => c.id === Number(e.target.value),
                    );
                    setSelectedChain(chain);
                  }}
                >
                  {CHAINS.map((chain) => (
                    <option key={chain.id} value={chain.id}>
                      {chain.name} ({chain.id})
                    </option>
                  ))}
                </select>
              </div>

              {/* ✅ Contract input */}
              <div className="group/input">
                <label className="block text-blue-400 font-mono text-xs uppercase tracking-widest mb-2 ml-1">
                  Target Contract
                </label>

                <input
                  type="text"
                  placeholder="0x..."
                  className="w-full px-5 py-4 rounded-xl bg-black text-white font-mono text-sm"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                />
              </div>

              {/* ❌ AMOUNT FIELD REMOVED */}

              {/* ✅ Button */}
              <div className="pt-6 relative z-50">
                <m.button
                  onClick={handleSimulate}
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-blue-600/20 border border-blue-500/50 text-white font-bold uppercase text-sm"
                >
                  Execute Simulation
                </m.button>
              </div>

            </div>
          </div>
        </div>
      </m.div>
    </>
  );
}