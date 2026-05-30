"use client";
import { useLang } from "@/lib/LangProvider";

import { ArrowUpRight, Check, MapPin } from "../Icons";
import { anivEvent } from "./event";

const COPY = {
  es: {
    pill: "Ubicación",
    body: "Celebramos el 7º aniversario en la zona hotelera de Manzanillo, justo frente al mar. Los detalles de acceso al salón se confirman al reservar tu lugar.",
    amenities: [
      "Salón frente al mar",
      "Terraza para el brindis frente al mar",
      "Estacionamiento en el hotel",
    ],
    cta: "Cómo llegar",
    mapTitlePrefix: "Mapa",
  },
  en: {
    pill: "Location",
    body: "We celebrate the 7th anniversary in Manzanillo's hotel zone, right by the sea. Room access details are confirmed when you reserve your seat.",
    amenities: [
      "Beachfront ballroom",
      "Terrace for the toast by the sea",
      "Parking at the hotel",
    ],
    cta: "Get directions",
    mapTitlePrefix: "Map",
  },
} as const;

export default function Ubicacion() {
  const { lang } = useLang();
  const t = COPY[lang];
  const ev = anivEvent(lang);
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(ev.mapQuery)}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ev.mapQuery)}`;
  return (
    <section id="ubicacion" className="bg-cream px-6 py-28 lg:py-36">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2">
        <div className="reveal">
          <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
            {t.pill}
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
            {ev.venue}.
          </h2>
          <p className="mt-3 flex items-start gap-2 text-lg text-navy/60">
            <MapPin size={18} className="mt-1 shrink-0 text-ocean" />
            {ev.venueAddress}
          </p>
          <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-navy/60">{t.body}</p>
          <ul className="mt-8 space-y-3 text-navy/70">
            {t.amenities.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-ocean/15 text-ocean">
                  <Check size={14} />
                </span>{" "}
                {item}
              </li>
            ))}
          </ul>
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-navy py-2 pl-6 pr-2 text-[15px] font-semibold text-white transition hover:bg-navy-700"
          >
            {t.cta}
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ocean text-white transition group-hover:rotate-45">
              <ArrowUpRight size={15} />
            </span>
          </a>
        </div>

        <div className="reveal relative overflow-hidden rounded-[2rem] border border-navy/10 shadow-xl shadow-navy/5">
          <iframe
            title={`${t.mapTitlePrefix} — ${ev.venue}, ${ev.venueCity}`}
            src={mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[360px] w-full lg:h-[440px]"
          />
        </div>
      </div>
    </section>
  );
}
