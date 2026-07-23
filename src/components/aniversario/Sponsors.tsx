"use client"
import { useTranslation } from "react-i18next"
import rawTiers from "@/data/sponsors.json"
import Image from "next/image"

type Sponsor = {
  name: string
  logo: string
  href?: string
}

type TierData = {
  key: "diamond" | "platinum" | "gold" | "silver" | "bronze"
  sponsors: Sponsor[]
}

const TIERS = rawTiers as TierData[]

function tierGridClass(key: string): string {
  switch (key) {
    case "diamond":
      return "grid-cols-1 mx-auto"
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
      return "max-h-[12rem]"
    default:
      return "max-h-24"
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
      return "bg-navy/30"
    case "bronze":
      return "bg-[#CD7F32]"
    default:
      return "bg-navy/30"
  }
}

export default function Sponsors() {
  const { t } = useTranslation()

  const visibleTiers = TIERS.filter((tier) => tier.sponsors.length > 0)

  return (
    <section id="patrocinadores" className="bg-white px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-[1100px]">
        <div className="reveal mb-14 text-center">
          <span className="inline-block rounded-full bg-navy/10 px-3.5 py-1.5 text-[13px] font-semibold text-navy">
            {t("aniversario.sponsors.pill")}
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest text-navy">
            {t("aniversario.sponsors.h2")}
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-lg leading-relaxed text-navy/60">
            {t("aniversario.sponsors.sub")}
          </p>
        </div>

        <div className="space-y-16">
          {visibleTiers.map((tier) => (
            <div key={tier.key} className="reveal">
              <div className="mb-6 flex items-center justify-center gap-3">
                <span className={`h-1 w-8 rounded-full ${tierAccent(tier.key)}`} />
                <h3
                  className={`${tierHeadingSize(tier.key)} font-semibold tracking-tight text-navy`}
                >
                  {t(`aniversario.sponsors.${tier.key}`)}
                </h3>
                <span className={`h-1 w-8 rounded-full ${tierAccent(tier.key)}`} />
              </div>

              <div className={`grid ${tierGridClass(tier.key)} gap-4 sm:gap-5`}>
                {tier.sponsors.map((sponsor) => {
                  const Card = (
                    <div
                      key={sponsor.name}
                      className="flex flex-col items-center gap-4 rounded-2xl border border-navy/10 bg-white px-6 py-8 shadow-sm transition hover:border-navy/20 hover:shadow-md"
                    >
                      <div className="flex min-h-20 w-full items-center justify-center">
                        <Image
                          width="0"
                          height="0"
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
