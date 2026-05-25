"use client";

import React, { useState, useEffect } from "react";

export default function LiveCounter({ initialCount = 14204912 }) {
  const [scannedCount, setScannedCount] = useState(initialCount);

  useEffect(() => {
    const interval = setInterval(() => {
      setScannedCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-muted-foreground text-[9px] sm:text-[10px] font-mono uppercase tracking-widest">
      {scannedCount.toLocaleString()} Scanned
    </p>
  );
}
