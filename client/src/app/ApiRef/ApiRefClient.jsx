"use client";

import React, { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import {
    authConnect as AuthApiConnect,
    authGetAPI as AuthFetchAPi,
} from "@/api/api";
import { m, AnimatePresence } from "framer-motion";
import ConnectButtonWrapper from "../components/ConnectButtonWrapper";

const ENDPOINTS = [
    { method: "POST", path: "/v1/simulate", desc: "EVM Matrix Simulation" },
    { method: "POST", path: "/v1/honeypot", desc: "Token Trap Analysis" },
    { method: "POST", path: "/v1/phishing", desc: "Signature Threat Scan" },
    { method: "POST", path: "/v1/sol-simulate", desc: "Solana Simulation" },
];

const STEPS = [
    { label: "INIT", text: "Establish Web3 wallet connection", num: "01" },
    { label: "AUTH", text: "Sign payload to generate secure API Key", num: "02" },
    { label: "LINK", text: "Inject key into x-api-key request header", num: "03" },
];

export default function ApiRefClient() {
    const account = useActiveAccount();
    const address = account?.address;
    const isConnected = !!account;
    const [apiKey, setApiKey] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchAPiKey = async () => {
            if (!address) return;
            setFetching(true);
            try {
                const res = await AuthFetchAPi(address);
                if (res.data?.apiKey) setApiKey(res.data.apiKey);
            } catch (err) {
                console.error("Error fetching API key:", err);
            } finally {
                setFetching(false);
            }
        };
        fetchAPiKey();
    }, [address]);

    const handleGenerateKey = async () => {
        if (!isConnected || !address) return;
        try {
            setLoading(true);
            const message = "They can't exploit you if you are the exploit";
            const signature = await account.signMessage({ message });
            const res = await AuthApiConnect({ wallet: address, signature });
            setApiKey(res.data.apiKey);
        } catch (err) {
            console.error("Error generating API key:", err);
            alert("Failed to generate API key");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (!apiKey) return;
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-black text-white h-screen w-screen overflow-hidden relative flex flex-col">

            {/* Ambient background glows — matches site-wide pattern */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-cyan-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-purple-900/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 flex flex-col h-full w-full px-6 sm:px-10 lg:px-16 pt-10 pb-8">

                {/* ── MASSIVE TITLE BLOCK ── */}
                <div className="shrink-0 mb-6 pr-16">
                    <h1 className="font-clash font-extrabold uppercase leading-none tracking-tight"
                        style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}>
                        <span className="text-white">API </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">ACCESS</span>
                    </h1>
                    <div className="flex items-center gap-4 mt-3">
                        <div className="h-[1px] w-12 bg-white/20"></div>
                        <span className="font-mono text-[11px] text-gray-500 tracking-[0.3em] uppercase">
                            Developer Terminal
                        </span>
                        <div className="h-[1px] flex-1 max-w-[200px] bg-white/10"></div>
                        <a
                            href="https://docs.txshield.xyz/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[11px] text-gray-500 hover:text-white tracking-[0.2em] uppercase transition-colors flex items-center gap-1.5 group"
                        >
                            Read Docs
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* ── MAIN TWO-COLUMN LAYOUT ── */}
                <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">

                    {/* LEFT: Access Token Panel */}
                    <div className="lg:w-[360px] xl:w-[400px] shrink-0 flex flex-col border border-white/10 overflow-hidden bg-black">

                        {/* Panel top bar */}
                        <div className="h-9 border-b border-white/10 bg-purple-950/20 flex items-center px-4 justify-between shrink-0">
                            <span className="font-mono text-[10px] text-purple-300/50 uppercase tracking-widest">Access Token</span>
                            <span className={`font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5 ${isConnected ? 'text-cyan-500' : 'text-white/20'}`}>
                                <span className={`w-1.5 h-1.5 ${isConnected ? 'bg-cyan-500 animate-pulse' : 'bg-white/20'}`}></span>
                                {isConnected ? 'Connected' : 'Disconnected'}
                            </span>
                        </div>

                        <div className="flex-1 flex flex-col p-5 gap-5 overflow-y-auto">

                            {/* Wallet Connect */}
                            <div className="flex flex-col gap-2">
                                <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                                    Phase 01 — Connect Wallet
                                </span>
                                <div className="flex justify-start">
                                    <ConnectButtonWrapper />
                                </div>
                            </div>

                            <div className="h-[1px] w-full bg-white/5"></div>

                            {/* Auth & Generate */}
                            <div className="flex flex-col gap-4">
                                <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                                    Phase 02 — Authenticate
                                </span>

                                {/* Not connected */}
                                {!isConnected && (
                                    <div className="border border-white/5 p-4 flex items-start gap-3">
                                        <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest leading-relaxed">
                                            Status: Awaiting wallet connection to proceed with authentication.
                                        </span>
                                    </div>
                                )}

                                {/* Fetching */}
                                {isConnected && fetching && (
                                    <div className="flex justify-center py-6">
                                        <div className="w-5 h-5 border border-white/30 border-t-white animate-spin"></div>
                                    </div>
                                )}

                                {/* Generate button */}
                                {isConnected && !fetching && !apiKey && (
                                    <m.button
                                        onClick={handleGenerateKey}
                                        disabled={loading}
                                        whileHover={{ scale: loading ? 1 : 1.005 }}
                                        whileTap={{ scale: loading ? 1 : 0.995 }}
                                        className="w-full py-3.5 border border-white/20 hover:border-white/50 bg-white/[0.03] hover:bg-white/[0.06] text-white font-mono text-xs tracking-[0.2em] uppercase transition-all relative overflow-hidden group focus:outline-none"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {loading ? (
                                                <>
                                                    <div className="w-3 h-3 border border-white/40 border-t-white animate-spin"></div>
                                                    Establishing Link...
                                                </>
                                            ) : (
                                                "Generate Security Key →"
                                            )}
                                        </span>
                                    </m.button>
                                )}

                                {/* API Key display */}
                                {isConnected && apiKey && !fetching && (
                                    <AnimatePresence>
                                        <m.div
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex flex-col gap-2"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 bg-cyan-500 animate-pulse shadow-[0_0_6px_rgba(34,211,238,0.6)]"></span>
                                                    Active Key
                                                </span>
                                            </div>
                                            <div className="flex items-stretch border border-white/10">
                                                <span className="flex-1 font-mono text-xs text-gray-400 px-4 py-3 truncate">{apiKey}</span>
                                                <button
                                                    onClick={handleCopy}
                                                    className="shrink-0 px-3 border-l border-white/10 hover:bg-white/5 text-white/30 hover:text-white transition-all"
                                                    title="Copy"
                                                >
                                                    {copied ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                            <p className="font-mono text-[10px] text-white/20 tracking-wider">Header: x-api-key</p>
                                        </m.div>
                                    </AnimatePresence>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Integration + Endpoints */}
                    <div className="flex-1 flex flex-col gap-4 min-h-0 overflow-hidden">

                        {/* Integration Steps */}
                        <div className="border border-white/10 shrink-0">
                            <div className="h-9 border-b border-white/10 bg-blue-950/20 flex items-center px-4 justify-between">
                                <span className="font-mono text-[10px] text-blue-300/50 uppercase tracking-widest">Integration Protocol</span>
                                <span className="font-mono text-[10px] text-white/20">3 phases</span>
                            </div>
                            <div className="flex flex-row divide-x divide-white/5">
                                {STEPS.map((step, idx) => (
                                    <div key={idx} className="flex-1 p-4 flex flex-col gap-2 hover:bg-white/[0.02] transition-colors group">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-[10px] text-white/20 tracking-widest">{step.num}</span>
                                            <span className="font-mono text-[10px] text-white border border-white/20 px-2 py-0.5 tracking-widest group-hover:border-cyan-500/40 group-hover:text-cyan-400 transition-colors">
                                                {step.label}
                                            </span>
                                        </div>
                                        <p className="font-mono text-[11px] text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">{step.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Endpoints */}
                        <div className="border border-white/10 flex flex-col flex-1 min-h-0 overflow-hidden">
                            <div className="h-9 border-b border-white/10 bg-purple-950/10 flex items-center px-4 justify-between shrink-0">
                                <span className="font-mono text-[10px] text-purple-300/40 uppercase tracking-widest">Available Endpoints</span>
                                <span className="font-mono text-[10px] text-white/20">v1.0</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-white/5 border-t-0 overflow-y-auto flex-1">
                                {ENDPOINTS.map((ep, idx) => (
                                    <m.div
                                        key={idx}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: idx * 0.06 }}
                                        className={`p-5 flex flex-col gap-2 hover:bg-purple-950/20 transition-colors group cursor-crosshair border-b border-white/5`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono text-[10px] font-bold text-white/50 border border-white/10 px-2 py-0.5 tracking-widest group-hover:border-white/30 group-hover:text-white transition-all">
                                                {ep.method}
                                            </span>
                                            <span className="font-mono text-xs text-white/80 group-hover:text-white transition-colors">{ep.path}</span>
                                        </div>
                                        <p className="font-mono text-[11px] text-white/25 group-hover:text-white/50 transition-colors pl-[58px]">{ep.desc}</p>
                                    </m.div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
