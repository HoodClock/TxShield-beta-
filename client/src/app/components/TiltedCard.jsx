"use client";

import React, { useRef } from 'react';

const TiltedCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotationX = ((y - centerY) / centerY) * 10;
    const rotationY = ((centerX - x) / centerX) * 10;

    cardRef.current.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
          height: '100%',
          width: '100%'
        }}
      >
        {/* Content */}
        <div className="relative z-10 h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TiltedCard;
