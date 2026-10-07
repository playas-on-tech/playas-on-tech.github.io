"use client";

import { useLang } from "@/lib/lang";
import { TICKET } from "@/lib/event";
import { localeTag, money } from "@/lib/format";
import { ArrowUpRight, Check, Gift, Users } from "@/components/Icons";
import CheckList from "@/components/ui/CheckList";
import Pill from "@/components/ui/Pill";
import SectionHeader from "@/components/ui/SectionHeader";
import SmartLink from "@/components/ui/SmartLink";

const PREFIX = "aniversario.patrocinadores";

function useCopy() {
  const { t, lang } = useLang();
  return {
    p: (key: string) => t(`${PREFIX}.${key}`),
    list: (key: string) => t(`${PREFIX}.${key}`, { returnObjects: true }) as unknown,
    lang,
  };
}

type Tier = {
  name: string;
  accent: string;
  card: string;
  cta: string;
  badgeClass?: string;
  badgeKey?: string;
  priceMXN: number;
  priceUSD: number;
  keynote?: boolean;
  attendeeList?: "Standard" | "Plus" | "Premium";
  diamondCta?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Silver",
    accent: "text-navy/70",
    card: "border-navy/10 bg-cream",
    cta: "border border-navy/15 text-navy hover:bg-navy hover:text-white",
    priceMXN: 5000,
    priceUSD: 300,
  },
  {
    name: "Gold",
    accent: "text-sunset",
    card: "border-sunset/40 bg-cream shadow-2xl shadow-sunset/10 lg:-mt-4 lg:pb-12",
    cta: "bg-sunset text-white hover:bg-sunset-400 active:scale-[0.98]",
    badgeClass: "bg-sunset shadow-sunset/30",
    badgeKey: "morePopular",
    priceMXN: 10000,
    priceUSD: 600,
    attendeeList: "Standard",
  },
  {
    name: "Platinum",
    accent: "text-ocean",
    card: "border-navy/10 bg-cream",
    cta: "border border-navy/15 text-navy hover:bg-navy hover:text-white",
    priceMXN: 20000,
    priceUSD: 1200,
    keynote: true,
    attendeeList: "Plus",
  },
  {
    name: "Diamond",
    accent: "text-[#5B3FA8]",
    card: "border-[#5B3FA8]/40 bg-cream shadow-2xl shadow-[#5B3FA8]/10",
    cta: "bg-[#5B3FA8] text-white hover:bg-[#4a3290] active:scale-[0.98]",
    badgeClass: "bg-[#5B3FA8] shadow-[#5B3FA8]/30",
    badgeKey: "uniqueQuota",
    priceMXN: 45000,
    priceUSD: 2500,
    keynote: true,
    attendeeList: "Premium",
    diamondCta: true,
  },
];

const ATTENDEE_LIST_PILL: Record<NonNullable<Tier["attendeeList"]>, string> = {
  Standard: "bg-sunset/10 text-sunset",
  Plus: "bg-ocean/15 text-ocean",
  Premium: "bg-[#5B3FA8]/15 text-[#5B3FA8]",
};

const BADGE_BASE =
  "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3.5 py-1 text-[12px] font-semibold text-white shadow-lg";

type TranslatedTier = { name: string; seats: string; tagline: string; benefits: string[] };

function TierCard({ tier, copy }: { tier: Tier; copy: TranslatedTier }) {
  const { p, lang } = useCopy();
  const ctaLabel = tier.diamondCta ? p("diamondCta") : `${p("chooseLabel")} ${tier.name}`;

  return (
    <div className={`reveal relative flex h-full flex-col rounded-3xl border p-8 ${tier.card}`}>
      {tier.badgeKey && <span className={`${BADGE_BASE} ${tier.badgeClass}`}>{p(tier.badgeKey)}</span>}

      <h3 className={`text-2xl font-bold tracking-tight ${tier.accent}`}>{copy.name}</h3>

      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="text-[2rem] font-bold leading-none tracking-tightest text-navy">
          ${money(tier.priceMXN, localeTag(lang))}
        </span>
        <span className="text-sm font-semibold text-navy/50">MXN</span>
      </div>
      <p className="mt-1 text-sm text-navy/50">≈ US$ {money(tier.priceUSD, "en-US")}</p>
      <p className="mt-1 text-[12px] font-medium uppercase tracking-wider text-navy/40">{copy.seats}</p>

      <p className="mt-3 min-h-[3rem] leading-relaxed text-navy/60">{copy.tagline}</p>
      {tier.diamondCta && <p className="mt-2 text-xs italic text-navy/50">{p("singleSponsor")}</p>}

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

      <CheckList items={copy.benefits} className="mt-6 space-y-3 text-navy/75" small />

      <SmartLink
        href={`${p("homePath")}?category=Sponsor&package=${tier.name}#contacto`}
        className={`group mt-6 flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-[14px] font-semibold leading-tight transition ${tier.cta}`}
      >
        <span className="min-w-0 text-center">{ctaLabel}</span>
        <ArrowUpRight size={15} className="shrink-0" />
      </SmartLink>
    </div>
  );
}

function Note({ icon, iconClass, title, body }: { icon: React.ReactNode; iconClass: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-navy/10 bg-cream-100 p-5">
      <div className="flex items-start gap-4">
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${iconClass}`}>{icon}</span>
        <div>
          <h4 className="text-lg font-semibold tracking-tight text-navy">{title}</h4>
          <p className="mt-1 text-sm leading-relaxed text-navy/60">{body}</p>
        </div>
      </div>
    </div>
  );
}

function TicketModel() {
  const { p, lang } = useCopy();

  return (
    <div className="reveal rounded-3xl border border-navy/10 bg-cream p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <Pill size="sm">{p("ticketPill")}</Pill>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-navy">
            {p("ticketTitle")} — ${money(TICKET.priceMXN, localeTag(lang))} MXN (≈ US$ {TICKET.priceUSD})
          </h3>
          <p className="mt-3 leading-relaxed text-navy/70">{p("ticketBody")}</p>
          <p className="mt-4 text-sm text-navy/50">{p("ticketFineprint")}</p>
        </div>

        <div>
          <Pill tone="oceanSoft" size="sm">
            {p("sponsorTicketPill")}
          </Pill>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-navy">{p("sponsorTicketTitle")}</h3>

          <div className="mt-5 space-y-4">
            <Note icon={<Users size={20} />} iconClass="bg-ocean/12 text-ocean" title={p("forTeamTitle")} body={p("forTeamBody")} />
            <Note icon={<Gift size={20} />} iconClass="bg-sunset/15 text-sunset" title={p("forRaffleTitle")} body={p("forRaffleBody")} />
          </div>

          <p className="mt-5 text-xs font-medium text-navy/50">{p("tierTicketNote")}</p>
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-[60ch] text-center text-xs italic text-navy/50">{p("attendeeOptInNote")}</p>
    </div>
  );
}

function MediaPartners() {
  const { p, list } = useCopy();
  const perks = list("mediaPerks") as string[];

  return (
    <div className="reveal mt-6 grid gap-6 rounded-3xl border border-navy/10 bg-navy p-8 text-white md:grid-cols-[1fr_auto] md:items-center lg:p-10">
      <div>
        <Pill tone="ocean" size="sm">
          {p("mediaPartnerPill")}
        </Pill>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight">{p("mediaPartnerH3")}</h3>
        <p className="mt-2 max-w-[52ch] text-white/70">{p("mediaPartnerBody")}</p>
        <ul className="mt-5 grid gap-x-8 gap-y-2 text-white/80 sm:grid-cols-2">
          {perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2.5">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ocean/20 text-ocean-300">
                <Check size={12} />
              </span>
              {perk}
            </li>
          ))}
        </ul>
      </div>
      <SmartLink
        href={`${p("homePath")}?category=Sponsor&package=MediaPartner#contacto`}
        className="group inline-flex shrink-0 items-center gap-2.5 justify-self-start rounded-full bg-white py-2 pl-6 pr-2 text-[15px] font-semibold text-navy transition hover:bg-cream"
      >
        {p("mediaPartnerCta")}
        <span className="grid h-8 w-8 place-items-center rounded-full bg-ocean text-white transition group-hover:rotate-45">
          <ArrowUpRight size={15} />
        </span>
      </SmartLink>
    </div>
  );
}

export default function Patrocinadores({ withHeader = true }: { withHeader?: boolean }) {
  const { p, list } = useCopy();
  const tiers = list("tiers") as TranslatedTier[];

  return (
    <section id="paquetes" className="bg-cream-100 px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        {withHeader && (
          <SectionHeader
            pill={p("pill")}
            title={p("h2")}
            sub={p("sub")}
            layout="stack"
            align="center"
            subClass="mt-4 max-w-[52ch]"
            className="reveal mb-14 max-w-[640px]"
          />
        )}

        <div className="grid gap-5 pb-16 md:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((tier, i) => (
            <TierCard key={tier.name} tier={tier} copy={tiers[i]} />
          ))}
        </div>

        {/* Ticket model + raffle */}
        <TicketModel />

        {/* Media partners */}
        <MediaPartners />

        <p className="reveal mt-8 text-center text-navy/60">
          {p("customPrefix")}
          <SmartLink
            href={`${p("homePath")}?category=Sponsor&package=Bimonthly#contacto`}
            className="font-semibold text-ocean underline-offset-4 hover:underline"
          >
            {p("customLink")}
          </SmartLink>
          {p("customSuffix")}
        </p>
      </div>
    </section>
  );
}
