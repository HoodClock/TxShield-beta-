"use client";
export const dynamic = "force-dynamic";

import React, { useState, useEffect, Suspense, lazy } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSignMessage } from "wagmi";
import {
  authConnect as AuthApiConnect,
  authGetAPI as AuthFetchAPi,
} from "@/api/api";
import { motion } from "framer-motion";
import Confetti from "react-dom-confetti";
import Head from "next/head";
import ScrollProgressBar from "../components/ScrollProgressBar";

const Header = lazy(() => import("../components/header"));
const Footer = lazy(() => import("../components/footer"));

function ApiRefPage() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (apiKey) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
    }
  }, [apiKey]);

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
    if (!apiKey) return;
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    duration: 2500,
    stagger: 3,
    width: "10px",
    height: "10px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };



  const ApiKeySection = () => (
    <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto p-8 rounded-2xl glass-morphism gradient-border relative overflow-hidden">
          {/* Animated Background Orbs */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black to-black"></div>
          </div>
          <h2 className="text-3xl font-bold text-center mb-6 text-white relative z-10">
            Your API Key
          </h2>
          <div className="flex justify-center mb-8">
            <ConnectButton />
          </div>

          {!isConnected && (
            <p className="text-center text-gray-500">
              Connect your wallet to generate and view your API key.
            </p>
          )}

          {isConnected && fetching && (
            <div className="flex justify-center">
              <svg
                className="animate-spin h-6 w-6 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
                ></path>
              </svg>
            </div>
          )}

          {isConnected && !fetching && !apiKey && (
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGenerateKey}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold rounded-lg transition-all duration-300 hover:from-purple-600 hover:to-cyan-600"
              >
                {loading ? "Generating..." : "Generate API Key"}
              </motion.button>
            </div>
          )}

          {isConnected && apiKey && !fetching && (
            <div className="text-center">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                <Confetti active={showConfetti} config={confettiConfig} />
              </div>
              <p className="text-green-400 mb-4">Your API Key is ready:</p>
              <div className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-gray-800/60 border border-white/10">
                <span className="font-mono text-gray-300 truncate">
                  {apiKey}
                </span>
                <button
                  onClick={handleCopy}
                  className={`ml-4 px-3 py-1 rounded-md text-sm transition-colors ${ 
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-gray-600 hover:bg-gray-500 text-gray-200"
                  }`}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>
    </section>
  );

  const ApiTutorialSection = () => (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto p-8 rounded-2xl glass-morphism gradient-border relative overflow-hidden">
          {/* Animated Background Orbs */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black to-black"></div>
          </div>
          <h2 className="text-3xl font-bold text-center mb-8 text-white relative z-10">
            How to Use the TxShield API
          </h2>
          <div className="space-y-6 text-gray-400">
            <ul className="list-disc list-inside space-y-3 pl-5">
              <li>
                <strong>Step 1: Connect Wallet.</strong> Connect your Web3 wallet to our platform.
              </li>
              <li>
                <strong>Step 2: Generate API Key.</strong> Click "Generate API Key" above to create your unique key.
              </li>
              <li>
                <strong>Step 3: Copy API Key.</strong> Copy the displayed API key; keep it secure.
              </li>
              <li>
                <strong>Step 4: Use API Key in Requests.</strong> Include your API key in the <code className="bg-gray-700 px-1 rounded">x-api-key</code> header for all requests.
              </li>
              <li>
                <strong>Available API Endpoints:</strong>
                <ul className="list-disc list-inside space-y-2 pl-5 mt-2">
                  <li><strong className="text-purple-400">POST /v1/simulate</strong>: Simulate EVM transaction.</li>
                  <li><strong className="text-purple-400">POST /v1/honeypot</strong>: Check token for honeypot.</li>
                  <li><strong className="text-purple-400">POST /v1/phishing</strong>: Analyze transaction for phishing risks.</li>
                  <li><strong className="text-purple-400">POST /v1/sol-simulate</strong>: Simulate Solana transaction.</li>
                </ul>
              </li>
            </ul>
            <div className="flex justify-center mt-8">
              <a
                href="https://txshield.gitbook.io/txshield-docs" // New documentation URL
                target="_blank" // Open in new tab
                rel="noopener noreferrer" // Security best practice for target="_blank"
                className="text-gray-500 hover:text-gray-300 underline transition-colors duration-300 text-lg"
              >
                Learn More
              </a>
            </div>
          </div>
      </div>
    </section>
  );


  return (
    <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden relative">
       <style>{`
        /* For Webkit browsers (Chrome, Safari, Edge) */
        .overflow-x-auto::-webkit-scrollbar {
          height: 8px; /* height of horizontal scrollbar */
        }

        .overflow-x-auto::-webkit-scrollbar-track {
          background: #2d2d2d; /* color of the tracking area */
          border-radius: 10px;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb {
          background-color: #555; /* color of the scroll thumb */
          border-radius: 10px; /* roundness of the scroll thumb */
          border: 2px solid #2d2d2d; /* creates padding around scroll thumb */
        }

        /* For Firefox */
        .overflow-x-auto {
          scrollbar-width: thin; /* "auto" or "thin" */
          scrollbar-color: #555 #2d2d2d; /* thumb and track color */
        }

        .glass-morphism {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .gradient-border {
          background: linear-gradient(black, black) padding-box,
                      linear-gradient(45deg, rgba(30, 30, 30, 0.8), white, rgba(30, 30, 30, 0.8)) border-box;
          border: 1px solid transparent;
        }
      `}</style>
      <Head>
        <title>TxShield - API Reference</title>
      </Head>

      <Suspense fallback={<div className="h-16 bg-black"></div>}>
        <Header />
      </Suspense>
      <ScrollProgressBar />
      
      <main>
        <div className="orb-bg section-merge pt-70 text-center">
            <div className="orb orb-1" aria-hidden="true"></div>
            <div className="orb orb-2" aria-hidden="true"></div>
            <div className="orb orb-3" aria-hidden="true"></div>
            <h1 className="pt-12 text-5xl md:text-7xl font-bold bg-clip-text text-transparent grad-word relative z-10">
              TxShield API
            </h1>
        </div>
        <div className="section-divider"></div>

        <div className="orb-bg section-merge pt-20">
            <div className="orb orb-1" aria-hidden="true"></div>
            <div className="orb orb-2" aria-hidden="true"></div>
            <div className="orb orb-3" aria-hidden="true"></div>
            <ApiKeySection />
        </div>
        <div className="section-divider"></div>
        <div className="orb-bg section-merge">
            <div className="orb orb-1" aria-hidden="true"></div>
            <div className="orb orb-2" aria-hidden="true"></div>
            <div className="orb orb-3" aria-hidden="true"></div>
            <ApiTutorialSection />
        </div>
        <div className="section-divider"></div>

      </main>

      <Suspense fallback={<div className="h-20 bg-black"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default ApiRefPage;
