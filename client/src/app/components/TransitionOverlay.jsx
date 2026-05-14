"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

export default function TransitionOverlay() {
  const [phase, setPhase] = useState("idle"); 
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleStart = (e) => {
      const { path } = e.detail;
      setPhase("in");
      setTimeout(() => {
        router.push(path);
      }, 950); // Wait for both layers to fully cover the screen
    };

    window.addEventListener("start-page-transition", handleStart);
    return () => window.removeEventListener("start-page-transition", handleStart);
  }, [router]);

  useEffect(() => {
    if (phase === "in") {
      setPhase("out");
      setTimeout(() => {
        setPhase("idle");
      }, 950); // Wait for both layers to fully exit
    }
  }, [pathname]); // Fires when navigation is complete

  return (
    <>
      {/* Background layer - TxShield Vibe (Deep Purple/Cyan Gradient) */}
      <motion.div
        className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-r from-purple-600 to-cyan-500 z-[9998] pointer-events-none"
        initial={{ x: "100%" }}
        animate={{ x: phase === "in" ? "0%" : phase === "out" ? "-100%" : "100%" }}
        transition={{ 
          duration: phase === "idle" ? 0 : 0.8, 
          ease: [0.22, 1, 0.36, 1],
          delay: phase === "in" ? 0 : 0.1 
        }}
      />
      {/* Foreground layer - Theme background */}
      <motion.div
        className="fixed top-0 left-0 w-screen h-screen bg-background z-[9999] pointer-events-none transition-colors duration-700 flex items-center justify-center overflow-hidden"
        initial={{ x: "100%" }}
        animate={{ x: phase === "in" ? "0%" : phase === "out" ? "-100%" : "100%" }}
        transition={{ 
          duration: phase === "idle" ? 0 : 0.8, 
          ease: [0.22, 1, 0.36, 1],
          delay: phase === "in" ? 0.1 : 0 
        }}
      >
        {/* Subtle background elements */}
        {phase === "in" && (
          <>
            {/* Floating blobs */}
            <motion.div
              className="absolute top-20 left-10 w-32 h-32 rounded-full bg-purple-500/5 blur-3xl"
              animate={{ y: [0, 30, 0], x: [0, 15, 0] }}
              transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.div
              className="absolute bottom-32 right-20 w-40 h-40 rounded-full bg-cyan-500/5 blur-3xl"
              animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.div
              className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-purple-400/3 blur-2xl"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
            />

            {/* Animated grid lines */}
            <motion.svg
              className="absolute inset-0 w-full h-full opacity-10"
              animate={{ opacity: [0.05, 0.15, 0.05] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
            >
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </motion.svg>

            {/* Animated scanning lines */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "in" ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/3 to-transparent"
                animate={{ y: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
            </motion.div>

            {/* Corner accents */}
            <motion.div
              className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-purple-500/20"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-cyan-500/20"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
            />
          </>
        )}

        {/* Animated TxShield Text - Only visible during transition */}
        {phase === "in" && (
          <motion.div
            className="text-center relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.35 }}
          >
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 select-none pointer-events-none"
              animate={{
                textShadow: [
                  "0px 0px 20px rgba(168, 85, 247, 0.3)",
                  "0px 0px 40px rgba(6, 182, 212, 0.5)",
                  "0px 0px 20px rgba(168, 85, 247, 0.3)"
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              TxShield
            </motion.h2>
            <motion.div
              className="mt-4 text-xs tracking-[0.3em] uppercase text-muted-foreground"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            >
              Initializing Protection
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
