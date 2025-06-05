"use client";
import Link from "next/link";
import ConnectWallet from "./connectWallet";

export default function Header() {
  return (
    <header className="top-0 z-50 bg-black">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + Title (now clickable) */}
        <Link href="/home" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-white to-gray-300 rounded-lg transition-transform group-hover:scale-105">
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

        <ConnectWallet />
      </div>
    </header>
  );
}