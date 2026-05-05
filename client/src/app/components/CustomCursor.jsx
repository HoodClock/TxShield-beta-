"use client";

import React, { useEffect, useState } from "react";
import { m, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  
  // Smooth spring physics for fluid movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 300, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target;
      const isClickable = 
        target.closest("button") || 
        target.closest("a") || 
        target.closest('[role="button"]') ||
        window.getComputedStyle(target).cursor === "pointer";
      
      setIsHovered(!!isClickable);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Central Core with Blue/Purple Gradient */}
      <m.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-2.5 h-2.5 rounded-full z-10 bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
        animate={{
          scale: isMouseDown ? 0.7 : isHovered ? 1.4 : 1,
        }}
      />

      {/* Rotating Segmented Ring */}
      <m.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-12 h-12 flex items-center justify-center"
        animate={{
          rotate: isHovered ? 180 : 0,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <m.div 
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500/40 border-b-purple-500/40"
          animate={{ 
            rotate: 360,
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 0.8 : 0.4
          }}
          transition={{ 
            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
            scale: { type: "spring", stiffness: 200, damping: 20 }
          }}
        />
        
        {/* Inner Glitch Arcs */}
        <m.div 
          className="absolute w-8 h-8 rounded-full border border-transparent border-l-blue-400/60 border-r-purple-400/60"
          animate={{ 
            rotate: -360,
            scale: isHovered ? 0.8 : 1,
          }}
          transition={{ 
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { type: "spring", stiffness: 200, damping: 20 }
          }}
        />
      </m.div>

      {/* Interaction Pulse Ripple */}
      <AnimatePresence>
        {isHovered && (
          <m.div
            style={{
              x: smoothX,
              y: smoothY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 2.5, opacity: [0, 0.4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            className="absolute w-8 h-8 border-2 border-blue-500/20 rounded-full"
          />
        )}
      </AnimatePresence>

      <style jsx global>{`
        * {
          cursor: none !important;
        }
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
