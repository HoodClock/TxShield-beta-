"use client";

import React, { useEffect, useState } from "react";

export default function EvmProvider({ children }) {
  const [WagmiProvider, setWagmiProvider] = useState(null);
  const [RainbowKitProvider, setRainbowKitProvider] = useState(null);
  const [wagmiConfig, setWagmiConfig] = useState(null);
  const [chains, setChains] = useState(null);

  useEffect(() => {
    // 🔥 Lazy load EVERYTHING
    async function loadWeb3() {
      const wagmi = await import("wagmi");
      const rainbowkit = await import("@rainbow-me/rainbowkit");
      const config = await import("@/lib/wagmi");

      setWagmiProvider(() => wagmi.WagmiProvider);
      setRainbowKitProvider(() => rainbowkit.RainbowKitProvider);
      setWagmiConfig(config.wagmiConfig);
      setChains(config.chains);
    }

    loadWeb3();
  }, []);

  // ⏳ While loading
  if (!WagmiProvider || !RainbowKitProvider || !wagmiConfig) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <WagmiProvider config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  );
}