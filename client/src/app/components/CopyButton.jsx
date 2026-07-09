"use client";

import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

export default function CopyButton({ text, className = "", label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  if (!text || text === "N/A") return null;

  const handleCopy = async (e) => {
    e?.stopPropagation?.();
    try {
      await navigator.clipboard.writeText(String(text));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : label}
      title={copied ? "Copied!" : label}
      className={`inline-flex items-center justify-center p-1 rounded-md border border-border bg-muted/60 text-muted-foreground hover:text-foreground hover:border-blue-400/40 transition-colors ${className}`}
    >
      {copied ? (
        <FiCheck className="w-3 h-3 text-emerald-400" />
      ) : (
        <FiCopy className="w-3 h-3" />
      )}
    </button>
  );
}
