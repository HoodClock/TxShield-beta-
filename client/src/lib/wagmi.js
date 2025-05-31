'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'wagmi/chains';

export const chains = [mainnet, sepolia];

export const wagmiConfig = getDefaultConfig({
  appName: 'TxShield',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains,
  ssr: true, // Optional for Next.js App Router
});
