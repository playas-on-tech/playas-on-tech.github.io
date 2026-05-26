"use client";

import { useEffect } from "react";

/**
 * Replicates the prototype's three vanilla-JS behaviours:
 *  1. Scroll-reveal with a gentle per-sibling stagger.
 *  2. Count-up numbers when the stats strip enters view.
 *  3. Cinematic hero parallax (text drifts up and fades on scroll).
 *
 * Renders nothing — it only wires DOM effects after hydration, exactly like
 * the original inline <script>. All listeners/observers are cleaned up so the
 * effect is safe under React Strict Mode's double-invoke in development.
 */
export default function SiteEffects() {
  useEffect(() => {
    // 1. Scroll-reveal with a gentle stagger
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
      // stagger siblings within the same parent
      const sibs = [...(el.parentElement?.children ?? [])].filter((c) =>
        c.classList.contains("reveal")
      );
      el.style.transitionDelay = sibs.indexOf(el) * 90 + "ms";
      revealIO.observe(el);
    });

    // 2. Count-up numbers
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

    // 3. Cinematic scroll parallax — hero text drifts up and fades as you scroll
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const heroContent = document.getElementById("hero-content");
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY;
      if (heroContent && y < window.innerHeight * 1.2) {
        heroContent.style.transform = "translateY(" + y * 0.3 + "px)";
        heroContent.style.opacity = String(Math.max(0, 1 - y / 640));
      }
      ticking = false;
    };
    const onScrollRequest = () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    };
    if (heroContent && !reduceMotion) {
      window.addEventListener("scroll", onScrollRequest, { passive: true });
    }

    // 4. Same-page hash smooth scrolling interceptor
    const handleSamePageLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Same-page hashes start with "#", or "/#" when on the homepage, or "/current-path#"
      const currentPath = window.location.pathname;
      const isSamePageHash =
        href.startsWith("#") ||
        (href.startsWith("/#") && (currentPath === "/" || currentPath === "/index.html")) ||
        href.startsWith(currentPath + "#");

      if (isSamePageHash) {
        // Temporarily enable smooth scrolling on document element
        document.documentElement.style.scrollBehavior = "smooth";

        // Reset it back to auto after the scroll completes (1000ms is safe and standard)
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = "";
        }, 1000);
      }
    };

    // 5. Smooth scroll to hash on mount if present
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }

    document.addEventListener("click", handleSamePageLinkClick);

    return () => {
      revealIO.disconnect();
      countIO.disconnect();
      window.removeEventListener("scroll", onScrollRequest);
      document.removeEventListener("click", handleSamePageLinkClick);
    };
  }, []);

  return null;
}
