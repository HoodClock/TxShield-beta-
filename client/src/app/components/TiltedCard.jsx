"use client";

import React, { useState, useRef } from 'react';

const TiltedCard = ({ children, className = "" }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotationX = (y - centerY) / 10;
    const rotationY = (centerX - x) / 10;

    setRotateX(rotationX);
    setRotateY(rotationY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
      className={`relative ${className}`}
    >
      {/* Chroma Grid Background */}
      <div
        className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
        style={{
          background: `
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'chromaGrid 20s linear infinite',
        }}
      />

      {/* Gradient Border Light */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(500px circle at 50% 50%, rgba(34, 211, 238, 0.1), transparent 80%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default TiltedCard;
