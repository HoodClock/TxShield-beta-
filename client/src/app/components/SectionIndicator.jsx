"use client";

import React, { useEffect, useState } from "react";

export default function SectionIndicator() {
  const [sections, setSections] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    // Try common selectors first
    const selector = 'section[id], [data-section], [id^="section-"], [data-scroll-section]';
    let elems = Array.from(document.querySelectorAll(selector));

    // If no explicit sections found, fallback to main children (common Next.js structure)
    if (elems.length === 0) {
      const main = document.querySelector('main') || document.querySelector('#__next') || document.body;
      if (main) {
        const candidates = Array.from(main.children).filter((el) => {
          // ignore scripts, templates and very small elements
          if (!(el instanceof HTMLElement)) return false;
          const tag = el.tagName.toLowerCase();
          if (tag === 'script' || tag === 'template' || tag === 'style') return false;
          const h = el.offsetHeight || el.getBoundingClientRect().height || 0;
          return h > Math.max(160, window.innerHeight * 0.15);
        });

        candidates.forEach((el, idx) => {
          if (!el.id) {
            // assign an auto id so anchors work
            el.id = `section-auto-${idx + 1}`;
          }
        });

        elems = candidates;
      }
    }

    if (elems.length === 0) {
      // nothing to show
      setSections([]);
      return;
    }

    const list = elems.map((el) => ({
      id: el.id || el.getAttribute("data-section") || "",
      title: el.dataset.label || el.getAttribute("aria-label") || el.id || "",
    }));

    setSections(list);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = elems.indexOf(entry.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -50% 0px",
        threshold: [0.35, 0.6],
      }
    );

    elems.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  if (!sections || sections.length === 0) return null;

  return (
    <nav className="section-indicator" aria-label="Sections navigation">
      <ul>
        {sections.map((s, i) => (
          <li key={s.id || i}>
            <a
              href={s.id ? `#${s.id}` : '#'}
              className={`dot ${i === active ? "active" : ""}`}
              aria-current={i === active ? "true" : undefined}
              aria-label={s.title || s.id || `Section ${i + 1}`}
            >
              <span className="visually-hidden">{s.title || s.id || `Section ${i + 1}`}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
