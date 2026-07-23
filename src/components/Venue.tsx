"use client";
import { Check } from "./SocialIcons";
import { useTranslation } from "react-i18next";

export default function Venue() {
  const { t } = useTranslation();
  return (
    <section id="venue" className="bg-cream-100 px-6 py-28 lg:py-36">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2">
        <div className="reveal relative overflow-hidden rounded-[2rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/venue.webp"
            alt={t("venue.alt")}
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
          />
        </div>
        <div className="reveal">
          <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
            {t("venue.pill")}
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
            {t("venue.h2")}
          </h2>
          <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-navy/60">{t("venue.body")}</p>
          <ul className="mt-8 space-y-3 text-navy/70">
            {(t("venue.features", { returnObjects: true }) as string[]).map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-ocean/15 text-ocean">
                  <Check size={14} />
                </span>{" "}
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
