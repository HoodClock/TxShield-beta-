"use client"

import { useState } from "react"

export default function Header() {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [showDisconnect, setShowDisconnect] = useState(false)

  const handleConnectWallet = () => {
    if (isConnected) {
      setShowDisconnect(!showDisconnect)
      return
    }

    setIsConnecting(true)

    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false)
      setIsConnected(true)
    }, 2000)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setShowDisconnect(false)
  }

  return (
    <header className="top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">
            TxShield
          </h1>
        </div>

        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors font-medium">
            Home
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors font-medium">
            Contact Us
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors font-medium">
            Docs
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors font-medium">
            About
          </a>
        </nav>

        <div className="relative">
          <button 
            onClick={handleConnectWallet} 
            className="relative overflow-hidden group rounded-lg px-5 py-2.5 font-medium"
          >
            {isConnecting ? (
              <div className="flex items-center bg-blue-800/50 text-white px-4 py-2 rounded-lg">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Connecting...</span>
              </div>
            ) : isConnected ? (
              <div className="flex items-center bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>0x1f5...3d4f</span>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-blue-500/20">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span>Connect Wallet</span>
                </div>
              </div>
            )}
          </button>

          {showDisconnect && isConnected && (
            <div className="absolute top-full mt-2 right-0 w-48 bg-gray-800 rounded-lg overflow-hidden shadow-xl border border-gray-700">
              <button
                onClick={handleDisconnect}
                className="w-full px-4 py-3 text-left text-red-400 hover:bg-gray-700/50 flex items-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}