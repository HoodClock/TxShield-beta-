"use client"

import { ThirdwebProvider } from "thirdweb/react"

export default function EvmProvider({ children }) {
    return (
        <ThirdwebProvider>
            {children}
        </ThirdwebProvider>
    )
}