"use client";

import { useLang } from "@/lib/lang";
import Blobs from "@/components/ui/Blobs";
import Cta from "@/components/ui/Cta";

export default function Donaciones() {
  const { t } = useLang();

  return (
    <section id="donaciones" className="px-6 py-10">
      <div className="mesh-cta grain relative mx-auto max-w-[1200px] overflow-hidden rounded-[2.5rem] px-8 py-20 text-center lg:py-28">
        <Blobs dim className="blobs" />

        <div className="reveal relative z-10 mx-auto max-w-[680px]">
          <h2 className="text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1.06] tracking-tightest text-white">
            {t("donaciones.h2")}
          </h2>
          <p className="mx-auto mt-5 max-w-[46ch] text-lg leading-relaxed text-white/80">{t("donaciones.body")}</p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Cta href="https://patreon.com/PlayasOnTech" tone="white" dot="bg-sunset text-white">
              {t("donaciones.patreon")}
            </Cta>
            <Cta href="https://www.paypal.com/paypalme/kevindperezm" tone="glass" arrow="none" size="wide">
              {t("donaciones.paypal")}
            </Cta>
          </div>
        </div>
      </div>
    </section>
  );
}
