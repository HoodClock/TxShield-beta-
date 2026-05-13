"use client";
import { m, useScroll, useSpring } from "framer-motion";

export default function ScrollIndicator({ containerRef }) {
  const { scrollYProgress } = useScroll(containerRef ? { container: containerRef } : {});
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <m.div 
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-cyan-400 to-blue-500 origin-left z-[100] shadow-[0_0_8px_rgba(34,211,238,0.4)]"
      style={{ scaleX }}
    />
  );
}
