import Link from "next/link";
import { ArrowUpRight, Check } from "../Icons";
import type { Lang } from "@/i18n/lang";

type Tier = {
  name: string;
  accent: string;
  priceMXN: number;
  tagline: string;
  featured?: boolean;
  benefits: string[];
};

const TIERS: Record<Lang, Tier[]> = {
  es: [
    {
      name: "Silver",
      accent: "text-navy/70",
      priceMXN: 5000,
      tagline: "Apoya a la comunidad y date a conocer.",
      benefits: [
        "Logo en el sitio del evento",
        "Mención en redes sociales",
        "2 cortesías de acceso",
      ],
    },
    {
      name: "Gold",
      accent: "text-sunset",
      priceMXN: 10000,
      tagline: "Presencia destacada antes y durante la noche.",
      featured: true,
      benefits: [
        "Todo lo de Silver",
        "Logo en pantalla durante el evento",
        "Mesa o stand en el venue",
        "5 cortesías de acceso",
        "Mención desde el escenario",
      ],
    },
    {
      name: "Platinum",
      accent: "text-ocean",
      priceMXN: 20000,
      tagline: "Patrocinador principal del 7º aniversario.",
      benefits: [
        "Todo lo de Gold",
        "“Presentado por” — naming del evento",
        "Espacio para keynote o demo (10 min)",
        "Logo en todo el material y el video",
        "10 cortesías + acceso VIP al brindis",
        "Contenido dedicado posterior al evento",
      ],
    },
  ],
  en: [
    {
      name: "Silver",
      accent: "text-navy/70",
      priceMXN: 5000,
      tagline: "Support the community and get yourself known.",
      benefits: [
        "Logo on the event site",
        "Mention on social media",
        "2 complimentary tickets",
      ],
    },
    {
      name: "Gold",
      accent: "text-sunset",
      priceMXN: 10000,
      tagline: "Featured presence before and during the night.",
      featured: true,
      benefits: [
        "Everything from Silver",
        "Logo on screen during the event",
        "Table or booth at the venue",
        "5 complimentary tickets",
        "Mention from the stage",
      ],
    },
    {
      name: "Platinum",
      accent: "text-ocean",
      priceMXN: 20000,
      tagline: "Headline sponsor of the 7th anniversary.",
      benefits: [
        "Everything from Gold",
        "“Presented by” — event naming rights",
        "Keynote or demo slot (10 min)",
        "Logo across all materials and video",
        "10 complimentary tickets + VIP toast access",
        "Dedicated post-event content",
      ],
    },
  ],
};

const MEDIA_PERKS: Record<Lang, string[]> = {
  es: [
    "Difusión cruzada del evento",
    "Cobertura y entrevistas",
    "Acceso de prensa",
    "Logo como media partner",
  ],
  en: [
    "Cross-promotion of the event",
    "Coverage and interviews",
    "Press access",
    "Logo as media partner",
  ],
};

const COPY = {
  es: {
    pill: "Patrocinadores",
    h2: "Celebremos juntos.",
    sub: "Tu marca frente a la comunidad tech del Pacífico mexicano. Elige un paquete y ayúdanos a hacer del 7º aniversario una noche memorable.",
    morePopular: "Más popular",
    chooseLabel: "Elegir",
    mediaPartnerPill: "Media partners",
    mediaPartnerH3: "¿Eres medio o creador?",
    mediaPartnerBody:
      "Suma a tu audiencia a la conversación. Buscamos aliados de difusión para amplificar el 7º aniversario.",
    mediaPartnerCta: "Ser media partner",
    customPrefix: "¿Quieres un paquete a la medida?",
    customLink: "Escríbenos",
    customSuffix: "y lo armamos juntos.",
    homePath: "/",
  },
  en: {
    pill: "Sponsors",
    h2: "Let's celebrate together.",
    sub: "Your brand in front of the Mexican Pacific tech community. Pick a package and help us make the 7th anniversary a memorable night.",
    morePopular: "Most popular",
    chooseLabel: "Choose",
    mediaPartnerPill: "Media partners",
    mediaPartnerH3: "Are you a media outlet or creator?",
    mediaPartnerBody:
      "Bring your audience into the conversation. We're looking for broadcast allies to amplify the 7th anniversary.",
    mediaPartnerCta: "Become a media partner",
    customPrefix: "Want a custom package?",
    customLink: "Write to us",
    customSuffix: "and we'll put it together.",
    homePath: "/en",
  },
} as const;

export default function Patrocinadores({
  withHeader = true,
  lang = "es",
}: {
  withHeader?: boolean;
  lang?: Lang;
}) {
  const t = COPY[lang];
  const tiers = TIERS[lang];
  const mediaPartnerPerks = MEDIA_PERKS[lang];
  return (
    <section id="patrocinadores" className="bg-cream-100 px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        {withHeader && (
          <div className="reveal mb-14 text-center">
            <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
              {t.pill}
            </span>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
              {t.h2}
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-lg leading-relaxed text-navy/60">{t.sub}</p>
          </div>
        )}

        <div className="grid gap-5 lg:grid-cols-3 pb-28">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`reveal relative rounded-3xl border p-8 flex flex-col h-full ${
                tier.featured
                  ? "border-sunset/40 bg-cream shadow-2xl shadow-sunset/10 lg:-mt-4 lg:pb-12"
                  : "border-navy/10 bg-cream"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sunset px-3.5 py-1 text-[12px] font-semibold text-white shadow-lg shadow-sunset/30">
                  {t.morePopular}
                </span>
              )}
              <h3 className={`text-2xl font-bold tracking-tight ${tier.accent}`}>{tier.name}</h3>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-[2rem] font-bold leading-none tracking-tightest text-navy">
                  ${tier.priceMXN.toLocaleString(lang === "en" ? "en-US" : "es-MX")}
                </span>
                <span className="text-sm font-semibold text-navy/50">MXN</span>
              </div>
              <p className="mt-3 min-h-[3rem] leading-relaxed text-navy/60">{tier.tagline}</p>
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
                href={`${t.homePath}?category=Sponsor&package=${tier.name}#contacto`}
                className={`group mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full py-3 text-[15px] font-semibold transition ${
                  tier.featured
                    ? "bg-sunset text-white hover:bg-sunset-400 active:scale-[0.98]"
                    : "border border-navy/15 text-navy hover:bg-navy hover:text-white"
                }`}
              >
                {t.chooseLabel} {tier.name}
                <ArrowUpRight size={15} />
              </Link>
            </div>
          ))}
        </div>

        {/* Media partners */}
        <div className="reveal mt-6 grid gap-6 rounded-3xl border border-navy/10 bg-navy p-8 text-white md:grid-cols-[1fr_auto] md:items-center lg:p-10">
          <div>
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold text-ocean-300">
              {t.mediaPartnerPill}
            </span>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight">{t.mediaPartnerH3}</h3>
            <p className="mt-2 max-w-[52ch] text-white/70">{t.mediaPartnerBody}</p>
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
            href={`${t.homePath}?category=Sponsor&package=MediaPartner#contacto`}
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-white py-2 pl-6 pr-2 text-[15px] font-semibold text-navy transition hover:bg-cream"
          >
            {t.mediaPartnerCta}
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ocean text-white transition group-hover:rotate-45">
              <ArrowUpRight size={15} />
            </span>
          </Link>
        </div>

        <p className="reveal mt-8 text-center text-navy/60">
          {t.customPrefix}{" "}
          <Link
            href={`${t.homePath}?category=Sponsor&package=Custom#contacto`}
            className="font-semibold text-ocean underline-offset-4 hover:underline"
          >
            {t.customLink}
          </Link>{" "}
          {t.customSuffix}
        </p>
      </div>
    </section>
  );
}
