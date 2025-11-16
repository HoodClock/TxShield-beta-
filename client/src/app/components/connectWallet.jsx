'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { SolanaConnectButton } from "@/app/components/SolanaConnectButton"
import { usePathname } from 'next/navigation'

export default function ConnectWallet() {
  const pathname = usePathname();

  if (!pathname.startsWith("/simulate")) return null;

  return (
    <div className='flex flex-wrap gap-2'>
      <SolanaConnectButton />
      <ConnectButton />
    </div>
  )
}