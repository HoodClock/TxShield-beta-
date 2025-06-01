"use client";

import React, { useEffect, useRef } from "react";
import Header from "../components/header";
import { motion, useInView, useAnimation } from "framer-motion";
import CountUp from "react-countup";

function HomePage() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const isInView1 = useInView(ref1, { once: false });
  const isInView2 = useInView(ref2, { once: false });
  const isInView3 = useInView(ref3, { once: false });
  const controls = useAnimation();

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
    <div className="bg-gradient-to-br from-black via-[#111111] to-[#0a0a0a] text-white min-h-screen font-sans scroll-smooth">
      <Header />

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row justify-center items-center px-6 py-16 max-w-7xl mx-auto gap-12 min-h-[80vh]">
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            style={{
              fontFamily: "'ClashDisplay-Bold', sans-serif",
              fontSize: "clamp(15rem, 15vw, 10rem)",
            }}
            className="glow-text font-extrabold bg-gradient-to-r from-[#FFD700] via-[#FFC300] to-[#FFB700] bg-clip-text text-transparent mb-6 drop-shadow-lg leading-tight"
          >
            Shield Every Transaction.
          </h1>
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
          >
            <div
              className="bg-[#e6c200] p-8 rounded-2xl text-black relative overflow-hidden min-h-[300px] flex items-center justify-center"
              style={{ borderTopLeftRadius: "80px" }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD700] to-[#FFB700]"></div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4">
                  Total Losses in 2023
                </h3>
                <div className="text-6xl font-bold text-[#D32F2F]">
                  $<CountUp end={12.7} decimals={1} duration={3} />M
                </div>
                <p className="mt-4 text-gray-700">
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
          >
            <div
              className="bg-[#FFF9C4] p-8 rounded-2xl text-black relative overflow-hidden min-h-[300px] flex items-center justify-center"
              style={{ borderTopRightRadius: "80px" }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFB700] to-[#FFD700]"></div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4">
                  Total Losses in 2024
                </h3>
                <div className="text-6xl font-bold text-[#D32F2F]">
                  $<CountUp end={23.4} decimals={1} duration={3} />M
                </div>
                <p className="mt-4 text-gray-700">
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
          >
            <div
              className="bg-[#FFF9C4] p-8 rounded-2xl text-black relative overflow-hidden min-h-[300px] flex items-center justify-center"
              style={{ borderTopLeftRadius: "80px" }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD700] to-[#FFB700]"></div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4">
                  Revert Transaction Losses
                </h3>
                <div className="text-6xl font-bold text-[#D32F2F]">
                  $<CountUp end={8.2} decimals={1} duration={3} />M
                </div>
                <p className="mt-4 text-gray-700">Estimated annual losses</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Analysis Section */}
      <section className="bg-[#1A1A1A] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl font-bold mb-16 text-center"
            style={{ fontFamily: "'ClashDisplay-Bold', sans-serif" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            How Honeypot Scams Work
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "1. Fake Liquidity",
                desc: "Scammers create tokens with fake liquidity pools to appear legitimate.",
                color: "from-[#FF5722] to-[#FF9800]",
              },
              {
                title: "2. Deposit Trap",
                desc: "Users can deposit funds but withdrawals are blocked by hidden contract code.",
                color: "from-[#9C27B0] to-[#E91E63]",
              },
              {
                title: "3. Exit Scam",
                desc: "After collecting enough funds, scammers drain the liquidity and disappear.",
                color: "from-[#2196F3] to-[#00BCD4]",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-[#252525] p-8 rounded-xl border border-[#333]"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3
                  className={`text-2xl font-bold mb-4 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                >
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-5xl font-bold mb-6"
            style={{ fontFamily: "'ClashDisplay-Bold', sans-serif" }}
          >
            Our Solution
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            TxShield provides real-time simulation and analysis to detect
            honeypot scams and malicious contracts before you interact with
            them.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.a
            href="/simulate"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFB700] hover:from-[#FFC300] hover:to-[#FFD700] text-black font-bold text-xl rounded-xl shadow-lg transition duration-300 hover:shadow-yellow-400/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Our Simulator Now
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] border-t border-[#222] py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">TxShield</h3>
            <p className="text-gray-400">
              Protecting your crypto transactions from scams and malicious
              contracts.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-yellow-400 transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/simulate"
                  className="text-gray-400 hover:text-yellow-400 transition"
                >
                  Simulate
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-yellow-400 transition"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-yellow-400 transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition"
                >
                  API
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition"
              >
                Discord
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition"
              >
                Telegram
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#222] text-center text-gray-500">
          <p>© {new Date().getFullYear()} TxShield. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
