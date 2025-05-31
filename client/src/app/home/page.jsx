"use client";

import React from "react";
import Header from "../components/header";
import { motion } from "framer-motion";

function page() {
  return (
    <div className="bg-gradient-to-br from-black via-[#111111] to-[#0a0a0a] text-white min-h-screen font-sans">
      <Header />

      <main className="flex flex-col md:flex-row justify-center items-center px-6 py-16 max-w-7xl mx-auto gap-12">
        {/* Left Side */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            style={{ fontFamily: "'ClashDisplay-Bold', sans-serif", fontSize: '15rem' }}
            className="glow-text text-6xl md:text-6xl font-extrabold bg-gradient-to-r from-[#FFD700] via-[#FFC300] to-[#FFB700] bg-clip-text text-transparent mb-6 drop-shadow-lg"
          >
            Shield Every Transaction.
          </h1>
          <a
            href="/simulate"
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFB700] hover:from-[#FFC300] hover:to-[#FFD700] text-black font-semibold text-lg rounded-xl shadow-lg transition duration-300 hover:shadow-yellow-400/50"
          >
            Make it Happen
          </a>
        </motion.div>
      </main>
    </div>
  );
}

export default page;
