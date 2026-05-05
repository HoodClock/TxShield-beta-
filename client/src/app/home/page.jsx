"use client";

import React from "react";
import HeroSection from "../components/Home/HeroSection";
import "./home.css";

function HomePage() {
  return (
    <div className="bg-black text-white h-screen w-screen overflow-hidden flex items-center justify-center relative">
      {/* We only render the HeroSection, making it a single-page layout without scrolling */}
      <HeroSection />
    </div>
  );
}
export default HomePage;