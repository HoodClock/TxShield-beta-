'use client';

import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DarkVeil from './components/backgrounds/DarkVeil';

export default function ClientLayout({ children }) {
  const [queryClient] = useState(() => 
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5 minutes
          gcTime: 1000 * 60 * 10, // 10 minutes (garbage collection)
        },
      },
    })
  );

  useEffect(() => {
    // Optional: Clear cache when component unmounts
    return () => {
      queryClient.clear();
    };
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <DarkVeil 
        hueShift={0}
        noiseIntensity={0.05}
        scanlineIntensity={0.1}
        speed={0.5}
        scanlineFrequency={2}
        warpAmount={0.3}
        resolutionScale={1}
      />
      {children}
    </QueryClientProvider>
  );
}
