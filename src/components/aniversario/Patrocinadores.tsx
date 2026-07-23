"use client";

import Link from "next/link";
import { ArrowUpRight, Check, Users, Gift } from "../Icons";
import { TICKET } from "./event";
import { useTranslation } from "react-i18next";
import type { Lang } from "@/i18n/lang";

type Tier = {
  name: string;
  accent: string;
  priceMXN: number;
  priceUSD: number;
  seats: string;
  tagline: string;
  benefits: string[];
  featured?: boolean;
  headline?: boolean;
  keynote?: boolean;
  attendeeList?: "Standard" | "Plus" | "Premium";
  ctaLabel?: string;
};

const TIER_CONFIG: Omit<Tier, "seats" | "tagline" | "benefits">[] = [
  { name: "Silver", accent: "text-navy/70", priceMXN: 5000, priceUSD: 300 },
  { name: "Gold", accent: "text-sunset", priceMXN: 10000, priceUSD: 600, featured: true, attendeeList: "Standard" },
  { name: "Platinum", accent: "text-ocean", priceMXN: 20000, priceUSD: 1200, keynote: true, attendeeList: "Plus" },
  { name: "Diamond", accent: "text-[#5B3FA8]", priceMXN: 45000, priceUSD: 2500, headline: true, keynote: true, attendeeList: "Premium" },
];

const ATTENDEE_LIST_PILL: Record<NonNullable<Tier["attendeeList"]>, string> = {
  Standard: "bg-sunset/10 text-sunset",
  Plus: "bg-ocean/15 text-ocean",
  Premium: "bg-[#5B3FA8]/15 text-[#5B3FA8]",
};

function cardClasses(tier: Tier) {
  if (tier.headline) {
    return "border-[#5B3FA8]/40 bg-cream shadow-2xl shadow-[#5B3FA8]/10";
  }
  if (tier.featured) {
    return "border-sunset/40 bg-cream shadow-2xl shadow-sunset/10 lg:-mt-4 lg:pb-12";
  }
  return "border-navy/10 bg-cream";
}

function ctaClasses(tier: Tier) {
  if (tier.headline) {
    return "bg-[#5B3FA8] text-white hover:bg-[#4a3290] active:scale-[0.98]";
  }
  if (tier.featured) {
    return "bg-sunset text-white hover:bg-sunset-400 active:scale-[0.98]";
  }
  return "border border-navy/15 text-navy hover:bg-navy hover:text-white";
}

export default function Patrocinadores({ withHeader = true }: { withHeader?: boolean }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;
  const p = (key: string) => t(`aniversario.patrocinadores.${key}`);

  const translatedTiers = t("aniversario.patrocinadores.tiers", { returnObjects: true }) as Array<{
    name: string;
    seats: string;
    tagline: string;
    benefits: string[];
  }>;
  const tiers: Tier[] = TIER_CONFIG.map((config, i) => ({
    ...config,
    ...translatedTiers[i],
    ctaLabel: lang === "en" ? "Let's talk about Diamond" : "Conversemos sobre Diamond",
  }));
  const mediaPartnerPerks = t("aniversario.patrocinadores.mediaPerks", { returnObjects: true }) as string[];
  const homePath = p("homePath");

  return (
    <section id="paquetes" className="bg-cream-100 px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        {withHeader && (
          <div className="reveal mb-14 text-center">
            <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
              {p("pill")}
            </span>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
              {p("h2")}
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-lg leading-relaxed text-navy/60">{p("sub")}</p>
          </div>
        )}

        <div className="grid gap-5 pb-16 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`reveal relative flex h-full flex-col rounded-3xl border p-8 ${cardClasses(tier)}`}
            >
              {tier.headline ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#5B3FA8] px-3.5 py-1 text-[12px] font-semibold text-white shadow-lg shadow-[#5B3FA8]/30">
                  {p("uniqueQuota")}
                </span>
              ) : tier.featured ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sunset px-3.5 py-1 text-[12px] font-semibold text-white shadow-lg shadow-sunset/30">
                  {p("morePopular")}
                </span>
              ) : null}

              <h3 className={`text-2xl font-bold tracking-tight ${tier.accent}`}>{tier.name}</h3>

              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-[2rem] font-bold leading-none tracking-tightest text-navy">
                  ${tier.priceMXN.toLocaleString(lang === "en" ? "en-US" : "es-MX")}
                </span>
                <span className="text-sm font-semibold text-navy/50">MXN</span>
              </div>
              <p className="mt-1 text-sm text-navy/50">
                ≈ US$ {tier.priceUSD.toLocaleString("en-US")}
              </p>
              <p className="mt-1 text-[12px] font-medium uppercase tracking-wider text-navy/40">
                {tier.seats}
              </p>

              <p className="mt-3 min-h-[3rem] leading-relaxed text-navy/60">{tier.tagline}</p>
              {tier.name === "Diamond" && (
                <p className="mt-2 text-xs italic text-navy/50">
                  {p("singleSponsor")}
                </p>
              )}

              {tier.keynote && (
                <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-ocean/10 px-3 py-1 text-xs font-semibold text-ocean">
                  {p("keynoteLabel")}
                </span>
              )}
              {tier.attendeeList && (
                <span
                  className={`mt-2 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${ATTENDEE_LIST_PILL[tier.attendeeList]}`}
                >
                  {p("attendeeListLabel")} · {tier.attendeeList}
                </span>
              )}

              <ul className="mt-6 space-y-3 text-navy/75">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ocean/15 text-ocean">
                      <Check size={12} />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>

              <Link
                href={`${homePath}?category=Sponsor&package=${tier.name}#contacto`}
                className={`group mt-6 flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-[14px] font-semibold leading-tight transition ${ctaClasses(tier)}`}
              >
                <span className="min-w-0 text-center">
                  {tier.ctaLabel ? tier.ctaLabel : `${p("chooseLabel")} ${tier.name}`}
                </span>
                <ArrowUpRight size={15} className="shrink-0" />
              </Link>
            </div>
          ))}
        </div>

        {/* Ticket model + raffle */}
        <div className="reveal rounded-3xl border border-navy/10 bg-cream p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left — general admission */}
            <div>
              <span className="inline-block rounded-full bg-navy px-3 py-1 text-[12px] font-semibold text-white">
                {p("ticketPill")}
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-navy">
                {p("ticketTitle")} — ${TICKET.priceMXN.toLocaleString(lang === "en" ? "en-US" : "es-MX")} MXN (≈ US$ {TICKET.priceUSD})
              </h3>
              <p className="mt-3 leading-relaxed text-navy/70">
                {p("ticketBody")}
              </p>
              <p className="mt-4 text-sm text-navy/50">
                {p("ticketFineprint")}
              </p>
            </div>

            {/* Right — sponsor ticket mechanics */}
            <div>
              <span className="inline-block rounded-full bg-ocean/15 px-3 py-1 text-[12px] font-semibold text-ocean">
                {p("sponsorTicketPill")}
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-navy">
                {p("sponsorTicketTitle")}
              </h3>

              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-navy/10 bg-cream-100 p-5">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ocean/12 text-ocean">
                      <Users size={20} />
                    </span>
                    <div>
                      <h4 className="text-lg font-semibold tracking-tight text-navy">{p("forTeamTitle")}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-navy/60">
                        {p("forTeamBody")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-navy/10 bg-cream-100 p-5">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sunset/15 text-sunset">
                      <Gift size={20} />
                    </span>
                    <div>
                      <h4 className="text-lg font-semibold tracking-tight text-navy">
                        {p("forRaffleTitle")}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-navy/60">
                        {p("forRaffleBody")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-xs font-medium text-navy/50">
                {p("tierTicketNote")}
              </p>
            </div>
          </div>

          {/* Attendee-list opt-in note */}
          <p className="mx-auto mt-6 max-w-[60ch] text-center text-xs italic text-navy/50">
            {p("attendeeOptInNote")}
          </p>
        </div>

        {/* Media partners */}
        <div className="reveal mt-6 grid gap-6 rounded-3xl border border-navy/10 bg-navy p-8 text-white md:grid-cols-[1fr_auto] md:items-center lg:p-10">
          <div>
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold text-ocean-300">
              {p("mediaPartnerPill")}
            </span>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight">{p("mediaPartnerH3")}</h3>
            <p className="mt-2 max-w-[52ch] text-white/70">{p("mediaPartnerBody")}</p>
            <ul className="mt-5 grid gap-x-8 gap-y-2 text-white/80 sm:grid-cols-2">
              {mediaPartnerPerks.map((perk) => (
                <li key={perk} className="flex items-center gap-2.5">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ocean/20 text-ocean-300">
                    <Check size={12} />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href={`${homePath}?category=Sponsor&package=MediaPartner#contacto`}
            className="group inline-flex shrink-0 items-center gap-2.5 justify-self-start rounded-full bg-white py-2 pl-6 pr-2 text-[15px] font-semibold text-navy transition hover:bg-cream"
          >
            {p("mediaPartnerCta")}
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ocean text-white transition group-hover:rotate-45">
              <ArrowUpRight size={15} />
            </span>
          </Link>
        </div>

        <p className="reveal mt-8 text-center text-navy/60">
          {p("customPrefix")}
          <Link
            href={`${homePath}?category=Sponsor&package=Bimonthly#contacto`}
            className="font-semibold text-ocean underline-offset-4 hover:underline"
          >
            {p("customLink")}
          </Link>
          {p("customSuffix")}
        </p>
      </div>
    </section>
  );
}
