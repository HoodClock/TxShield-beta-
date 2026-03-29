'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

// ✅ Lazy load wallet components (BIG FIX)
const EvmConnectButton = dynamic(() => import('./EvmConnectButton'), {
  ssr: false,
})

const SolanaConnectButton = dynamic(() => import('./SolanaConnectButton'), {
  ssr: false,
})

export default function ConnectWallet({ chain }) {
  const pathname = usePathname();

  // Only load wallet on /simulate route
  if (!pathname.startsWith("/simulate")) return null;
  if (!chain) return null;

  return (
    <div className='flex flex-wrap gap-2'>
      {chain === "EVM" && <EvmConnectButton />}
      {chain === "SOL" && <SolanaConnectButton />}
    </div>
  )
}