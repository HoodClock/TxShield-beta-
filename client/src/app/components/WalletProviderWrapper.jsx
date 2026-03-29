"use client";

import dynamic from "next/dynamic";
import React from "react";

// Lazy load BOTH providers ONLY when used
const EvmProvider = dynamic(
    () => import("./evm/EvmProvider"),
    {
        ssr: false,
        loading: () => (
            <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            </div>
        ),
    }
);

const SolProvider = dynamic(
    () => import("./sol/SolProvider"),
    {
        ssr: false,
        loading: () => (
            <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            </div>
        ),
    }
);

export default function WalletProviderWrapper({ chain, children }) {
    // ✅ If no chain → don't load anything
    if (!chain) return <>{children}</>;

    // ✅ Select provider dynamically
    if (chain === "EVM") {
        return <EvmProvider>{children}</EvmProvider>;
    }

    if (chain === "SOL") {
        return <SolProvider>{children}</SolProvider>;
    }

    return <>{children}</>;
}