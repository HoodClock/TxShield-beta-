"use client";

import React from "react";
import HeroSection from "../components/Home/HeroSection";
import "./home.css";

function HomePage() {
  return (
    <div className="bg-background text-foreground h-screen w-screen overflow-hidden flex items-center justify-center relative transition-colors duration-700">
      {/* We only render the HeroSection, making it a single-page layout without scrolling */}
      <HeroSection />
    </div>
  );
}
export default HomePage;