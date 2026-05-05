"use client";

import React from "react";
import StatsSection from "../components/Home/StatsSection";

export default function StatsPage() {
  return (
    <div className="bg-background text-foreground h-screen w-screen overflow-y-auto overflow-x-hidden flex items-center justify-center relative scrollbar-hide transition-colors duration-700">
      <div className="w-full max-w-7xl mx-auto py-16 px-4">
        <StatsSection />
      </div>
    </div>
  );
}
