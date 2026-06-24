"use client"
import { useLang } from "@/lib/LangProvider"

// ponytail: logo paths are keyed by `key` (tier) + exact filename — mirrors the
// public/assets/sponsors/<N-tier>/<slug>.ext directory structure 1:1.
// When adding a sponsor, drop the file into the matching folder first,
// then add it to the right tier below. Never invent a path that doesn't
// correspond to an actual file on disk.
const COPY = {
  es: {
    pill: "Patrocinadores",
    h2: "Gracias por hacerlo posible.",
    sub: "Empresas y marcas que se suman al 7º aniversario para construir comunidad tech en Manzanillo.",
    diamond: "Diamante",
    platinum: "Platino",
    gold: "Oro",
    silver: "Plata",
    bronze: "Bronce",
  },
  en: {
    pill: "Sponsors",
    h2: "Thanks for making it possible.",
    sub: "Companies and brands joining the 7th anniversary to build tech community in Manzanillo.",
    diamond: "Diamond",
    platinum: "Platinum",
    gold: "Gold",
    silver: "Silver",
    bronze: "Bronze",
  },
} as const

type Sponsor = {
  name: string
  logo: string
  href?: string
}

type TierData = {
  key: keyof typeof COPY.es & ("diamond" | "platinum" | "gold" | "silver" | "bronze")
  sponsors: Sponsor[]
}

const TIERS: TierData[] = [
  {
    key: "diamond",
    sponsors: [
      { name: "Monato", logo: "/assets/sponsors/5-diamond/monato.png" },
    ],
  },
  {
    key: "platinum",
    sponsors: [],
  },
  {
    key: "gold",
    sponsors: [],
  },
  {
    key: "silver",
    sponsors: [
      { name: "Feromasc", logo: "/assets/sponsors/2-silver/feromasc.jpeg" },
      { name: "Magma Labs", logo: "/assets/sponsors/2-silver/magma-labs.png" },
      { name: "Valente", logo: "/assets/sponsors/2-silver/valente.svg" },
    ],
  },
  {
    key: "bronze",
    sponsors: [
      { name: "Agenda Ya", logo: "/assets/sponsors/1-bronze/agenda-ya.png" },
      { name: "Don Beto", logo: "/assets/sponsors/1-bronze/don-beto.jpeg" },
      { name: "Sadai Nails", logo: "/assets/sponsors/1-bronze/sadai-nails.jpg" },
      { name: "Tuxpeñitos", logo: "/assets/sponsors/1-bronze/tuxpeñitos.jpg" },
      { name: "Asesoría Financiera y Seguros", logo: "/assets/sponsors/1-bronze/asesoria-financiera-y-seguros.png" },
    ],
  },
]

function tierGridClass(key: string): string {
  switch (key) {
    case "diamond":
      return "grid-cols-1 max-w-md mx-auto"
    case "gold":
      return "grid-cols-1 max-w-md mx-auto"
    case "silver":
      return "grid-cols-2 sm:grid-cols-3 max-w-3xl mx-auto"
    case "bronze":
      return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-w-4xl mx-auto"
    default:
      return "grid-cols-2 sm:grid-cols-3 max-w-3xl mx-auto"
  }
}

function logoSizeClass(key: string): string {
  switch (key) {
    case "diamond":
      return "max-h-28 sm:max-h-36"
    case "gold":
      return "max-h-20 sm:max-h-24"
    case "silver":
      return "max-h-16 sm:max-h-20"
    case "bronze":
      return "max-h-12 sm:max-h-16"
    default:
      return "max-h-16"
  }
}

function tierHeadingSize(key: string): string {
  switch (key) {
    case "diamond":
      return "text-2xl sm:text-3xl"
    case "gold":
      return "text-xl sm:text-2xl"
    default:
      return "text-lg sm:text-xl"
  }
}

function tierAccent(key: string): string {
  switch (key) {
    case "diamond":
      return "bg-ocean"
    case "gold":
      return "bg-sunset"
    case "silver":
      return "bg-white/50"
    case "bronze":
      return "bg-[#CD7F32]"
    default:
      return "bg-navy/30"
  }
}

export default function Sponsors() {
  const { lang } = useLang()
  const t = COPY[lang]

  const visibleTiers = TIERS.filter((tier) => tier.sponsors.length > 0)

  return (
    <section id="patrocinadores" className="bg-navy-900 px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-[1100px]">
        <div className="reveal mb-14 text-center">
          <span className="inline-block rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-semibold text-white">
            {t.pill}
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest text-white">
            {t.h2}
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-lg leading-relaxed text-white/60">
            {t.sub}
          </p>
        </div>

        <div className="space-y-16">
          {visibleTiers.map((tier) => (
            <div key={tier.key} className="reveal">
              <div className="mb-6 flex items-center justify-center gap-3">
                <span className={`h-1 w-8 rounded-full ${tierAccent(tier.key)}`} />
                <h3
                  className={`${tierHeadingSize(tier.key)} font-semibold tracking-tight text-white`}
                >
                  {t[tier.key]}
                </h3>
                <span className={`h-1 w-8 rounded-full ${tierAccent(tier.key)}`} />
              </div>

              <div className={`grid ${tierGridClass(tier.key)} gap-4 sm:gap-5`}>
                {tier.sponsors.map((sponsor) => {
                  const Card = (
                    <div
                      key={sponsor.name}
                      className="flex flex-col items-center gap-4 rounded-2xl border border-navy/10 bg-white px-6 py-8 transition hover:border-navy/20 hover:shadow-md"
                    >
                      <div className="flex h-20 w-full items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          loading="lazy"
                          className={`${logoSizeClass(tier.key)} mx-auto w-auto object-contain object-center`}
                        />
                      </div>
                      <span className="text-[13px] font-medium text-navy/60">
                        {sponsor.name}
                      </span>
                    </div>
                  )

                  if (sponsor.href) {
                    return (
                      <a
                        key={sponsor.name}
                        href={sponsor.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {Card}
                      </a>
                    )
                  }

                  return Card
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
