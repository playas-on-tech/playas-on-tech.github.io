"use client";

import { useLang } from "@/lib/lang";
import { EVENT } from "@/lib/event";
import Blobs from "@/components/ui/Blobs";
import Cta from "@/components/ui/Cta";

export default function Registro() {
  const { t } = useLang();

  return (
    <section id="registro" className="px-6 py-10">
      <div className="mesh-cta grain relative mx-auto max-w-[1100px] overflow-hidden rounded-[2.5rem] px-6 py-20 text-center lg:py-24">
        <Blobs dim className="blobs" />

        <div className="relative z-10 mx-auto max-w-[560px]">
          <span className="glass inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-ocean-300">
            {t("aniversario.registro.pill")}
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.06] tracking-tightest text-white">
            {t("aniversario.registro.h2")}
          </h2>
          <p className="mx-auto mt-4 max-w-[42ch] text-lg leading-relaxed text-white/80">
            {t("aniversario.event.dateLabel")} · {t("aniversario.event.timeLabel")} · {EVENT.venue}.{" "}
            {t("aniversario.registro.accessLine")}
          </p>

          <div className="mt-9 flex justify-center">
            <Cta href={EVENT.eventbriteUrl}>{t("aniversario.registro.cta")}</Cta>
          </div>

          <p className="mt-4 text-center text-xs text-white/45">{t("aniversario.registro.fineprint")}</p>
        </div>
      </div>
    </section>
  );
}
