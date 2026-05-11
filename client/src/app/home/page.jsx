"use client";

import React from "react";
import HeroSection from "../components/Home/HeroSection";
import "./home.css";
import ScrollIndicator from "../components/ScrollIndicator";

function HomePage() {
  return (
    <div className="bg-background text-foreground min-h-screen w-screen overflow-y-auto flex items-center justify-center relative transition-colors duration-700">
      <ScrollIndicator />
      {/* We only render the HeroSection, making it a single-page layout without scrolling */}
      <HeroSection />
    </div>
  );
}
export default HomePage;