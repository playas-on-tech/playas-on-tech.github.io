"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Play } from "./SocialIcons";
import { useTranslation } from "react-i18next";

type Edition = {
  n: number;
  date: string;
  title: string;
  video?: string;
  next?: boolean;
};

export default function EditionsTimeline() {
  const { t } = useTranslation();
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

    // Smooth auto-scroll to end after layout is complete
    const timer = setTimeout(() => {
      slider.scrollTo({
        left: slider.scrollWidth,
        behavior: "smooth",
      });
    }, 100);

// ponytail: PointerEvent covers touch+mouse for modern browsers; older browser support is not a concern for this static site
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const handleDragStart = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      slider.style.userSelect = "none";
    };

    const handleDragMove = (e: MouseEvent) => {
      if (!isDown) return;
      const walk = (e.pageX - startX) * 1.5;

      if (Math.abs(e.pageX - startX) > 5) {
        slider.classList.add("active", "cursor-grabbing", "select-none");
        e.preventDefault();
        slider.scrollLeft = scrollLeft - walk;
      }
    };

    const handleDragEnd = () => {
      isDown = false;
      slider.style.userSelect = "";
      slider.classList.remove("active", "cursor-grabbing", "select-none");
    };

    slider.addEventListener("mousedown", handleDragStart);
    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);

    return () => {
      clearTimeout(timer);
      slider.removeEventListener("mousedown", handleDragStart);
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
    };
  }, []);

  const editions = t("editionsTimeline.editions", { returnObjects: true }) as Edition[];

  return (
    <section id="ediciones" className="bg-cream px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        <div className="reveal max-w-[640px]">
          <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
            {t("editionsTimeline.pill")}
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
            {t("editionsTimeline.h2")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-navy/60">{t("editionsTimeline.sub")}</p>
        </div>

        <div ref={ref} className={`edition-timeline mt-16 ${inView ? "is-in" : ""}`}>
          <div
            ref={scrollRef}
            className={`edition-scroll ${
              isDragging ? "active cursor-grabbing select-none" : "cursor-grab"
            }`}
          >
            <ol className="edition-track">
              {editions.map((ed, i) => (
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
                        {t("editionsTimeline.editionLabel")} #{ed.n}
                      </span>
                      {ed.next && (
                        <span className="rounded-full bg-sunset/15 px-2 py-0.5 text-[11px] font-semibold text-sunset">
                          {t("editionsTimeline.nextTag")}
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
                        {t("editionsTimeline.watchSession")}
                      </a>
                    )}
                    {ed.next && (
                      <Link
                        href={t("editionsTimeline.reserveHref")}
                        className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-sunset transition hover:text-sunset-400"
                      >
                        {t("editionsTimeline.reserve")}
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
