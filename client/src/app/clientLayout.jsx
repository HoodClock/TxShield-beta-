'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SectionIndicator from './components/SectionIndicator';


export default function ClientLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <SectionIndicator />
    </QueryClientProvider>
  );
}
