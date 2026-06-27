"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useUI } from "../provider/UIProvider";
import { FiMousePointer } from "react-icons/fi";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Simulator", path: "/simulate" },
  { name: "Scammer Playbook", path: "/playbook" },
  { name: "Live Stats", path: "/stats" },
  { name: "TxShield Core", path: "/core" },
  { name: "API Reference", path: "/ApiRef" },
  { name: "Contact Us", path: "/contact" },
];

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const pathname = usePathname();
  const { isCustomCursorEnabled, toggleCustomCursor } = useUI();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isOpen) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isOpen]);

  const handleNavigation = (e, path) => {
    e.preventDefault();
    if (pathname === path) {
      closeMenu();
      return;
    }
    window.dispatchEvent(new CustomEvent("start-page-transition", { detail: { path } }));
    closeMenu();
  };

  return (
    <>
      {/* Floating Hamburger Button */}
      <button
        onClick={toggleMenu}
        className={`fixed top-8 right-8 z-[100] flex justify-center items-center w-12 h-12 rounded-full transition-all duration-500 ${
          isOpen ? "bg-card border border-primary/20" : "bg-background/20 border border-border hover:bg-muted"
        } backdrop-blur-md group transition-colors duration-700`}
        aria-label="Toggle Menu"
      >
        <div 
          className={`relative w-6 h-6 flex flex-col justify-center items-center transition-all duration-500 ${isOpen ? "opacity-100 scale-110" : "opacity-100"}`}
          style={isOpen ? { transform: "perspective(1000px) rotateY(-30deg) rotateX(10deg) skewX(-5deg)" } : {}}
        >
          <span className={`absolute h-[1.5px] transition-all duration-300 ${isOpen ? "w-6 rotate-45 bg-blue-400 translate-x-[1px] shadow-[0_0_8px_rgba(59,130,246,0.4)]" : "w-5 -translate-y-1.5 bg-foreground"}`} />
          <span className={`absolute h-[1.5px] bg-foreground transition-all duration-300 ${isOpen ? "opacity-0" : "w-3 translate-x-1"}`} />
          <span className={`absolute h-[1.5px] transition-all duration-300 ${isOpen ? "w-6 -rotate-45 bg-purple-400 -translate-x-[1px] opacity-80 shadow-[0_0_8px_rgba(168,85,247,0.3)]" : "w-5 translate-y-1.5 bg-foreground"}`} />
        </div>
      </button>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[90] bg-background flex flex-col items-center justify-center overflow-hidden transition-colors duration-700"
          >
            {/* Ambient Mouse Glow */}
            <motion.div 
              className="absolute pointer-events-none w-[600px] h-[600px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-primary/5 to-transparent rounded-full"
              animate={{ 
                x: mousePos.x - 300, 
                y: mousePos.y - 300 
              }}
              transition={{ type: "spring", damping: 30, stiffness: 50 }}
            />

            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
            </div>

            <nav className="relative z-10 flex flex-col items-start space-y-2 md:space-y-4">
              {navItems.map((item, i) => {
                const isActive = pathname === item.path;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex items-baseline gap-6 overflow-visible"
                  >
                    {/* Index Number */}
                    <span className="font-mono text-[10px] text-muted-foreground/50 tracking-widest pt-2 w-10 text-right">
                      0{i + 1} <span className="opacity-40">//</span>
                    </span>

                    <a
                      href={item.path}
                      onClick={(e) => handleNavigation(e, item.path)}
                      className="relative py-1 px-4 block"
                    >
                      <motion.span
                        whileHover={{ x: 15 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`block font-clash text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight transition-all duration-300 ${
                          isActive 
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]" 
                            : "text-foreground/50 group-hover:text-foreground"
                        }`}
                      >
                        {item.name}
                      </motion.span>
                      
                      {/* Underline Hover Effect */}
                      <motion.div 
                        className="absolute bottom-0 left-4 h-[2.5px] bg-gradient-to-r from-blue-500 to-purple-500 origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1, x: 15 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        style={{ width: "calc(100% - 32px)" }}
                      />
                    </a>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom Status Branding & Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 flex flex-col items-center gap-6"
            >
              <button
                onClick={toggleCustomCursor}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 hover:bg-muted transition-colors"
              >
                <FiMousePointer className="w-4 h-4 text-muted-foreground" />
                <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                  Custom Cursor: {isCustomCursorEnabled ? "ON" : "OFF"}
                </span>
              </button>

              <div className="flex flex-col items-center gap-4">
                <div className="h-[1px] w-24 bg-border" />
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px] text-muted-foreground tracking-[0.4em] uppercase">Security Protocol</span>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                </div>
              </div>
            </motion.div>

            {/* Side Branding */}
            <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8 opacity-20">
                <span className="font-mono text-[8px] vertical-text tracking-[1em] uppercase text-muted-foreground">Simulation Core</span>
                <div className="h-24 w-[1px] bg-border mx-auto" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </>
  );
}
