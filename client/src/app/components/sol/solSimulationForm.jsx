"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react"

export default function SimulationForm({ onSolSimulateAll }) {
    const [contractAddress, setContractAddress] = useState("");
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState("SOL");
    const { publicKey } = useWallet()

    const handleSimulate = async () => {

        if (!contractAddress || !amount) {
            alert("Please enter both contract address and amount.");
            return;
        }

        if (!publicKey) {
            alert("Please connect your wallet first.");
            return
        }

        const { Connection, SystemProgram, Transaction, PublicKey } = await import("@solana/web3.js")

        const connection = new Connection(process.env.NEXT_PUBLIC_SOL_MAINNET_RPC || "https://api.mainnet-beta.solana.com");
        const recepientPubKey = new PublicKey(contractAddress);

        // building dummy tx
        const tx = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: recepientPubKey,
                lamports: Number(amount) * 1_000_000_000, // conversion in lamports
            })
        )

        // feePayer & recent blockhash
        tx.feePayer = publicKey;
        const { blockhash } = await connection.getLatestBlockhash();
        tx.recentBlockhash = blockhash;

        // signing our {tx} with wallet
        const signedTx = await window.solana.signTransaction(tx);

        // convert to base64 for the backend payload 
        const serelizedTx = signedTx.serialize();
        const base64Tx = Buffer.from(serelizedTx).toString("base64");

        // builiding payload
        const solSimulationData = {
            signedTxBase64: base64Tx,
            userAddress: publicKey.toBase58(),
            recepientAddress: contractAddress,
            amount: amount,
            currencySymbol: currency
        }


        onSolSimulateAll({ solSimulationData })
    };

    return (
        <>
            <style jsx>{`
              .sol-btn-gradient-anim {
                background-size: 200% auto;
                background-image: linear-gradient(to right, #9945FF 0%, #14F195 50%, #9945FF 100%);
                transition: background-position 0.5s ease;
              }
              .sol-btn-gradient-anim:hover {
                background-position: right center; /* change the direction of the change here */
              }
            `}</style>
            <div className="relative p-6 mb-8 border border-purple-500/50 rounded-2xl shadow-xl max-w-4xl mx-auto overflow-hidden bg-gradient-to-br from-[#1A0A1A] to-[#0A1A1A] backdrop-blur-sm" // Deeper, more distinct background
                style={{ boxShadow: "0 0 80px rgba(153, 69, 255, 0.5)" }} // Even stronger purple glow
            >
                {/* Solana themed glow/gradient - more prominent */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-cyan-500 opacity-15 blur-3xl rounded-2xl"></div>
                {/* Another subtle background layer */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-700/10 via-transparent to-transparent opacity-5"></div>
                <h2 className="text-2xl font-bold text-white mb-6">
                    Secure Your Transactions
                </h2>
                <p className="text-gray-300 mb-6">
                    Simulate and analyze your blockchain transactions before execution with
                    our advanced security checks
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-2">
                        <label
                            htmlFor="contractAddress"
                            className="block text-left text-gray-300 mb-2 text-sm font-medium"
                        >
                            Contract / Wallet / Token Address
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="contractAddress"
                                placeholder="0x..."
                                className="w-full px-4 py-3 border border-purple-400/20 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                value={contractAddress}
                                onChange={(e) => setContractAddress(e.target.value)}
                            />
                            <div className="absolute right-3 top-3 group">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <div className="absolute hidden group-hover:block right-0 top-full mt-2 w-64 bg-gray-800 text-gray-300 text-sm p-3 rounded-lg shadow-lg border border-white/20 z-10">
                                    Enter any Ethereum contract/Solana Program address, wallet, or token address to
                                    analyze.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="amount"
                            className="block text-left text-gray-300 mb-2 text-sm font-medium"
                        >
                            Amount
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                id="amount"
                                placeholder="0.0"
                                className="w-full px-4 py-3 border border-purple-400/20 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <motion.button
                        onClick={handleSimulate}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full md:w-auto px-8 py-3 text-white font-bold rounded-lg transition-all duration-300 shadow-lg shadow-purple-500/30 flex items-center justify-center sol-btn-gradient-anim relative z-10"
                        style={{ position: 'relative' }}

                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                        Simulate Transaction
                    </motion.button>
                </div>
            </div>
        </>
    );
}
