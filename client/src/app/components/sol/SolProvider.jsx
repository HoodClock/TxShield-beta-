"use client"

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { useMemo } from "react"

export default function SolProvider({ children }) {

    // Rely on Wallet Standard for auto-detection of browser extensions
    const wallets = useMemo(() => [], [])

    return (
        <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_SOL_MAINNET_RPC || "https://api.mainnet-beta.solana.com"}>
            <WalletProvider wallets={wallets} autoConnect={true}>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}