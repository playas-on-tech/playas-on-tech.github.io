"use client";
import { useLang } from "@/lib/LangProvider";
import Image from "next/image";

import speakersData from "@/data/speakers.json";

const KEYNOTES = speakersData.keynotes;
const TALKS = speakersData.talks;
const PANELS = speakersData.panels;

const COPY = {
  es: {
    pill: "Ponentes",
    h2: "Las voces del evento.",
    sub: "Expertos de todo México se reúnen para nuestro 7º aniversario.",
    placeholder: "Por anunciar",
    keynotesLabel: "Keynotes",
    talksLabel: "Charlas",
  },
  en: {
    pill: "Speakers",
    h2: "The voices of the event.",
    sub: "Experts from across Mexico gather for our 7th anniversary.",
    placeholder: "To be announced",
    keynotesLabel: "Keynotes",
    talksLabel: "Talks",
    ctaH3: "Want to take the stage?",
    ctaBody: "Propose a talk for the 7th anniversary.",
    cta: "Propose your talk",
  },
} as const;

export default function Ponentes() {
  const { lang } = useLang();
  const t = COPY[lang];
  const keynotes = KEYNOTES;
  const talks = TALKS;

  return (
    <section id="ponentes" className="bg-cream-100 px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        <div className="reveal mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
              {t.pill}
            </span>
            <h2 className="mt-5 max-w-[18ch] text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
              {t.h2}
            </h2>
          </div>
          <p className="max-w-[38ch] text-lg leading-relaxed text-navy/60">{t.sub}</p>
        </div>

        <div className="mb-5 flex items-center gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-navy/40">{t.keynotesLabel}</h3>
          <span className="h-px flex-1 bg-navy/10" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {keynotes.map((k, i) => (
            <div
              key={i}
              className="reveal tilt rounded-3xl border border-navy/10 bg-cream p-9 text-center hover:shadow-2xl hover:shadow-navy/10"
            >
              <Image
                src={k.photo}
                alt={k.name}
                width={96}
                height={96}
                className="mx-auto h-24 w-24 rounded-full object-cover"
                style={k.imagePosition ? { objectPosition: k.imagePosition } : undefined}
              />
              <div className="mt-5 text-lg font-semibold tracking-tight">{k.name}</div>
              <div className="mt-1 text-sm text-navy/60">{k.title}</div>
              <div className="mt-1 text-sm text-sunset/90">{k.company}</div>
            </div>
          ))}
        </div>

        <div className="my-8 flex items-center gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-navy/40">{t.talksLabel}</h3>
          <span className="h-px flex-1 bg-navy/10" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {talks.map((slot, i) => (
            <div
              key={i}
              className="reveal tilt rounded-3xl border border-navy/10 bg-cream p-7 text-center hover:shadow-2xl hover:shadow-navy/10"
            >
              <Image
                src={slot.photo}
                alt={slot.name}
                width={80}
                height={80}
                className="mx-auto h-20 w-20 rounded-full object-cover"
              />
              <div className="mt-5 text-lg font-semibold tracking-tight">{slot.name}</div>
              {slot.title && <div className="mt-1 text-sm text-navy/60">{slot.title}</div>}
              {slot.company && <div className="mt-1 text-sm text-sunset/90">{slot.company}</div>}
            </div>
          ))}
        </div>

        <div className="my-8 flex items-center gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-navy/40">{lang === "es" ? "Panel" : "Panel"}</h3>
          <span className="h-px flex-1 bg-navy/10" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PANELS.map((p, i) => (
            <div
              key={i}
              className="reveal tilt rounded-3xl border border-navy/10 bg-cream p-7 text-center hover:shadow-2xl hover:shadow-navy/10"
            >
              <Image
                src={p.photo}
                alt={p.name}
                width={80}
                height={80}
                className="mx-auto h-20 w-20 rounded-full object-cover"
              />
              <div className="mt-5 text-lg font-semibold tracking-tight">{p.name}</div>
              {p.title && <div className="mt-1 text-sm text-navy/60">{p.title}</div>}
              {p.company && <div className="mt-1 text-sm text-sunset/90">{p.company}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
