"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isApiRefPage = pathname === '/ApiRef' || pathname === '/ApiRef/';
  const isHomePage = pathname === '/' || pathname === '/home' || pathname === '/home/';

  // Neither button should be visible on the Home page
  if (isHomePage) return null;

  return (
    <>
      {/* Back to Home Button - Top Left */}
      <Link
        href="/"
        className="absolute top-4 left-4 sm:top-8 sm:left-8 md:top-12 md:left-8 z-[9999] group pointer-events-auto"
      >
        <div className="relative px-5 py-2 md:py-2.5 bg-background/40 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 border border-border group-hover:border-primary/50 group-hover:bg-card shadow-lg hover:-translate-y-0.5">
          <svg className="w-4 h-4 mr-2 text-muted-foreground group-hover:text-foreground transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-muted-foreground font-medium text-xs md:text-sm tracking-widest uppercase group-hover:text-foreground transition-colors duration-300">
            Home
          </span>
        </div>
      </Link>

      {/* API Button - Top Right */}
      {!isApiRefPage && (
        <Link
          href="/ApiRef"
          className="absolute top-4 right-4 sm:top-8 sm:right-8 md:top-12 md:right-8 z-[9999] group pointer-events-auto"
        >
          <div className="relative px-5 py-2 md:py-2.5 bg-background/40 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 border border-border group-hover:border-primary/50 group-hover:bg-card shadow-lg hover:-translate-y-0.5">
            <svg className="w-4 h-4 mr-2 text-muted-foreground group-hover:text-foreground transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="text-muted-foreground font-medium text-xs md:text-sm tracking-widest uppercase group-hover:text-foreground transition-colors duration-300">
              API
            </span>
          </div>
        </Link>
      )}
    </>
  );
}
