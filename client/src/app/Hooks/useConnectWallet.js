'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';

export default function useConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  // Optional: Find MetaMask or WalletConnect if you want defaults
  const metaMaskConnector = connectors.find(connector => connector.id === 'metaMask');

  return {
    connect,
    disconnect,
    connectors,
    address,
    isConnected,
    isLoading,
    error,
    pendingConnector,
    metaMaskConnector,
  };
}
