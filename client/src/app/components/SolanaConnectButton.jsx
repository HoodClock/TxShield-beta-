"use client"

import { Suspense, lazy } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'

const WalletMultiButton = lazy(() =>
    import('@solana/wallet-adapter-react-ui').then(module => ({
        default: module.WalletMultiButton
    }))
)


export default function SolanaConnectButton() {
    const { publicKey } = useWallet()

    return (
        <Suspense fallback={
            <div className="h-12 w-48 bg-purple-800 rounded-lg animate-pulse flex items-center justify-center">
                <span className="text-gray-300 text-sm">Loading Solana Wallet...</span>
            </div>
        }>
            <div className="flex flex-col items-center gap-2">
                <WalletMultiButton />
                {publicKey && (
                    <p className="text-green-400 text-sm">Connected: {publicKey.toBase58().slice(0, 8)}...</p>
                )}
            </div>
        </Suspense>
    )
}