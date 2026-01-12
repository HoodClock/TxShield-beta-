'use client';

import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LightPillar from './components/backgrounds/LightPillar';

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
      <LightPillar 
        topColor="#5227FF"
        bottomColor="#FF9FFC"
        intensity={1.0}
        rotationSpeed={0.3}
        glowAmount={0.005}
        pillarWidth={3.0}
        pillarHeight={0.4}
        noiseIntensity={0.5}
        pillarRotation={0}
        interactive={false}
        mixBlendMode="normal"
      />
      {children}
    </QueryClientProvider>
  );
}
