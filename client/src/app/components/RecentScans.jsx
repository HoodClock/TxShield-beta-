"use client";

export default function RecentScans({ scans = [], onSelect, onClear }) {
  if (!scans.length) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 rounded-2xl border border-border bg-card/40 backdrop-blur-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-bold">
          Recent Scans
        </h3>
        {onClear ? (
          <button
            type="button"
            onClick={onClear}
            className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear
          </button>
        ) : null}
      </div>
      <ul className="space-y-2">
        {scans.map((scan) => (
          <li key={`${scan.contractAddress}-${scan.chainId}-${scan.ts}`}>
            <button
              type="button"
              onClick={() => onSelect?.(scan)}
              className="w-full text-left px-3 py-2 rounded-xl border border-border bg-muted/40 hover:border-blue-400/40 hover:bg-card transition-colors"
            >
              <div className="font-mono text-[11px] text-blue-400 break-all">
                {scan.contractAddress}
              </div>
              <div className="font-mono text-[9px] text-muted-foreground mt-1 uppercase tracking-widest">
                {scan.chain || "EVM"}
                {scan.chainId != null ? ` · chain ${scan.chainId}` : ""}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
