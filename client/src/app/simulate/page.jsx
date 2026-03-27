"use client";

import {
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";

// UI Components (SSR enabled)
const Header = dynamic(() => import("../components/header"), {
  loading: () => <div className="h-16 bg-black"></div>
});
const SimulateHeroSection = dynamic(() => import("../components/SimulateHeroSection"), {
  loading: () => <div className="h-auto bg-black"></div>
});
const ResultsDashboard = dynamic(() => import("../components/result/index"), {
  loading: () => <div className="h-64 bg-gray-900 rounded-xl animate-pulse"></div>
});
const Footer = dynamic(() => import("../components/footer"), {
  loading: () => <div className="h-20 bg-black"></div>
});
const LoadingState = dynamic(() => import("../components/loading"));

// Web3 & Simulation Components (Strictly Client-Side, SSR disabled)
const ConnectWallet = dynamic(() => import("../components/connectWallet"), { ssr: false });
const WalletProviderWrapper = dynamic(() => import("../components/WalletProviderWrapper"), { ssr: false });
const EvmSimulationForm = dynamic(() => import("../components/evm/evmSimulationForm"), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-900 rounded-xl animate-pulse"></div>
});
const SolSimulationForm = dynamic(() => import("../components/sol/solSimulationForm"), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-900 rounded-xl animate-pulse"></div>
});

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
  const [requestData, setRequestData] = useState(null); // stores user inputted amount, contractAddress, etc.

  // setting chain for wallet providers
  const [chain, setChain] = useState(null);

  const abortControllerRef = useRef(null);
  const mounted = useRef(true);

  // Track mounting state to prevent state updates on unmounted components
  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // for simulation when currency => ETH
  const handleSimulateAll = useCallback(
    async ({ honeypotData: hpData, simulationData: simData }) => {
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
          setRequestData(simData);
          setSimulationData(simulationRes.data);
          setHoneypotData(honeypotRes.data);
          setPhishingData(phishingRes.data);
          setShowResults(true);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Simulation API Error:", err.response?.data || err);
          alert(`Simulation failed: ${err.response?.data?.error || err.message || "Check console"}`);
        }
      } finally {
        if (mounted.current) {
          setIsLoading(false);
        }
      }
    },
    [],
  );

  // for simulation when currency => SOL
  const handleSolSimulation = useCallback(
    async ({ solSimulationData: solData }) => {
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
        if (err.name !== "AbortError") {
          console.error("Solana Simulation API Error:", err.response?.data || err);
          alert(`Solana Simulation failed: ${err.response?.data?.error || err.message || "Check console"}`);
        }
      } finally {
        if (mounted.current) {
          setIsLoading(false);
        }
      }
    },
    [],
  );

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

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Head>
        <title>TxShield - Secure Transaction Simulator</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </Head>

      <Header />

      {/* Show Hero Section only when no chain is selected */}
      {!chain && !showResults && (
        <SimulateHeroSection
          onChainSelect={(selectedChain) => setChain(selectedChain)}
        />
      )}

      <main className="flex-grow">
        {/* Form Section */}
        {chain && !showResults && (
          <section className="container mx-auto px-4 py-12">
            <WalletProviderWrapper chain={chain}>
              <div className="flex justify-center my-6">
                <ConnectWallet chain={chain} />
              </div>
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
            </WalletProviderWrapper>

            {isLoading && (
              <LoadingState isLoading={true} onComplete={() => { }} />
            )}
          </section>
        )}

        {/* Results Section */}
        {showResults && (
          <section className="w-full">
            <ResultsDashboard
              chain={chain}
              isVisible={showResults}
              simulation={simulationData}
              solSimulation={solSimulationData}
              honeypot={honeypotData}
              phishing={phishingData}
              requestData={requestData}
              onGenerateRecommendation={handleRecommendation}
              recommendationData={recommendation}
            />
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
