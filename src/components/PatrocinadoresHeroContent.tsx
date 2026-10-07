"use client";

import { useLang } from "@/lib/lang";
import { EVENT } from "@/lib/event";
import Cta from "@/components/ui/Cta";
import Blobs from "@/components/ui/Blobs";
import SmartLink from "@/components/ui/SmartLink";
import WaveDivider from "@/components/ui/WaveDivider";

export default function PatrocinadoresHeroContent() {
  const { t } = useLang();

  return (
    <section className="mesh-hero grain relative overflow-hidden">
      <Blobs />

      <div className="relative z-10 mx-auto max-w-[900px] px-6 pb-32 pt-36 text-center">
        <SmartLink
          href="/aniversario"
          className="cine cine-1 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
        >
          {t("patrocinadoresPage.back")}
        </SmartLink>

        <h1 className="cine cine-2 mt-6 text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[1] tracking-tightest text-white">
          {t("patrocinadoresPage.h1")}
        </h1>

        <p className="cine cine-3 mx-auto mt-6 max-w-[54ch] text-lg leading-relaxed text-white/80 md:text-xl">
          {t("aniversario.event.dateLabel")} · {EVENT.venue}, {t("aniversario.event.venueCity")}.
        </p>

        <div className="cine cine-4 mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Cta href="#paquetes" arrow="right">{t("patrocinadoresPage.cta")}</Cta>
          <Cta href="/aniversario#registro" tone="glass">
            {t("patrocinadoresPage.reserve")}
          </Cta>
        </div>
      </div>

      {/* Wavy divider into the cream sponsors section */}
      <WaveDivider fill="#FCF9F3" />
    </section>
  );
}
