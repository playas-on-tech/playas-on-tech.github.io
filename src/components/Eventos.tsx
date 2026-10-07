"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang";
import { ArrowRight, ArrowUpRight, MapPin } from "@/components/Icons";
import AnivCta from "@/components/AnivCta";
import Cta from "@/components/ui/Cta";
import Lightbox from "@/components/ui/Lightbox";
import Pill from "@/components/ui/Pill";
import SmartLink from "@/components/ui/SmartLink";

type Detail = { label: string; value: string; url?: string };

const FLYER = "/assets/meetup-sep2026-speakers.jpg";

// Maps-share link shared by the desktop chips and the mobile pill below the flyer.
function MapLink({ detail }: { detail: Detail }) {
  return (
    <SmartLink
      href={detail.url ?? ""}
      className="inline-flex items-center gap-1.5 font-semibold text-white underline decoration-white/40 decoration-2 underline-offset-4 transition hover:decoration-ocean-400"
    >
      <MapPin /> {detail.value} <ArrowUpRight size={16} />
    </SmartLink>
  );
}

export default function Eventos() {
  const { t } = useLang();
  const [zoom, setZoom] = useState(false);
  const details = t("eventos.details", { returnObjects: true }) as Detail[];

  return (
    <section id="eventos" className="bg-cream px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        <Pill>{t("eventos.pill")}</Pill>
        <h2 className="mt-5 max-w-[20ch] text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
          {t("eventos.h2")}
        </h2>

        {/* Next event card */}
        <div className="reveal mt-12 overflow-hidden rounded-[2rem] border border-navy/10 bg-navy text-white">
          <div className="grid md:grid-cols-[1.1fr_0.9fr]">
            <div className="p-9 lg:p-12">
              <span className="inline-flex items-center gap-2 rounded-full bg-ocean/20 px-3 py-1 text-[13px] font-semibold text-ocean-300">
                <span className="h-1.5 w-1.5 rounded-full bg-ocean-400" /> {t("eventos.soonTag")}
              </span>
              <h3 className="mt-6 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-tight tracking-tight">
                {t("eventos.cardTitle")}
              </h3>
              <p className="mt-4 hidden max-w-[42ch] leading-relaxed text-white/70 md:block">{t("eventos.cardBody")}</p>
              <div className="mt-8 hidden flex-wrap gap-6 text-sm md:flex">
                {details.map((detail) => (
                  <div key={detail.label}>
                    <div className="text-white/50">{detail.label}</div>
                    <div className="mt-1">{detail.url ? <MapLink detail={detail} /> : detail.value}</div>
                  </div>
                ))}
              </div>
              <AnivCta>
                <Cta href={t("eventos.ctaHref")} size="sm" shadow="" dot="bg-white text-navy" className="mt-9">
                  {t("eventos.cta")}
                </Cta>
              </AnivCta>
            </div>

            <button
              type="button"
              onClick={() => setZoom(true)}
              aria-label={t("eventos.viewFlyer")}
              className="block cursor-zoom-in overflow-hidden md:border-l md:border-white/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={FLYER} alt="" className="block h-auto w-full transition duration-300 hover:brightness-110" />
            </button>

            <div className="flex justify-center px-6 pb-6 pt-4 md:hidden">
              {details.filter((d) => d.url).map((detail) => (
                <MapLink key={detail.label} detail={detail} />
              ))}
            </div>
          </div>
        </div>

        <div className="reveal mt-10 flex justify-center">
          <Cta href={t("eventos.videosCtaHref")} tone="outline" arrow="right" size="sm">
            {t("eventos.videosCta")}
          </Cta>
        </div>
      </div>

      {zoom && (
        <Lightbox
          src={FLYER}
          alt={t("eventos.cardTitle")}
          labels={{ close: t("eventos.close") }}
          onClose={() => setZoom(false)}
        />
      )}
    </section>
  );
}
