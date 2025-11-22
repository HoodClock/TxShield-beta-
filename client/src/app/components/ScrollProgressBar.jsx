"use client";

import { useEffect, useState } from 'react';

const ScrollProgressBar = () => {
  const [scroll, setScroll] = useState(0);

  const onScroll = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollY / docHeight) * 100;
    setScroll(scrollPercent);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '5px',
        height: `${scroll}%`,
        background: 'linear-gradient(to bottom, #8A2BE2, #4B0082)',
        zIndex: 1000,
      }}
    />
  );
};

export default ScrollProgressBar;
