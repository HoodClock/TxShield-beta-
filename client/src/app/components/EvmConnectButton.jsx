"use client"

import { Suspense, lazy } from "react"
import '@rainbow-me/rainbowkit/styles.css'

const ConnectButton = lazy(() =>
    import('@rainbow-me/rainbowkit').then(module => ({
        default: module.ConnectButton
    }))
)

export default function EvmConnectButton() {
    return (
        <div className="rainbowkit-connect-wrapper">
            <Suspense fallback={
                <button
                    disabled
                    className="h-12 px-6 bg-blue-600 rounded-lg flex items-center justify-center opacity-50 cursor-not-allowed"
                >
                    <span className="text-white text-sm">Connect Wallet</span>
                </button>
            }>
                <ConnectButton />
            </Suspense>
        </div>
    )
}