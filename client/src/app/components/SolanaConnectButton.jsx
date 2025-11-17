"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"


export function SolanaConnectButton() {
    const { publicKey } = useWallet()

    return (
        <div>
            <WalletMultiButton />
            {publicKey && <p>Connected: {publicKey.toBase58()}</p>}
        </div>
    )
}