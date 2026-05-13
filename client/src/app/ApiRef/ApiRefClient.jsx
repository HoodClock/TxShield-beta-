"use client";

import React, { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import {
    authConnect as AuthApiConnect,
    authGetAPI as AuthFetchAPi,
    authDeleteKey as AuthDeleteKey,

} from "@/api/api";
import { m, AnimatePresence } from "framer-motion";
import ConnectButtonWrapper from "../components/ConnectButtonWrapper";
import ScrollIndicator from "../components/ScrollIndicator";

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
    const handleDeleteKey = async () => {
        if (!isConnected || !address) return;
        try {
            setLoading(true);
            await AuthDeleteKey(address);
            setApiKey(null);
        } catch (err) {
            console.error("Error deleting API key:", err);
            alert("Failed to delete API key");
        } finally {
            setLoading(false);
        }
    };  

    return (
        <div className="bg-background text-foreground min-h-screen w-screen overflow-y-auto relative flex flex-col transition-colors duration-700">
            <ScrollIndicator />

            {/* Ambient background glows — matches site-wide pattern */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-50 dark:opacity-100">
                <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-cyan-900/10 dark:bg-cyan-900/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-purple-900/10 dark:bg-purple-900/20 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 flex flex-col h-full w-full px-6 sm:px-10 lg:px-16 pt-10 pb-8">

                {/* ── MASSIVE TITLE BLOCK ── */}
                <div className="shrink-0 mb-6 pr-16">
                    <h1 className="font-clash font-extrabold uppercase leading-none tracking-tight"
                        style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}>
                        <span className="text-foreground">API </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">ACCESS</span>
                    </h1>
                    <div className="flex items-center gap-4 mt-3">
                        <div className="h-[1px] w-12 bg-border"></div>
                        <span className="font-mono text-[11px] text-muted-foreground tracking-[0.3em] uppercase">
                            Developer Terminal
                        </span>
                        <div className="h-[1px] flex-1 max-w-[200px] bg-border"></div>
                        <a
                            href="https://docs.txshield.xyz/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[11px] text-muted-foreground hover:text-foreground tracking-[0.2em] uppercase transition-colors flex items-center gap-1.5 group"
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
                    <div className="lg:w-[360px] xl:w-[400px] shrink-0 flex flex-col border border-border overflow-hidden bg-card">

                        {/* Panel top bar */}
                        <div className="h-9 border-b border-border bg-muted/50 flex items-center px-4 justify-between shrink-0">
                            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Access Token</span>
                            <span className={`font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5 ${isConnected ? 'text-cyan-500' : 'text-muted-foreground'}`}>
                                <span className={`w-1.5 h-1.5 ${isConnected ? 'bg-cyan-500 animate-pulse' : 'bg-muted-foreground'}`}></span>
                                {isConnected ? 'Connected' : 'Disconnected'}
                            </span>
                        </div>

                        <div className="flex-1 flex flex-col p-5 gap-5 overflow-y-auto">

                            {/* Wallet Connect */}
                            <div className="flex flex-col gap-2">
                                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                                    Phase 01 — Connect Wallet
                                </span>
                                <div className="flex justify-start">
                                    <ConnectButtonWrapper />
                                </div>
                            </div>

                            <div className="h-[1px] w-full bg-border"></div>

                            {/* Auth & Generate */}
                            <div className="flex flex-col gap-4">
                                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                                    Phase 02 — Authenticate
                                </span>

                                

                                {/* Not connected */}
                                {!isConnected && (
                                    <div className="border border-border p-4 flex items-start gap-3">
                                        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest leading-relaxed">
                                            Status: Awaiting wallet connection to proceed with authentication.
                                        </span>
                                    </div>
                                )}
                                
                               

                                {/* Fetching */}
                                {isConnected && fetching && (
                                    <div className="flex justify-center py-6">
                                        <div className="w-5 h-5 border border-border border-t-foreground animate-spin"></div>
                                    </div>
                                )}

                                {/* Generate button */}
                                {isConnected && !fetching && !apiKey && (
                                    <m.button
                                        onClick={handleGenerateKey}
                                        disabled={loading}
                                        whileHover={{ scale: loading ? 1 : 1.01 }}
                                        whileTap={{ scale: loading ? 1 : 0.99 }}
                                        className="w-full py-3.5 bg-gradient-to-r from-[#a855f7] to-[#3b82f6] text-white font-mono text-xs tracking-[0.2em] uppercase transition-all relative overflow-hidden group focus:outline-none shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] border-none"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {loading ? (
                                                <>
                                                    <div className="w-3 h-3 border border-border border-t-foreground animate-spin"></div>
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
                                                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 bg-cyan-500 animate-pulse shadow-[0_0_6px_rgba(34,211,238,0.6)]"></span>
                                                    Active Key
                                                </span>
                                            </div>
                                            <div className="flex items-stretch border border-border">
                                                <span className="flex-1 font-mono text-xs text-foreground/80 px-4 py-3 truncate">*********************</span>
                                                <button
                                                    onClick={handleCopy}
                                                    className="shrink-0 px-3 border-l border-border hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-all"
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
                                            <p className="font-mono text-[10px] text-muted-foreground tracking-wider">Header: x-api-key</p>
                                        </m.div>
                                    </AnimatePresence>
                                )}
                                 {/* button to delete key if exists */}
                                {isConnected && apiKey && !fetching && (
                                    <button
                                        onClick={handleDeleteKey}
                                        disabled={loading}
                                        className="self-start px-3 py-1 bg-red-600 text-white text-xs font-mono uppercase tracking-widest hover:bg-red-700 transition-colors disabled:bg-red-400"
                                    >
                                        {loading ? "Deleting..." : "Delete Key"}
                                    </button>
                                )}  

                            </div>
                        </div>
                    </div>

                                    

                    {/* RIGHT: Integration + Endpoints */}
                    <div className="flex-1 flex flex-col gap-4 min-h-0 overflow-hidden">

                        {/* Integration Steps */}
                        <div className="border border-border shrink-0 bg-card">
                            <div className="h-9 border-b border-border bg-muted/50 flex items-center px-4 justify-between">
                                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Integration Protocol</span>
                                <span className="font-mono text-[10px] text-muted-foreground">3 phases</span>
                            </div>
                            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border">
                                {STEPS.map((step, idx) => (
                                    <div key={idx} className="flex-1 p-4 flex flex-col gap-2 hover:bg-foreground/[0.02] transition-colors group">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-[10px] text-muted-foreground tracking-widest">{step.num}</span>
                                            <span className="font-mono text-[10px] text-foreground border border-border px-2 py-0.5 tracking-widest group-hover:border-cyan-500/40 group-hover:text-cyan-400 transition-colors">
                                                {step.label}
                                            </span>
                                        </div>
                                        <p className="font-mono text-[11px] text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">{step.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Endpoints */}
                        <div className="border border-border flex flex-col flex-1 min-h-0 overflow-hidden bg-card">
                            <div className="h-9 border-b border-border bg-muted/30 flex items-center px-4 justify-between shrink-0">
                                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Available Endpoints</span>
                                <span className="font-mono text-[10px] text-muted-foreground">v1.0</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-border border-t-0 overflow-y-auto flex-1">
                                {ENDPOINTS.map((ep, idx) => (
                                    <m.div
                                        key={idx}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: idx * 0.06 }}
                                        className={`p-5 flex flex-col gap-2 hover:bg-muted/50 transition-colors group cursor-crosshair border-b border-border`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono text-[10px] font-bold text-muted-foreground border border-border px-2 py-0.5 tracking-widest group-hover:border-foreground group-hover:text-foreground transition-all">
                                                {ep.method}
                                            </span>
                                            <span className="font-mono text-xs text-foreground/80 group-hover:text-foreground transition-colors">{ep.path}</span>
                                        </div>
                                        <p className="font-mono text-[11px] text-muted-foreground group-hover:text-foreground/70 transition-colors pl-[58px]">{ep.desc}</p>
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
