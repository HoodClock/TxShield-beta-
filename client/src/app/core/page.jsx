"use client";

import React from "react";
import CoreSection from "../components/Home/CoreSection";
import ScrollIndicator from "../components/ScrollIndicator";

export default function CorePage() {
  return (
    <div className="bg-background text-foreground min-h-screen w-screen overflow-y-auto flex items-center justify-center relative scrollbar-hide transition-colors duration-700">
      <ScrollIndicator />
      <div className="w-full h-full max-w-[1400px] mx-auto px-4 flex items-center justify-center">
        <CoreSection />
      </div>
    </div>
  );
}
