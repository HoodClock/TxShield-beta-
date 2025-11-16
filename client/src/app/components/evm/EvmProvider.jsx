"use client"

import { WagmiProvider } from "wagmi"
import { wagmiConfig, chains } from "@/lib/wagmi"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"

export default function EvmProvider({ children }) {
    return (
        <WagmiProvider config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>
                {children}
            </RainbowKitProvider>
        </WagmiProvider>
    )
}