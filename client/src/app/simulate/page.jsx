"use client";

import { useState, Suspense, lazy, useCallback, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";

// all the components of Simualtion forms
const Header = lazy(() => import("../components/header"))
const SimulateHeroSection = lazy(() => import("../components/SimulateHeroSection"))
const ConnectWallet = lazy(() => import("../components/connectWallet"));
const ResultsDashboard = lazy(() => import("../components/result/index"));
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

  const abortControllerRef = useRef(null);
  const mounted = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mounted.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // for simulation when currency => ETH
  const handleSimulateAll = useCallback(async ({ honeypotData: hpData, simulationData: simData }) => {
    if (!mounted.current) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    setShowResults(false);

    try {
      const [simulationRes, honeypotRes, phishingRes] = await Promise.all([
        runSimulateTx(simData),
        runHoneypotChecks(hpData),
        runPhishing(simData),
      ]);

      if (mounted.current) {
        setSimulationData(simulationRes.data);
        setHoneypotData(honeypotRes.data);
        setPhishingData(phishingRes.data);
        setShowResults(true);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error("Simulation Error:", err);
      }
    } finally {
      if (mounted.current) {
        setIsLoading(false);
      }
    }
  }, []);

  // for simulation when currency => SOL
  const handleSolSimulation = useCallback(async ({ solSimulationData: solData }) => {
    if (!mounted.current) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    setShowResults(false);

    try {
      const [solSimulationRes] = await Promise.all([
        runSolSimulation(solData),
      ]);

      if (mounted.current) {
        setSolSimulationData(solSimulationRes.data);
        setShowResults(true);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error("Simulation Error:", err);
      }
    } finally {
      if (mounted.current) {
        setIsLoading(false);
      }
    }
  }, []);

  const handleRecommendation = useCallback(async () => {
    if (!mounted.current) return;

    try {
      if (!simulationData || !honeypotData) return;

      const promptContent = {
        simulation: simulationData,
        honeypot: honeypotData,
      };

      const response = await recommendations(promptContent);
      if (mounted.current) {
        setRecommendation(response.data.recommendation);
      }
    } catch (err) {
      console.error("Recommendation error:", err);
    }
  }, [simulationData, honeypotData]);

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
                <AnimatePresence mode="wait">
                  {chain === "EVM" && (
                    <EvmSimulationForm 
                      key="evm-form"
                      onSimulateAll={handleSimulateAll} 
                      backButtonHandler={() => setChain(null)}
                      onSwitchChain={() => setChain("SOL")}
                    />
                  )}
                  {chain === "SOL" && (
                    <SolSimulationForm 
                      key="sol-form"
                      onSolSimulateAll={handleSolSimulation} 
                      backButtonHandler={() => setChain(null)} 
                      onSwitchChain={() => setChain("EVM")}
                    />
                  )}
                </AnimatePresence>
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
                chain={chain}
                isVisible={showResults}
                simulation={simulationData}
                solSimulation={solSimulationData}
                honeypot={honeypotData}
                phishing={phishingData}
                onGenerateRecommendation={handleRecommendation}
                recommendationData={recommendation}
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
