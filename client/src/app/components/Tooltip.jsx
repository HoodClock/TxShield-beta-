"use client";

import { useState } from "react";

/**
 * Lightweight accessible tooltip (hover + focus).
 * Positions above by default; stays within viewport with simple clamping via CSS.
 */
export default function Tooltip({ content, children, className = "" }) {
  const [open, setOpen] = useState(false);

  if (!content) return children;

  return (
    <span
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open ? (
        <span
          role="tooltip"
          className="pointer-events-none absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 max-w-[80vw] rounded-lg border border-border bg-card px-3 py-2 text-left text-[11px] leading-snug text-muted-foreground shadow-xl"
        >
          {content}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border" />
        </span>
      ) : null}
    </span>
  );
}
