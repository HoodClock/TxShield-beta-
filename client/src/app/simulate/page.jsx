"use client";

import { useState, Suspense, lazy } from "react";
import Head from "next/head";

// all the components of Simualtion forms
const Header = lazy(() => import("../components/header"))
const SimulateHeroSection = lazy(() => import("../components/SimulateHeroSection"))
const ConnectWallet = lazy(() => import("../components/connectWallet"));
const ResultsDashboard = lazy(() => import("../components/result"));
const HoneypotChecks = lazy(() => import("../components/honeypotChecks"));
const Recommendations = lazy(() => import("../components/recomendations"));
const Footer = lazy(() => import("../components/footer"));
const LoadingState = lazy(() => import("../components/loading"));


// wallet providers & EVM/SOL-Components imports
const WalletProviderWrapper = lazy(() => import("../components/WalletProviderWrapper"))
const EvmSimulationForm = lazy(() => import("../components/evm/evmSimulationForm"))
const SolSimulationForm = lazy(() => import("../components/sol/solSimulationForm"))

import {
  honeypotChecks as runHoneypotChecks,
  simulateTx as runSimulateTx,
  suggestionApi as recommendations,
  phishingChecks as runPhishing,
  solSimulateTx as runSolSimulation,
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
  };

  // for simulation when currency => SOL
  const handleSolSimulation = async ({ solSimulationData }) => {
    setIsLoading(true);
    setShowResults(false);

    try {
      const [solSimulationRes] = await Promise.all([
        runSolSimulation(solSimulationData),
      ]);

      setSolSimulationData(solSimulationRes.data);

      setShowResults(true);
    } catch (err) {
      console.error("Simulation Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="min-h-screen bg-black flex flex-col">
      <Head>
        <title>TxShield - Secure Transaction Simulator</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </Head>

      <Suspense fallback={<div className="h-16 bg-black"></div>}>
        <Header />
      </Suspense>

      {/* Show Hero Section only when no chain is selected */}
      {!chain && !showResults && (
        <Suspense fallback={<div className="h-auto bg-black"></div>}>
          <SimulateHeroSection onChainSelect={(selectedChain) => setChain(selectedChain)} />
        </Suspense>
      )}

      <main className="flex-grow">
        {/* Form Section */}
        {chain && !showResults && (
          <section className="container mx-auto px-4 py-12">
            <WalletProviderWrapper chain={chain}>
              <div className="flex justify-center my-6">
                <ConnectWallet chain={chain} />
              </div>
              <Suspense
                fallback={
                  <div className="h-64 bg-gray-900 rounded-xl animate-pulse"></div>
                }
              >
                {chain === "EVM" && (
                  <EvmSimulationForm onSimulateAll={handleSimulateAll} backButtonHandler={() => setChain(null)} />
                )}
                {chain === "SOL" && (
                  <SolSimulationForm onSolSimulateAll={handleSolSimulation} backButtonHandler={() => setChain(null)} />
                )}
              </Suspense>
            </WalletProviderWrapper>

            {isLoading && (
              <LoadingState isLoading={true} onComplete={() => {}} />
            )}
          </section>
        )}

        {/* Results Section */}
        {showResults && (
          <section className="container mx-auto px-4 py-12 space-y-8">
            <Suspense
              fallback={
                <div className="h-64 bg-gray-900 rounded-xl animate-pulse"></div>
              }
            >
              <ResultsDashboard
                isVisible={showResults}
                simulation={simulationData}
                honeypot={honeypotData}
                phishing={phishingData}
              />
            </Suspense>
            <Suspense
              fallback={
                <div className="h-48 bg-gray-900 rounded-xl animate-pulse"></div>
              }
            >
              <HoneypotChecks isVisible={showResults} data={honeypotData} />
            </Suspense>

            {/* Recommendations */}
            <Suspense
              fallback={
                <div className="h-32 bg-gray-900 rounded-xl animate-pulse"></div>
              }
            >
              <Recommendations
                simulationData={simulationData}
                honeypotData={honeypotData}
                onGenerate={handleRecommendation}
                recommendation={recommendation}
              />
            </Suspense>
          </section>
        )}
      </main>

      <Suspense fallback={<div className="h-20 bg-black"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
}
