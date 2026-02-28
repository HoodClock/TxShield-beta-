"use client";
import React from "react";
import dynamic from "next/dynamic";

const ApiRefClient = dynamic(() => import("./ApiRefClient"), {
  ssr: false,
  loading: () => (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400 font-mono">Loading API Interface...</p>
      </div>
    </div>
  )
});

export default function ApiRefPage() {
  return <ApiRefClient />;
}
