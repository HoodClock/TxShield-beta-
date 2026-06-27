"use client";

import React, { useEffect, useState, useRef } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";
import { useUI } from "../provider/UIProvider";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [targetText, setTargetText] = useState("SYSTEM.IDLE");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const { isCustomCursorEnabled } = useUI();

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

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

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

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    if (isCustomCursorEnabled && !isTouchDevice) {
      document.documentElement.classList.add("custom-cursor-active");
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [mouseX, mouseY, isCustomCursorEnabled, isTouchDevice]);

  if (isTouchDevice || !isCustomCursorEnabled) return null;

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
          borderColor: isHovering ? "rgba(34, 211, 238, 0.9)" : "rgba(168, 85, 247, 0.8)",
        }}
        transition={{
          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
          scale: { type: "spring", stiffness: 300, damping: 20 },
        }}
        className="absolute w-10 h-10 rounded-full border border-dashed border-purple-500/80 shadow-[0_0_15px_rgba(168,85,247,0.4)] backdrop-blur-sm"
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
        className="absolute w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.8),inset_0_0_4px_rgba(255,255,255,0.8)] border border-white/20"
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
        <span className={`font-mono text-[8px] tracking-wider ${isHovering ? "text-cyan-400 drop-shadow-[0_0_3px_rgba(34,211,238,0.8)]" : "text-purple-400 drop-shadow-[0_0_3px_rgba(168,85,247,0.8)]"}`}>
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
