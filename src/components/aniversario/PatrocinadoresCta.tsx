"use client";
import { useTranslation } from "react-i18next";

import Link from "next/link";
import { ArrowRight } from "../Icons";

export default function PatrocinadoresCta() {
  const { t } = useTranslation();
  return (
    <section id="patrocinadores" className="bg-cream-100 px-6 py-24 lg:py-28">
      <div className="reveal mx-auto max-w-[1100px] overflow-hidden rounded-[2rem] border border-navy/10 bg-navy px-8 py-12 text-center text-white lg:px-12 lg:py-16">
        <span className="inline-block rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-semibold text-ocean-300">
          {t("aniversario.patrocinadoresCta.pill")}
        </span>
        <h2 className="mx-auto mt-5 max-w-[20ch] text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold leading-[1.08] tracking-tightest">
          {t("aniversario.patrocinadoresCta.h2")}
        </h2>
        <p className="mx-auto mt-4 max-w-[52ch] text-lg leading-relaxed text-white/70">{t("aniversario.patrocinadoresCta.sub")}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {(t("aniversario.patrocinadoresCta.tiers", { returnObjects: true }) as string[]).map((tier) => (
            <span
              key={tier}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/80"
            >
              {tier}
            </span>
          ))}
        </div>
        <Link
          href={t("aniversario.patrocinadoresCta.href")}
          className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-sunset py-2 pl-6 pr-2 text-[16px] font-semibold text-white transition hover:bg-sunset-400 active:scale-[0.98]"
        >
          {t("aniversario.patrocinadoresCta.cta")}
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy transition group-hover:translate-x-0.5 shrink-0">
            <ArrowRight size={16} />
          </span>
        </Link>
      </div>
    </section>
  );
}
