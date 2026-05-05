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
      {/* Central Diamond Core */}
      <m.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-3 h-3 z-10 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
        animate={{
          rotate: isHovered ? 225 : 45,
          scale: isMouseDown ? 0.8 : isHovered ? 1.5 : 1,
          background: isHovered 
            ? "linear-gradient(135deg, #a855f7, #3b82f6)" 
            : "linear-gradient(135deg, #3b82f6, #a855f7)",
        }}
        transition={{
          rotate: { type: "spring", stiffness: 300, damping: 15 },
          scale: { type: "spring", stiffness: 300, damping: 15 },
        }}
      />

      {/* Tactical Brackets */}
      <m.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-12 h-12 flex items-center justify-center"
      >
        {[0, 90, 180, 270].map((rotation) => (
          <m.div
            key={rotation}
            className="absolute w-2.5 h-2.5 border-t-[1.5px] border-l-[1.5px]"
            style={{
              rotate: rotation,
            }}
            animate={{
              x: isHovered ? (rotation === 0 || rotation === 270 ? -18 : 18) : (rotation === 0 || rotation === 270 ? -14 : 14),
              y: isHovered ? (rotation === 0 || rotation === 90 ? -18 : 18) : (rotation === 0 || rotation === 90 ? -14 : 14),
              opacity: isHovered ? 1 : 0.4,
              borderColor: isHovered ? "#3b82f6" : "var(--muted-foreground)"
            }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
          />
        ))}
      </m.div>

      {/* Rotating Outer Ring */}
      <m.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-16 h-16 flex items-center justify-center"
        animate={{
          rotate: isHovered ? 180 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.8, ease: "circOut" }}
      >
        <m.div 
          className="absolute inset-0 rounded-full border border-dashed border-primary/20"
          animate={{ 
            rotate: 360,
          }}
          transition={{ 
            duration: 15, repeat: Infinity, ease: "linear" 
          }}
        />
      </m.div>

      {/* Interaction Ripple */}
      <AnimatePresence>
        {isMouseDown && (
          <m.div
            style={{
              x: smoothX,
              y: smoothY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 4, opacity: [0, 0.4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute w-10 h-10 border border-primary/40 rounded-full"
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
