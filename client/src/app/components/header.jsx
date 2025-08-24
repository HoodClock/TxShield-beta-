"use client";
import Link from "next/link";
import ConnectWallet from "./connectWallet";
import { useState } from "react";

export default function Header() {

  const [activeTab, setActiveTab] = useState("");

  return (
    <header className="top-0 z-50 bg-black">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + Title (now clickable) */}
        <Link style={{
          fontFamily: "'ClashDisplay-Bold', sans-serif",
         }} href="/home" className="flex items-center space-x-3 group">
          <div
           className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-white to-gray-300 rounded-lg transition-transform group-hover:scale-105">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors">
            TxShield
          </h1>
        </Link>

         {/* Centered Navigation Menu */}
         <nav
         style={{
          fontFamily: "'ClashDisplay-Bold', sans-serif",
         }}
         className="absolute left-1/2 transform -translate-x-1/2 flex justify-between flex-wrap items-center space-x-12">
          <Link
            href="https://txshield.gitbook.io/txshield-docs/"
            className="relative group py-2"
            onMouseEnter={() => setActiveTab("documentation")}
            onMouseLeave={() => setActiveTab("")}
          >
            <span className="text-gray-300 group-hover:text-white transition-colors duration-300 clash-font text-lg">
              Documentation
            </span>
            <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transition-all duration-300 ${activeTab === "documentation" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
          </Link>

          <Link
            href="/ApiRef"
            className="relative group py-2"
            onMouseEnter={() => setActiveTab("api")}
            onMouseLeave={() => setActiveTab("")}
          >
            <span className="text-gray-300 group-hover:text-white transition-colors duration-300 clash-font text-lg">
              API
            </span>
            <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transition-all duration-300 ${activeTab === "api" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
          </Link>
        </nav>

        <ConnectWallet />
      </div>
    </header>
  );
}