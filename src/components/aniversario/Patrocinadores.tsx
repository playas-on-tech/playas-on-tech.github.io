import { ArrowRight, ArrowUpRight, Check } from "../Icons";
import { SPONSORSHIP } from "./event";

// Sponsorship inquiries go through the community's Instagram DMs.
const CONTACT_URL = "https://www.instagram.com/playasontech_mzo";

type Tier = {
  name: string;
  accent: string;
  priceMXN: number;
  tagline: string;
  featured?: boolean;
  benefits: string[];
};

const tiers: Tier[] = [
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
];

const mxn = (n: number) => "$" + n.toLocaleString("es-MX") + " MXN";
const goalPct = Math.min(
  100,
  Math.round((SPONSORSHIP.raisedMXN / SPONSORSHIP.goalMXN) * 100)
);
const detailsExternal = SPONSORSHIP.detailsUrl.startsWith("http");

const mediaPartnerPerks = [
  "Difusión cruzada del evento",
  "Cobertura y entrevistas",
  "Acceso de prensa",
  "Logo como media partner",
];

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

        {/* Fundraising goal */}
        <div className="reveal mx-auto mb-12 max-w-[760px] rounded-3xl border border-navy/10 bg-cream p-7 text-center sm:p-8">
          <span className="text-[13px] font-semibold uppercase tracking-[0.15em] text-ocean">
            Meta de recaudación
          </span>
          <div className="mt-2 text-[clamp(2rem,5vw,3rem)] font-bold tracking-tightest text-navy">
            {mxn(SPONSORSHIP.goalMXN)}
          </div>
          <p className="mx-auto mt-2 max-w-[50ch] leading-relaxed text-navy/60">
            Entre todos los patrocinios buscamos reunir al menos {mxn(SPONSORSHIP.goalMXN)} para
            cubrir el venue, audio/video, café y la producción de la noche.
          </p>
          <div className="mt-6">
            <div className="h-3 w-full overflow-hidden rounded-full bg-navy/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-ocean to-sunset"
                style={{ width: goalPct + "%" }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-sm font-medium text-navy/60">
              <span>
                {SPONSORSHIP.raisedMXN > 0
                  ? `${mxn(SPONSORSHIP.raisedMXN)} recaudados`
                  : "¡Sé el primer patrocinador!"}
              </span>
              <span>{goalPct}%</span>
            </div>
          </div>
          <a
            href={SPONSORSHIP.detailsUrl}
            {...(detailsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-ocean underline-offset-4 hover:underline"
          >
            Ver el desglose completo de compromisos
            <ArrowRight size={15} />
          </a>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`reveal relative rounded-3xl border p-8 ${
                tier.featured
                  ? "border-sunset/40 bg-cream shadow-2xl shadow-sunset/10 lg:-mt-4 lg:pb-12"
                  : "border-navy/10 bg-cream"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sunset px-3.5 py-1 text-[12px] font-semibold text-white shadow-lg shadow-sunset/30">
                  Más popular
                </span>
              )}
              <h3 className={`text-2xl font-bold tracking-tight ${tier.accent}`}>{tier.name}</h3>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-[2rem] font-bold leading-none tracking-tightest text-navy">
                  ${tier.priceMXN.toLocaleString("es-MX")}
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
              <a
                href={CONTACT_URL} target="_blank" rel="noopener noreferrer"
                className={`group mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full py-3 text-[15px] font-semibold transition ${
                  tier.featured
                    ? "bg-sunset text-white hover:bg-sunset-400 active:scale-[0.98]"
                    : "border border-navy/15 text-navy hover:bg-navy hover:text-white"
                }`}
              >
                Elegir {tier.name}
                <ArrowUpRight size={15} />
              </a>
            </div>
          ))}
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
          <a
            href={CONTACT_URL} target="_blank" rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-white py-2 pl-6 pr-2 text-[15px] font-semibold text-navy transition hover:bg-cream"
          >
            Ser media partner
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ocean text-white transition group-hover:rotate-45">
              <ArrowUpRight size={15} />
            </span>
          </a>
        </div>

        <p className="reveal mt-8 text-center text-navy/60">
          ¿Quieres un paquete a la medida?{" "}
          <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-ocean underline-offset-4 hover:underline">
            Escríbenos
          </a>{" "}
          y lo armamos juntos.
        </p>
      </div>
    </section>
  );
}
