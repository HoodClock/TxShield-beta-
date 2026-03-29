
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

// ✅ SKELETON IMPORTS
import TransactionSkeleton from "./components/TransactionSkeleton";
import CodeSkeleton from "./components/CodeSkeleton";

// UI Components
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

// ❌ REMOVED LoadingState (no longer needed)

// Client-only components
const ConnectWallet = dynamic(() => import("../components/connectWallet"), { ssr: false });
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
  const [requestData, setRequestData] = useState(null);

  const [chain, setChain] = useState(null);

  const WalletProviderWrapper = chain
    ? dynamic(() => import("../components/WalletProviderWrapper"), { ssr: false })
    : null;

  const abortControllerRef = useRef(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

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
        setRequestData(simData);
        setSimulationData(simulationRes.data);
        setHoneypotData(honeypotRes.data);
        setPhishingData(phishingRes.data);
        setShowResults(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (mounted.current) setIsLoading(false);
    }
  }, []);

  const handleSolSimulation = useCallback(async ({ solSimulationData: solData }) => {
    if (!mounted.current) return;

    setIsLoading(true);
    setShowResults(false);

    try {
      const res = await runSolSimulation(solData);
      if (mounted.current) {
        setSolSimulationData(res.data);
        setShowResults(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (mounted.current) setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Head>
        <title>TxShield</title>
      </Head>

      <Header />

      {!chain && !showResults && (
        <SimulateHeroSection onChainSelect={setChain} />
      )}

      <main className="flex-grow">
        {chain && !showResults && (
          <section className="container mx-auto px-4 py-12">

            {WalletProviderWrapper && (
              <WalletProviderWrapper chain={chain}>
                <div className="flex justify-center my-6">
                  <ConnectWallet chain={chain} />
                </div>

                <AnimatePresence mode="wait">
                  {chain === "EVM" && (
                    <EvmSimulationForm
                      key="evm"
                      onSimulateAll={handleSimulateAll}
                      backButtonHandler={() => setChain(null)}
                      onSwitchChain={() => setChain("SOL")}
                    />
                  )}
                  {chain === "SOL" && (
                    <SolSimulationForm
                      key="sol"
                      onSolSimulateAll={handleSolSimulation}
                      backButtonHandler={() => setChain(null)}
                      onSwitchChain={() => setChain("EVM")}
                    />
                  )}
                </AnimatePresence>
              </WalletProviderWrapper>
            )}

            {/* ✅ SKELETON LOADER */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <TransactionSkeleton />
                <CodeSkeleton />
              </div>
            )}

          </section>
        )}

        {showResults && (
          <ResultsDashboard
            chain={chain}
            simulation={simulationData}
            solSimulation={solSimulationData}
            honeypot={honeypotData}
            phishing={phishingData}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}