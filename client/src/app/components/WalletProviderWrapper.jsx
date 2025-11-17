"use client"

import { Suspense, lazy } from "react"


const EvmProvider = lazy(() => import("./evm/EvmProvider"))
const SolProvider = lazy(() => import("./sol/SolProvider"))

export default function WalletProviderWrapper({ chain, children }) {
    if (!chain) {
        return <>{children}</>
    }

    const Provider = chain === "EVM" ? EvmProvider : SolProvider;

    return (
        <Suspense
            fallback={
                <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
            }
        >
            <Provider>
                {children}
            </Provider>
        </Suspense>
    )
}