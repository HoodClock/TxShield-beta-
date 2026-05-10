"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
      className="h-[100dvh] w-screen bg-background overflow-hidden relative flex flex-col items-center justify-center perspective-[1000px] transition-colors duration-700"
    >
      {/* Cinematic Full Screen Background */}
      <HeroBackground className="z-0 opacity-60" />

      {/* Main Content Centered with 3D Parallax */}
      <m.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 w-full px-8 md:px-16 flex flex-col items-center justify-center -mt-24 pointer-events-none text-center"
      >

        {/* Main Heading with Faint TX Behind */}
        <m.div
          className="relative select-none"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ translateZ: 100 }}
        >
          {/* Faint TX behind SHIELD - larger and positioned behind */}
          <m.div 
            className="absolute inset-0 hidden sm:flex items-center justify-center pointer-events-none"
            style={{ translateZ: -100 }}
          >
            <span className="text-[5rem] sm:text-[8rem] md:text-[11rem] lg:text-[13rem] xl:text-[15rem] font-bold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#3b82f6] opacity-10 select-none -z-10">
              TX
            </span>
          </m.div>
          
          {/* SHIELD text on top */}
          <m.h1
            className="text-[3.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[9rem] xl:text-[10rem] font-bold tracking-tight leading-none pointer-events-auto cursor-default select-none relative z-10"
            whileHover={{ textShadow: "0px 0px 30px rgba(168,85,247,0.8)" }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#3b82f6]">SHIELD</span>
          </m.h1>
        </m.div>

        {/* Tagline */}
        <m.div
          className="text-muted-foreground text-sm sm:text-lg md:text-xl font-light tracking-[0.2em] uppercase mt-8 sm:mt-10 max-w-3xl select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ translateZ: 30 }}
        >
          <span>Every Transaction</span>
        </m.div>

      </m.div>

      {/* Ticker scrolling chains just above the command bar */}
      <ChainTicker />

      {/* Sharp Tactical Command Bar */}
      <m.div
        className="absolute bottom-0 left-0 w-full bg-background/95 backdrop-blur-xl border-t border-border px-6 py-4 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 z-30"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {/* Left: Tactical Status */}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-none bg-primary animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
            <span className="text-primary text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">System Online</span>
          </div>
          <p className="text-muted-foreground text-[9px] sm:text-[10px] font-mono uppercase tracking-widest">
            {scannedCount.toLocaleString()} Scanned
          </p>
        </div>

        {/* Center: Sharp Links */}
        <div className="flex items-center justify-center gap-10 md:gap-12 text-xs sm:text-sm font-mono tracking-widest uppercase">
          <Link href="/playbook" className="text-muted-foreground hover:text-primary transition-colors">
            Playbook
          </Link>
          <div className="w-px h-4 bg-primary/30"></div>
          <Link href="/ApiRef" className="text-muted-foreground hover:text-primary transition-colors">
            API Docs
          </Link>
        </div>

        {/* Right: Sharp CTA Button */}
        <Link
          href="/simulate"
          className="px-6 py-3 bg-transparent border border-primary/50 text-primary font-mono text-xs sm:text-sm tracking-widest uppercase hover:bg-primary/10 transition-all flex items-center group relative overflow-hidden shrink-0"
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary group-hover:w-full transition-all duration-300 opacity-20 z-0"></div>
          <span className="relative z-10 flex items-center whitespace-nowrap">
            Initialize <MdArrowRightAlt className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </m.div>

    </section>
  );
}

export default HeroSection;
