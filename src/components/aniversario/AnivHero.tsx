"use client";
import { useLang } from "@/lib/LangProvider";

import { ArrowUpRight, ArrowRight, Calendar, Clock, MapPin } from "../SocialIcons";
import { anivEvent } from "./event";
import Countdown from "./Countdown";

const COPY = {
  es: {
    h1a: "Celebramos nuestro 7º aniversario",
    h1b: "frente al mar.",
    sub: "Siete ediciones de comunidad, charlas y olas. Esta es la edición que lo celebra — un día especial de talks, networking y un brindis frente al mar de Manzanillo.",
    ctaReserve: "Reservar mi lugar",
    ctaProgram: "Ver programa",
    countdownLabel: "Faltan",
  },
  en: {
    h1a: "We celebrate our 7th anniversary",
    h1b: "by the sea.",
    sub: "Seven editions of community, talks and waves. This is the edition that celebrates it — a special day of talks, networking and a toast by the sea of Manzanillo.",
    ctaReserve: "Reserve my seat",
    ctaProgram: "See program",
    countdownLabel: "Time left",
  },
} as const;

export default function AnivHero() {
  const { lang } = useLang();
  const t = COPY[lang];
  const ev = anivEvent(lang);
  const facts = [
    { icon: Calendar, text: ev.dateLabel },
    { icon: Clock, text: ev.timeLabel },
    { icon: MapPin, text: `${ev.venue}, ${ev.venueCity}` },
  ];
  return (
    <section id="top" className="mesh-hero grain relative overflow-hidden">
      <div className="blobs cine-field">
        <span className="blob blob-teal" />
        <span className="blob blob-ocean" />
        <span className="blob blob-aqua" />
        <span className="blob blob-sunset" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1100px] flex-col items-center justify-center px-6 pb-40 pt-28 min-[360px]:pt-32 text-center">
        <h1 className="cine cine-1 max-w-[16ch] text-[clamp(2.2rem,7vw,6rem)] font-semibold leading-[0.98] tracking-tightest text-white">
          {t.h1a}{" "}
          <span className="text-ocean-300">{t.h1b}</span>
        </h1>

        <p className="cine cine-2 mt-7 max-w-[48ch] text-base sm:text-lg leading-relaxed text-white/80 md:text-xl">
          {t.sub}
        </p>

        <div className="cine cine-2 mt-8 flex flex-wrap items-center justify-center gap-3">
          {facts.map((fact) => (
            <span
              key={fact.text}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 glass"
            >
              <fact.icon size={16} className="text-ocean-300" />
              {fact.text}
            </span>
          ))}
        </div>

        <div className="cine cine-3 mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="#registro"
            className="group flex items-center gap-2.5 rounded-full bg-sunset py-2 pl-6 pr-2 text-[16px] font-semibold text-white shadow-xl shadow-sunset/30 transition hover:bg-sunset-400 active:scale-[0.98]"
          >
            {t.ctaReserve}
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/95 text-navy transition group-hover:rotate-45 shrink-0">
              <ArrowUpRight size={16} />
            </span>
          </a>
          <a
            href="#programa"
            className="group flex items-center gap-2.5 rounded-full border border-white/30 bg-white/5 py-2 pl-6 pr-2 text-[16px] font-semibold text-white glass transition hover:bg-white/10"
          >
            {t.ctaProgram}
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ocean text-white transition group-hover:translate-x-0.5 shrink-0">
              <ArrowRight size={16} />
            </span>
          </a>
        </div>

        <div className="cine cine-4 mt-14 w-full">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-white/55">
            {t.countdownLabel}
          </p>
          <Countdown lang={lang} />
        </div>
      </div>

      <svg
        className="wave-divider absolute inset-x-0 bottom-[-1px] z-[5]"
        viewBox="0 0 1440 130"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M-120,70 C140,130 380,8 620,52 C880,100 1140,132 1380,74 C1460,56 1520,62 1560,72 L1560,131 L-120,131 Z"
          fill="#FBF6EE"
        />
      </svg>
    </section>
  );
}
