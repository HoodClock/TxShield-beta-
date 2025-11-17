'use client'

import EvmConnectButton from './EvmConnectButton'
import SolanaConnectButton from './SolanaConnectButton';
import { usePathname } from 'next/navigation'

export default function ConnectWallet({chain}) {
  const pathname = usePathname();

  if (!pathname.startsWith("/simulate")) return null;
  if (!chain) return null

  return (
    <div className='flex flex-wrap gap-2'>
      {chain === "EVM" && <EvmConnectButton/>}
      {chain === "SOL" && <SolanaConnectButton />}
    </div>
  )
}