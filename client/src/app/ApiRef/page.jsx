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

  const ApiHeroSection = () => (
    <section className="relative text-center py-20 px-4">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-500 bg-clip-text text-transparent">
          TxShield API
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
          Integrate our powerful transaction simulation and security analysis directly into your dApp or service. Get started in minutes.
        </motion.p>
      </div>
    </section>
  );

  const ApiKeySection = () => (
    <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto p-8 rounded-2xl glass-morphism gradient-border">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">
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

  const ApiDocsSection = () => (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            API Documentation
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Introduction</h3>
              <p className="text-gray-400">
                The TxShield API provides endpoints for simulating transactions, checking for honeypots, and detecting phishing scams. To get started, generate an API key above and include it in the `x-api-key` header of your requests.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Authentication</h3>
              <p className="text-gray-400 mb-4">
                Authenticate your API requests by including your API key in the `x-api-key` header.
              </p>
              <pre className="bg-gray-900 p-4 rounded-lg border border-white/10 overflow-x-auto">
                <code className="text-sm text-gray-300">
                  {`curl --request POST \\n--url 'https://api.txshield.com/v1/simulate' \\n--header 'x-api-key: YOUR_API_KEY' \\n--header 'Content-Type: application/json'`}
                </code>
              </pre>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Endpoints</h3>
                <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-purple-400">POST /v1/simulate</h4>
                    <p className="text-gray-400">Simulate a transaction on an EVM-compatible chain.</p>
                    <h4 className="text-xl font-semibold text-purple-400">POST /v1/honeypot</h4>
                    <p className="text-gray-400">Check a token address for honeypot characteristics.</p>
                    <h4 className="text-xl font-semibold text-purple-400">POST /v1/phishing</h4>
                    <p className="text-gray-400">Analyze a transaction for phishing risks.</p>
                </div>
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
                      linear-gradient(45deg, transparent, white, transparent) border-box;
          border: 1px solid transparent;
        }
      `}</style>
      <Head>
        <title>TxShield - API Reference</title>
      </Head>

      <Suspense fallback={<div className="h-16 bg-black"></div>}>
        <Header />
      </Suspense>
      
      <main>
        <div className="orb-bg section-merge">
            <div className="orb orb-1" aria-hidden="true"></div>
            <div className="orb orb-2" aria-hidden="true"></div>
            <div className="orb orb-3" aria-hidden="true"></div>
            <ApiHeroSection />
        </div>
        <div className="section-divider"></div>
        <div className="orb-bg section-merge">
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
            <ApiDocsSection />
        </div>
      </main>

      <Suspense fallback={<div className="h-20 bg-black"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default ApiRefPage;
