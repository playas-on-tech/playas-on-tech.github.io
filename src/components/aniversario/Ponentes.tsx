"use client";

import Image from "next/image";
import { useLang } from "@/lib/lang";
import speakersData from "@/data/speakers.json";
import SectionHeader from "@/components/ui/SectionHeader";

type Speaker = (typeof speakersData.keynotes)[number];

const SECTIONS = [
  { labelKey: "keynotesLabel", speakers: speakersData.keynotes },
  { labelKey: "talksLabel", speakers: speakersData.talks },
  { labelKey: "panelLabel", speakers: speakersData.panels },
];

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div className="reveal tilt flex w-full flex-col rounded-3xl border border-navy/10 bg-cream p-7 text-center hover:shadow-2xl hover:shadow-navy/10 sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)]">
      <Image
        src={speaker.photo}
        alt={speaker.name}
        width={80}
        height={80}
        className="mx-auto h-20 w-20 rounded-full object-cover"
        style={speaker.imagePosition ? { objectPosition: speaker.imagePosition } : undefined}
      />
      <div className="mt-5 text-lg font-semibold tracking-tight">{speaker.name}</div>

      {(speaker.title || speaker.company) && (
        <div className="mt-1 text-sm">
          {speaker.title && <span className="text-navy/60">{speaker.title}</span>}
          {speaker.title && speaker.company && <span className="text-navy/40">, </span>}
          {speaker.company && <span className="text-sunset/90">{speaker.company}</span>}
        </div>
      )}

      {speaker.talkTitle && (
        <div className="mt-4 min-h-[2.5rem] text-left text-xs leading-snug text-navy/70">{speaker.talkTitle}</div>
      )}

      {speaker.topics && speaker.topics.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-1.5 self-start pt-2">
          {speaker.topics.map((topic, j) => (
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
  const { t } = useLang();

  return (
    <section id="ponentes" className="bg-cream-100 px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader
          pill={t("aniversario.ponentes.pill")}
          title={t("aniversario.ponentes.h2")}
          sub={t("aniversario.ponentes.sub")}
          titleClass="max-w-[18ch]"
          subClass="max-w-[38ch]"
          className="reveal mb-14"
        />

        {SECTIONS.map((section, i) => (
          <div key={section.labelKey} className={i === 0 ? "" : "mt-20"}>
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px flex-1 bg-navy/10" />
              <h3 className="text-3xl font-semibold leading-none tracking-tight text-navy">
                {t(`aniversario.ponentes.${section.labelKey}`)}
              </h3>
              <span className="h-px flex-1 bg-navy/10" />
            </div>
            <div className="flex flex-wrap justify-center gap-5">
              {section.speakers.map((speaker) => (
                <SpeakerCard key={`${section.labelKey}-${speaker.name}`} speaker={speaker} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
