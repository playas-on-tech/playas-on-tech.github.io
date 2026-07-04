"use client";
import { useLang } from "@/lib/LangProvider";

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

import Image from "next/image";

type Photo = { src: string; position?: string };

type ScheduleItem = {
  time: string;
  label: string;
  talk: string;
  photos: Photo[];
  type: "sunset" | "ocean" | "keynote" | "panel" | "comida" | "after";
};

const schedule: ScheduleItem[] = [
  { time: "9:30 - 10:00am", label: "Check in", talk: "", photos: [], type: "sunset" as const },
  { time: "10:00 - 10:15am", label: "Bienvenida", talk: "", photos: [], type: "sunset" as const },
  { time: "10:15 – 10:40am", label: "Dulce Gutiérrez", talk: "Mejor pedir perdón que pedir Permiso: Innovando en Comunidad", photos: [{ src: "/assets/speakers/dulce.png" }], type: "ocean" as const },
  { time: "10:40 – 11:05am", label: "Juan Manuel Fernández", talk: "Del aula al mundo real: cómo las comunidades tecnológicas conectan talento, universidad y empresa", photos: [{ src: "/assets/speakers/juan-manuel.jpeg" }], type: "ocean" as const },
  { time: "11:10 – 11:50am", label: "Edwin Cruz", talk: "El journey railero de Colima", photos: [{ src: "/assets/speakers/edwin-cruz.jpg", position: "left center" }], type: "keynote" as const },
  { time: "11:55 – 12:35pm", label: "Iñigo Rumayor", talk: "Creando el futuro de los pagos", photos: [{ src: "/assets/speakers/Inigo-Rumayor-1.jpg" }], type: "keynote" as const },
  { time: "12:40pm – 1:15pm", label: "Panel: Allfadir Camal & Iván Alva", talk: "Hacking Trust: Seguridad que todos deberíamos entender", photos: [{ src: "/assets/speakers/allfadir.jpg" }, { src: "/assets/speakers/ivanalva.jpg" }], type: "panel" as const },
  { time: "1:15 – 2:45pm", label: "Break para comida", talk: "", photos: [], type: "comida" as const },
  { time: "2:45 – 3:25pm", label: "Angel Monroy", talk: "Procesamiento ETL en Google Cloud a través de Dataflow y BigQuery (Python)", photos: [{ src: "/assets/speakers/angel.jpeg" }], type: "ocean" as const },
  { time: "3:30 – 4:10pm", label: "Juan Carlos Ruiz", talk: "De escribir código a construir criterio", photos: [{ src: "/assets/speakers/juan-carlos-ruiz.png" }], type: "keynote" as const },
  { time: "4:15 – 4:40pm", label: "Jonh Kleinad", talk: "De cero a experto: Vibe codeando con Kiro", photos: [{ src: "/assets/speakers/jonh-kleinad.jpeg" }], type: "ocean" as const },
  { time: "4:45 – 5:25pm", label: "Miguel Oseguera", talk: "Managed Agents with Claude: Code, Ship, and Learn Across Your Dev Workflow", photos: [{ src: "/assets/speakers/miguel-oseguera.jpeg" }], type: "keynote" as const },
  { time: "5:25 – 5:55pm", label: "Cierre del evento", talk: "", photos: [], type: "sunset" as const },
  { time: "6:30 – 11:30pm", label: "After", talk: "", photos: [], type: "after" as const },
];

const typeStyles = {
  sunset: "bg-sunset text-white",
  ocean: "bg-ocean text-white",
  keynote: "bg-keynote text-white",
  panel: "bg-panel text-white",
  comida: "bg-comida text-navy",
  after: "bg-navy text-white",
};

export default function Agenda() {
  const { lang } = useLang();
  const t = COPY[lang];

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
                            style={{ objectPosition: photo.position || "center" }}
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
