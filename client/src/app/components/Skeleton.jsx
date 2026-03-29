"use client";

import { motion } from "framer-motion";

export default function Skeleton({ className }) {
  return (
    <motion.div
      className={`bg-zinc-800/60 rounded-md ${className}`}
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}