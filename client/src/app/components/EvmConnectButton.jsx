"use client"

import '@rainbow-me/rainbowkit/styles.css'
import { motion } from "framer-motion"; // Import motion for animations

import { ConnectButton } from '@rainbow-me/rainbowkit'


export default function EvmConnectButton() {
    return (
        <div className="rainbowkit-connect-wrapper">
                <ConnectButton.Custom>
                    {({
                        account,
                        chain,
                        openAccountModal,
                        openChainModal,
                        openConnectModal,
                        authenticationStatus,
                        mounted,
                    }) => {
                        // Note: If your app is not wrapped in WagmiProvider with `ssr: true`, you might encounter issues with `mounted` and `authenticationStatus` during server-side rendering.
                        const ready = mounted && authenticationStatus !== 'loading';
                        const connected =
                            ready &&
                            account &&
                            chain &&
                            (!authenticationStatus ||
                                authenticationStatus === 'authenticated');

                        return (
                            <div
                                {...(!ready && {
                                    'aria-hidden': true,
                                    'style': {
                                        opacity: 0,
                                        pointerEvents: 'none',
                                        userSelect: 'none',
                                    },
                                })}
                            >
                                {(() => {
                                    if (!connected) {
                                        return (
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={openConnectModal}
                                                type="button"
                                                className="px-6 py-3 bg-gradient-to-r from-[#627EEA] to-[#8C52FF] text-white font-bold rounded-lg hover:from-[#506ACC] hover:to-[#7A42E0] transition-all duration-300 shadow-lg shadow-[#627EEA]/40 flex items-center justify-center"
                                            >
                                                Connect EVM Wallet
                                            </motion.button>
                                        );
                                    }

                                    if (chain.unsupported) {
                                        return (
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={openChainModal}
                                                type="button"
                                                className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg shadow-red-500/40 flex items-center justify-center"
                                            >
                                                Wrong network
                                            </motion.button>
                                        );
                                    }

                                    return (
                                        <div style={{ display: 'flex', gap: 12 }}>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={openChainModal}
                                                style={{ display: 'flex', alignItems: 'center' }}
                                                type="button"
                                                className="px-4 py-2 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-lg shadow-gray-700/40"
                                            >
                                                {chain.has  && (
                                                    <img
                                                        alt={chain.name}
                                                        src={chain.iconUrl}
                                                        style={{ width: 24, height: 24, marginRight: 8 }}
                                                    />
                                                )}
                                                {chain.name}
                                            </motion.button>

                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={openAccountModal}
                                                type="button"
                                                className="px-4 py-2 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-lg shadow-gray-700/40"
                                            >
                                                {account.displayName}
                                                {account.displayBalance
                                                    ? ` (${account.displayBalance})`
                                                    : ''}
                                            </motion.button>
                                        </div>
                                    );
                                })()}
                            </div>
                        );
                    }}
                </ConnectButton.Custom>
            </div>
    )
}
