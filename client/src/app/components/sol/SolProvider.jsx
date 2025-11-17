"use client"

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { useMemo } from "react"


export default function SolProvider({ children }) {

    const wallets = useMemo(() => [], []) // empty because the phantom wallet isntance is already initialized

    return (
        <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_SOL_MAINNET_RPC}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}