"use client";
import { useLang } from "@/lib/LangProvider";
import Image from "next/image";
import agendaData from "@/data/agenda.json";

const COPY = {
  es: {
    pill: "Programa",
    h2: "Agenda del evento",
    sub: "Una tarde-noche para aprender, conectar y celebrar nuestro 7º Aniversario.",
  },
  en: {
    pill: "Program",
    h2: "Event agenda",
    sub: "An afternoon-evening to learn, connect and celebrate our 7th Anniversary.",
  },
} as const;

type Photo = { src: string; position?: string };

type ScheduleItem = {
  time: string;
  label: string;
  talk: string;
  photos: Photo[];
  type: "sunset" | "ocean" | "keynote" | "panel" | "comida" | "after";
};

// ponytail: static content extracted to src/data/agenda.json for easier maintenance
// schedule data is now imported from JSON instead of hardcoded in TS

// ponytail: static content extracted to src/data/agenda.json for easier maintenance
const typeStyles = {
  sunset: "bg-sunset text-white",
  ocean: "bg-ocean text-white",
  keynote: "bg-keynote text-white",
  panel: "bg-panel text-white",
  comida: "bg-comida text-navy",
  after: "bg-navy text-white",
} as Record<string, string>;

// ponytail: static content extracted to src/data/agenda.json for easier maintenance
// schedule data is now imported from JSON instead of hardcoded in TS

export default function Agenda() {
  // ponytail: static content extracted to src/data/agenda.json for easier maintenance
  const { lang } = useLang();
  const t = COPY[lang];
  const schedule = agendaData;

  return (
    <section id="programa" className="bg-cream px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[820px]">
        <div className="reveal mb-14 text-center">
          <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
            {t.pill}
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
            {t.h2}
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-lg leading-relaxed text-navy/60">{t.sub}</p>
        </div>

        <div className="reveal relative ml-4 sm:ml-0">
          <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-navy/10 sm:left-3" />
          {schedule.map((item, i) => (
            <div key={i} className="relative pl-8 sm:pl-14 pb-8 last:pb-0">
              <div className="absolute left-[-3px] top-3.5 h-2.5 w-2.5 rounded-full bg-navy/20 ring-4 ring-cream sm:left-[9px]" />
              <div className={`rounded-xl px-5 py-4 shadow-sm font-medium ${typeStyles[item.type]} ${["after", "comida"].includes(item.type) ? "min-h-[8rem] pt-8" : ""}`}>
                <div className="flex items-center gap-4">
                  {item.photos.length > 0 && (
                    <div className="flex -space-x-3">
                      {item.photos.map((photo, idx) => (
                        <div
                          key={idx}
                          className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-white/40"
                        >
                          <Image
                            src={photo.src}
                            alt={item.label}
                            fill
                            className="object-cover"
                            style={{ objectPosition: (photo as Photo).position || "center" }}
                            sizes="56px"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-lg">{item.label}</span>
                      <span className="text-sm opacity-90 whitespace-nowrap">{item.time}</span>
                    </div>
                    {item.talk && <p className="mt-1 text-sm opacity-80 leading-tight">{item.talk}</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
