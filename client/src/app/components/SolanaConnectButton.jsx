"use client"

import { Suspense, lazy } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'; // Import useWalletModal
import { m } from "framer-motion"; // Import motion for animations

const WalletMultiButton = lazy(() =>
    import('@solana/wallet-adapter-react-ui').then(module => ({
        default: module.WalletMultiButton
    }))
)


export default function SolanaConnectButton() {
    const { publicKey, connected, disconnecting, connecting } = useWallet(); // Get connected status
    const { setVisible } = useWalletModal(); // Get setVisible function

    const handleConnectClick = () => {
        setVisible(true); // Open the wallet modal
    };

    return (
        <Suspense fallback={
            <div className="h-12 w-48 bg-purple-800 rounded-lg animate-pulse flex items-center justify-center">
                <span className="text-gray-300 text-sm">Loading Solana Wallet...</span>
            </div>
        }>
            <div className="flex flex-col items-center gap-2">
                {/* Hide default WalletMultiButton and use our custom one */}
                {!connected && !connecting && (
                    <m.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleConnectClick}
                        type="button"
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-purple-500/40 flex items-center justify-center !visible !block !opacity-100"
                        style={{ visibility: 'visible', display: 'block', opacity: 1, zIndex: 10 }}
                    >
                        Connect Solana Wallet
                    </m.button>
                )}

                {/* Show connected status if connected */}
                {connected && !disconnecting && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white font-bold rounded-lg shadow-lg shadow-gray-700/40">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </div>
                        <span className="text-sm">Connected: {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}</span>
                        {/* Optionally add a disconnect button here or rely on the modal for disconnect */}
                    </div>
                )}
                {connecting && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white font-bold rounded-lg shadow-lg shadow-gray-700/40">
                        <span className="text-sm">Connecting...</span>
                    </div>
                )}

                {/* The actual WalletMultiButton is still rendered but styled to be hidden or transparent
                    This is a workaround to ensure the modal functionality is present,
                    but we control the visual trigger. Alternatively, you could render WalletModalProvider
                    and explicitly call its setVisible method without rendering WalletMultiButton at all.
                */}
                <WalletMultiButton style={{ opacity: 0, width: 0, height: 0, padding: 0, border: 'none', margin: 0 }} />
            </div>
        </Suspense>
    )
}