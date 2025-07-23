"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "../components/header";
import { motion, useInView, useAnimation } from "framer-motion";
import CountUp from "react-countup";
import ContactUs from "../components/contactus";
import Link from "next/link";
import Footer from "../components/footer";

// ScamCard Component
const ScamCard = ({ title, description, icon, gradient, scamType }) => (
  <div
    className={`relative p-5 rounded-xl bg-gradient-to-br ${gradient} border border-white/10 backdrop-blur-sm overflow-hidden group hover:shadow-lg hover:-translate-y-2 transition-all duration-300`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      <p className="text-white/90 text-sm">{description}</p>
    </div>
    <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/30 text-xs text-white/80 border border-white/10">
      {scamType === "honeypot" ? "Honeypot" : "Phishing"}
    </div>
  </div>
);

function HomePage() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const isInView1 = useInView(ref1, { once: false });
  const isInView2 = useInView(ref2, { once: false });
  const isInView3 = useInView(ref3, { once: false });
  const controls = useAnimation();

  // just for simulation (our solution)
  const [address, setAddress] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  // Sample scam data
  const scamExamples = {
    Honeypot: {
      address: "0x1fD...3a4b",
      riskLevel: "Critical",
      type: "Honeypot",
      details:
        "This contract allows buying but prevents selling tokens. Funds will be trapped.",
      indicators: [
        "Sell function always reverts",
        "Ownership not renounced",
        "High tax on transfers",
      ],
    },
    Phishing: {
      address: "0x7a2...9c1d",
      riskLevel: "High",
      type: "Phishing",
      details: "Fake token contract designed to steal wallet approvals.",
      indicators: [
        "Fake token name mimicking legitimate project",
        "Malicious transfer function",
        "Unauthorized proxy contract",
      ],
    },
    "Rug Pull": {
      address: "0x3e5...7f2e",
      riskLevel: "Critical",
      type: "Rug Pull",
      details: "Liquidity can be removed by deployer at any time.",
      indicators: [
        "High owner privileges",
        "Liquidity not locked",
        "Recent creation date",
      ],
    },
    Malicious: {
      address: "0x9b4...6d3c",
      riskLevel: "Severe",
      type: "Malicious",
      details: "Contains hidden functions that can drain wallets.",
      indicators: [
        "Hidden transfer functions",
        "Proxy upgrade pattern",
        "Obfuscated code",
      ],
    },
  };

  const handleScan = (exampleType = null) => {
    setIsScanning(true);
    setScanResult(null);

    // Simulate API call delay
    setTimeout(() => {
      if (exampleType) {
        setScanResult(scamExamples[exampleType]);
      } else if (address) {
        // For demo purposes, randomly pick a result if user enters custom address
        const types = Object.keys(scamExamples);
        const randomType = types[Math.floor(Math.random() * types.length)];
        setScanResult(scamExamples[randomType]);
      }
      setIsScanning(false);
    }, 2000);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "Critical":
        return "bg-red-500/20 text-red-400 border-red-500/40";
      case "High":
        return "bg-orange-500/20 text-orange-400 border-orange-500/40";
      case "Severe":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/40";
    }
  };

  useEffect(() => {
    if (isInView1 || isInView2 || isInView3) {
      controls.start("visible");
    }
  }, [isInView1, isInView2, isInView3, controls]);

  const cardVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans scroll-smooth">
      <Header />
      {/* Hero Section */}
      <main className="flex flex-col md:flex-row justify-center items-center px-6 py-16 max-w-7xl mx-auto gap-12 min-h-[80vh]">
        <motion.div
          className="flex-1 text-center w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            style={{
              fontFamily: "'ClashDisplay-Bold', sans-serif",
              fontSize: "clamp(10rem, 12vw, 8rem)",
              lineHeight: "1.1",
            }}
            className="glow-text font-extrabold bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent mb-6 drop-shadow-lg px-4 break-words"
          >
            Shield Every Transaction.
          </h1>

          {/* Public Beta Badge */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400 border border-green-500/30">
              Public Beta
            </span>
            {/* FYS Badge - Premium Animated Version */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring", damping: 10 }}
              whileHover={{
                y: -3,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="mt-2"
            >
              <a
                href="https://findyoursaas.com/tool/6873a57d02a7a777326a9d9b/txshield"
                target="_blank"
                rel="noopener"
                className="relative inline-flex items-center px-3 py-1.5 pr-4 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-gray-600 shadow-lg overflow-hidden group"
              >
                {/* Gradient shine animation (horizontal sweep) */}
                <motion.span
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 150, opacity: 0.4 }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "easeInOut",
                  }}
                  className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />

                {/* Logo with subtle pulse */}
                <motion.img
                  src="https://findyoursaas.com/fys-logo.png"
                  alt="FYS Logo"
                  className="w-5 h-5 rounded-full mr-2 z-10"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Text with shimmer */}
                <span className="text-xs font-medium text-gray-100 z-10">
                  Featured on{" "}
                  <span className="font-semibold text-white">FYS</span>
                </span>
              </a>
            </motion.div>
          </div>

          {/* Shield Now Button - Centered with hover effects */}
          <div className="flex justify-center">
            <Link
              href="/simulate"
              style={{ fontFamily: "'ClashDisplay-Medium', sans-serif" }}
              className="inline-flex items-center px-6 py-3 font-medium text-white bg-transparent border border-white/30 rounded-lg hover:bg-white hover:text-black transition-all duration-300 group"
            >
              Shield Now
              <svg
                className="w-4 h-4 ml-2 transition-all duration-300 group-hover:translate-x-1 group-hover:text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </Link>
          </div>
        </motion.div>
      </main>
      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* 2023 Stats */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-32">
          <motion.div
            className="flex-1"
            initial="hidden"
            animate={isInView1 ? "visible" : "hidden"}
            variants={textVariants}
          >
            <h2
              className="text-4xl font-bold mb-6"
              style={{ fontFamily: "'ClashDisplay-Bold', sans-serif" }}
            >
              2023: The Rise of Honeypot Scams
            </h2>
            <p className="text-lg text-gray-300 mb-4">
              In 2023, the DeFi space saw an explosion of sophisticated honeypot
              scams targeting inexperienced investors.
            </p>
            <p className="text-lg text-gray-300">
              These scams allowed deposits but blocked withdrawals, locking
              funds permanently. Attackers exploited trust in new projects and
              the FOMO mentality prevalent in crypto markets.
            </p>
          </motion.div>

          <motion.div
            ref={ref1}
            className="flex-1 relative"
            initial="hidden"
            animate={isInView1 ? "visible" : "hidden"}
            variants={cardVariants}
            whileHover={{ rotate: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <div
              className="p-8 rounded-2xl relative overflow-hidden min-h-[300px] flex items-center justify-center hover:shadow-xl transition-all duration-300"
              style={{
                borderTopLeftRadius: "80px",
                background:
                  "linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(99,102,241,0.15) 100%)",
                border: "1px solid rgba(239,68,68,0.3)",
                boxShadow: "0 10px 30px -10px rgba(239,68,68,0.2)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-indigo-500/10 opacity-20"></div>
              <div className="text-center z-10">
                <h3 className="text-2xl font-semibold mb-4">
                  Total Losses in 2023
                </h3>
                <div
                  className="text-7xl font-bold"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    background:
                      "linear-gradient(90deg, #EF4444 0%, #6366F1 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    textShadow: "0 2px 10px rgba(239,68,68,0.3)",
                  }}
                >
                  $<CountUp end={12.7} decimals={1} duration={3} />M
                </div>
                <p className="mt-4 text-gray-300">
                  Across 3,200+ reported cases
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 2024 Stats */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 mb-32">
          <motion.div
            className="flex-1"
            initial="hidden"
            animate={isInView2 ? "visible" : "hidden"}
            variants={textVariants}
          >
            <h2
              className="text-4xl font-bold mb-6"
              style={{ fontFamily: "'ClashDisplay-Bold', sans-serif" }}
            >
              2024: Escalating Threats
            </h2>
            <p className="text-lg text-gray-300 mb-4">
              The following year saw attackers refine their techniques, with
              losses nearly doubling from the previous year.
            </p>
            <p className="text-lg text-gray-300">
              New variations emerged, including "soft honeypots" that allowed
              partial withdrawals to appear legitimate before locking funds.
            </p>
          </motion.div>

          <motion.div
            ref={ref2}
            className="flex-1 relative"
            initial="hidden"
            animate={isInView2 ? "visible" : "hidden"}
            variants={cardVariants}
            whileHover={{ rotate: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <div
              className="p-8 rounded-2xl relative overflow-hidden min-h-[300px] flex items-center justify-center hover:shadow-xl transition-all duration-300"
              style={{
                borderTopRightRadius: "80px",
                background:
                  "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(236,72,153,0.15) 100%)",
                border: "1px solid rgba(99,102,241,0.3)",
                boxShadow: "0 10px 30px -10px rgba(99,102,241,0.2)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 opacity-20"></div>
              <div className="text-center z-10">
                <h3 className="text-2xl font-semibold mb-4">
                  Total Losses in 2024
                </h3>
                <div
                  className="text-7xl font-bold"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    background:
                      "linear-gradient(90deg, #6366F1 0%, #EC4899 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    textShadow: "0 2px 10px rgba(99,102,241,0.3)",
                  }}
                >
                  $<CountUp end={23.4} decimals={1} duration={3} />M
                </div>
                <p className="mt-4 text-gray-300">
                  Across 5,800+ reported cases
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Revert Transaction Stats */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-32">
          <motion.div
            className="flex-1"
            initial="hidden"
            animate={isInView3 ? "visible" : "hidden"}
            variants={textVariants}
          >
            <h2
              className="text-4xl font-bold mb-6"
              style={{ fontFamily: "'ClashDisplay-Bold', sans-serif" }}
            >
              The Revert Transaction Problem
            </h2>
            <p className="text-lg text-gray-300 mb-4">
              Beyond honeypots, revert transactions have become another major
              pain point for crypto users.
            </p>
            <p className="text-lg text-gray-300">
              These malicious contracts appear to execute transactions normally
              but silently revert them after taking fees, draining wallets over
              time.
            </p>
          </motion.div>

          <motion.div
            ref={ref3}
            className="flex-1 relative"
            initial="hidden"
            animate={isInView3 ? "visible" : "hidden"}
            variants={cardVariants}
            whileHover={{ rotate: 1.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <div
              className="p-8 rounded-2xl relative overflow-hidden min-h-[300px] flex items-center justify-center hover:shadow-xl transition-all duration-300"
              style={{
                borderTopLeftRadius: "80px",
                background:
                  "linear-gradient(135deg, rgba(208, 20, 6, 0.7) 0%, rgba(161, 70, 18, 0.33) 100%)",
                border: "1px solid rgba(197, 59, 0, 0.3)",
                boxShadow: "0 10px 30px -10px rgba(185, 16, 16, 0.2)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 opacity-20"></div>
              <div className="text-center z-10">
                <h3 className="text-2xl font-semibold mb-4">
                  Revert Transaction Losses
                </h3>
                <div
                  className="text-7xl font-bold"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    background:
                      "linear-gradient(90deg, #10B981 0%, #3B82F6 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    textShadow: "0 2px 10px rgba(16,185,129,0.3)",
                  }}
                >
                  $<CountUp end={8.2} decimals={1} duration={3} />M
                </div>
                <p className="mt-4 text-gray-300">Estimated annual losses</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Analysis Section - Cyberpunk Style */}
      <section className="relative bg-black py-28 px-6 overflow-hidden min-h-screen">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM2JmZTUwIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNncmlkKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            className="text-6xl font-bold mb-20 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
            style={{ fontFamily: "'ClashDisplay-Bold', sans-serif" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            The Scammer's <span className="text-white">Playbook</span>
          </motion.h2>

          {/* Interactive Journey Path */}
          <div className="relative h-[1200px] md:h-[800px]">
            {/* Path Line */}
            <svg
              className="absolute w-full h-full"
              viewBox="0 0 1000 800"
              preserveAspectRatio="none"
            >
              <path
                d="M100,100 C300,50 400,200 500,150 C600,100 700,250 800,200 C900,150 950,300 950,500 C950,700 800,650 700,600 C600,550 500,700 400,650 C300,600 200,500 100,550"
                stroke="url(#pathGradient)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="10 5"
                className="animate-pulse"
              />
              <defs>
                <linearGradient
                  id="pathGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>

            {/* Scam Journey Steps */}
            <div className="absolute w-full h-full">
              {/* Honeypot Scam Path */}
              <motion.div
                className="absolute w-56 md:w-64 left-[5%] top-[5%] md:top-[10%]"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ScamCard
                  title="1. Token Creation"
                  description="Scammers deploy a new token with malicious contract code"
                  icon="🪙"
                  gradient="from-blue-500 to-cyan-400"
                  scamType="honeypot"
                />
              </motion.div>

              <motion.div
                className="absolute w-56 md:w-64 left-[25%] top-[20%] md:top-[30%]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <ScamCard
                  title="2. Fake Liquidity"
                  description="Add just enough liquidity to appear legitimate"
                  icon="💧"
                  gradient="from-cyan-400 to-purple-500"
                  scamType="honeypot"
                />
              </motion.div>

              <motion.div
                className="absolute w-56 md:w-64 left-[10%] top-[40%] md:top-[55%]"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <ScamCard
                  title="3. Marketing Push"
                  description="Shill the token on social media with fake hype"
                  icon="📢"
                  gradient="from-purple-500 to-pink-500"
                  scamType="honeypot"
                />
              </motion.div>

              <motion.div
                className="absolute w-56 md:w-64 left-[30%] top-[60%] md:top-[70%]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <ScamCard
                  title="4. Deposit Trap"
                  description="Users can buy but hidden code blocks withdrawals"
                  icon="🕳️"
                  gradient="from-pink-500 to-red-500"
                  scamType="honeypot"
                />
              </motion.div>

              {/* Phishing Scam Path */}
              <motion.div
                className="absolute w-56 md:w-64 right-[10%] top-[10%] md:top-[15%]"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <ScamCard
                  title="1. Fake Site"
                  description="Create a clone of a legitimate crypto service"
                  icon="🌐"
                  gradient="from-green-500 to-emerald-400"
                  scamType="phishing"
                />
              </motion.div>

              <motion.div
                className="absolute w-56 md:w-64 right-[25%] top-[30%] md:top-[40%]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <ScamCard
                  title="2. Bait Setup"
                  description="Offer fake airdrops or urgent security alerts"
                  icon="🎣"
                  gradient="from-emerald-400 to-teal-500"
                  scamType="phishing"
                />
              </motion.div>

              <motion.div
                className="absolute w-56 md:w-64 right-[5%] top-[50%] md:top-[60%]"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <ScamCard
                  title="3. Credential Harvest"
                  description="Steal wallet connections or private keys"
                  icon="🔑"
                  gradient="from-teal-500 to-blue-500"
                  scamType="phishing"
                />
              </motion.div>

              <motion.div
                className="absolute w-56 md:w-64 right-[20%] top-[70%] md:top-[80%]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <ScamCard
                  title="4. Asset Drain"
                  description="Transfer all funds from compromised wallets"
                  icon="💸"
                  gradient="from-blue-500 to-indigo-500"
                  scamType="phishing"
                />
              </motion.div>

              {/* Final Exit Scam - Now properly centered at path end */}
              <motion.div
                className="absolute w-64 md:w-72 left-[0%] -translate-x-1/2 bottom-[40%]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className="relative p-6 rounded-xl bg-gradient-to-br from-red-600 to-rose-800 border border-rose-400/30 backdrop-blur-sm overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">💨</span>
                      <h3 className="text-xl font-bold text-white">
                        Exit Strategy
                      </h3>
                    </div>
                    <p className="text-rose-100">
                      Both scams conclude with the attacker disappearing with
                      all funds, leaving victims with worthless tokens or empty
                      wallets.
                    </p>
                  </div>
                  <div className="absolute bottom-4 right-4 px-2 py-1 rounded-md bg-black/30 text-xs text-rose-200 border border-rose-400/20">
                    Both scams
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Threat Simulator Section */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-black to-[#0A0A0A] overflow-hidden">
        {/* Floating holographic grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0idHJhbnNwYXJlbnQiLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9InJnYmEoMTU4LDE1OCwxNTgsMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
              style={{ fontFamily: "'ClashDisplay-Bold', sans-serif" }}
            >
              Test Drive <span className="text-white">TxShield</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Try our{" "}
              <span className="text-cyan-400 font-medium">
                interactive scam detector demo
              </span>{" "}
              with real-world examples
            </p>
          </motion.div>

          {/* Interactive Simulator Card */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Transaction Input */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Enter a suspicious transaction:
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 mb-2">
                      Contract Address
                    </label>
                    <input
                      type="text"
                      placeholder="0x..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">
                      Or try a sample:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(scamExamples).map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            setAddress(scamExamples[type].address);
                            handleScan(type);
                          }}
                          className="px-3 py-1.5 text-sm rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 transition-colors"
                        >
                          {type} Example
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleScan()}
                    disabled={!address || isScanning}
                    className={`w-full py-3 rounded-lg font-medium transition-all ${
                      !address || isScanning
                        ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                        : "bg-cyan-600 hover:bg-cyan-700 text-white"
                    }`}
                  >
                    {isScanning ? "Scanning..." : "Analyze Contract"}
                  </button>
                </div>
              </div>

              {/* Simulation Results */}
              <div className="relative">
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 min-h-[300px]">
                  {isScanning ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full mb-4"
                      />
                      <h4 className="text-lg font-medium text-cyan-400">
                        Scanning Contract
                      </h4>
                      <p className="text-gray-500 mt-1">
                        Analyzing potential threats...
                      </p>
                    </div>
                  ) : scanResult ? (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xl font-bold text-white">
                          Scan Results
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${getRiskColor(
                            scanResult.riskLevel
                          )}`}
                        >
                          {scanResult.riskLevel} Risk
                        </span>
                      </div>

                      <div className="flex border-b border-gray-700 mb-4">
                        <button
                          className={`px-4 py-2 text-sm font-medium ${
                            activeTab === "details"
                              ? "text-cyan-400 border-b-2 border-cyan-400"
                              : "text-gray-400"
                          }`}
                          onClick={() => setActiveTab("details")}
                        >
                          Details
                        </button>
                        <button
                          className={`px-4 py-2 text-sm font-medium ${
                            activeTab === "indicators"
                              ? "text-cyan-400 border-b-2 border-cyan-400"
                              : "text-gray-400"
                          }`}
                          onClick={() => setActiveTab("indicators")}
                        >
                          Indicators
                        </button>
                      </div>

                      {activeTab === "details" ? (
                        <div>
                          <p className="text-gray-300 mb-2">
                            <span className="font-medium text-white">
                              Type:
                            </span>{" "}
                            {scanResult.type}
                          </p>
                          <p className="text-gray-300 mb-2">
                            <span className="font-medium text-white">
                              Address:
                            </span>{" "}
                            {scanResult.address}
                          </p>
                          <p className="text-gray-300">
                            <span className="font-medium text-white">
                              Details:
                            </span>{" "}
                            {scanResult.details}
                          </p>
                        </div>
                      ) : (
                        <ul className="space-y-2">
                          {scanResult.indicators.map((indicator, i) => (
                            <li key={i} className="flex items-start">
                              <svg
                                className="w-4 h-4 mt-1 mr-2 text-red-400 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                ></path>
                              </svg>
                              <span className="text-gray-300">{indicator}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            ></path>
                          </svg>
                        </div>
                        <h4 className="text-lg font-medium text-gray-400">
                          Simulation Results
                        </h4>
                        <p className="text-gray-500 mt-1">
                          Enter an address to analyze
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Scanning animation overlay */}
                {isScanning && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-xl pointer-events-none"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
              </div>
            </div>

            <div className="mt-8 text-center space-y-4">
              <p className="text-sm text-gray-400 max-w-lg mx-auto">
                Note: These demo results show how TxShield works. For real
                analysis,
                <span className="text-cyan-400">
                  {" "}
                  try our full simulator
                </span>{" "}
                with live blockchain scanning.
              </p>

              <motion.a
                href="/simulate"
                className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold text-white hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15l8-8m0 0l-8-8m8 8H4"
                    />
                  </svg>
                  Go to Full Simulator
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
            </div>
          </div>

          {/* Stats counter */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {[
              { value: "10,000+", label: "Scams Detected" },
              { value: "$42M", label: "Protected" },
              { value: "99.7%", label: "Accuracy" },
              { value: "24/7", label: "Protection" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                  {stat.value}
                </div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-[#0A0A0A] to-black overflow-hidden">
        {/* Floating tech elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-cyan-500/10 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-20 text-center"
            style={{ fontFamily: "'ClashDisplay-Bold', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              What People Say
            </span>
            <br className="md:hidden" /> About Our Platform
          </motion.h2>

          <div className="flex justify-center">
            <motion.div
              className="w-full max-w-3xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Testimonial Card */}
              <div className="relative p-0.5 rounded-3xl bg-gradient-to-br from-cyan-500/30 to-purple-600/30 backdrop-blur-sm">
                <div className="bg-[#0F0F0F] rounded-3xl p-8 md:p-10">
                  {/* Quote icon */}
                  <svg
                    className="w-12 h-12 mb-6 text-cyan-400 opacity-20"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>

                  {/* Testimonial text */}
                  <blockquote className="text-xl md:text-2xl leading-relaxed text-gray-300 mb-8">
                    Just checked out TxShield — really cool stuff! I can
                    totally see how something like this can help people feel
                    safer when interacting with Web3 apps. The interface is
                    clean, and I love that it's straight to the point without
                    being overwhelming.
                    <br />
                    <br />
                    Definitely a solid idea, especially with so many sketchy
                    contracts out there. Would be awesome to see it evolve
                    further.
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center">
                    {/* Profile image placeholder - replace with actual image */}
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-400/30 mr-4">
                      <img
                        src="/Images/ravisankar.jpeg"
                        alt="User profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40NzcgMiAyIDYuNDc3IDIgMTJzNC40NzcgMTAgMTAgMTAgMTAtNC40NzcgMTAtMTBTMTcuNTIzIDIgMTIgMnptMCAyYzIuMzkyIDAgNC41MzUuODQzIDYuMTg5IDIuMjUzbC0yLjE0OCAxLjE0OEMxNC42NjkgNi4wNTkgMTMuNDA5IDYgMTIgNmMtMS40MDkgMC0yLjY2OS4wNTktMy44NDEuNDAxTDYuMDExIDQuMjUzQzcuNjY1IDIuODQzIDkuNjA4IDIgMTIgMnptMCAxOEM5LjYxOCAyMCA3LjQzNCAxOS4xNTcgNS43MDkgMTcuNTQ0bDEuNDMxLTEuNDMxQzguMDYzIDE2LjQyOSA5LjkyMyAxNyAxMiAxN3MyLjkzNy0uNTcxIDQuMDYxLTEuODg3bDEuNDMxIDEuNDMxQzE2LjU2NiAxOS4xNTcgMTQuMzgyIDIwIDEyIDIwem0tNi0xMGMwIDEuNjU3IDEuMzQzIDMgMyAzczMtMS4zNDMgMy0zLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzem0zLTMuNWMwIC44MjguNjcyIDEuNSAxLjUgMS41cyAxLjUtLjY3MiAxLjUtMS41LS42NzItMS41LTEuNS0xLjUtMS41LjY3Mi0xLjUgMS41eiIgZmlsbD0iI2RkZGRkZCIgLz48L3N2Zz4=";
                        }}
                      />
                      {/* Verification badge */}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-cyan-400 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-black"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <div className="font-bold text-white">Ravi Sankar</div>
                      <div className="text-sm text-cyan-400">
                        Web 3 Developer
                      </div>
                      {/* LinkedIn link */}
                      <a
                        href="https://www.linkedin.com/in/ravi-sankar13/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-xs text-gray-400 hover:text-cyan-400 mt-1"
                      >
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        View LinkedIn Profile
                      </a>
                    </div>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl -z-10"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <ContactUs />
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
