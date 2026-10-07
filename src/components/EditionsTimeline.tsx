"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang";
import { ArrowUpRight, Play } from "@/components/Icons";
import AnivCta from "@/components/AnivCta";
import SectionHeader from "@/components/ui/SectionHeader";
import SmartLink from "@/components/ui/SmartLink";

type Edition = { n: number; date: string; title: string; video?: string; next?: boolean };

export default function EditionsTimeline() {
  const { t } = useLang();
  const timelineRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [dragging, setDragging] = useState(false);
  const editions = t("editionsTimeline.editions", { returnObjects: true }) as Edition[];

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        io.disconnect();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    // Smooth auto-scroll to the end once the layout is complete.
    const timer = setTimeout(() => slider.scrollTo({ left: slider.scrollWidth, behavior: "smooth" }), 100);

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const start = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      setDragging(true);
    };

    const move = (e: MouseEvent) => {
      if (!isDown || Math.abs(e.pageX - startX) <= 5) return;
      e.preventDefault();
      slider.scrollLeft = scrollLeft - (e.pageX - startX) * 1.5;
    };

    const end = () => setDragging(false);

    slider.addEventListener("mousedown", start);
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", end);

    return () => {
      clearTimeout(timer);
      slider.removeEventListener("mousedown", start);
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", end);
    };
  }, []);

  return (
    <section id="ediciones" className="bg-cream px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader
          pill={t("editionsTimeline.pill")}
          title={t("editionsTimeline.h2")}
          sub={t("editionsTimeline.sub")}
          layout="stack"
          subClass="mt-4"
          className="reveal max-w-[640px]"
        />

        <div ref={timelineRef} className={`edition-timeline mt-16 ${inView ? "is-in" : ""}`}>
          <div ref={scrollRef} className={`edition-scroll ${dragging ? "active select-none" : "cursor-grab"}`}>
            <ol className="edition-track">
              {editions.map((edition, i) => (
                <li
                  key={edition.n}
                  className={`edition-node ${edition.next ? "edition-node--next" : ""}`}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span className="edition-dot" />
                  <div className="mt-6">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ocean">{edition.date}</div>
                    <p className="mt-1 leading-snug text-navy/60">{edition.title}</p>

                    {edition.video && (
                      <SmartLink
                        href={`https://www.youtube.com/watch?v=${edition.video}`}
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-navy/70 transition hover:text-ocean"
                      >
                        <Play size={13} />
                        {t("editionsTimeline.watchSession")}
                      </SmartLink>
                    )}

                    {edition.next && (
                      <AnivCta>
                        <SmartLink
                          href={t("editionsTimeline.reserveHref")}
                          className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-sunset transition hover:text-sunset-400"
                        >
                          {t("editionsTimeline.reserve")}
                        </SmartLink>
                      </AnivCta>
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
