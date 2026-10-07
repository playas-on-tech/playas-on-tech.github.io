"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { ArrowRight, ArrowUpRight, ChevronDown } from "@/components/Icons";
import AnivCta from "@/components/AnivCta";
import Blobs from "@/components/ui/Blobs";
import Cta from "@/components/ui/Cta";
import WaveDivider from "@/components/ui/WaveDivider";

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="mesh-hero grain relative min-h-screen overflow-hidden">
      <Blobs id="hero-blobs" />

      <div
        id="hero-content"
        className="relative z-10 mx-auto flex min-h-screen max-w-[1100px] flex-col items-center justify-start px-6 pt-28 min-[360px]:pt-32 pb-36 text-center lg:pb-40 gap-8"
      >
        <div className="w-full flex justify-center">
          <Image
            src="/assets/logo-full.webp"
            alt="Playas on Tech"
            width={1024}
            height={600}
            className="mb-6 max-h-[15rem] object-contain"
          />
        </div>

        <h1 className="cine cine-1 max-w-[15ch] text-[clamp(2.2rem,7vw,6.2rem)] font-semibold leading-[0.98] tracking-tightest text-white">
          {t("hero.h1a")} <span className="text-ocean-300">{t("hero.h1b")}</span>
        </h1>

        <p className="cine cine-2 mt-7 max-w-[46ch] text-base sm:text-lg leading-relaxed text-white/80 md:text-xl">
          {t("hero.sub")}
        </p>

        <div className="cine cine-3 mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <AnivCta>
            <Cta href="/aniversario">{t("hero.ctaPrimary")}</Cta>
          </AnivCta>
          <Cta href="#eventos" tone="glass" arrow="right">
            {t("hero.ctaSecondary")}
          </Cta>
        </div>
      </div>

      {/* Spinning sticker badge */}
      <div className="cine cine-5 absolute right-[6%] bottom-[clamp(96px,13vw,190px)] z-10 hidden h-32 w-32 lg:block">
        <svg className="sticker h-full w-full" viewBox="0 0 200 200">
          <defs>
            <path id="badge" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
          </defs>
          <text fill="rgba(255,255,255,.85)" fontFamily="Manrope" fontSize="12.5" fontWeight="600" letterSpacing="2">
            <textPath href="#badge" startOffset="0" textLength="445">
              {t("hero.sticker")}{" "}
            </textPath>
          </text>
        </svg>
        <span className="absolute inset-0 grid place-items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/app-icon.webp" alt="PlayasOnTech" className="h-9 w-9 object-contain" />
        </span>
      </div>

      {/* Scroll cue */}
      <div className="cine cine-5 pointer-events-none absolute inset-x-0 bottom-16 sm:bottom-[clamp(128px,14vw,168px)] z-[6] flex flex-col items-center gap-2 text-white/55">
        <span className="text-[11px] font-medium uppercase tracking-[0.3em]">{t("hero.scrollCue")}</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>

      <WaveDivider />
    </section>
  );
}
