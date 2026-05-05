"use client";

import React from "react";
import AnalysisSection from "../components/Home/AnalysisSection";

export default function PlaybookPage() {
  return (
    <div className="bg-[#050505] text-white h-[100dvh] w-screen overflow-hidden flex flex-col items-center justify-center relative">
      <div className="w-full max-w-7xl mx-auto px-4 h-full flex flex-col justify-center pt-12 pb-4">
        <AnalysisSection />
      </div>
    </div>
  );
}
