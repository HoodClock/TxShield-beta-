"use client";

import { http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export const chains = [mainnet, sepolia];
const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "txshield-dev-project-id";

export const wagmiConfig = getDefaultConfig({
  appName: "TxShield",
  projectId: walletConnectProjectId,
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true,
});
