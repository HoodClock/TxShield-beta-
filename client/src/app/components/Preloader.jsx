"use client";
import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <m.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1, ease: "easeInOut" } 
          }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="relative flex flex-col items-center gap-12">
            
            {/* Subtle Breathing Logo */}
            <m.div
              animate={{ 
                opacity: [0.4, 0.8, 0.4],
                scale: [0.98, 1, 0.98]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative w-20 h-20"
            >
              <Image 
                src="/Images/logo.png" 
                alt="TxShield" 
                width={80} 
                height={80} 
                className="brightness-90 grayscale opacity-80"
              />
            </m.div>

            {/* Minimalist 1px Progress Line */}
            <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
              <m.div 
                className="absolute top-0 left-1/2 h-full bg-white/40 -translate-x-1/2"
                style={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
              />
            </div>

            {/* Optional: Minimal Percentage */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 overflow-hidden h-4">
              <m.span 
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="font-mono text-[9px] text-white/20 tracking-[0.4em] uppercase"
              >
                Initializing
              </m.span>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
