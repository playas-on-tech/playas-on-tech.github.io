"use client";

import { useLang } from "@/lib/lang";
import { EVENT } from "@/lib/event";
import { Calendar, Clock, MapPin } from "@/components/Icons";
import Blobs from "@/components/ui/Blobs";
import Cta from "@/components/ui/Cta";
import WaveDivider from "@/components/ui/WaveDivider";
import Countdown from "./Countdown";

export default function AnivHero() {
  const { t } = useLang();
  const facts = [
    { Icon: Calendar, text: t("aniversario.event.dateLabel") },
    { Icon: Clock, text: t("aniversario.event.timeLabel") },
    { Icon: MapPin, text: `${EVENT.venue}, ${t("aniversario.event.venueCity")}` },
  ];

  return (
    <section id="top" className="mesh-hero grain relative overflow-hidden">
      <Blobs />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1100px] flex-col items-center justify-center px-6 pb-40 pt-28 min-[360px]:pt-32 text-center">
        <h1 className="cine cine-1 max-w-[16ch] text-[clamp(2.2rem,7vw,6rem)] font-semibold leading-[0.98] tracking-tightest text-white">
          {t("aniversario.hero.h1a")} <span className="text-ocean-300">{t("aniversario.hero.h1b")}</span>
        </h1>

        <p className="cine cine-2 mt-7 max-w-[48ch] text-base sm:text-lg leading-relaxed text-white/80 md:text-xl">
          {t("aniversario.hero.sub")}
        </p>

        <div className="cine cine-2 mt-8 flex flex-wrap items-center justify-center gap-3">
          {facts.map(({ Icon, text }) => (
            <span
              key={text}
              className="glass inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/85"
            >
              <Icon size={16} className="text-ocean-300" />
              {text}
            </span>
          ))}
        </div>

        <div className="cine cine-3 mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Cta href="#registro">{t("aniversario.hero.ctaReserve")}</Cta>
          <Cta href="#programa" tone="glass" arrow="right" dot="bg-ocean text-white">
            {t("aniversario.hero.ctaProgram")}
          </Cta>
        </div>

        <div className="cine cine-4 mt-14 w-full">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-white/55">
            {t("aniversario.hero.countdownLabel")}
          </p>
          <Countdown />
        </div>
      </div>

      <WaveDivider />
    </section>
  );
}
