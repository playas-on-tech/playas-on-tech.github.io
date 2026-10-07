"use client";

import { useLang } from "@/lib/lang";
import { EVENT, mapsEmbed, mapsShare } from "@/lib/event";
import { MapPin } from "@/components/Icons";
import CheckList from "@/components/ui/CheckList";
import Cta from "@/components/ui/Cta";
import Pill from "@/components/ui/Pill";

export default function Ubicacion() {
  const { t } = useLang();
  const amenities = t("aniversario.ubicacion.amenities", { returnObjects: true }) as string[];

  return (
    <section id="ubicacion" className="bg-cream px-6 py-28 lg:py-36">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2">
        <div className="reveal">
          <Pill>{t("aniversario.ubicacion.pill")}</Pill>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
            {EVENT.venue}.
          </h2>
          <p className="mt-3 flex items-start gap-2 text-lg text-navy/60">
            <MapPin size={18} className="mt-1 shrink-0 text-ocean" />
            {EVENT.venueAddress}
          </p>
          <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-navy/60">{t("aniversario.ubicacion.body")}</p>
          <CheckList items={amenities} />
          <Cta href={mapsShare(EVENT.mapQuery)} tone="navy" size="sm" shadow="" className="mt-9">
            {t("aniversario.ubicacion.cta")}
          </Cta>
        </div>

        <div className="reveal relative overflow-hidden rounded-[2rem] border border-navy/10 shadow-xl shadow-navy/5">
          <iframe
            title={`${t("aniversario.ubicacion.mapTitlePrefix")} — ${EVENT.venue}, ${t("aniversario.event.venueCity")}`}
            src={mapsEmbed(EVENT.mapQuery)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[360px] w-full lg:h-[440px]"
          />
        </div>
      </div>
    </section>
  );
}
