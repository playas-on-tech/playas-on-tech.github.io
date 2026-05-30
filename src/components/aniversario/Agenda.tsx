"use client";
import { useLang } from "@/lib/LangProvider";


const COPY = {
  es: {
    pill: "Programa",
    h2: "Agenda del evento",
    sub: "Una tarde-noche para aprender, conectar y celebrar nuestro 7º Aniversario.",
    soonH3: "Próximamente",
    soonBody:
      "Estamos afinando los últimos detalles del programa. Muy pronto revelaremos la agenda completa con todas las charlas, ponentes y sorpresas preparadas para esta gran celebración.",
  },
  en: {
    pill: "Program",
    h2: "Event agenda",
    sub: "An afternoon-evening to learn, connect and celebrate our 7th Anniversary.",
    soonH3: "Coming soon",
    soonBody:
      "We're putting the final touches on the program. We'll soon reveal the full agenda with all the talks, speakers and surprises prepared for this big celebration.",
  },
} as const;

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

        <div className="reveal rounded-3xl border border-navy/10 bg-cream-100 p-8 text-center sm:p-12 shadow-sm">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean/10 text-ocean text-xl mb-6">
            ⏳
          </span>
          <h3 className="text-2xl font-semibold tracking-tight text-navy">{t.soonH3}</h3>
          <p className="mx-auto mt-4 max-w-[44ch] leading-relaxed text-navy/60">{t.soonBody}</p>
        </div>
      </div>
    </section>
  );
}
