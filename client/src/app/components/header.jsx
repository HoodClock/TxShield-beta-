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
        >
          <div className="relative">
            {/* Gradient Glow Effect - Animated */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-full opacity-60 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200 animate-shimmer bg-[length:200%_auto]"></div>
            
            {/* Button Content */}
            <div className="relative px-6 py-2.5 bg-black rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105 border border-white/10 group-hover:border-white/20 shadow-lg shadow-purple-500/20">
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-blue-200 font-semibold text-sm tracking-wider uppercase group-hover:from-white group-hover:to-white transition-all duration-300">
                Home
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* API Button - Top Right */}
      {!isApiRefPage && (
        <Link
          href="/ApiRef"
          className="absolute top-4 right-4 sm:top-8 sm:right-8 md:top-16 md:right-8 z-[9999] group pointer-events-auto"
        >
          <div className="relative">
             {/* Gradient Glow Effect - Animated */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-full opacity-60 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200 animate-shimmer bg-[length:200%_auto]"></div>
            
            {/* Button Content */}
            <div className="relative px-6 py-2.5 bg-black rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105 border border-white/10 group-hover:border-white/20 shadow-lg shadow-blue-500/20">
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200 font-semibold text-sm tracking-wider uppercase group-hover:from-white group-hover:to-white transition-all duration-300">
                API
              </span>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
