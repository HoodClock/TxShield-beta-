'use client';

import { useActiveAccount, useConnect, useDisconnect } from 'thirdweb/react';

export default function useConnectWallet() {
  const account = useActiveAccount();
  const { connect, isConnecting } = useConnect();
  const { disconnect } = useDisconnect();

  return {
    connect,
    disconnect,
    address: account?.address,
    isConnected: !!account,
    isLoading: isConnecting,
  };
}
