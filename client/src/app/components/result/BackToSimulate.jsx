"use client";

import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";

export default function BackToSimulate({ itemVariants, t, chain }) {
  return (
    <motion.div
      variants={itemVariants}
      className="max-w-7xl mx-auto flex justify-center mt-12 sm:mt-16 pb-12"
    >
      <button
        onClick={() => window.location.reload()}
        className={`relative px-8 py-4 bg-black border ${t.border} rounded-xl flex items-center gap-3 overflow-hidden group transition-all duration-300 hover:border-${t.primary}-400 ${t.buttonGlow}`}
      >
        {/* Hover Gradient Background */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-${t.primary}-600/10 via-${t.secondary}-500/10 to-${t.primary}-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />

        <FiArrowLeft
          className={`h-5 w-5 ${t.textPrimary} group-hover:${t.textSecondary} group-hover:-translate-x-1 transition-all duration-300 relative z-10`}
        />
        <span
          className={`text-base font-semibold text-white group-hover:${
            chain === "EVM" ? "text-blue-100" : "text-purple-100"
          } transition-colors relative z-10`}
        >
          Back to Simulate
        </span>
      </button>
    </motion.div>
  );
}
