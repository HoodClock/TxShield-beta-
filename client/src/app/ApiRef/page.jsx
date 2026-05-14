"use client";
import React from "react";
import dynamic from "next/dynamic";

const ApiRefClient = dynamic(() => import("./ApiRefClient"), {
  ssr: false,
  loading: () => (
    <div className="bg-background min-h-screen flex items-center justify-center transition-colors duration-700">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-muted-foreground font-mono">Loading API Interface...</p>
      </div>
    </div>
  )
});

export default function ApiRefPage() {
  return <ApiRefClient />;
}
