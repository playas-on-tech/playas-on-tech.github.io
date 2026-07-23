"use client";
import { Check } from "./SocialIcons";
import { useLang } from "@/lib/LangProvider";

const COPY = {
  es: {
    pill: "Venue",
    h2: "Donde sucede la magia.",
    body: "Un espacio cómodo en Manzanillo, con buen internet y mejor ambiente, a unos pasos del mar. Cada edición se realiza en un venue local; el lugar exacto se anuncia con cada meetup. WiFi rápido, café y estacionamiento incluidos.",
    alt: "Espacio donde se realizan los meetups de PlayasOnTech en Manzanillo, Colima — frente al mar",
    features: [
      "WiFi rápido y enchufes de sobra",
      "Estacionamiento cercano",
      "Café, snacks y buena vibra",
    ],
  },
  en: {
    pill: "Venue",
    h2: "Where the magic happens.",
    body: "A comfortable space in Manzanillo with fast internet and even better vibes, steps from the sea. Each edition is held at a local venue; the exact location is announced with each meetup. Fast WiFi, coffee, and parking included.",
    alt: "Space where PlayasOnTech meetups are held in Manzanillo, Colima — by the sea",
    features: [
      "Fast WiFi and plenty of outlets",
      "Parking nearby",
      "Coffee, snacks and good vibes",
    ],
  },
} as const;

export default function Venue() {
  const { lang } = useLang();
  const t = COPY[lang];
  return (
    <section id="venue" className="bg-cream-100 px-6 py-28 lg:py-36">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2">
        <div className="reveal relative overflow-hidden rounded-[2rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/venue.webp"
            alt={t.alt}
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
          />
        </div>
        <div className="reveal">
          <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
            {t.pill}
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
            {t.h2}
          </h2>
          <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-navy/60">{t.body}</p>
          <ul className="mt-8 space-y-3 text-navy/70">
            {t.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-ocean/15 text-ocean">
                  <Check size={14} />
                </span>{" "}
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
