"use client"

import { WagmiConfig } from "wagmi"
import { wagmiConfig, chains } from "@/lib/wagmi"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"

export default function EvmProvider({ children }) {
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>
                {children}
            </RainbowKitProvider>
        </WagmiConfig>
    )
}