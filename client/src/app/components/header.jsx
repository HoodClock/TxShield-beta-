"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [activeTab, setActiveTab] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50">
      {/* Animated background with gradient backdrop */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        isScrolled 
          ? "bg-slate-950/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10" 
          : "bg-gradient-to-b from-slate-950/40 to-transparent backdrop-blur-sm"
      }`} />

      {/* Border animation wrapper - only visible when scrolled */}
      {isScrolled && (
        <div className="absolute inset-0 overflow-hidden rounded-b-lg pointer-events-none">
          <div className="border-b border-cyan-400/30 animate-border-glow" />
        </div>
      )}

      <nav className="relative container mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/home" className="flex items-center group z-10 flex-shrink-0">
          <div className="relative h-20 w-auto flex items-center justify-center transition-all duration-300 group-hover:scale-105">
            <img 
              src="/Images/NewLogoActual.jpg"
              alt="Shield Logo"
              className="h-full w-auto object-contain"
            />
          </div>
        </Link>

        {/* Center Navigation Links */}
        <nav className="flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {["Documentation", "API"].map((item) => (
            <Link
              key={item}
              href={item === "Documentation" ? "https://txshield.gitbook.io/txshield-docs/" : "/ApiRef"}
              className="relative group py-2"
              onMouseEnter={() => setActiveTab(item.toLowerCase())}
              onMouseLeave={() => setActiveTab("")}
            >
              <span className="text-gray-300 group-hover:text-cyan-300 transition-colors duration-300 text-sm font-semibold tracking-wide">
                {item}
              </span>
              
              {/* Animated bottom border with glow */}
              <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent 
                opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg shadow-gray-600/50" />
              
              {/* Scale animation underline */}
              <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gray-600 to-gray-700 transition-transform duration-300 origin-left
                ${activeTab === item.toLowerCase() ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} 
              />
            </Link>
          ))}
        </nav>

        {/* Right side placeholder for future elements */}
        <div className="flex-shrink-0 w-10" />
        
      </nav>
    </header>
  );
}
