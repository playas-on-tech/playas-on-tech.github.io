import Link from "next/link";
import { ArrowUpRight, Check, Users, Gift } from "../Icons";
import { TICKET } from "./event";

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

const tiers: Tier[] = [
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
      "Keynote técnico de 45 min + 15 min Q&A (slot principal de agenda)",
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
      "Keynote de apertura — 45 min + 15 min Q&A",
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
];

const mediaPartnerPerks = [
  "Difusión cruzada del evento",
  "Cobertura y entrevistas",
  "Acceso de prensa",
  "Logo como media partner",
];

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

export default function Patrocinadores({ withHeader = true }: { withHeader?: boolean }) {
  return (
    <section id="patrocinadores" className="bg-cream-100 px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        {withHeader && (
          <div className="reveal mb-14 text-center">
            <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
              Patrocinadores
            </span>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
              Celebremos juntos.
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-lg leading-relaxed text-navy/60">
              Tu marca frente a la comunidad tech del Pacífico mexicano. Elige un paquete y ayúdanos
              a hacer del 7º aniversario una noche memorable.
            </p>
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
                  Único cupo
                </span>
              ) : tier.featured ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sunset px-3.5 py-1 text-[12px] font-semibold text-white shadow-lg shadow-sunset/30">
                  Más popular
                </span>
              ) : null}

              <h3 className={`text-2xl font-bold tracking-tight ${tier.accent}`}>{tier.name}</h3>

              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-[2rem] font-bold leading-none tracking-tightest text-navy">
                  ${tier.priceMXN.toLocaleString("es-MX")}
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
                  Solo 1 patrocinador con este paquete por edición.
                </p>
              )}

              {tier.keynote && (
                <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-ocean/10 px-3 py-1 text-xs font-semibold text-ocean">
                  Incluye keynote 45 min + 15 Q&amp;A
                </span>
              )}
              {tier.attendeeList && (
                <span
                  className={`mt-2 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${ATTENDEE_LIST_PILL[tier.attendeeList]}`}
                >
                  Lista de asistentes · {tier.attendeeList}
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
                href={`/?category=Sponsor&package=${tier.name}#contacto`}
                className={`group mt-6 flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-[14px] font-semibold leading-tight transition ${ctaClasses(tier)}`}
              >
                <span className="min-w-0 text-center">
                  {tier.ctaLabel ?? `Elegir ${tier.name}`}
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
                Boleto del evento
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-navy">
                Costo del evento — ${TICKET.priceMXN.toLocaleString("es-MX")} MXN (≈ US$ {TICKET.priceUSD})
              </h3>
              <p className="mt-3 leading-relaxed text-navy/70">
                Tu boleto incluye la playera oficial del 7º Aniversario + acceso completo al evento.
                Lo recaudado cubre la operación de la comunidad — sin fines de lucro.
              </p>
              <p className="mt-4 text-sm text-navy/50">
                Los boletos cortesía del patrocinador NO se cobran y SÍ incluyen playera.
              </p>
            </div>

            {/* Right — sponsor ticket mechanics */}
            <div>
              <span className="inline-block rounded-full bg-ocean/15 px-3 py-1 text-[12px] font-semibold text-ocean">
                Boletos para patrocinadores
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-navy">
                Dos formas de usar tus cortesías
              </h3>

              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-navy/10 bg-cream-100 p-5">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ocean/12 text-ocean">
                      <Users size={20} />
                    </span>
                    <div>
                      <h4 className="text-lg font-semibold tracking-tight text-navy">Para tu equipo</h4>
                      <p className="mt-1 text-sm leading-relaxed text-navy/60">
                        Llévalos al evento: colaboradores, clientes, prospectos o invitados estratégicos.
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
                        Para una rifa en tus redes
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-navy/60">
                        Convierte tus boletos en una dinámica de redes sociales «presentada por tu
                        marca». Playas on Tech amplifica el sorteo desde sus canales oficiales y el
                        ganador recibe boleto + playera. Plus de engagement social y leads.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-xs font-medium text-navy/50">
                Boletos cortesía por tier: Silver 2 · Gold 4 · Platinum 6 · Diamond 10 (máx)
              </p>
            </div>
          </div>

          {/* Attendee-list opt-in note — see Eventbrite TODO outside this PR */}
          <p className="mx-auto mt-6 max-w-[60ch] text-center text-xs italic text-navy/50">
            Los sponsors Gold, Platinum y Diamond reciben una lista con la información de los
            asistentes que dan consentimiento explícito al registrarse (nombre, email, empresa,
            rol). Para uso de marketing y/u ofertas laborales según los términos del acuerdo de
            patrocinio.
          </p>
        </div>

        {/* Media partners */}
        <div className="reveal mt-6 grid gap-6 rounded-3xl border border-navy/10 bg-navy p-8 text-white md:grid-cols-[1fr_auto] md:items-center lg:p-10">
          <div>
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold text-ocean-300">
              Media partners
            </span>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight">¿Eres medio o creador?</h3>
            <p className="mt-2 max-w-[52ch] text-white/70">
              Suma a tu audiencia a la conversación. Buscamos aliados de difusión para amplificar el
              7º aniversario.
            </p>
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
            href="/?category=Sponsor&package=MediaPartner#contacto"
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-white py-2 pl-6 pr-2 text-[15px] font-semibold text-navy transition hover:bg-cream"
          >
            Ser media partner
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ocean text-white transition group-hover:rotate-45">
              <ArrowUpRight size={15} />
            </span>
          </Link>
        </div>

        <p className="reveal mt-8 text-center text-navy/60">
          Solo el aniversario tiene esta estructura. Para ediciones bimestrales tenemos otro track
          con paquetes desde $500 MXN —{" "}
          <Link
            href="/?category=Sponsor&package=Bimonthly#contacto"
            className="font-semibold text-ocean underline-offset-4 hover:underline"
          >
            escríbenos
          </Link>{" "}
          para conocerlo.
        </p>
      </div>
    </section>
  );
}
