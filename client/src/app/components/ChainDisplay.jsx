import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { motion, useInView } from "framer-motion";
import { TokenIcon } from '@web3icons/react';

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };

function ChainSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    const chains = [
        { id: 'eth', label: 'Ethereum', symbol: 'eth' },
        { id: 'bnb', label: 'BNB Smart Chain', symbol: 'bnb' },
        { id: 'avax', label: 'Avalanche', symbol: 'avax' },
        { id: 'matic', label: 'Polygon', symbol: 'matic' },
        { id: 'arb', label: 'Arbitrum', symbol: 'arb' },
        { id: 'op', label: 'Optimism', symbol: 'op' },
        { id: 'base', label: 'Base', symbol: 'base' },
        { id: 'linea', label: 'Linea', symbol: 'linea' },
        { id: 'mantle', label: 'Mantle', symbol: 'mantle' },
        { id: 'zke', label: 'zkSync Era', symbol: 'zke' },
        { id: 'scroll', label: 'Scroll', symbol: 'scroll' },
        { id: 'ftm', label: 'Fantom', symbol: 'ftm' },
        { id: 'celo', label: 'Celo', symbol: 'celo' },
        { id: 'aurora', label: 'Aurora', symbol: 'aurora' },
        { id: 'sol', label: 'Solana', symbol: 'sol' }
    ];

    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const seqRef = useRef(null);

    const [seqWidth, setSeqWidth] = useState(0);
    const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState(false);

    const speed = 120; // px per second

    const updateDimensions = useCallback(() => {
        const containerWidth = containerRef.current?.clientWidth ?? 0;
        const seqRect = seqRef.current?.getBoundingClientRect?.();
        const sequenceWidth = seqRect?.width ?? 0;

        if (sequenceWidth > 0) {
            setSeqWidth(Math.ceil(sequenceWidth));
            const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
            setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
        }
    }, []);

    useEffect(() => {
        if (!window.ResizeObserver) {
            const onResize = () => updateDimensions();
            window.addEventListener('resize', onResize);
            updateDimensions();
            return () => window.removeEventListener('resize', onResize);
        }

        const observers = [containerRef, seqRef].map(ref => {
            if (!ref.current) return null;
            const obs = new ResizeObserver(updateDimensions);
            obs.observe(ref.current);
            return obs;
        });

        updateDimensions();
        return () => observers.forEach(o => o?.disconnect());
    }, [updateDimensions]);

    // Wait for images to load before measuring
    useEffect(() => {
        const imgs = seqRef.current?.querySelectorAll('img') ?? [];
        if (imgs.length === 0) {
            updateDimensions();
            return;
        }
        let remaining = imgs.length;
        const onLoad = () => {
            remaining -= 1;
            if (remaining === 0) updateDimensions();
        };
        imgs.forEach(img => {
            if (img.complete) onLoad();
            else {
                img.addEventListener('load', onLoad, { once: true });
                img.addEventListener('error', onLoad, { once: true });
            }
        });
        return () => imgs.forEach(img => {
            img.removeEventListener('load', onLoad);
            img.removeEventListener('error', onLoad);
        });
    }, [chains, updateDimensions]);

    // RAF-driven loop (always running, no pause)
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        // disable CSS marquee when JS drives transform to avoid conflicting transforms
        track.classList.add('js-driven');

        let rafId = null;
        let lastTs = null;
        let offset = 0;
        let velocity = 0;

        const seqSize = seqWidth || 0;

        if (seqSize > 0) {
            offset = ((offset % seqSize) + seqSize) % seqSize;
            track.style.transform = `translate3d(${-offset}px, 0, 0)`;
        }

        const animate = (ts) => {
            if (lastTs === null) lastTs = ts;
            const delta = Math.max(0, ts - lastTs) / 1000;
            lastTs = ts;

            const target = speed; // always run — user requested no pauses
            const easing = 1 - Math.exp(-delta / ANIMATION_CONFIG.SMOOTH_TAU);
            velocity += (target - velocity) * easing;

            if (seqSize > 0) {
                let next = offset + velocity * delta;
                // keep offset within [0, seqSize) without causing layout thrash
                next = ((next % seqSize) + seqSize) % seqSize;
                offset = next;
                track.style.transform = `translate3d(${-offset}px, 0, 0)`;
            }

            rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            lastTs = null;
            track.classList.remove('js-driven');
        };
    }, [seqWidth, isHovered]);

    // Keep mouse handlers inert (no pause) to satisfy "no pauses" requirement
    const handleMouseEnter = () => {};
    const handleMouseLeave = () => {};

    const copies = useMemo(() => Array.from({ length: copyCount }), [copyCount]);

    // Generate a deterministic circular SVG badge (data URL) for a symbol/label.
    const getBadgeDataUrl = (symbol, label, size = 64) => {
        const initials = (label || symbol || '').slice(0, 2).toUpperCase() || '??';
        // deterministic hue from symbol
        let hash = 0;
        for (let i = 0; i < (symbol || '').length; i++) hash = ((hash << 5) - hash) + symbol.charCodeAt(i);
        const hue = Math.abs(hash) % 360;
        const color1 = `hsl(${hue} 80% 55%)`;
        const color2 = `hsl(${(hue + 40) % 360} 80% 55%)`;
        const svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'><defs><linearGradient id='g' x1='0' x2='1'><stop offset='0' stop-color='${color1}'/><stop offset='1' stop-color='${color2}'/></linearGradient></defs><rect width='${size}' height='${size}' rx='${size * 0.25}' fill='url(%23g)'/><text x='50%' y='55%' font-family='Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' font-size='${Math.floor(size * 0.38)}' fill='#fff' text-anchor='middle' font-weight='700'>${initials}</text></svg>`;
        return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    };

    function LogoRenderer({ symbol, label, size = 28 }) {
        const dataUrl = useMemo(() => getBadgeDataUrl(symbol, label, 64), [symbol, label]);
        return (
            <img src={dataUrl} alt={label || symbol} width={size} height={size} className="w-14 h-14 rounded-full object-cover" />
        );
    }

    return (
        <section ref={sectionRef} className="relative py-12 px-4 sm:px-6 overflow-hidden bg-black">
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-300">MULTI-CHAIN SUPPORT</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">Supported <span className="grad-word">Blockchains</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">We support monitoring across the most widely used networks.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.05 }}
                    className="logo-loop py-6"
                >
                    <div
                        ref={containerRef}
                        className="logo-loop__inner"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="logo-track" ref={trackRef}>
                                        {copies.map((_, copyIndex) => (
                                <div
                                    className="flex items-center gap-5"
                                    key={`copy-${copyIndex}`}
                                    aria-hidden={copyIndex > 0}
                                    ref={copyIndex === 0 ? seqRef : undefined}
                                >
                                    {chains.map((c, idx) => (
                                        <div key={`${copyIndex}-${c.id}-${idx}`} className="logo-item">
                                            <button
                                                aria-label={c.label}
                                                title={c.label}
                                                                className={`w-14 h-14 rounded-full bg-white/4 border border-white/6 backdrop-blur-sm flex items-center justify-center hover:scale-105 transition-transform ${copyIndex > 0 ? 'pointer-events-none' : ''}`}
                                                                tabIndex={copyIndex > 0 ? -1 : 0}
                                            >
                                                                <LogoRenderer symbol={c.symbol} label={c.label} size={28} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default ChainSection;