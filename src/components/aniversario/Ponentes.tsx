"use client";
import { useLang } from "@/lib/LangProvider";
import Image from "next/image";

import speakersData from "@/data/speakers.json";

type Speaker = (typeof speakersData.keynotes)[number];

const SECTIONS = [
  { labelKey: "keynotesLabel" as const, speakers: speakersData.keynotes },
  { labelKey: "talksLabel" as const, speakers: speakersData.talks },
  { labelKey: "panelLabel" as const, speakers: speakersData.panels },
];

const COPY = {
  es: {
    pill: "Ponentes",
    h2: "Las voces del evento.",
    sub: "Expertos de todo México se reúnen para nuestro 7º aniversario.",
    keynotesLabel: "Keynotes",
    talksLabel: "Charlas",
    panelLabel: "Panel",
  },
  en: {
    pill: "Speakers",
    h2: "The voices of the event.",
    sub: "Experts from across Mexico gather for our 7th anniversary.",
    keynotesLabel: "Keynotes",
    talksLabel: "Talks",
    panelLabel: "Panel",
  },
} as const;

function SpeakerCard({ speaker: s }: { speaker: Speaker }) {
  return (
    <div className="reveal tilt flex w-full flex-col rounded-3xl border border-navy/10 bg-cream p-7 text-center hover:shadow-2xl hover:shadow-navy/10 sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)]">
      <Image
        src={s.photo}
        alt={s.name}
        width={80}
        height={80}
        className="mx-auto h-20 w-20 rounded-full object-cover"
        style={s.imagePosition ? { objectPosition: s.imagePosition } : undefined}
      />
      <div className="mt-5 text-lg font-semibold tracking-tight">{s.name}</div>
      {(s.title || s.company) && (
        <div className="mt-1 text-sm">
          {s.title && <span className="text-navy/60">{s.title}</span>}
          {s.title && s.company && <span className="text-navy/40">, </span>}
          {s.company && <span className="text-sunset/90">{s.company}</span>}
        </div>
      )}

      {s.talkTitle && (
        <div className="mt-4 min-h-[2.5rem] text-left text-xs leading-snug text-navy/70">
          {s.talkTitle}
        </div>
      )}

      {s.topics && s.topics.length > 0 && (
        <div className="mt-auto pt-2 flex flex-wrap gap-1.5 self-start">
          {s.topics.map((topic, j) => (
            <span
              key={j}
              className="rounded-full border border-navy/20 bg-navy/5 px-2 py-0.5 text-[10px] font-medium text-navy/70"
            >
              {topic}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Ponentes() {
  const { lang } = useLang();
  const t = COPY[lang];

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

        {SECTIONS.map((section, i) => (
          <div key={section.labelKey} className={i === 0 ? "" : "mt-20"}>
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px flex-1 bg-navy/10" />
              <h3 className="text-3xl font-semibold leading-none tracking-tight text-navy">
                {t[section.labelKey]}
              </h3>
              <span className="h-px flex-1 bg-navy/10" />
            </div>
            <div className="flex flex-wrap justify-center gap-5">
              {section.speakers.map((s, j) => (
                <SpeakerCard key={`${section.labelKey}-${j}`} speaker={s} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
