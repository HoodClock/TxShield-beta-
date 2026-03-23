"use client";

import Link from 'next/link';
import { FaTwitter, FaDiscord, FaLinkedin } from 'react-icons/fa';
import { FiHome, FiActivity, FiBook, FiFileText, FiCode } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/5 pt-16 pb-8 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                {/* Brand */}
                <div className="col-span-1 md:col-span-1">
                     <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">TxShield</h3>
                     <p className="text-gray-500 text-sm leading-relaxed">
                        Advanced transaction simulation and security analysis for the decentralized world.
                     </p>
                </div>

                {/* Navigation */}
                <div>
                    <h4 className="text-white font-semibold mb-6">Platform</h4>
                    <ul className="space-y-4">
                        <li>
                            <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors group">
                                <FiHome className="group-hover:scale-110 transition-transform" />
                                <span>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/simulate" className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors group">
                                <FiActivity className="group-hover:scale-110 transition-transform" />
                                <span>Simulate</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h4 className="text-white font-semibold mb-6">Resources</h4>
                    <ul className="space-y-4">
                         <li>
                            <Link href="https://docs.txshield.xyz/" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group">
                                <FiBook className="group-hover:scale-110 transition-transform" />
                                <span>Docs</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/ApiRef" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group">
                                <FiCode className="group-hover:scale-110 transition-transform" />
                                <span>API</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/Tos" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group">
                                <FiFileText className="group-hover:scale-110 transition-transform" />
                                <span>Terms</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Socials - Icons Only */}
                <div>
                    <h4 className="text-white font-semibold mb-6">Connect</h4>
                    <div className="flex gap-4">
                        <a href="https://x.com/Txsheild" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-400/30 text-gray-400 hover:text-blue-400 transition-all duration-300 hover:-translate-y-1">
                            <FaTwitter className="text-lg" />
                        </a>
                        <a href="#" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-400/30 text-gray-400 hover:text-indigo-400 transition-all duration-300 hover:-translate-y-1">
                            <FaDiscord className="text-lg" />
                        </a>
                         <a href="#" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-600/30 text-gray-400 hover:text-blue-600 transition-all duration-300 hover:-translate-y-1">
                            <FaLinkedin className="text-lg" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-600 text-sm">© {new Date().getFullYear()} CodeCommunity. All rights reserved.</p>
                
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs text-gray-500 font-mono">Systems Operational</span>
                </div>
            </div>
        </div>
    </footer>
  );
}