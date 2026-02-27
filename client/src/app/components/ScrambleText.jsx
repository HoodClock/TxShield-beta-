"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export default function ScrambleText({ text, className = "", delay = 0, duration = 1500 }) {
    const [displayText, setDisplayText] = useState("");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    useEffect(() => {
        if (!isInView) return;

        let start = null;
        let animationFrameId;

        // Ensure text is strings
        const targetText = String(text);
        const length = targetText.length;

        // Start delay
        const timeoutId = setTimeout(() => {
            const animate = (timestamp) => {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);

                // How many characters should be firmly revealed by now
                const revealCount = Math.floor(length * percentage);

                let scrambled = "";
                for (let i = 0; i < length; i++) {
                    if (i < revealCount) {
                        // Reveal actual character
                        scrambled += targetText[i];
                    } else {
                        // Keep scrambling
                        scrambled += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
                    }
                }

                setDisplayText(scrambled);

                if (progress < duration) {
                    animationFrameId = requestAnimationFrame(animate);
                } else {
                    setDisplayText(targetText);
                }
            };

            animationFrameId = requestAnimationFrame(animate);
        }, delay * 1000);

        return () => {
            clearTimeout(timeoutId);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [text, isInView, delay, duration]);

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay }}
        >
            {displayText}
        </motion.span>
    );
}
