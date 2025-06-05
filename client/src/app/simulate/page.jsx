"use client";

import { useState } from "react";
import Head from "next/head";
import Header from "../components/header";
import SimulationForm from "../components/simulationForm";
import LoadingState from "../components/loading";
import ResultsDashboard from "../components/result";
import HoneypotChecks from "../components/honeypotChecks";
import Recommendations from "../components/recomendations";
import ActionButtons from "../components/actionButton";
import FeaturesSection from "../components/featureSection";
import Footer from "../components/footer";

import {
  honeypotChecks as runHoneypotChecks,
  simulateTx as runSimulateTx,
  contactApi as contactUs
} from "@/api/api";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [honeypotData, setHoneypotData] = useState(null);
  const [simualtionData, setSimulationData] = useState(null);

  const handleSimulate = async (formData) => {
    setIsLoading(true);
    setShowResults(false);

    try {
      const response = await runSimulateTx(formData);
      setSimulationData(response.data);
      setIsLoading(false);
      setShowResults(true);
    } catch (error) {
      console.error("Honeypot API error:", err);
      setIsLoading(false);
    }
  };

  const handleHoneypot = async (formData) => {
    setIsLoading(true);
    setShowResults(false);

    try {
      const response = await runHoneypotChecks(formData);
      setHoneypotData(response.data);
      setIsLoading(false);
      setShowResults(true);
    } catch (err) {
      console.error("Honeypot API error:", err);
      setIsLoading(false);
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
    <div className="min-h-screen bg-dark-900">
      <Head>
        <title>TxShield - Secure Transaction Simulator</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <section className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-500 bg-clip-text text-transparent">
            Secure Your Transactions
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Simulate and analyze your blockchain transactions before execution
            with our advanced security checks
          </p>

          <SimulationForm
            onSimulate={handleSimulate}
            onHoneypot={handleHoneypot}
          />

          {isLoading && <LoadingState isLoading={true} onComplete={() => {}} />}

          {showResults && (
            <>
              <ResultsDashboard isVisible={showResults} simulation={simualtionData} honeypot={honeypotData} />

              <HoneypotChecks isVisible={showResults} data={honeypotData} />

              <Recommendations isVisible={showResults} />

              <ActionButtons
                isVisible={showResults}
                onSimulateAgain={handleSimulateAgain}
              />
            </>
          )}
        </section>

        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
}
