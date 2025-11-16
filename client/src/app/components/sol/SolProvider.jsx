"use client"

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"



const wallets = [new PhantomWalletAdapter()]


export default function SolProvider({ children }) {
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