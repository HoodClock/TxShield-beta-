"use client";

import { http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export const chains = [mainnet, sepolia];
const envWalletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

let walletConnectProjectId = envWalletConnectProjectId;

if (!walletConnectProjectId) {
  if (process.env.NODE_ENV !== "production") {
    walletConnectProjectId = "txshield-dev-project-id";
    if (typeof console !== "undefined" && typeof console.warn === "function") {
      console.warn(
        "Using fallback WalletConnect projectId for development. " +
          "Set NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID to use a real projectId."
      );
    }
  } else {
    throw new Error(
      "NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID is not set. " +
        "This environment variable is required for WalletConnect in production."
    );
  }
}
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
