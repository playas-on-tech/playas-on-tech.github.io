import Link from "next/link";
import { ArrowUpRight, Check, Users, Gift } from "../Icons";
import { TICKET } from "./event";
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

const TIERS: Record<Lang, Tier[]> = {
  es: [
    {
      name: "Silver",
      accent: "text-navy/70",
      priceMXN: 5000,
      priceUSD: 300,
      seats: "Sin límite de cupos",
      tagline: "Apoya a la comunidad y date a conocer.",
      benefits: [
        "Logo en el sitio del evento (sección Silver)",
        "Mención agrupada en redes sociales",
        "Logo en pantalla durante intermedios",
        "Mención en agradecimientos de cierre",
        "Sticker físico en welcome kit",
        "Atribución en YouTube (logo en descripción del recap)",
        "Mención en los siguientes 3 newsletters bimestrales",
        "2 boletos cortesía (úsalos para tu equipo o ríflalos en redes en nombre de tu marca)",
        "Reporte post-evento a 30 días",
      ],
    },
    {
      name: "Gold",
      accent: "text-sunset",
      priceMXN: 10000,
      priceUSD: 600,
      seats: "Hasta 4 cupos por edición",
      tagline: "Presencia destacada en el venue y la noche.",
      featured: true,
      attendeeList: "Standard",
      benefits: [
        "Todo lo de Silver",
        "Mesa o stand en el venue",
        "Logo en pantalla recurrente durante el evento",
        "Mención individual desde el escenario",
        "Materiales en welcome kit (pieza física + sticker)",
        "Lightning sponsor moment (2 min onstage)",
        "Mención en mail post-evento a asistentes",
        "Lista de asistentes (Standard) — opt-ins con datos de contacto, entrega post-evento (día +3). Para marketing y/u ofertas laborales.",
        "4 boletos cortesía (úsalos para tu equipo o ríflalos en redes)",
      ],
    },
    {
      name: "Platinum",
      accent: "text-ocean",
      priceMXN: 20000,
      priceUSD: 1200,
      seats: "Hasta 2 cupos por edición",
      tagline: "Patrocinador principal — protagonista en escenario y venue.",
      keynote: true,
      attendeeList: "Plus",
      benefits: [
        "Todo lo de Gold",
        "Keynote técnico de 25 min + 5 min Q&A (slot principal de agenda)",
        "Stand premium en venue",
        "Logo en intro/outro del video oficial del evento",
        "Post dedicado en redes pre-evento",
        "Mención destacada en blog/recap post-evento",
        "Lista de asistentes (Plus) — entrega 7 días pre-evento + segmentación por rol/seniority/industria. Para marketing y/u ofertas laborales.",
        "Coffee Break by [Marca] (opcional)",
        "6 boletos cortesía",
      ],
    },
    {
      name: "Diamond",
      accent: "text-[#5B3FA8]",
      priceMXN: 40000,
      priceUSD: 2400,
      seats: "1 cupo · único por edición",
      tagline: "El 7º Aniversario, presentado por ti.",
      headline: true,
      keynote: true,
      attendeeList: "Premium",
      ctaLabel: "Conversemos sobre Diamond",
      benefits: [
        "Naming rights — «Presentado por [Marca]»",
        "Welcome desde el escenario (5 min)",
        "Keynote de apertura — 25 min + 5 min Q&A",
        "Co-branded lockup en TODOS los assets del evento",
        "Recap video del evento, sponsoreado",
        "Playera oficial co-branded",
        "Espacio de activación premium",
        "Mesa redonda o panel co-creado",
        "Exclusividad de categoría",
        "Contenido dedicado post-evento (blog + podcast + redes)",
        "Lista de asistentes (Premium) — entrega 14 días pre-evento + segmentación + 3 intros directas a asistentes específicos. Para marketing y/u ofertas laborales.",
        "10 boletos cortesía (máximo del paquete · úsalos para tu equipo o ríflalos en redes)",
        "Acknowledgment en kits de prensa",
        "Reunión de planeación con el equipo organizador",
        "Right of first refusal — próxima edición",
      ],
    },
  ],
  en: [
    {
      name: "Silver",
      accent: "text-navy/70",
      priceMXN: 5000,
      priceUSD: 300,
      seats: "Unlimited seats",
      tagline: "Support the community and get yourself known.",
      benefits: [
        "Logo on the event site (Silver section)",
        "Grouped mention on social media",
        "Logo on screen during breaks",
        "Mention in closing acknowledgments",
        "Physical sticker in welcome kit",
        "YouTube attribution (logo in recap description)",
        "Mention in the next 3 bi-monthly newsletters",
        "2 complimentary tickets (use for your team or raffle them on social media in your brand's name)",
        "30-day post-event report",
      ],
    },
    {
      name: "Gold",
      accent: "text-sunset",
      priceMXN: 10000,
      priceUSD: 600,
      seats: "Up to 4 slots per edition",
      tagline: "Featured presence at the venue and during the night.",
      featured: true,
      attendeeList: "Standard",
      benefits: [
        "Everything in Silver",
        "Table or booth at the venue",
        "Recurring logo on screen during the event",
        "Individual mention from the stage",
        "Welcome kit inserts (physical item + sticker)",
        "Lightning sponsor moment (2 min onstage)",
        "Mention in post-event email to attendees",
        "Attendee list (Standard) — opt-ins with contact info, delivered post-event (day +3). For marketing and/or job offers.",
        "4 complimentary tickets (use for your team or raffle them on social media)",
      ],
    },
    {
      name: "Platinum",
      accent: "text-ocean",
      priceMXN: 20000,
      priceUSD: 1200,
      seats: "Up to 2 slots per edition",
      tagline: "Headline sponsor — protagonist on stage and at the venue.",
      keynote: true,
      attendeeList: "Plus",
      benefits: [
        "Everything in Gold",
        "25-min technical keynote + 5-min Q&A (main agenda slot)",
        "Premium stand at the venue",
        "Logo in intro/outro of the official event video",
        "Dedicated post on social media pre-event",
        "Featured mention in post-event blog/recap",
        "Attendee list (Plus) — delivery 7 days pre-event + segmentation by role/seniority/industry. For marketing and/or job offers.",
        "Coffee Break by [Brand] (optional)",
        "6 complimentary tickets",
      ],
    },
    {
      name: "Diamond",
      accent: "text-[#5B3FA8]",
      priceMXN: 40000,
      priceUSD: 2400,
      seats: "1 slot · unique per edition",
      tagline: "The 7th Anniversary, presented by you.",
      headline: true,
      keynote: true,
      attendeeList: "Premium",
      ctaLabel: "Let's talk about Diamond",
      benefits: [
        "Naming rights — «Presented by [Brand]»",
        "Welcome speech from the stage (5 min)",
        "Opening keynote — 25 min + 5 min Q&A",
        "Co-branded lockup on ALL event assets",
        "Sponsored event recap video",
        "Co-branded official t-shirt",
        "Premium activation space",
        "Co-created roundtable or panel",
        "Category exclusivity",
        "Dedicated post-event content (blog + podcast + social)",
        "Attendee list (Premium) — delivery 14 days pre-event + segmentation + 3 direct intros to specific attendees. For marketing and/or job offers.",
        "10 complimentary tickets (package max · use for your team or raffle them on social)",
        "Acknowledgment in press kits",
        "Planning meeting with the organizing team",
        "Right of first refusal — next edition",
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
    singleSponsor: "Solo 1 patrocinador con este paquete por edición.",
    keynoteLabel: "Incluye keynote 25 min + 5 Q&A",
    attendeeListLabel: "Lista de asistentes",
    uniqueQuota: "Único cupo",
    
    // Ticket Section
    ticketPill: "Boleto del evento",
    ticketTitle: "Costo del evento",
    ticketBody: "Tu boleto incluye la playera oficial del 7º Aniversario + acceso completo al evento. Lo recaudado cubre la operación de la comunidad — sin fines de lucro.",
    ticketFineprint: "Los boletos cortesía del patrocinador NO se cobran y SÍ incluyen playera.",
    
    sponsorTicketPill: "Boletos para patrocinadores",
    sponsorTicketTitle: "Dos formas de usar tus cortesías",
    forTeamTitle: "Para tu equipo",
    forTeamBody: "Llévalos al evento: colaboradores, clientes, prospectos o invitados estratégicos.",
    forRaffleTitle: "Para una rifa en tus redes",
    forRaffleBody: "Convierte tus boletos en una dinámica de redes sociales «presentada por tu marca». Playas on Tech amplifica el sorteo desde sus canales oficiales y el ganador recibe boleto + playera. Plus de engagement social y leads.",
    tierTicketNote: "Boletos cortesía por tier: Silver 2 · Gold 4 · Platinum 6 · Diamond 10 (máx)",
    attendeeOptInNote: "Los sponsors Gold, Platinum y Diamond reciben una lista con la información de los asistentes que dan consentimiento explícito al registrarse (nombre, email, empresa, rol). Para uso de marketing y/u ofertas laborales según los términos del acuerdo de patrocinio.",

    mediaPartnerPill: "Media partners",
    mediaPartnerH3: "¿Eres medio o creador?",
    mediaPartnerBody: "Suma a tu audiencia a la conversación. Buscamos aliados de difusión para amplificar el 7º aniversario.",
    mediaPartnerCta: "Ser media partner",
    customPrefix: "Solo el aniversario tiene esta estructura. Para ediciones bimestrales tenemos otro track con paquetes desde $500 MXN — ",
    customLink: "escríbenos",
    customSuffix: " para conocerlo.",
    homePath: "/",
  },
  en: {
    pill: "Sponsors",
    h2: "Let's celebrate together.",
    sub: "Your brand in front of the Mexican Pacific tech community. Pick a package and help us make the 7th anniversary a memorable night.",
    morePopular: "Most popular",
    chooseLabel: "Choose",
    singleSponsor: "Only 1 sponsor with this package per edition.",
    keynoteLabel: "Includes 25 min keynote + 5 Q&A",
    attendeeListLabel: "Attendee list",
    uniqueQuota: "Only slot",
    
    // Ticket Section
    ticketPill: "Event Ticket",
    ticketTitle: "Event Cost",
    ticketBody: "Your ticket includes the official 7th Anniversary t-shirt + full access to the event. Proceeds cover the community's operations — non-profit.",
    ticketFineprint: "Sponsor complimentary tickets are FREE of charge and DO include a t-shirt.",
    
    sponsorTicketPill: "Sponsor Tickets",
    sponsorTicketTitle: "Two ways to use your complimentary tickets",
    forTeamTitle: "For your team",
    forTeamBody: "Bring them to the event: collaborators, clients, prospects, or strategic guests.",
    forRaffleTitle: "For a raffle on your social media",
    forRaffleBody: "Turn your tickets into a social media dynamic 'presented by your brand'. Playas on Tech amplifies the giveaway from its official channels and the winner receives a ticket + t-shirt. A plus for social engagement and leads.",
    tierTicketNote: "Complimentary tickets by tier: Silver 2 · Gold 4 · Platinum 6 · Diamond 10 (max)",
    attendeeOptInNote: "Gold, Platinum, and Diamond sponsors receive a list of attendees who provide explicit consent upon registration (name, email, company, role). For marketing and/or job offer use according to the terms of the sponsorship agreement.",

    mediaPartnerPill: "Media partners",
    mediaPartnerH3: "Are you a media outlet or creator?",
    mediaPartnerBody: "Bring your audience into the conversation. We're looking for broadcast allies to amplify the 7th anniversary.",
    mediaPartnerCta: "Become a media partner",
    customPrefix: "Only the anniversary has this structure. For bi-monthly editions we have another track with packages starting at $500 MXN — ",
    customLink: "write to us",
    customSuffix: " to learn about it.",
    homePath: "/en",
  },
} as const;

const ATTENDEE_LIST_PILL: Record<NonNullable<Tier["attendeeList"]>, string> = {
  Standard: "bg-sunset/10 text-sunset",
  Plus: "bg-ocean/15 text-ocean",
  Premium: "bg-[#5B3FA8]/15 text-[#5B3FA8]",
};

// `headline` takes precedence over `featured` when both are set.
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
    <section id="paquetes" className="bg-cream-100 px-6 py-28 lg:py-36">
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

        <div className="grid gap-5 pb-16 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`reveal relative flex h-full flex-col rounded-3xl border p-8 ${cardClasses(tier)}`}
            >
              {tier.headline ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#5B3FA8] px-3.5 py-1 text-[12px] font-semibold text-white shadow-lg shadow-[#5B3FA8]/30">
                  {t.uniqueQuota}
                </span>
              ) : tier.featured ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sunset px-3.5 py-1 text-[12px] font-semibold text-white shadow-lg shadow-sunset/30">
                  {t.morePopular}
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
                  {t.singleSponsor}
                </p>
              )}

              {tier.keynote && (
                <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-ocean/10 px-3 py-1 text-xs font-semibold text-ocean">
                  {t.keynoteLabel}
                </span>
              )}
              {tier.attendeeList && (
                <span
                  className={`mt-2 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${ATTENDEE_LIST_PILL[tier.attendeeList]}`}
                >
                  {t.attendeeListLabel} · {tier.attendeeList}
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
                href={`${t.homePath}?category=Sponsor&package=${tier.name}#contacto`}
                className={`group mt-6 flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-[14px] font-semibold leading-tight transition ${ctaClasses(tier)}`}
              >
                <span className="min-w-0 text-center">
                  {tier.ctaLabel ? (lang === "en" ? "Let's talk about Diamond" : tier.ctaLabel) : `${t.chooseLabel} ${tier.name}`}
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
                {t.ticketPill}
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-navy">
                {t.ticketTitle} — ${TICKET.priceMXN.toLocaleString(lang === "en" ? "en-US" : "es-MX")} MXN (≈ US$ {TICKET.priceUSD})
              </h3>
              <p className="mt-3 leading-relaxed text-navy/70">
                {t.ticketBody}
              </p>
              <p className="mt-4 text-sm text-navy/50">
                {t.ticketFineprint}
              </p>
            </div>

            {/* Right — sponsor ticket mechanics */}
            <div>
              <span className="inline-block rounded-full bg-ocean/15 px-3 py-1 text-[12px] font-semibold text-ocean">
                {t.sponsorTicketPill}
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-navy">
                {t.sponsorTicketTitle}
              </h3>

              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-navy/10 bg-cream-100 p-5">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ocean/12 text-ocean">
                      <Users size={20} />
                    </span>
                    <div>
                      <h4 className="text-lg font-semibold tracking-tight text-navy">{t.forTeamTitle}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-navy/60">
                        {t.forTeamBody}
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
                        {t.forRaffleTitle}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-navy/60">
                        {t.forRaffleBody}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-xs font-medium text-navy/50">
                {t.tierTicketNote}
              </p>
            </div>
          </div>

          {/* Attendee-list opt-in note */}
          <p className="mx-auto mt-6 max-w-[60ch] text-center text-xs italic text-navy/50">
            {t.attendeeOptInNote}
          </p>
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
          {t.customPrefix}
          <Link
            href={`${t.homePath}?category=Sponsor&package=Bimonthly#contacto`}
            className="font-semibold text-ocean underline-offset-4 hover:underline"
          >
            {t.customLink}
          </Link>
          {t.customSuffix}
        </p>
      </div>
    </section>
  );
}
