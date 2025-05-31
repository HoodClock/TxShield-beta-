'use client';

import { useState } from 'react';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig, chains } from '@/lib/wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function ClientLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}
    