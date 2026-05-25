"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Play } from "./Icons";

type Edition = {
  n: number;
  date: string;
  title: string;
  video?: string;
  next?: boolean;
};

// The journey so far. Recorded editions link to their YouTube session;
// the upcoming one links to the anniversary page.
const editions: Edition[] = [
  { n: 1, date: "Jul 2025", title: "El primer encuentro" },
  { n: 2, date: "Sep 2025", title: "Comunidad y código" },
  { n: 3, date: "Nov 2025", title: "Open source en la costa" },
  { n: 4, date: "Ene 2026", title: "Animación web con GSAP", video: "preXoZ6zFuc" },
  { n: 5, date: "Mar 2026", title: "IA y autenticación", video: "V2vlUPn-v5Y" },
  { n: 6, date: "May 2026", title: "Builders frente al mar", video: "C0U9Z_jO-0o" },
  { n: 7, date: "18 Jul 2026", title: "7º Aniversario", next: true },
];

export default function EditionsTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

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

  return (
    <section id="ediciones" className="bg-cream px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        <div className="reveal max-w-[640px]">
          <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
            La historia
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
            De la edición #1 al 7º aniversario.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-navy/60">
            Cada dos meses, sin falta, frente al mar. Este es el camino que nos trajo hasta aquí.
          </p>
        </div>

        <div ref={ref} className={`edition-timeline mt-16 ${inView ? "is-in" : ""}`}>
          <div className="edition-scroll">
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
                        Edición #{ed.n}
                      </span>
                      {ed.next && (
                        <span className="rounded-full bg-sunset/15 px-2 py-0.5 text-[11px] font-semibold text-sunset">
                          Próxima
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
                        Ver sesión
                      </a>
                    )}
                    {ed.next && (
                      <Link
                        href="/aniversario"
                        className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-sunset transition hover:text-sunset-400"
                      >
                        Reservar lugar
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
