import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] bg-[length:100%_4px] pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full text-center border border-border rounded-3xl bg-card/40 backdrop-blur-xl p-10 shadow-[0_0_60px_rgba(59,130,246,0.08)]">
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-blue-400 mb-4">
          Protocol Exception
        </p>
        <h1 className="font-clash text-5xl sm:text-6xl font-bold tracking-tight mb-3">404</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Transaction Reverted — Page Not Found
        </h2>
        <p className="text-sm text-muted-foreground font-mono leading-relaxed mb-8">
          The route you requested never landed on-chain. It may have been pruned, renamed, or
          never deployed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-500/15 border border-blue-400/40 text-blue-300 font-mono text-xs uppercase tracking-widest hover:bg-blue-500/25 transition-colors"
        >
          Return to Base Station
        </Link>
      </div>
    </main>
  );
}
