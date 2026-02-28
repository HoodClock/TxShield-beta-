"use client"

import dynamic from "next/dynamic"

const EvmProvider = dynamic(() => import("./evm/EvmProvider"), {
    ssr: false,
    loading: () => (
        <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        </div>
    )
})

const SolProvider = dynamic(() => import("./sol/SolProvider"), {
    ssr: false,
    loading: () => (
        <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        </div>
    )
})

export default function WalletProviderWrapper({ chain, children }) {
    if (!chain) {
        return <>{children}</>
    }

    const Provider = chain === "EVM" ? EvmProvider : SolProvider;

    return (
        <Provider>
            {children}
        </Provider>
    )
}