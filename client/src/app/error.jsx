"use client";

export default function Error({ error, reset }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.12),transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] bg-[length:100%_4px] pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full text-center border border-border rounded-3xl bg-card/40 backdrop-blur-xl p-10 shadow-[0_0_60px_rgba(239,68,68,0.08)]">
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-red-400 mb-4">
          Runtime Fault
        </p>
        <h1 className="font-clash text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          Something went wrong
        </h1>
        <p className="text-sm text-muted-foreground font-mono leading-relaxed mb-2">
          The simulation shield hit an unexpected exception. Your last scan may not have completed.
        </p>
        {error?.digest ? (
          <p className="text-[10px] font-mono text-muted-foreground/70 mb-8">
            digest: {error.digest}
          </p>
        ) : (
          <div className="mb-8" />
        )}
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-red-500/15 border border-red-400/40 text-red-300 font-mono text-xs uppercase tracking-widest hover:bg-red-500/25 transition-colors"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
