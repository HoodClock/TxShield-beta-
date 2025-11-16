"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"

export default function WalletProviderWrapper({ chain, children }) {
    const Provider = useMemo(() => {
        if (chain === "EVM") {
            return dynamic(() => import("./evm/EvmProvider"), { ssr: false })
        }
        if (chain === "SOL") {
            return dynamic(() => import("./sol/SolProvider"), { ssr: false })
        }

        return ({ children }) => <>{children}</>
    }, [chain])

    return <Provider>{children}</Provider>
}