"use client";

import React, { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSignMessage } from "wagmi";
import {
  authConnect as AuthApiConnect,
  authGetAPI as AuthFetchAPi
} from "@/api/api";
import { motion } from "framer-motion";
import Confetti from "react-dom-confetti";

function Page() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false); // new state
  const [showConfetti, setShowConfetti] = useState(false);
  const [copied, setCopied] = useState(false);

  // Confetti on new API key
  useEffect(() => {
    if (apiKey) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
    }
  }, [apiKey]);

  // Fetch existing key when wallet connects
  useEffect(() => {
    const fetchAPiKey = async () => {
      if (!address) return;
      setFetching(true);
      try {
        const res = await AuthFetchAPi(address);
        if (res.data.apiKey) {
          setApiKey(res.data.apiKey);
        }
      } catch (err) {
        console.error("Error fetching API key:", err);
      } finally {
        setFetching(false);
      }
    };
    fetchAPiKey();
  }, [address]);

  // Generate new key
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

  // Copy API key
  const handleCopy = () => {
    if (!apiKey) return;
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Confetti config
  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    duration: 2500,
    stagger: 3,
    width: "10px",
    height: "10px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 animate-pulse"></div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-gray-900 to-black border border-white/10 shadow-2xl backdrop-blur-xl"
      >
        <h1 className="text-5xl font-bold text-center mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          TxShield API Dashboard
        </h1>
        <p className="text-center text-gray-400 mb-8 text-lg">
          Securely generate and manage your API key to integrate TxShield into your platform.
        </p>

        {/* Wallet connect */}
        <div className="flex justify-center mb-10">
          <ConnectButton />
        </div>

        {/* If wallet not connected */}
        {!isConnected && (
          <p className="text-center text-gray-500">
            🔑 Connect your wallet to view or generate your API key.
          </p>
        )}

        {/* If fetching */}
        {isConnected && fetching && (
          <div className="flex justify-center">
            <svg className="animate-spin h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"></path>
            </svg>
          </div>
        )}

        {/* No API key yet */}
        {isConnected && !fetching && !apiKey && (
          <div className="flex flex-col items-center space-y-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerateKey}
              disabled={loading}
              className="w-full px-8 py-4 bg-gradient-to-r from-white to-gray-300 text-black font-bold rounded-xl hover:from-gray-200 hover:to-white transition-all duration-300 shadow-xl flex items-center justify-center"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"></path>
                  </svg>
                  Generating...
                </span>
              ) : "Generate API Key"}
            </motion.button>
          </div>
        )}


        {/* API key exists */}
        {isConnected && apiKey && !fetching && (
          <div className="flex flex-col items-center space-y-6">
            {/* Confetti */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
              <Confetti active={showConfetti} config={confettiConfig} />
            </div>

            <p className="text-green-400 font-semibold text-lg flex items-center">
              API Key Generated
            </p>

            <div className="w-full flex items-center justify-between px-6 py-4 rounded-xl bg-gradient-to-r from-white/5 to-gray-800/50 border border-white/10 shadow-inner relative overflow-hidden">
              {/* Shimmer effect */}
              <span style={{
          fontFamily: "'ClashDisplay-Bold', sans-serif",
         }} className="truncate max-w-xs bg-gradient-to-r from-white-100 via-white to-black-200 bg-clip-text text-transparent animate-[shimmer_2s_infinite]">
                {apiKey}
              </span>

              {/* Copy button with animation */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className={`ml-4 px-4 py-2 rounded-lg transition-all flex items-center font-medium
      ${copied
                    ? "bg-green-400 text-black scale-105 shadow-lg"
                    : "bg-white text-black hover:bg-gray-200"}`}
              >
                {copied ? "Copied!" : "Copy"}
              </motion.button>
            </div>
          </div>
        )}

        {/* Docs link */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.open("https://txshield.gitbook.io/txshield-docs/", "_blank")}
          className="w-full mt-10 px-8 py-4 rounded-xl border border-white/20 bg-gradient-to-r from-transparent to-transparent hover:from-white/5 hover:to-white/10 transition-all duration-300 relative overflow-hidden group"
        >
          <span className="flex items-center justify-center font-medium text-white">
            View Documentation
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </span>
        </motion.button>

      </motion.div>
    </div>
  );
}

export default Page;
