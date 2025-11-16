"use client";

import { useState } from "react";
import Head from "next/head";
import Header from "../components/header";
import SimulationForm from "../components/simulationForm";
import LoadingState from "../components/loading";
import ResultsDashboard from "../components/result";
import HoneypotChecks from "../components/honeypotChecks";
import Recommendations from "../components/recomendations";
import Footer from "../components/footer";

// wallet providers & EVM/SOL-Components imports
import WalletProviderWrapper from "../components/WalletProviderWrapper";
import EvmSimulationForm from "../components/evm/evmSimulationForm"
import SolSimulationForm from "../components/sol/solSimulationForm"

import {
  honeypotChecks as runHoneypotChecks,
  simulateTx as runSimulateTx,
  suggestionApi as recommendations,
  phishingChecks as runPhishing,
  solSimulateTx as runSolSimulation
} from "@/api/api";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [honeypotData, setHoneypotData] = useState(null);
  const [simulationData, setSimulationData] = useState(null);
  const [phishingData, setPhishingData] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [solSimulationData, setSolSimulationData] = useState(null);

  // setting chain for wallet providers
  const [chain, setChain] = useState(null);


  // for simulation when currency => ETH
  const handleSimulateAll = async ({ honeypotData, simulationData }) => {
    setIsLoading(true);
    setShowResults(false);

    try {
      const [simulationRes, honeypotRes, phishingRes] = await Promise.all([
        runSimulateTx(simulationData),
        runHoneypotChecks(honeypotData),
        runPhishing(simulationData),
      ]);

      setSimulationData(simulationRes.data);
      setHoneypotData(honeypotRes.data);
      setPhishingData(phishingRes.data);

      setShowResults(true);

    } catch (err) {
      console.error("Simulation Error:", err);
    } finally {
      setIsLoading(false);
    }

  }

  // for simulation when currency => SOL
  const handleSolSimulation = async ({ solSimulationData }) => {
    setIsLoading(true);
    setShowResults(false);

    try {

      const [solSimulationRes] = await Promise.all([
        runSolSimulation(solSimulationData)
      ]);

      setSolSimulationData(solSimulationRes.data);

      setShowResults(true);

    } catch (err) {
      console.error("Simulation Error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleRecommendation = async () => {
    try {
      if (!simulationData || !honeypotData) return;

      const promptContent = {
        simulation: simulationData,
        honeypot: honeypotData,
      };

      const response = await recommendations(promptContent);
      setRecommendation(response.data.recommendation);
    } catch (err) {
      console.error("Recommendation error:", err);
    }
  };

  const handleSimulationComplete = () => {
    setIsLoading(false);
    setShowResults(true);
  };

  const handleSimulateAgain = () => {
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-black">
      <Head>
        <title>TxShield - Secure Transaction Simulator</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Centered Section (Form + Loading) */}
        <section className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-500 bg-clip-text text-transparent">
            Secure Your Transactions
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Simulate and analyze your blockchain transactions before execution
            with our advanced security checks
          </p>

          {/* select chains first */}
          {!chain && (
            <div className="text-center mt-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                Choose Blockchain
              </h2>

              <div className="flex justify-center gap-6">
                <button
                  className="px-8 py-3 bg-white text-black rounded-lg font-bold"
                  onClick={() => setChain("EVM")}
                >
                  Ethereum / EVM
                </button>

                <button
                  className="px-8 py-3 bg-purple-500 text-white rounded-lg font-bold"
                  onClick={() => setChain("SOL")}
                >
                  Solana
                </button>
              </div>
            </div>
          )}
          {/* render simulation Forms with correct Provider based on selected chains */}
          {chain && (
            <WalletProviderWrapper chain={chain}>
              {chain === "EVM" && <EvmSimulationForm onSimulateAll={handleSimulateAll} />}
              {chain === "SOL" && <SolSimulationForm onSolSimulateAll={handleSolSimulation} />}
            </WalletProviderWrapper>
          )}
          {/* <SimulationForm
            onSolSimulateAll={handleSolSimulation}
            onSimulateAll={handleSimulateAll}
          /> */}

          {isLoading && <LoadingState isLoading={true} onComplete={() => { }} />}
        </section>

        {/* Results Section (Not Centered) */}
        {showResults && (
          <div className="space-y-8">
            {" "}
            {/* Removed mx-auto and text-center */}
            <ResultsDashboard
              isVisible={showResults}
              simulation={simulationData}
              honeypot={honeypotData}
              phishing={phishingData}
            />
            <HoneypotChecks isVisible={showResults} data={honeypotData} />
          </div>
        )}

        {/* recommendations */}
        {showResults && (
          <Recommendations
            simulationData={simulationData}
            honeypotData={honeypotData}
            onGenerate={handleRecommendation}
            recommendation={recommendation}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
