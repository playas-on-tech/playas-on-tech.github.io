"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Play } from "./Icons";
import type { Lang } from "@/i18n/lang";

type Edition = {
  n: number;
  date: string;
  title: string;
  video?: string;
  next?: boolean;
};

const COPY = {
  es: {
    pill: "La historia",
    h2: "De la edición #1 al 7º aniversario.",
    sub: "Cada dos meses, sin falta, frente al mar. Este es el camino que nos trajo hasta aquí.",
    editionLabel: "Edición",
    nextTag: "Próxima",
    watchSession: "Ver sesión",
    reserve: "Reservar lugar",
    reserveHref: "/aniversario",
    editions: [
      { n: 1, date: "Jul 2025", title: "El primer encuentro" },
      { n: 2, date: "Sep 2025", title: "Comunidad y código" },
      { n: 3, date: "Nov 2025", title: "Open source en la costa" },
      { n: 4, date: "Ene 2026", title: "Animación web con GSAP", video: "preXoZ6zFuc" },
      { n: 5, date: "Mar 2026", title: "IA y autenticación", video: "V2vlUPn-v5Y" },
      { n: 6, date: "May 2026", title: "Builders frente al mar", video: "C0U9Z_jO-0o" },
      { n: 7, date: "18 Jul 2026", title: "7º Aniversario", next: true },
    ] as Edition[],
  },
  en: {
    pill: "The story",
    h2: "From edition #1 to the 7th anniversary.",
    sub: "Every two months, no exceptions, by the sea. This is the path that brought us here.",
    editionLabel: "Edition",
    nextTag: "Upcoming",
    watchSession: "Watch session",
    reserve: "Reserve seat",
    reserveHref: "/en/aniversario",
    editions: [
      { n: 1, date: "Jul 2025", title: "The first meetup" },
      { n: 2, date: "Sep 2025", title: "Community and code" },
      { n: 3, date: "Nov 2025", title: "Open source on the coast" },
      { n: 4, date: "Jan 2026", title: "Web animation with GSAP", video: "preXoZ6zFuc" },
      { n: 5, date: "Mar 2026", title: "AI and authentication", video: "V2vlUPn-v5Y" },
      { n: 6, date: "May 2026", title: "Builders by the sea", video: "C0U9Z_jO-0o" },
      { n: 7, date: "Jul 18, 2026", title: "7th Anniversary", next: true },
    ] as Edition[],
  },
} as const;

export default function EditionsTimeline({ lang = "es" }: { lang?: Lang }) {
  const t = COPY[lang];
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    // Scroll to the end smoothly after a tiny timeout to ensure layout is complete
    const timer = setTimeout(() => {
      slider.scrollTo({
        left: slider.scrollWidth,
        behavior: "smooth",
      });
    }, 100);

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let dragThresholdPassed = false;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      dragThresholdPassed = false;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      setIsDragging(false);
    };

    const handleMouseUp = () => {
      isDown = false;
      setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;

      if (Math.abs(x - startX) > 5) {
        dragThresholdPassed = true;
        setIsDragging(true);
        e.preventDefault();
        slider.scrollLeft = scrollLeft - walk;
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (dragThresholdPassed) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mouseleave", handleMouseLeave);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mousemove", handleMouseMove);
    slider.addEventListener("click", handleClick, true);

    return () => {
      clearTimeout(timer);
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mouseleave", handleMouseLeave);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mousemove", handleMouseMove);
      slider.removeEventListener("click", handleClick, true);
    };
  }, []);

  return (
    <section id="ediciones" className="bg-cream px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        <div className="reveal max-w-[640px]">
          <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
            {t.pill}
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
            {t.h2}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-navy/60">{t.sub}</p>
        </div>

        <div ref={ref} className={`edition-timeline mt-16 ${inView ? "is-in" : ""}`}>
          <div
            ref={scrollRef}
            className={`edition-scroll ${
              isDragging ? "active cursor-grabbing select-none" : "cursor-grab"
            }`}
          >
            <ol className="edition-track">
              {t.editions.map((ed, i) => (
                <li
                  key={ed.n}
                  className={`edition-node ${ed.next ? "edition-node--next" : ""}`}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span className="edition-dot" />
                  <div className="mt-6">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ocean">
                      {ed.date}
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="text-lg font-bold tracking-tight text-navy">
                        {t.editionLabel} #{ed.n}
                      </span>
                      {ed.next && (
                        <span className="rounded-full bg-sunset/15 px-2 py-0.5 text-[11px] font-semibold text-sunset">
                          {t.nextTag}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 leading-snug text-navy/60">{ed.title}</p>

                    {ed.video && (
                      <a
                        href={`https://www.youtube.com/watch?v=${ed.video}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-navy/70 transition hover:text-ocean"
                      >
                        <Play size={13} />
                        {t.watchSession}
                      </a>
                    )}
                    {ed.next && (
                      <Link
                        href={t.reserveHref}
                        className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-sunset transition hover:text-sunset-400"
                      >
                        {t.reserve}
                        <ArrowUpRight size={13} className="transition group-hover:rotate-45" />
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
