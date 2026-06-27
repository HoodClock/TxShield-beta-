"use client";

import React, { useState, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiAlertTriangle, FiZap } from "react-icons/fi";
import { useUI } from "../provider/UIProvider";

const APPRECIATION_LINES = [
  "Welcome back to the dark side! We missed you.",
  "Grateful for your return to the void. Your eyes are safe now.",
  "Ah, back to safety. We knew you couldn't stay away.",
  "Thank you for returning to stealth mode. Operational efficiency restored.",
  "The void appreciates your loyalty.",
  "Wise choice. Your retinas owe you one.",
];

const LIGHT_MODE_LINES = [
  "Are you sure about turning the lights on?? It may be blinding... proceed with extreme caution.",
  "Warning: Activating flashbang mode. Protect your eyes.",
  "Entering the blinding abyss of light mode. Are you prepared?",
  "The light mode is a trap! But if you insist, click confirm.",
  "Preparing to simulate the surface of the sun. Proceed?",
  "You are about to betray the dark side. Are you absolutely certain?",
];

export default function ThemeController() {
  const { 
    theme, 
    isThemeModalOpen, 
    pendingTheme, 
    requestThemeChange, 
    confirmThemeChange, 
    cancelThemeChange 
  } = useUI();

  const [showToast, setShowToast] = useState(false);
  const [toastLine, setToastLine] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const prevTheme = useRef(theme);

  useEffect(() => {
    if (prevTheme.current === "light" && theme === "dark") {
      const randomIndex = Math.floor(Math.random() * APPRECIATION_LINES.length);
      setToastLine(APPRECIATION_LINES[randomIndex]);
      setShowToast(true);
      
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000); // 2 seconds as requested
      
      return () => clearTimeout(timer);
    }
    prevTheme.current = theme;
  }, [theme]);

  useEffect(() => {
    if (isThemeModalOpen && pendingTheme === "light") {
      const randomIndex = Math.floor(Math.random() * LIGHT_MODE_LINES.length);
      setModalMessage(LIGHT_MODE_LINES[randomIndex]);
    }
  }, [isThemeModalOpen, pendingTheme]);

  const isSwitchingToLight = pendingTheme === "light";

  return (
    <>
      {/* Tactical Theme Toggle Switch - Refined Design */}
      <m.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-8 right-28 z-[100] flex flex-col items-end gap-2"
      >
        <div 
          onClick={() => requestThemeChange(theme === "dark" ? "light" : "dark")}
          className="relative w-14 h-7 rounded-full bg-muted border border-border cursor-pointer p-1 transition-all duration-300 hover:border-primary/50 shadow-inner group overflow-hidden"
        >
          {/* Internal Glow */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity ${theme === "dark" ? "bg-purple-500" : "bg-yellow-500"}`}></div>

          <m.div
            animate={{ 
              x: theme === "dark" ? 28 : 0,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`w-5 h-5 rounded-full flex items-center justify-center shadow-md backdrop-blur-md border ${
              theme === "dark" 
                ? "bg-purple-600/20 border-purple-500/40" 
                : "bg-yellow-500/20 border-yellow-500/40"
            }`}
          >
            {theme === "dark" ? (
              <FiMoon className="w-3 h-3 text-purple-400" />
            ) : (
              <FiSun className="w-3 h-3 text-yellow-500" />
            )}
          </m.div>
        </div>

        {/* Humor alert message */}
        <AnimatePresence>
          {showToast && (
            <m.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center gap-1.5 text-right"
            >
              <FiZap className="w-3 h-3 text-purple-500 animate-pulse" />
              <span className="font-mono text-[10px] text-foreground uppercase tracking-wider max-w-[200px]">
                {toastLine}
              </span>
            </m.div>
          )}
        </AnimatePresence>
      </m.div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {isThemeModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={cancelThemeChange}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Modal Content */}
            <m.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md p-8 rounded-3xl bg-card border border-border shadow-2xl overflow-hidden"
            >
              {/* Decorative Glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 -z-10 opacity-20 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] ${isSwitchingToLight ? 'from-yellow-400 to-transparent' : 'from-purple-600 to-transparent'}`} />

              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center ${isSwitchingToLight ? 'bg-yellow-500/10' : 'bg-purple-500/10'}`}>
                  {isSwitchingToLight ? (
                    <FiAlertTriangle className="w-8 h-8 text-yellow-500" />
                  ) : (
                    <FiZap className="w-8 h-8 text-purple-500" />
                  )}
                </div>

                <h3 className="text-2xl font-clash font-bold text-foreground mb-3 tracking-tight">
                  {isSwitchingToLight ? "HIGH INTENSITY ALERT" : "WELCOME BACK"}
                </h3>

                <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-8 uppercase tracking-wider">
                  {isSwitchingToLight 
                    ? modalMessage || "Are you sure about turning the lights on?? It may be blinding... proceed with extreme caution."
                    : "Welcome back to the dark side! Your eyes will thank you for returning to the void."
                  }
                </p>

                <div className="flex w-full gap-4">
                  <button
                    onClick={cancelThemeChange}
                    className="flex-1 py-4 rounded-xl font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground hover:bg-muted transition-all border border-transparent hover:border-border"
                  >
                    Abort
                  </button>
                  <button
                    onClick={confirmThemeChange}
                    className={`flex-1 py-4 rounded-xl font-mono text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg transition-all ${
                      isSwitchingToLight 
                        ? 'bg-yellow-500 text-black hover:bg-yellow-400 shadow-yellow-500/20' 
                        : 'bg-primary text-white hover:bg-primary/90 shadow-primary/20'
                    }`}
                  >
                    Confirm
                  </button>
                </div>
              </div>

              {/* Status Bar */}
              <div className="mt-8 pt-4 border-t border-border flex justify-center">
                <span className="font-mono text-[8px] text-muted-foreground/50 uppercase tracking-[0.5em]">System-Override v2.0.4</span>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
