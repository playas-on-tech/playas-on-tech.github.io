"use client";
import { useLang } from "@/lib/LangProvider";

import { TICKET } from "./event";

const COPY = {
  es: {
    pill: "Costo del evento",
    title: "Costo del evento",
    body: "Tu boleto incluye la playera oficial del 7º Aniversario + acceso completo al evento. Lo recaudado cubre la operación de la comunidad — sin fines de lucro.",
    fineprint: "Los boletos cortesía del patrocinador NO se cobran y SÍ incluyen playera.",
  },
  en: {
    pill: "Event Cost",
    title: "Event Cost",
    body: "Your ticket includes the official 7th Anniversary t-shirt + full access to the event. Proceeds cover the community's operations — non-profit.",
    fineprint: "Sponsor complimentary tickets are FREE of charge and DO include a t-shirt.",
  },
};

export default function TicketInfo() {
  const { lang } = useLang();
  const t = COPY[lang];
  return (
    <section className="px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-[900px]">
        <div className="reveal rounded-3xl border border-navy/10 bg-cream p-8 lg:p-10">
          <span className="inline-block rounded-full bg-navy px-3 py-1 text-[12px] font-semibold text-white">
            {t.pill}
          </span>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-navy">
            {t.title} — ${TICKET.priceMXN.toLocaleString(lang === "en" ? "en-US" : "es-MX")} MXN (≈ US$
            {TICKET.priceUSD})
          </h3>
          <p className="mt-3 leading-relaxed text-navy/70">{t.body}</p>
          <p className="mt-4 text-sm text-navy/50">{t.fineprint}</p>
        </div>
      </div>
    </section>
  );
}
