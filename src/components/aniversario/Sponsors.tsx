"use client";

import Image from "next/image";
import { useLang } from "@/lib/lang";
import rawTiers from "@/data/sponsors.json";
import Pill from "@/components/ui/Pill";
import SectionHeader from "@/components/ui/SectionHeader";
import SmartLink from "@/components/ui/SmartLink";

type Sponsor = { name: string; logo: string; href?: string };
type TierKey = "diamond" | "platinum" | "gold" | "silver" | "bronze";

const TIER_STYLES: Record<TierKey, { grid: string; logo: string; heading: string; accent: string }> = {
  diamond: { grid: "grid-cols-1 mx-auto", logo: "max-h-28 sm:max-h-36", heading: "text-2xl sm:text-3xl", accent: "bg-ocean" },
  platinum: { grid: "grid-cols-2 sm:grid-cols-3 max-w-3xl mx-auto", logo: "max-h-24", heading: "text-lg sm:text-xl", accent: "bg-navy/30" },
  gold: { grid: "grid-cols-1 max-w-md mx-auto", logo: "max-h-[12rem]", heading: "text-xl sm:text-2xl", accent: "bg-sunset" },
  silver: { grid: "grid-cols-2 sm:grid-cols-3 max-w-3xl mx-auto", logo: "max-h-24", heading: "text-lg sm:text-xl", accent: "bg-navy/30" },
  bronze: { grid: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-w-4xl mx-auto", logo: "max-h-24", heading: "text-lg sm:text-xl", accent: "bg-[#CD7F32]" },
};

export default function Sponsors() {
  const { t } = useLang();
  const tiers = rawTiers as { key: TierKey; sponsors: Sponsor[] }[];

  return (
    <section id="patrocinadores" className="bg-white px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeader
          pill={t("aniversario.sponsors.pill")}
          title={t("aniversario.sponsors.h2")}
          sub={t("aniversario.sponsors.sub")}
          layout="stack"
          align="center"
          subClass="mt-4 max-w-[52ch]"
          className="reveal mb-14 max-w-[640px]"
        />

        <div className="space-y-16">
          {tiers
            .filter((tier) => tier.sponsors.length > 0)
            .map((tier) => {
              const style = TIER_STYLES[tier.key];
              return (
                <div key={tier.key} className="reveal">
                  <div className="mb-6 flex items-center justify-center gap-3">
                    <span className={`h-1 w-8 rounded-full ${style.accent}`} />
                    <h3 className={`${style.heading} font-semibold tracking-tight text-navy`}>
                      {t(`aniversario.sponsors.${tier.key}`)}
                    </h3>
                    <span className={`h-1 w-8 rounded-full ${style.accent}`} />
                  </div>

                  <div className={`grid ${style.grid} gap-4 sm:gap-5`}>
                    {tier.sponsors.map((sponsor) => {
                      const card = (
                        <div key={sponsor.name} className="flex flex-col items-center gap-4 rounded-2xl border border-navy/10 bg-white px-6 py-8 shadow-sm transition hover:border-navy/20 hover:shadow-md">
                          <div className="flex min-h-20 w-full items-center justify-center">
                            <Image
                              width="0"
                              height="0"
                              src={sponsor.logo}
                              alt={sponsor.name}
                              loading="lazy"
                              className={`${style.logo} mx-auto w-auto object-contain object-center`}
                            />
                          </div>
                          <span className="text-[13px] font-medium text-navy/60">{sponsor.name}</span>
                        </div>
                      );

                      return sponsor.href ? (
                        <SmartLink key={sponsor.name} href={sponsor.href}>
                          {card}
                        </SmartLink>
                      ) : (
                        <div key={sponsor.name}>{card}</div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
