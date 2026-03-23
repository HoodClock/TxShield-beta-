"use client";

import React, { useState, useEffect, Suspense, lazy } from "react";
import { useAccount, useSignMessage } from "wagmi";
import {
    authConnect as AuthApiConnect,
    authGetAPI as AuthFetchAPi,
} from "@/api/api";
import { m } from "framer-motion";
import Head from "next/head";
import ScrollProgressBar from "../components/ScrollProgressBar";
import "./page.module.css";
import ConnectButtonWrapper from "../components/ConnectButtonWrapper";
import DataFlowBackground from "../components/DataFlowBackground";
import ScrambleText from "../components/ScrambleText";

const Header = lazy(() => import("../components/header"));
const Footer = lazy(() => import("../components/footer"));

export default function ApiRefClient() {
    const { address, isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
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
                if (res.data?.apiKey) {
                    setApiKey(res.data.apiKey);
                }
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
            const signature = await signMessageAsync({ message });
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
        <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden relative flex flex-col pt-16">
            <Head>
                <title>TxShield - API Access Terminal</title>
            </Head>

            {/* Global Cyber Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <DataFlowBackground />
            </div>

            <Suspense fallback={<div className="h-16 bg-black z-50 relative"></div>}>
                <Header />
            </Suspense>
            <ScrollProgressBar />

            <main className="flex-grow z-10 relative px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full py-16 sm:py-24">

                {/* Hero Header Area */}
                <div className="text-center mb-16 relative">
                    {/* Background Glitch Elements */}
                    <div className="absolute top-0 left-1/3 w-32 h-[1px] bg-purple-500/30 blur-[2px]"></div>
                    <div className="absolute bottom-0 right-1/3 w-48 h-[1px] bg-blue-500/30 blur-[2px]"></div>

                    <div className="inline-block mb-3">
                        <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                            Developer Terminal
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight flex flex-col items-center gap-1 sm:gap-2">
                        <span className="grad-word leading-none">
                            TXSHIELD
                        </span>
                        <span className="text-white text-2xl sm:text-3xl md:text-5xl font-mono leading-tight flex items-center">
                            <ScrambleText text="API ACCESS" duration={2500} loop={false} />
                            <span className="inline-block w-4 sm:w-6 h-8 sm:h-12 ml-2 bg-purple-500 animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite] shadow-[0_0_15px_rgba(168,85,247,0.8)] align-middle mb-1 sm:mb-[6px] rounded-sm hidden sm:inline-block"></span>
                        </span>
                    </h1>
                    <p className="text-gray-400/80 font-mono tracking-wide max-w-xl mx-auto">
                        <span className="text-purple-500/50 mr-2">$</span>
                        Integrate enterprise-grade security analysis directly into your dApps and trading bots.
                    </p>
                </div>

                {/* Two-Column Grid Setup */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative items-start">

                    {/* Left Column: API Key Generator (Span 5) */}
                    <div className="lg:col-span-5 relative group">
                        {/* Ambient Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none -z-10 group-hover:bg-purple-600/20 transition-colors duration-700"></div>

                        <m.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-black/40 border border-white/10 backdrop-blur-xl rounded-3xl p-8 relative overflow-hidden shadow-[0_0_40px_-10px_rgba(0,0,0,0.8)]"
                        >
                            {/* Inner Scanning Line */}
                            <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[scanner_3s_ease-in-out_infinite] pointer-events-none transition-opacity duration-300"></div>

                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-white tracking-tight">Access Token</h2>
                            </div>

                            <div className="space-y-8">
                                <div className="flex justify-center">
                                    <ConnectButtonWrapper />
                                </div>

                                {!isConnected && (
                                    <div className="p-4 rounded-xl bg-gradient-to-r from-gray-900 to-black border border-white/5 relative overflow-hidden">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-700"></div>
                                        <p className="text-center font-mono text-xs text-gray-500 leading-relaxed uppercase tracking-wider">
                                            Status: Disconnected<br />
                                            Action: Require signature to generate key
                                        </p>
                                    </div>
                                )}

                                {isConnected && fetching && (
                                    <div className="flex justify-center p-8">
                                        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
                                    </div>
                                )}

                                {isConnected && !fetching && !apiKey && (
                                    <m.button
                                        onClick={handleGenerateKey}
                                        disabled={loading}
                                        whileHover={{ scale: loading ? 1 : 1.02 }}
                                        whileTap={{ scale: loading ? 1 : 0.98 }}
                                        className="w-full py-4 rounded-xl bg-purple-600/20 border border-purple-500/50 text-white font-bold tracking-widest uppercase text-sm shadow-[0_0_20px_rgba(147,51,234,0.2)] hover:shadow-[0_0_40px_rgba(147,51,234,0.4)] hover:bg-purple-600/40 relative overflow-hidden group glitch-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-purple-500"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-all"></div>
                                        <span className="relative z-10 flex items-center justify-center gap-3">
                                            {loading ? "Establishing Link..." : "Generate Security Key"}
                                            {!loading && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 group-hover:text-purple-300 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            )}
                                        </span>
                                    </m.button>
                                )}

                                {isConnected && apiKey && !fetching && (
                                    <m.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="space-y-3"
                                    >
                                        <label className="block text-green-400 font-mono text-xs uppercase tracking-widest ml-1 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
                                            Active Key
                                        </label>
                                        <div className="relative group/input">
                                            <div className="absolute inset-0 bg-black/60 rounded-xl shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] pointer-events-none border border-green-500/30"></div>
                                            <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent blur-[1px]"></div>
                                            <div className="relative z-10 w-full px-5 py-4 flex items-center justify-between gap-4">
                                                <span className="font-mono text-sm text-gray-300 truncate tracking-tight">{apiKey}</span>
                                                <button
                                                    onClick={handleCopy}
                                                    className="flex-shrink-0 p-2 rounded-lg bg-white/5 hover:bg-green-500/20 text-gray-400 hover:text-green-400 border border-transparent hover:border-green-500/30 transition-all duration-300"
                                                    title="Copy to clipboard"
                                                >
                                                    {copied ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </m.div>
                                )}
                            </div>
                        </m.div>
                    </div>

                    {/* Right Column: Documentation / Tutorial (Span 7) */}
                    <div className="lg:col-span-7 relative group">
                        {/* Ambient Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none -z-10 group-hover:bg-blue-600/20 transition-colors duration-700"></div>

                        <m.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-black/40 border border-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-[0_0_40px_-10px_rgba(0,0,0,0.8)]"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-white tracking-tight">Integration Protocol</h2>
                            </div>

                            <div className="space-y-6">
                                {/* Protocol Steps */}
                                <div className="space-y-4">
                                    {[
                                        { label: "INIT", text: "Establish Web3 wallet connection" },
                                        { label: "AUTH", text: "Sign payload to generate secure API Key" },
                                        { label: "LINK", text: "Inject key into x-api-key request header" },
                                    ].map((step, idx) => (
                                        <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-colors group/step">
                                            <span className="mt-0.5 px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 font-mono text-[10px] tracking-wider border border-blue-500/20 group-hover/step:bg-blue-500 group-hover/step:text-white transition-colors">
                                                {step.label}
                                            </span>
                                            <p className="font-mono text-sm text-gray-300 mt-0.5">{step.text}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Endpoint Terminals */}
                                <div className="mt-8">
                                    <h3 className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-4">Available Endpoints</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {[
                                            { path: "/v1/simulate", desc: "EVM Matrix Simulation" },
                                            { path: "/v1/honeypot", desc: "Token Trap Analysis" },
                                            { path: "/v1/phishing", desc: "Signature Threat Scan" },
                                            { path: "/v1/sol-simulate", desc: "Solana Simulation" },
                                        ].map((endpoint, idx) => (
                                            <div key={idx} className="p-3 rounded-lg bg-black/60 border border-white/5 flex flex-col gap-1.5 cursor-crosshair hover:border-purple-500/40 transition-colors shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)]">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] uppercase font-bold text-green-400">POST</span>
                                                    <span className="font-mono text-xs text-purple-300">{endpoint.path}</span>
                                                </div>
                                                <span className="text-xs text-gray-500 pl-8">{endpoint.desc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* External Link Button */}
                                <div className="pt-6 mt-6 border-t border-white/10 text-right">
                                    <a
                                        href="https://docs.txshield.xyz/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white font-mono text-sm tracking-wide transition-all group glitch-hover"
                                    >
                                        Read Official Documentation
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </m.div>
                    </div>
                </div>

            </main>

            <Suspense fallback={<div className="h-20 bg-black z-50 relative mt-auto"></div>}>
                <Footer />
            </Suspense>
        </div>
    );
}
