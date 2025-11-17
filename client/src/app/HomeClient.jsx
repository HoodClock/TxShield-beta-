"use client";

import dynamic from 'next/dynamic';
import React from 'react';

// Client-side wrapper that dynamically loads the Home page.
// Keeping this as a Client Component allows using `ssr: false` safely.
const Home = dynamic(() => import('./home/page'), { ssr: false, loading: () => <div /> });

export default function HomeClient() {
  return <Home />;
}
