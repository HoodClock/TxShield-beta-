"use client";
import React, { useState, useEffect } from "react";
import { m, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Precision Dot - Very fast, almost no lag
  const dotSpringConfig = { damping: 20, stiffness: 800 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  // Outer Aura - Fluid, elastic lag
  const auraSpringConfig = { damping: 30, stiffness: 100 };
  const auraX = useSpring(mouseX, auraSpringConfig);
  const auraY = useSpring(mouseY, auraSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.closest("button") || 
        target.closest("a") || 
        target.classList.contains("cursor-pointer");
      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.body.style.cursor = "none";
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "auto";
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999]">
      
      {/* 1. FLUID AURA (Trailing Ring) */}
      <m.div
        className={`fixed top-0 left-0 rounded-full border transition-all duration-500 ease-out flex items-center justify-center`}
        style={{
          x: auraX,
          y: auraY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 80 : 32,
          height: isHovered ? 80 : 32,
          borderColor: isHovered ? "rgba(168, 85, 247, 0.4)" : "rgba(255, 255, 255, 0.15)",
          backgroundColor: isHovered ? "rgba(168, 85, 247, 0.03)" : "transparent",
        }}
      >
        {/* Subtle Gradient Glow on Hover */}
        {isHovered && (
          <m.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-xl"
          />
        )}
      </m.div>

      {/* 2. PRECISION DOT (Floating Point) */}
      <m.div
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full z-20 shadow-[0_0_10px_rgba(255,255,255,0.5)] ${isHovered ? 'bg-cyan-400' : 'bg-white'}`}
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* 3. AMBIENT LINGERING GLOW */}
      <m.div
        className="fixed top-0 left-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-[100px] -z-10"
        style={{
          x: auraX,
          y: auraY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
};

export default CustomCursor;
