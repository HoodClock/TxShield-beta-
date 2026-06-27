"use client";

import React, { useEffect, useState, useRef } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [targetText, setTargetText] = useState("SYSTEM.IDLE");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const coordRef = useRef(null);

  // Smooth position for the outer elements
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 300, damping: 25 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect if this is a touch screen device
    const isTouch = 
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) {
      setIsTouchDevice(true);
      return; // Do not attach mouse listeners if on a touch device
    }

    let currentIsVisible = false;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!currentIsVisible) {
        currentIsVisible = true;
        setIsVisible(true);
      }

      // Update coordinates text directly to avoid React re-renders on every mouse move
      if (coordRef.current) {
        coordRef.current.textContent = `X:${Math.round(e.clientX)} Y:${Math.round(e.clientY)}`;
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = 
        target.closest("button") || 
        target.closest("a") || 
        target.closest('[role="button"]') ||
        target.closest("input") ||
        target.closest("select") ||
        target.closest("textarea");
      
      setIsHovering(!!isClickable);
      
      if (isClickable) {
        const text = target.textContent?.trim().slice(0, 15) || "INTERACT";
        setTargetText(`LOCKED.${text.toUpperCase()}`);
      } else {
        setTargetText("SYSTEM.IDLE");
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    
    const handleMouseLeave = () => {
      currentIsVisible = false;
      setIsVisible(false);
    };
    const handleMouseEnter = () => {
      currentIsVisible = true;
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Add class to hide default cursor
    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [mouseX, mouseY]);

  if (!isVisible || isTouchDevice) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden">
      {/* Outer Rotating Dashed Ring */}
      <m.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          rotate: [0, 360],
          borderColor: isHovering ? "rgba(34, 211, 238, 0.8)" : "rgba(168, 85, 247, 0.5)",
        }}
        transition={{
          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
          scale: { type: "spring", stiffness: 300, damping: 20 },
        }}
        className="absolute w-10 h-10 rounded-full border border-dashed border-purple-500/50"
      />

      {/* Target Crosshair Corners (appears on hover) */}
      <m.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.2 : 0,
          opacity: isHovering ? 1 : 0,
        }}
        className="absolute w-14 h-14"
      >
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />
      </m.div>

      {/* Inner Dot */}
      <m.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isMouseDown ? 0.5 : isHovering ? 1.2 : 1,
          backgroundColor: isHovering ? "#22d3ee" : "#a855f7",
        }}
        className="absolute w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
      />

      {/* Live Data HUD (Coordinates & Status) */}
      <m.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "20px",
          translateY: "-50%",
        }}
        animate={{
          opacity: isHovering ? 1 : 0.7,
        }}
        className="absolute flex flex-col gap-0.5 pointer-events-none"
      >
        {/* Coordinates */}
        <span 
          ref={coordRef}
          className="font-mono text-[9px] text-white/40 tracking-wider"
        >
          X:0 Y:0
        </span>
        
        {/* Status */}
        <span className={`font-mono text-[8px] tracking-wider ${isHovering ? "text-cyan-400" : "text-purple-400"}`}>
          {targetText}
        </span>
      </m.div>

      {/* Subtle Glow */}
      <m.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-16 h-16 bg-purple-500/5 rounded-full blur-xl -z-10"
      />
    </div>
  );
}
