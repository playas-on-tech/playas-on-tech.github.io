"use client";
import Link from "next/link";
import { ArrowUpRight } from "./SocialIcons";
import { useTranslation } from "react-i18next";

type Detail = { label: string; value: string };

export default function Eventos() {
  const { t } = useTranslation();
  return (
    <section id="eventos" className="bg-cream px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
          {t("eventos.pill")}
        </span>
        <h2 className="mt-5 max-w-[20ch] text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
          {t("eventos.h2")}
        </h2>

        {/* Next event card → the 7th anniversary */}
        <div className="reveal mt-12 overflow-hidden rounded-[2rem] border border-navy/10 bg-navy text-white">
          <div className="grid md:grid-cols-[1.1fr_0.9fr]">
            <div className="p-9 lg:p-12">
              <span className="inline-flex items-center gap-2 rounded-full bg-ocean/20 px-3 py-1 text-[13px] font-semibold text-ocean-300">
                <span className="h-1.5 w-1.5 rounded-full bg-ocean-400" /> {t("eventos.soonTag")}
              </span>
              <h3 className="mt-6 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-tight tracking-tight">
                {t("eventos.cardTitle")}
              </h3>
              <p className="mt-4 max-w-[42ch] leading-relaxed text-white/70">{t("eventos.cardBody")}</p>
              <div className="mt-8 flex flex-wrap gap-6 text-sm">
                {(t("eventos.details", { returnObjects: true }) as Detail[]).map((detail) => (
                  <div key={detail.label}>
                    <div className="text-white/50">{detail.label}</div>
                    <div className="mt-1 font-semibold">{detail.value}</div>
                  </div>
                ))}
              </div>
              <Link
                href={t("eventos.ctaHref")}
                className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-sunset py-2 pl-6 pr-2 text-[15px] font-semibold text-white transition hover:bg-sunset-400 active:scale-[0.98]"
              >
                {t("eventos.cta")}
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-navy transition group-hover:rotate-45 shrink-0">
                  <ArrowUpRight size={15} />
                </span>
              </Link>
            </div>
            <div className="mesh-cta grain relative min-h-[260px] overflow-hidden">
              <div className="blobs">
                <span className="blob blob-teal" style={{ opacity: 0.6 }} />
                <span className="blob blob-ocean" />
                <span className="blob blob-sunset" style={{ opacity: 0.25 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
