"use client";

import React, { useEffect, useRef } from "react";

export default function HeroBackground({ className = "" }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const particles = [];
        // Adjust particle count based on screen size for performance limit max dots
        const particleCount = Math.min(Math.floor((width * height) / 12000), 100);

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 1.5 // Increased from * 2 + 0.5
            });
        }

        let mouse = { x: -1000, y: -1000 };
        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        window.addEventListener("mousemove", handleMouseMove);

        let animationFrameId = null;
        let isVisible = true;
        let isTabActive = !document.hidden;

        const render = () => {
            if (!isVisible || !isTabActive) return;
            
            ctx.clearRect(0, 0, width, height);

            ctx.fillStyle = "rgba(168, 85, 247, 0.8)"; // Tailwind purple-500
            ctx.lineWidth = 1.2; // Increased from 0.5

            for (let i = 0; i < particleCount; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges for a seamless infinite feel
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();

                // Connect particles to each other
                for (let j = i + 1; j < particleCount; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 180) { // Increased from 120
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(168, 85, 247, ${0.4 * (1 - dist / 180)})`;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                // Connect particles to mouse
                const dxMouse = p.x - mouse.x;
                const dyMouse = p.y - mouse.y;
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                if (distMouse < 220) { // Increased from 150
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(192, 132, 252, ${0.6 * (1 - distMouse / 220)})`; // tailwind purple-400
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        const startAnimation = () => {
            if (!animationFrameId) {
                render();
            }
        };

        const stopAnimation = () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
                if (isVisible && isTabActive) {
                    startAnimation();
                } else {
                    stopAnimation();
                }
            },
            { threshold: 0 }
        );

        if (canvas) observer.observe(canvas);

        const handleVisibilityChange = () => {
            isTabActive = !document.hidden;
            if (isVisible && isTabActive) {
                startAnimation();
            } else {
                stopAnimation();
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Start animation initially
        startAnimation();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            if (canvas) observer.unobserve(canvas);
            observer.disconnect();
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {/* Dynamic Canvas Node Network */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70 mix-blend-screen" />

            {/* Keep the ambient orbs for a premium glow */}
            <div className="absolute inset-0 bg-transparent flex items-center justify-center">
                {/* Top Left Deep Purple */}
                <div
                    className="absolute w-[30rem] h-[30rem] bg-purple-900/40 rounded-full mix-blend-screen animate-pulse"
                    style={{ filter: 'blur(100px)', animationDuration: '4s' }}
                />
                {/* Bottom Right Electric Violet */}
                <div
                    className="absolute w-[25rem] h-[25rem] bg-violet-600/20 rounded-full mix-blend-screen animate-pulse"
                    style={{ filter: 'blur(100px)', animationDuration: '5s' }}
                />
            </div>

            {/* Shadow Mask to fade out the edges and highlight the center */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_80%)]"></div>
        </div>
    );
}
