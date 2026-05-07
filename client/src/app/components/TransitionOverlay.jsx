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
        className="fixed top-0 left-0 w-screen h-screen bg-background z-[9999] pointer-events-none transition-colors duration-700"
        initial={{ x: "100%" }}
        animate={{ x: phase === "in" ? "0%" : phase === "out" ? "-100%" : "100%" }}
        transition={{ 
          duration: phase === "idle" ? 0 : 0.8, 
          ease: [0.22, 1, 0.36, 1],
          delay: phase === "in" ? 0.1 : 0 
        }}
      />
    </>
  );
}
