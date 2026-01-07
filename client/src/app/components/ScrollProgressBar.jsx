"use client";

import { useEffect, useState, useRef } from 'react';

const ScrollProgressBar = () => {
  const [scroll, setScroll] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handle = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
          setScroll(scrollPercent);
          ticking.current = false;
        });
      }
    };

    window.addEventListener('scroll', handle, { passive: true });
    // initialize
    handle();
    return () => window.removeEventListener('scroll', handle);
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
