"use client";

import { useLang } from "@/lib/lang";
import { PathIcon } from "@/components/Icons";
import SectionHeader from "@/components/ui/SectionHeader";

const ICONS = {
  aprender: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  conectar:
    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  compartir: "M3 11l19-9-9 19-2-8-8-2z",
} as const;

const GRADIENTS = {
  aprender: "from-sunset-300 to-sunset",
  conectar: "from-ocean-400 to-ocean",
  compartir: "from-sunset to-ocean",
} as const;

type Card = { key: keyof typeof ICONS; title: string; text: string };

export default function Comunidad() {
  const { t } = useLang();
  const cards = t("comunidad.cards", { returnObjects: true }) as Card[];

  return (
    <section id="comunidad" className="bg-cream px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader
          pill={t("comunidad.pill")}
          title={t("comunidad.h2")}
          sub={t("comunidad.sub")}
          titleClass="max-w-[18ch]"
          subClass="max-w-[38ch]"
          className="reveal mb-14"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.key}
              className="reveal tilt group rounded-3xl border border-navy/10 bg-cream-100 p-8 hover:shadow-2xl hover:shadow-navy/10"
            >
              <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${GRADIENTS[card.key]} text-white`}>
                <PathIcon path={ICONS[card.key]} />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{card.title}</h3>
              <p className="mt-3 leading-relaxed text-navy/60">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
