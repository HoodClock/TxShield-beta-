"use client";

import React from "react";
import CoreSection from "../components/Home/CoreSection";

export default function CorePage() {
  return (
    <div className="bg-black text-white h-screen w-screen overflow-hidden flex items-center justify-center relative scrollbar-hide">
      <div className="w-full h-full max-w-[1400px] mx-auto px-4 flex items-center justify-center">
        <CoreSection />
      </div>
    </div>
  );
}
