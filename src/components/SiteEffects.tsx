"use client";

import { useEffect } from "react";

/**
 * Replicates the prototype's three vanilla-JS behaviours using CSS-native
 * equivalents where possible, keeping only what can't be done with CSS alone:
 *  1. Scroll-reveal with gentle per-sibling stagger (CSS transition + IntersectionObserver).
 *  2. Count-up numbers when stats strip enters view (kept as JS animation — no CSS equivalent).
 *  3. Hero parallax — replaced with CSS @keyframes for simpler implementation.
 *
 * All listeners/observers are cleaned up so the effect is safe under React Strict Mode's double-invoke in development.
 */
export default function SiteEffects() {
  useEffect(() => {
    // Scroll-reveal with gentle per-sibling stagger (CSS handles transition)
    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-visible");
          revealIO.unobserve(e.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      // stagger siblings within the same parent using CSS transition-delay
      const sibs = [...(el.parentElement?.children ?? [])].filter((c) =>
        c.classList.contains("reveal")
      );
      el.style.transitionDelay = sibs.indexOf(el) * 90 + "ms";
      revealIO.observe(el);
    });

    // Count-up numbers when stats strip enters view (no CSS equivalent for this)
    const countIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const target = parseFloat(el.dataset.count ?? "0");
          const pre = el.dataset.prefix || "";
          const suf = el.dataset.suffix || "";
          const dur = 1500;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = pre + Math.round(target * eased) + suf;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          countIO.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );

    document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => countIO.observe(el));

    // Hero parallax — CSS @keyframes handles the drift and fade (simpler than JS polling)
    const heroContent = document.getElementById("hero-content");
    if (heroContent && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      heroContent.classList.add("hero-parallax");
    }

    return () => {
      revealIO.disconnect();
      countIO.disconnect();
    };
  }, []);

  return null;
}
