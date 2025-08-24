"use client"

import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

function connectWallet() {
  return (
    <div className="custom-rainbow-wrapper">
      <ConnectButton />
    </div>
  )
}

export default connectWallet
