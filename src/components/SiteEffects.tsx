"use client";

import { useEffect } from "react";

/**
 * The prototype's vanilla-JS behaviours, kept to what CSS cannot do:
 *  1. Scroll-reveal with per-sibling stagger (CSS transition + IntersectionObserver).
 *  2. Count-up numbers when the stats strip enters view.
 *  3. Hero parallax — CSS @keyframes handles the drift, JS only adds the class.
 *
 * Observers are disconnected on cleanup so the effect is safe under React Strict
 * Mode's double-invoke in development.
 */
function observe(selector: string, onEnter: (el: Element) => void, options: IntersectionObserverInit) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        onEnter(entry.target);
        io.unobserve(entry.target);
      });
    },
    options,
  );

  document.querySelectorAll(selector).forEach((el) => io.observe(el));
  return io;
}

function countUp(el: Element) {
  const target = Number((el as HTMLElement).dataset.count ?? 0);
  const prefix = (el as HTMLElement).dataset.prefix ?? "";
  const suffix = (el as HTMLElement).dataset.suffix ?? "";
  const duration = 1500;
  const start = performance.now();

  const step = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = prefix + Math.round(target * eased) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

export default function SiteEffects() {
  useEffect(() => {
    const revealIO = observe(
      ".reveal",
      (el) => {
        // Stagger siblings within the same parent through transition-delay.
        const siblings = [...(el.parentElement?.children ?? [])].filter((c) => c.classList.contains("reveal"));
        (el as HTMLElement).style.transitionDelay = `${siblings.indexOf(el) * 90}ms`;
        el.classList.add("is-visible");
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    const countIO = observe("[data-count]", countUp, { threshold: 0.6 });

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.getElementById("hero-content")?.classList.add("hero-parallax");
    }

    return () => {
      revealIO.disconnect();
      countIO.disconnect();
    };
  }, []);

  return null;
}
