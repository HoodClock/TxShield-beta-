"use client"

import { useState } from "react"

export default function SimulationForm({ onSimulate }) {
  const [contractAddress, setContractAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("ETH")

  const handleSimulate = () => {
    if (!contractAddress || !amount) {
      alert("Please enter both contract address and amount")
      return
    }

    onSimulate({ contractAddress, amount, currency })
  }

  return (
    <div className="bg-[#1e293b] rounded-xl p-6 mb-8 border border-gray-700 shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-6">Secure Your Transactions</h2>
      <p className="text-gray-400 mb-6">
        Simulate and analyze your blockchain transactions before execution with our advanced security checks
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Address Input */}
        <div className="col-span-2">
          <label htmlFor="contractAddress" className="block text-left text-gray-400 mb-2 text-sm font-medium">
            Contract / Wallet / Token Address
          </label>
          <div className="relative">
            <input
              type="text"
              id="contractAddress"
              placeholder="0x..."
              className="w-full px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
            />
            <div className="absolute right-3 top-3 group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 hover:text-blue-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="absolute hidden group-hover:block right-0 top-full mt-2 w-64 bg-gray-800 text-gray-300 text-sm p-3 rounded-lg shadow-lg border border-gray-700 z-10">
                Enter any Ethereum contract, wallet, or token address to analyze. We'll automatically detect the type.
              </div>
            </div>
          </div>
        </div>

        {/* Amount Input */}
        <div>
          <label htmlFor="amount" className="block text-left text-gray-400 mb-2 text-sm font-medium">
            Amount
          </label>
          <div className="relative">
            <input
              type="number"
              id="amount"
              placeholder="0.0"
              className="w-full px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-20"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="absolute right-3 top-3">
              <select
                className="bg-gray-800 text-gray-300 text-sm rounded px-2 py-1 border border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option>ETH</option>
                <option>USDC</option>
                <option>USDT</option>
                <option>DAI</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleSimulate}
          className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-lg hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 shadow-lg shadow-blue-500/20 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Simulate Transaction
        </button>
      </div>
    </div>
  )
}