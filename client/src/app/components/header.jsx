"use client";
import Link from "next/link";
import ConnectWallet from "./connectWallet";

export default function Header() {

  return (
    <header className="top-0 z-50 bg-black">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left Logo + Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#FFD700] to-[#FFC300] rounded-lg">
            {/* Your SVG */}
          </div>
          <h1 className="text-2xl font-bold text-white">TxShield</h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link
            href="/home"
            className="text-white hover:text-[#FFD700] transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            href="/contact"
            className="text-white hover:text-[#FFD700] transition-colors font-medium"
          >
            Contact Us
          </Link>
          <Link
            href="/simulate"
            className="text-white hover:text-[#FFD700] transition-colors font-medium"
          >
            Simulate
          </Link>
          <a
            href="#"
            className="text-white hover:text-[#FFD700] transition-colors font-medium"
          >
            About
          </a>
        </nav>

        <ConnectWallet />
        
      </div>
    </header>
  );
}
