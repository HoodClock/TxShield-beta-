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
    <header className={`fixed top-0 w-full z-50 transition-all duration-500
      ${isScrolled ? "bg-black/80 backdrop-blur-lg border-b border-white/10" : "bg-transparent"}
    `}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">

        <Link href="/home" className="flex items-center group">
          <div className="w-30 h-30 flex items-center justify-center rounded-full transition-transform group-hover:scale-110">
            <img 
              src="/Images/newlogo.jpg"
              alt="Shield Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </Link>

        <nav className="absolute left-1/2 -translate-x-1/2 flex space-x-8">
          {["Documentation", "API"].map((item) => (
            <Link
              key={item}
              href={item === "Documentation" ? "https://txshield.gitbook.io/txshield-docs/" : "/ApiRef"}
              className="relative group py-2"
              onMouseEnter={() => setActiveTab(item.toLowerCase())}
              onMouseLeave={() => setActiveTab("")}
            >
              <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm font-medium">
                {item}
              </span>
              <div
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transition-all duration-300
                ${activeTab === item.toLowerCase() ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
              />
            </Link>
          ))}
        </nav>

      </div>
    </header>
  );
}
