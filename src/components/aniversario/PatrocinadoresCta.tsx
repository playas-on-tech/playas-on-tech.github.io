"use client";
import { useLang } from "@/lib/LangProvider";

import Link from "next/link";
import { ArrowRight } from "../Icons";

const COPY = {
  es: {
    pill: "Patrocinadores",
    h2: "Lleva tu marca al 7º aniversario.",
    sub: "Paquetes desde $5,000 MXN — ayúdanos a hacer de esta edición de aniversario una noche memorable.",
    tiers: ["Silver · $5,000", "Gold · $10,000", "Platinum · $20,000", "Media partners"],
    cta: "Ver paquetes de patrocinio",
    href: "/aniversario/patrocinadores",
  },
  en: {
    pill: "Sponsors",
    h2: "Bring your brand to the 7th anniversary.",
    sub: "Packages from $5,000 MXN — help us make this anniversary edition a memorable night.",
    tiers: ["Silver · $5,000", "Gold · $10,000", "Platinum · $20,000", "Media partners"],
    cta: "See sponsorship packages",
    href: "/aniversario/patrocinadores",
  },
} as const;

export default function PatrocinadoresCta() {
  const { lang } = useLang();
  const t = COPY[lang];
  return (
    <section id="patrocinadores" className="bg-cream-100 px-6 py-24 lg:py-28">
      <div className="reveal mx-auto max-w-[1100px] overflow-hidden rounded-[2rem] border border-navy/10 bg-navy px-8 py-12 text-center text-white lg:px-12 lg:py-16">
        <span className="inline-block rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-semibold text-ocean-300">
          {t.pill}
        </span>
        <h2 className="mx-auto mt-5 max-w-[20ch] text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold leading-[1.08] tracking-tightest">
          {t.h2}
        </h2>
        <p className="mx-auto mt-4 max-w-[52ch] text-lg leading-relaxed text-white/70">{t.sub}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {t.tiers.map((tier) => (
            <span
              key={tier}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/80"
            >
              {tier}
            </span>
          ))}
        </div>
        <Link
          href={t.href}
          className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-sunset py-2 pl-6 pr-2 text-[16px] font-semibold text-white transition hover:bg-sunset-400 active:scale-[0.98]"
        >
          {t.cta}
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy transition group-hover:translate-x-0.5 shrink-0">
            <ArrowRight size={16} />
          </span>
        </Link>
      </div>
    </section>
  );
}
