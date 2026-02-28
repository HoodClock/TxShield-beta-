"use client";

import React from "react";
import { m } from "framer-motion";

export default function DataFlowBackground({ className = "" }) {
    // SVG drawing of a stylized data circuit
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none opacity-20 ${className}`}>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                    <linearGradient id="flowGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="#818cf8" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>

                {/* Horizontal Line 1 */}
                <m.line
                    x1="-200"
                    y1="20%"
                    x2="100%"
                    y2="20%"
                    stroke="url(#flowGrad)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1],
                        opacity: [0, 1, 0],
                        translateX: ["-10%", "100%"]
                    }}
                    transition={{
                        duration: 4,
                        ease: "linear",
                        repeat: Infinity,
                        delay: 0.5
                    }}
                />

                {/* Horizontal Line 2 */}
                <m.line
                    x1="-200"
                    y1="70%"
                    x2="100%"
                    y2="70%"
                    stroke="url(#flowGrad)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1],
                        opacity: [0, 1, 0],
                        translateX: ["-10%", "100%"]
                    }}
                    transition={{
                        duration: 6,
                        ease: "linear",
                        repeat: Infinity,
                        delay: 2
                    }}
                />

                {/* Vertical Line 1 */}
                <m.line
                    x1="30%"
                    y1="-200"
                    x2="30%"
                    y2="100%"
                    stroke="url(#flowGrad2)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1],
                        opacity: [0, 1, 0],
                        translateY: ["-10%", "100%"]
                    }}
                    transition={{
                        duration: 5,
                        ease: "linear",
                        repeat: Infinity,
                        delay: 1.5
                    }}
                />

                {/* Vertical Line 2 */}
                <m.line
                    x1="80%"
                    y1="-200"
                    x2="80%"
                    y2="100%"
                    stroke="url(#flowGrad2)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1],
                        opacity: [0, 1, 0],
                        translateY: ["-10%", "100%"]
                    }}
                    transition={{
                        duration: 7,
                        ease: "linear",
                        repeat: Infinity,
                        delay: 0.2
                    }}
                />

                {/* Subtle background grid points */}
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.05)" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>
    );
}
