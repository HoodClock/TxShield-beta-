'use client';

import { useState } from 'react';
import dynamic from "next/dynamic";
import ClientLayout from "./clientLayout";

const EvmProvider = dynamic(() => import("./provider/EvmProvider"), {
  ssr: false
})

const SolProvider = dynamic(() => import("./provider/SolProvider"), {
  ssr: false
})

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function ClientLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <EvmProvider>
        <SolProvider>
          {children}
        </SolProvider>
      </EvmProvider>
    </QueryClientProvider>
  );
}
