"use client";

import React, { useState, useEffect, useRef } from "react";
import { m, useInView } from "framer-motion";

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

                // How many characters should be firmly revealed by now
                const revealCount = Math.floor(length * percentage);

                let scrambledArray = [];
                for (let i = 0; i < length; i++) {
                    if (targetText[i] === " ") {
                        scrambledArray.push(" "); // always keep spaces as spaces
                    } else if (i < revealCount) {
                        // Reveal actual character
                        scrambledArray.push(targetText[i]);
                    } else {
                        // Keep scrambling
                        scrambledArray.push(CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]);
                    }
                }

                setDisplayText(scrambledArray.join(""));

                if (progress < duration) {
                    animationFrameId = requestAnimationFrame(animate);
                } else {
                    setDisplayText(targetText);
                    if (loop) {
                        // Schedule the next encryption/decryption cycle
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
        <m.span
            ref={ref}
            className={`inline-block whitespace-pre-wrap word-break break-words ${className}`}
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
        </m.span>
    );
}
