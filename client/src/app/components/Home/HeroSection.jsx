"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { m, useMotionValue, useTransform, useSpring } from "framer-motion";
import { MdArrowRightAlt } from "react-icons/md";
import HeroBackground from "../backgrounds/HeroBackground";
import ChainTicker from "./ChainTicker";

function HeroSection() {
  const [scannedCount, setScannedCount] = useState(14204912);

  // Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for mouse movement
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // Moderate rotation bounds for the 3D tilt effect (-12 to 12 degrees)
  const rotateX = useTransform(springY, [-1, 1], [12, -12]);
  const rotateY = useTransform(springX, [-1, 1], [-12, 12]);

  useEffect(() => {
    const interval = setInterval(() => {
      setScannedCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Normalize from -1 to 1 (center is 0,0)
    mouseX.set(x * 2 - 1);
    mouseY.set(y * 2 - 1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-[100dvh] w-screen bg-[#050505] overflow-hidden relative flex flex-col items-center justify-center perspective-[1000px]"
    >
      {/* Cinematic Full Screen Background */}
      <HeroBackground className="z-0 opacity-60" />

      {/* Main Content Centered with 3D Parallax */}
      <m.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 w-full px-8 md:px-16 flex flex-col items-center justify-center -mt-24 pointer-events-none text-center"
      >

        {/* Typography */}
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ translateZ: 50 }}
          className="flex flex-col items-center gap-4 mb-4"
        >
          <m.div
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 40px rgba(34,211,238,0.4)" }}
            className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-[#050505] border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.15)] mb-2 cursor-pointer pointer-events-auto transition-all duration-300"
          >
            <Image
              src="/Images/logo.png"
              width={64}
              height={64}
              alt="Logo"
              priority
              className="object-contain w-8 h-8 md:w-10 md:h-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            />
          </m.div>
          <span className="text-cyan-400 font-mono tracking-[0.3em] text-xs sm:text-sm md:text-base uppercase">TxShield Protocol</span>
        </m.div>

        <m.h1
          className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[9rem] xl:text-[10rem] font-bold tracking-tight leading-none pointer-events-auto cursor-default"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ translateZ: 100 }}
          whileHover={{ textShadow: "0px 0px 30px rgba(168,85,247,0.8)" }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#3b82f6]">SHIELD</span>
        </m.h1>

        <m.div
          className="text-gray-400 text-sm sm:text-lg md:text-xl font-light tracking-[0.2em] uppercase mt-8 sm:mt-10 max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ translateZ: 30 }}
        >
          <span>Every Transaction. Uncompromised.</span>
        </m.div>

      </m.div>

      {/* Ticker scrolling chains just above the command bar */}
      <ChainTicker />

      {/* Sharp Tactical Command Bar */}
      <m.div
        className="absolute bottom-0 left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-t border-cyan-500/20 px-6 py-4 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 z-30"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {/* Left: Tactical Status */}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-none bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
            <span className="text-cyan-400 text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">System Online</span>
          </div>
          <p className="text-gray-500 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest">
            {scannedCount.toLocaleString()} Scanned
          </p>
        </div>

        {/* Center: Sharp Links */}
        <div className="flex items-center justify-center gap-6 md:gap-12 text-xs sm:text-sm font-mono tracking-widest uppercase">
          <Link href="/playbook" className="text-white/60 hover:text-cyan-400 transition-colors">
            Playbook
          </Link>
          <div className="w-px h-4 bg-cyan-500/30"></div>
          <Link href="/ApiRef" className="text-white/60 hover:text-cyan-400 transition-colors">
            API Docs
          </Link>
        </div>

        {/* Right: Sharp CTA Button */}
        <Link
          href="/simulate"
          className="px-6 py-3 bg-transparent border border-cyan-500/50 text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase hover:bg-cyan-500/10 transition-all flex items-center group relative overflow-hidden shrink-0"
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 group-hover:w-full transition-all duration-300 opacity-20 z-0"></div>
          <span className="relative z-10 flex items-center whitespace-nowrap">
            Initialize <MdArrowRightAlt className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </m.div>

    </section>
  );
}

export default HeroSection;
