"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isApiRefPage = pathname === '/ApiRef' || pathname === '/ApiRef/';
  const isHomePage = pathname === '/';

  return (
    <>
      {/* Back to Home Button - Top Left */}
      {!isHomePage && (
        <Link
          href="/"
          className="absolute top-4 left-4 sm:top-8 sm:left-8 md:top-16 md:left-8 z-[9999] group pointer-events-auto"
          style={{ margin: 0, padding: 0, position: 'absolute' }}
        >
          <div className="relative px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full bg-gradient-to-r from-gray-600/20 via-gray-700/20 to-gray-600/20 backdrop-blur-md overflow-visible transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/30">
            <span className="relative text-white text-xs sm:text-sm font-semibold tracking-wide group-hover:text-gray-300 transition-colors duration-300 z-10">
              Home
            </span>
          </div>
        </Link>
      )}

      {/* API Button - Top Right (scrolls with page) */}
      {!isApiRefPage && (
        <Link
          href="/ApiRef"
          className="absolute top-4 right-4 sm:top-8 sm:right-8 md:top-16 md:right-8 z-[9999] group pointer-events-auto api-button-wrapper"
          style={{ margin: 0, padding: 0, position: 'absolute' }}
        >
          <div className="relative px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-cyan-600/20 backdrop-blur-md overflow-visible transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30">
            {/* Rotating purple border lines - SVG approach */}
            <svg className="absolute inset-0 w-full h-full api-rotating-border-1" style={{ width: 'calc(100% + 4px)', height: 'calc(100% + 4px)', top: '-2px', left: '-2px' }}>
              <circle
                cx="50%"
                cy="50%"
                r="calc(50% - 1px)"
                fill="none"
                stroke="url(#purpleGradient1)"
                strokeWidth="1.5"
                strokeDasharray="15 45"
                className="api-border-circle-1"
                style={{ strokeWidth: 'clamp(1px, 1.5px, 2px)', strokeDasharray: 'clamp(10px, 15px, 20px) clamp(30px, 45px, 60px)' }}
              />
              <defs>
                <linearGradient id="purpleGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(168, 85, 247, 0.8)" />
                  <stop offset="50%" stopColor="rgba(139, 92, 246, 0.8)" />
                  <stop offset="100%" stopColor="rgba(168, 85, 247, 0.8)" />
                </linearGradient>
              </defs>
            </svg>
            <svg className="absolute inset-0 w-full h-full api-rotating-border-2" style={{ width: 'calc(100% + 6px)', height: 'calc(100% + 6px)', top: '-3px', left: '-3px' }}>
              <circle
                cx="50%"
                cy="50%"
                r="calc(50% - 1.5px)"
                fill="none"
                stroke="url(#purpleGradient2)"
                strokeWidth="1.5"
                strokeDasharray="12 38"
                className="api-border-circle-2"
                style={{ strokeWidth: 'clamp(1px, 1.5px, 2px)', strokeDasharray: 'clamp(8px, 12px, 15px) clamp(25px, 38px, 45px)' }}
              />
              <defs>
                <linearGradient id="purpleGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(139, 92, 246, 0.6)" />
                  <stop offset="50%" stopColor="rgba(168, 85, 247, 0.6)" />
                  <stop offset="100%" stopColor="rgba(139, 92, 246, 0.6)" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Animated gradient background - always visible */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-cyan-500/20 to-purple-600/0 opacity-60 animate-shimmer rounded-full" />
            
            {/* Pulsing glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 opacity-20 blur-sm animate-pulse-slow" />
            
            {/* Inner border for depth */}
            <div className="absolute inset-[1px] rounded-full border border-white/10"></div>
            
            {/* Text */}
            <span className="relative text-white text-xs sm:text-sm font-semibold tracking-wide group-hover:text-cyan-300 transition-colors duration-300 z-10">
              API
            </span>
            
            {/* Animated corner dots - always visible */}
            <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full opacity-70 animate-ping" />
            <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full opacity-70" />
            <div className="absolute -bottom-0.5 -left-0.5 sm:-bottom-1 sm:-left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full opacity-70 animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute -bottom-0.5 -left-0.5 sm:-bottom-1 sm:-left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full opacity-70" />
          </div>
        </Link>
      )}
    </>
  );
}
