"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "../components/header";
import { motion, useInView, useAnimation } from "framer-motion";
import CountUp from "react-countup";
import ContactUs from "../components/contactus";
import Link from "next/link";
import Footer from "../components/footer";

// Define CSS custom properties for reusable styles
const styles = `
  :root {
    --primary-gradient: linear-gradient(90deg, #3b82f6, #ec4899);
    --glow-cyan: rgba(34, 211, 238, 0.3);
    --glow-purple: rgba(139, 92, 246, 0.3);
  }
`;

// ScamCard Component
const ScamCard = ({ title, description, icon, gradient, scamType }) => (
  <div
    className={`relative p-4 sm:p-5 rounded-xl bg-gradient-to-br ${gradient} border border-white/10 backdrop-blur-sm overflow-hidden group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 sm:min-w-[200px] min-w-[160px]`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative z-10">
      <div className="flex items-center gap-2 sm:gap-3 mb-3">
        <span className="text-xl sm:text-2xl">{icon}</span>
        <h3 className="text-base sm:text-lg font-bold text-white">{title}</h3>
      </div>
      <p className="text-white/90 text-xs sm:text-sm">{description}</p>
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

  // Simulation state
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
      details: "This contract allows buying but prevents selling tokens. Funds will be trapped.",
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

    setTimeout(() => {
      if (exampleType) {
        setScanResult(scamExamples[exampleType]);
      } else if (address) {
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
      <style>{styles}</style>
      <Header />
      {/* Hero Section */}
      <main className="flex flex-col md:flex-row justify-center items-center px-4 sm:px-6 py-12 sm:py-16 max-w-7xl mx-auto gap-8 sm:gap-12 min-h-[70vh] sm:min-h-[80vh]">
        <motion.div
          className="flex-1 text-center w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            style={{
              fontFamily: "'ClashDisplay-Bold', sans-serif",
              fontSize: "clamp(2.5rem, 10vw, 6rem)",
              lineHeight: "1.1",
            }}
            className="glow-text font-extrabold bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent mb-6 drop-shadow-lg px-4 break-words"
          >
            Shield Every Transaction.
          </h1>

          {/* Public Beta Badge */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 sm:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring", damping: 10 }}
              whileHover={{
                y: -3,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <a
                href="https://findyoursaas.com/tool/6873a57d02a7a777326a9d9b/txshield"
                target="_blank"
                rel="noopener"
                className="relative inline-flex items-center px-3 py-1.5 pr-4 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-gray-600 shadow-lg overflow-hidden group"
              >
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
                <motion.img
                  src="https://findyoursaas.com/fys-logo.png"
                  alt="FYS Logo"
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full mr-2 z-10"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-xs sm:text-sm font-medium text-gray-100 z-10">
                  Featured on <span className="font-semibold text-white">FYS</span>
                </span>
              </a>
            </motion.div>
          </div>

          {/* Shield Now Button */}
          <div className="flex justify-center">
            <Link
              href="/simulate"
              style={{ fontFamily: "'ClashDisplay-Medium', sans-serif" }}
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 font-medium text-white bg-transparent border border-white/30 rounded-lg hover:bg-white hover:text-black transition-all duration-300 group text-sm sm:text-base"
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* 2023 Stats */}
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 mb-16 sm:mb-32">
          <motion.div
            className="flex-1"
            initial="hidden"
            animate={isInView1 ? "visible" : "hidden"}
            variants={textVariants}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold mb-6"
              style={{ fontFamily: "'ClashDisplay-Bold', sans-serif" }}
            >
              2023: The Rise of Honeypot Scams
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mb-4">
              In 2023, the DeFi space saw an explosion of sophisticated honeypot scams targeting inexperienced investors.
            </p>
            <p className="text-base sm:text-lg text-gray-300">
              These scams allowed deposits but blocked withdrawals, locking funds permanently. Attackers exploited trust in new projects and the FOMO mentality prevalent in crypto markets.
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
              className="p-6 sm:p-8 rounded-2xl relative overflow-hidden min-h-[250px] sm:min-h-[300px] flex items-center justify-center hover:shadow-xl transition-all duration-300"
              style={{
                borderTopLeftRadius: "60px",
                background: "linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(99,102,241,0.15) 100%)",
                border: "1px solid rgba(239,68,68,0.3)",
                boxShadow: "0 10px 30px -10px rgba(239,68,68,0.2)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-indigo-500/10 opacity-20"></div>
              <div className="text-center z-10">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                  Total Losses in 2023
                </h3>
                <div
                  className="text-5xl sm:text-7xl font-bold"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    background: "var(--primary-gradient)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    textShadow: "0 2px 10px var(--glow-cyan)",
                  }}
                >
                  $<CountUp end={12.7} decimals={1} duration={3} />M
                </div>
                <p className="mt-4 text-gray-300 text-sm sm:text-base">
                  Across 3,200+ reported cases
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 2024 Stats */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-8 sm:gap-12 mb-16 sm:mb-32">
          <motion.div
            className="flex-1"
            initial="hidden"
            animate={isInView2 ? "visible" : "hidden"}
            variants={textVariants}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold mb-6"
              style={{ fontFamily: "'ClashDisplay-Bold', sans-serif" }}
            >
              2024: Escalating Threats
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mb-4">
              The following year saw attackers refine their techniques, with losses nearly doubling from the previous year.
            </p>
            <p className="text-base sm:text-lg text-gray-300">
              New variations emerged, including "soft honeypots" that allowed partial withdrawals to appear legitimate before locking funds.
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
              className="p-6 sm:p-8 rounded-2xl relative overflow-hidden min-h-[250px] sm:min-h-[300px] flex items-center justify-center hover:shadow-xl transition-all duration-300"
              style={{
                borderTopRightRadius: "60px",
                background: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(236,72,153,0.15) 100%)",
                border: "1px solid rgba(99,102,241,0.3)",
                boxShadow: "0 10px 30px -10px rgba(99,102,241,0.2)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 opacity-20"></div>
              <div className="text-center z-10">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                  Total Losses in 2024
                </h3>
                <div
                  className="text-5xl sm:text-7xl font-bold"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    background: "var(--primary-gradient)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    textShadow: "0 2px 10px var(--glow-purple)",
                  }}
                >
                  $<CountUp end={23.4} decimals={1} duration={3} />M
                </div>
                <p className="mt-4 text-gray-300 text-sm sm:text-base">
                  Across 5,800+ reported cases
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Revert Transaction Stats */}
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 mb-16 sm:mb-32">
          <motion.div
            className="flex-1"
            initial="hidden"
            animate={isInView3 ? "visible" : "hidden"}
            variants={textVariants}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold mb-6"
              style={{ fontFamily: "'ClashDisplay-Bold', sans-serif" }}
            >
              The Revert Transaction Problem
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mb-4">
              Beyond honeypots, revert transactions have become another major pain point for crypto users.
            </p>
            <p className="text-base sm:text-lg text-gray-300">
              These malicious contracts appear to execute transactions normally but silently revert them after taking fees, draining wallets over time.
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
              className="p-6 sm:p-8 rounded-2xl relative overflow-hidden min-h-[250px] sm:min-h-[300px] flex items-center justify-center hover:shadow-xl transition-all duration-300"
              style={{
                borderTopLeftRadius: "60px",
                background: "linear-gradient(135deg, rgba(208, 20, 6, 0.7) 0%, rgba(161, 70, 18, 0.33) 100%)",
                border: "1px solid rgba(197, 59, 0, 0.3)",
                boxShadow: "0 10px 30px -10px rgba(185, 16, 16, 0.2)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 opacity-20"></div>
              <div className="text-center z-10">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                  Revert Transaction Losses
                </h3>
                <div
                  className="text-5xl sm:text-7xl font-bold"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    background: "var(--primary-gradient)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    textShadow: "0 2px 10px var(--glow-cyan)",
                  }}
                >
                  $<CountUp end={8.2} decimals={1} duration={3} />M
                </div>
                <p className="mt-4 text-gray-300 text-sm sm:text-base">
                  Estimated annual losses
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Analysis Section - Cyberpunk Style */}
      <section className="relative bg-black py-16 sm:py-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM2JmZTUwIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNncmlkKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 sm:mb-20 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
            style={{ fontFamily: "'ClashDisplay-Bold', sans-serif" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            The Scammer's <span className="text-white">Playbook</span>
          </motion.h2>

          {/* Responsive Scam Journey Path */}
          <div className="relative flex flex-wrap flex-col md:flex-row md:h-[800px] gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {/* Honeypot Scam Path */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
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
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
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
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
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
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <ScamCard
                    title="4. Deposit Trap"
                    description="Users can buy but hidden code blocks withdrawals"
                    icon="🕳️"
                    gradient="from-pink-500 to-red-500"
                    scamType="honeypot"
                  />
                </motion.div>
              </div>

              {/* Phishing Scam Path */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
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
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
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
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
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
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  <ScamCard
                    title="4. Asset Drain"
                    description="Transfer all funds from compromised wallets"
                    icon="💸"
                    gradient="from-blue-500 to-indigo-500"
                    scamType="phishing"
                  />
                </motion.div>
              </div>

              {/* Exit Strategy */}
              <motion.div
                className="w-full max-w-xs sm:max-w-sm mx-auto mt-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
              >
                <div className="relative p-4 sm:p-6 rounded-xl bg-gradient-to-br from-red-600 to-rose-800 border border-rose-400/30 backdrop-blur-sm overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <span className="text-xl sm:text-2xl">💨</span>
                      <h3 className="text-base sm:text-xl font-bold text-white">
                        Exit Strategy
                      </h3>
                    </div>
                    <p className="text-rose-100 text-xs sm:text-sm">
                      Both scams conclude with the attacker disappearing with all funds, leaving victims with worthless tokens or empty wallets.
                    </p>
                  </div>
                  <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 px-2 py-1 rounded-md bg-black/30 text-xs text-rose-200 border border-rose-400/20">
                    Both scams
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonial Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-[#0A0A0A] to-black overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-cyan-500/10 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-32 sm:w-40 h-32 sm:h-40 rounded-full bg-purple-500/10 blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 sm:mb-20 text-center"
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
              <div className="relative p-0.5 rounded-3xl bg-gradient-to-br from-cyan-500/30 to-purple-600/30 backdrop-blur-sm">
                <div className="bg-[#0F0F0F] rounded-3xl p-6 sm:p-8 md:p-10">
                  <svg
                    className="w-8 sm:w-12 h-8 sm:h-12 mb-6 text-cyan-400 opacity-20"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>

                  <blockquote className="text-base sm:text-xl md:text-2xl leading-relaxed text-gray-300 mb-6 sm:mb-8">
                    Just checked out TxShield — really cool stuff! I can totally see how something like this can help people feel safer when interacting with Web3 apps. The interface is clean, and I love that it's straight to the point without being overwhelming.
                    <br />
                    <br />
                    Definitely a solid idea, especially with so many sketchy contracts out there. Would be awesome to see it evolve further.
                  </blockquote>

                  <div className="flex items-center">
                    <div className="relative w-12 sm:w-14 h-12 sm:h-14 rounded-full overflow-hidden border-2 border-cyan-400/30 mr-4">
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
                      <div className="absolute -bottom-1 -right-1 w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-cyan-400 flex items-center justify-center">
                        <svg
                          className="w-2 sm:w-3 h-2 sm:h-3 text-black"
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
                      <div className="font-bold text-white text-sm sm:text-base">Ravi Sankar</div>
                      <div className="text-xs sm:text-sm text-cyan-400">
                        Web 3 Developer
                      </div>
                      <a
                        href="https://www.linkedin.com/in/ravi-sankar13/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-xs text-gray-400 hover:text-cyan-400 mt-1"
                      >
                        <svg
                          className="w-3 sm:w-4 h-3 sm:h-4 mr-1"
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
                <div className="absolute -top-20 -right-20 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-cyan-500/10 blur-3xl -z-10"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <ContactUs />
      <Footer />
    </div>
  );
}

export default HomePage;