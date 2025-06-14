"use client";

import React, { useEffect, useRef } from "react";
import Header from "../components/header";
import { motion, useInView, useAnimation } from "framer-motion";
import CountUp from "react-countup";
import ContactUs from "../components/contactus";
import Link from "next/link";
import Footer from "../components/footer";

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
          >
            <div
              className="stats-card p-8 rounded-2xl relative overflow-hidden min-h-[300px] flex items-center justify-center"
              style={{ borderTopLeftRadius: "80px" }}
            >
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4">
                  Total Losses in 2023
                </h3>
                <div className="text-6xl font-bold text-red-500">
                  $<CountUp end={12.7} decimals={1} duration={3} />M
                </div>
                <p className="mt-4 text-gray-400">
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
              className="stats-card p-8 rounded-2xl relative overflow-hidden min-h-[300px] flex items-center justify-center"
              style={{ borderTopRightRadius: "80px" }}
            >
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4">
                  Total Losses in 2024
                </h3>
                <div className="text-6xl font-bold text-red-500">
                  $<CountUp end={23.4} decimals={1} duration={3} />M
                </div>
                <p className="mt-4 text-gray-400">
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
              className="stats-card p-8 rounded-2xl relative overflow-hidden min-h-[300px] flex items-center justify-center"
              style={{ borderTopLeftRadius: "80px" }}
            >
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4">
                  Revert Transaction Losses
                </h3>
                <div className="text-6xl font-bold text-red-500">
                  $<CountUp end={8.2} decimals={1} duration={3} />M
                </div>
                <p className="mt-4 text-gray-400">Estimated annual losses</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Analysis Section */}
      <section className="bg-[#0A0A0A] py-20 px-6">
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
                color: "from-gray-300 to-gray-400",
              },
              {
                title: "2. Deposit Trap",
                desc: "Users can deposit funds but withdrawals are blocked by hidden contract code.",
                color: "from-gray-400 to-gray-500",
              },
              {
                title: "3. Exit Scam",
                desc: "After collecting enough funds, scammers drain the liquidity and disappear.",
                color: "from-gray-500 to-gray-600",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="solution-item p-8 rounded-xl"
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
            className="primary-btn inline-block px-8 py-4 text-black font-bold text-xl rounded-xl transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Our Simulator Now
          </motion.a>
        </div>
      </section>

      <ContactUs />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
