"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export default function ScrambleText({ text, className = "", delay = 0, duration = 2500, loop = false, loopDelay = 3000 }) {
    const [displayText, setDisplayText] = useState("");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    useEffect(() => {
        if (!isInView) return;

        let animationFrameId;
        let timeoutId;

        // Ensure text is strings
        const targetText = String(text);
        const length = targetText.length;

        const startAnimation = () => {
            let start = null;

            const animate = (timestamp) => {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);

                // We split the animation into two halves:
                // First 50%: Encrypting (losing characters from right to left)
                // Last 50%: Decrypting (revealing characters from left to right)

                let isEncrypting = percentage < 0.5;

                // Normalize percentage for the current phase (0.0 to 1.0)
                const phasePercentage = isEncrypting ? (percentage / 0.5) : ((percentage - 0.5) / 0.5);

                // How many real characters should we show right now?
                let realCount;
                if (isEncrypting) {
                    // Encrypting: start with all real characters, and lose them as phase progresses
                    realCount = Math.floor(length * (1 - phasePercentage));
                } else {
                    // Decrypting: start with 0 real characters, and gain them as phase progresses
                    realCount = Math.floor(length * phasePercentage);
                }

                let scrambledArray = [];
                for (let i = 0; i < length; i++) {
                    if (targetText[i] === " ") {
                        scrambledArray.push(" "); // always keep spaces as spaces
                    } else if (i < realCount) {
                        // Show the actual character
                        scrambledArray.push(targetText[i]);
                    } else {
                        // Keep scrambling the obscured portion
                        scrambledArray.push(CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]);
                    }
                }

                setDisplayText(scrambledArray.join(""));

                if (progress < duration) {
                    animationFrameId = requestAnimationFrame(animate);
                } else {
                    setDisplayText(targetText);
                    if (loop) {
                        // Schedule the next encrypt/decrypt cycle
                        timeoutId = setTimeout(startAnimation, loopDelay);
                    }
                }
            };

            animationFrameId = requestAnimationFrame(animate);
        };

        // Start delay
        timeoutId = setTimeout(startAnimation, delay * 1000);

        return () => {
            clearTimeout(timeoutId);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [text, isInView, delay, duration, loop, loopDelay]);

    return (
        <motion.span
            ref={ref}
            className={`inline-flex whitespace-pre ${className}`}
            style={{
                // Apply monospace specifically for the animation to lock character widths, 
                // ensuring the total span width doesn't jitter left/right as characters shuffle.
                fontFamily: "'Courier New', Courier, monospace"
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay }}
        >
            {displayText}
        </motion.span>
    );
}
