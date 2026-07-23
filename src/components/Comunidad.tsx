"use client";
import { useTranslation } from "react-i18next";

const ICONS = {
  aprender:
    "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  conectar:
    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  compartir: "M3 11l19-9-9 19-2-8-8-2z",
} as const;

const GRADIENTS = {
  aprender: "from-sunset-300 to-sunset",
  conectar: "from-ocean-400 to-ocean",
  compartir: "from-sunset to-ocean",
} as const;

type Card = {
  key: keyof typeof ICONS;
  title: string;
  text: string;
};

export default function Comunidad() {
  const { t } = useTranslation();
  return (
    <section id="comunidad" className="bg-cream px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        <div className="reveal mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
              {t("comunidad.pill")}
            </span>
            <h2 className="mt-5 max-w-[18ch] text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
              {t("comunidad.h2")}
            </h2>
          </div>
          <p className="max-w-[38ch] text-lg leading-relaxed text-navy/60">{t("comunidad.sub")}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {(t("comunidad.cards", { returnObjects: true }) as Card[]).map((card) => (
            <div
              key={card.key}
              className="reveal tilt group rounded-3xl border border-navy/10 bg-cream-100 p-8 hover:shadow-2xl hover:shadow-navy/10"
            >
              <span
                className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${GRADIENTS[card.key]} text-white`}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={ICONS[card.key]} />
                </svg>
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
