"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "txshield_recent_scans";
const MAX_SCANS = 5;

function readScans() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.slice(0, MAX_SCANS) : [];
  } catch {
    return [];
  }
}

/**
 * Persist the 5 most recent scan payloads (contract/address + chain metadata).
 */
export default function useRecentScans() {
  const [recentScans, setRecentScans] = useState([]);

  useEffect(() => {
    setRecentScans(readScans());
  }, []);

  const addScan = useCallback((entry) => {
    if (!entry?.contractAddress) return;
    setRecentScans((prev) => {
      const next = [
        {
          contractAddress: entry.contractAddress,
          chainId: entry.chainId ?? null,
          chain: entry.chain ?? "EVM",
          ts: Date.now(),
        },
        ...prev.filter(
          (s) =>
            !(
              s.contractAddress?.toLowerCase() ===
                entry.contractAddress.toLowerCase() &&
              s.chainId === (entry.chainId ?? null)
            )
        ),
      ].slice(0, MAX_SCANS);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore quota errors */
      }
      return next;
    });
  }, []);

  const clearScans = useCallback(() => {
    setRecentScans([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return { recentScans, addScan, clearScans };
}
