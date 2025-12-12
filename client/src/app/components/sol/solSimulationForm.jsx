"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react"

export default function SimulationForm({ onSolSimulateAll, backButtonHandler }) {
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
                background-image: linear-gradient(to right, #9945FF 0%, #7B3FF2 50%, #9945FF 100%);
                transition: background-position 0.5s ease;
              }
              .sol-btn-gradient-anim:hover {
                background-position: right center;
              }
              .sol-form-container {
                background: linear-gradient(135deg, rgba(153, 69, 255, 0.05) 0%, rgba(123, 63, 242, 0.03) 100%);
              }
              input::-webkit-outer-spin-button,
              input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }
              input[type='number'] {
                -moz-appearance: textfield;
              }
            `}</style>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative p-8 mb-8 border border-[#9945FF]/40 rounded-2xl shadow-2xl max-w-4xl mx-auto overflow-hidden sol-form-container backdrop-blur-lg"
              style={{ boxShadow: "0 0 40px rgba(153, 69, 255, 0.15), inset 0 0 40px rgba(153, 69, 255, 0.03)" }}
            >
                {/* Gradient border glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#9945FF]/10 via-transparent to-[#7B3FF2]/5 pointer-events-none"></div>
                
                {/* Animated background orbs - Reduced glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/3 rounded-full blur-3xl animate-pulse"></div>

                <button
                    onClick={backButtonHandler}
                    className="absolute top-4 left-4 text-gray-400 hover:text-white transition-all duration-300 z-20 hover:scale-110"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                </button>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9945FF] to-[#7B3FF2] flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.5 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm6 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm6 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9945FF] to-[#7B3FF2]">
                            Solana Simulation
                        </h2>
                    </div>
                    <p className="text-gray-400 mb-8 text-sm md:text-base">
                        Analyze your Solana transaction with advanced security scanning and risk detection
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="col-span-2">
                            <label
                                htmlFor="contractAddress"
                                className="block text-left text-gray-200 mb-3 text-sm font-semibold"
                            >
                                Program / Wallet / Token Address
                            </label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    id="contractAddress"
                                    placeholder="Enter Solana address..."
                                    className="w-full px-4 py-3 border border-[#9945FF]/30 rounded-lg text-white bg-black/30 focus:outline-none focus:ring-2 focus:ring-[#9945FF] focus:border-[#9945FF] transition-all duration-300 placeholder-gray-600"
                                    value={contractAddress}
                                    onChange={(e) => setContractAddress(e.target.value)}
                                />
                                <div className="absolute right-3 top-3 group">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-500 hover:text-[#9945FF] cursor-pointer transition-colors"
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
                                </div>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="amount"
                                className="block text-left text-gray-200 mb-3 text-sm font-semibold"
                            >
                                Amount (SOL)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    id="amount"
                                    placeholder="0.0"
                                    className="w-full px-4 py-3 border border-[#9945FF]/30 rounded-lg text-white bg-black/30 focus:outline-none focus:ring-2 focus:ring-[#9945FF] focus:border-[#9945FF] transition-all duration-300 placeholder-gray-600"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <motion.div 
                        className="mt-8 flex justify-center relative"
                        whileHover={{ scale: 1.02 }}
                    >
                        {/* Purple gradient glow around button */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#9945FF]/20 via-[#7B3FF2]/20 to-[#9945FF]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-150"></div>
                        
                        <motion.button
                            onClick={handleSimulate}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full md:w-auto px-8 py-4 text-white font-bold rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center sol-btn-gradient-anim relative z-10 hover:shadow-2xl hover:shadow-[#9945FF]/50"
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
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
}
