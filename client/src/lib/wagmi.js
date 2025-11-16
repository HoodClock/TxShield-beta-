"use client";

import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

export const chains = [mainnet, sepolia];

const { wallets } = getDefaultWallets({
  appName: "TxShield",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
});

export const wagmiConfig = createConfig({
  chains,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true,
});
