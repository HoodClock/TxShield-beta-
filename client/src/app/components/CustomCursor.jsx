"use client";

import React, { useEffect, useState, useRef } from "react";
import { m, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  
  // Track previous position for velocity calculation
  const prevPos = useRef({ x: 0, y: 0 });
  
  // Smooth spring physics for fluid, jelly-like movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      // Calculate velocity for deformation effect
      const velX = currentX - prevPos.current.x;
      const velY = currentY - prevPos.current.y;
      
      // Clamp and normalize velocity for realistic deformation
      const magnitude = Math.sqrt(velX * velX + velY * velY);
      const clampedVel = Math.min(magnitude, 30);
      
      setVelocity({
        x: (velX / (magnitude || 1)) * clampedVel,
        y: (velY / (magnitude || 1)) * clampedVel,
      });

      prevPos.current = { x: currentX, y: currentY };
      mouseX.set(currentX);
      mouseY.set(currentY);

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

  // Calculate deformation based on velocity
  const deformation = Math.min(Math.abs(velocity.x) + Math.abs(velocity.y), 30) / 30;
  const skewAmount = -(velocity.x / 20) * 8; // Opposite direction (negative)
  const stretchY = 1 - (deformation * 0.2); // Compress in direction of movement, stretch opposite

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Jelly Blob - Main Cursor */}
      <m.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 shadow-[0_0_25px_rgba(168,85,247,0.6)]"
        animate={{
          scale: isMouseDown ? 0.7 : isHovered ? 1.3 : 1,
          borderRadius: isMouseDown ? "30%" : isHovered ? "40%" : "50%",
          scaleY: isMouseDown ? 0.7 : stretchY,
          skewX: isMouseDown ? 0 : skewAmount,
        }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 20 },
          borderRadius: { type: "spring", stiffness: 300, damping: 25 },
          scaleY: { type: "spring", stiffness: 300, damping: 25 },
          skewX: { type: "spring", stiffness: 300, damping: 30 },
        }}
      />

      {/* Secondary Deformable Blob - Adds complexity to jelly effect */}
      <m.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400/30 to-purple-400/30"
        animate={{
          scale: isMouseDown ? 0.5 : 1.2,
          scaleX: 1 - (deformation * 0.2), // Opposite: compress when moving
          scaleY: 1 + (deformation * 0.3), // Opposite: stretch when moving
          skewY: skewAmount * 0.6, // Opposite direction
          opacity: 0.6,
        }}
        transition={{
          scale: { type: "spring", stiffness: 350, damping: 25 },
          scaleX: { type: "spring", stiffness: 280, damping: 30 },
          scaleY: { type: "spring", stiffness: 280, damping: 30 },
          skewY: { type: "spring", stiffness: 300, damping: 30 },
        }}
      />

      {/* Jelly Outer Glow */}
      <m.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 blur-lg"
        animate={{
          scale: isHovered ? 1.5 : 1 + (deformation * 0.3),
          opacity: isHovered ? 0.8 : 0.5,
        }}
        transition={{
          scale: { type: "spring", stiffness: 200, damping: 30 },
          opacity: { duration: 0.3 },
        }}
      />

      {/* Jelly Wobble Effect - Adds organic feel */}
      <m.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-6 h-6 rounded-full border-2 border-purple-400/30 blur-sm"
        animate={{
          scale: [1, 1.1, 0.95, 1.05, 1],
          opacity: isHovered ? 0.6 : 0.3,
          scaleY: 1 + (deformation * 0.15),
        }}
        transition={{
          scale: { duration: 0.8, repeat: Infinity, repeatType: "reverse" },
          opacity: { duration: 0.3 },
          scaleY: { type: "spring", stiffness: 300, damping: 25 },
        }}
      />

      {/* Click Ripple - Jelly burst effect */}
      <AnimatePresence>
        {isMouseDown && (
          <m.div
            style={{
              x: smoothX,
              y: smoothY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute w-8 h-8 border-2 border-cyan-400/60 rounded-full"
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
