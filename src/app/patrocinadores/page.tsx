import type { Metadata } from "next";
import Link from "next/link";
import AnivHeader from "@/components/aniversario/AnivHeader";
import Patrocinadores from "@/components/aniversario/Patrocinadores";
import Footer from "@/components/Footer";
import SiteEffects from "@/components/SiteEffects";
import JsonLd from "@/components/JsonLd";
import { ArrowUpRight, ArrowRight } from "@/components/Icons";
import { ANIV_EVENT } from "@/components/aniversario/event";

export const metadata: Metadata = {
  title: "Patrocinadores · 7º Aniversario — Playas on Tech",
  description:
    "Patrocina el 7º aniversario de Playas on Tech (18 de julio de 2026, Hotel Marbella, Manzanillo). Paquetes Silver, Gold y Platinum, además de media partners.",
  alternates: {
    canonical: "/patrocinadores",
    languages: {
      "x-default": "https://playasontech.com/patrocinadores",
      "es-MX": "https://playasontech.com/patrocinadores",
      en: "https://playasontech.com/patrocinadores",
    },
  },
  openGraph: {
    title: "Patrocinadores · 7º Aniversario — Playas on Tech",
    description:
      "Lleva tu marca frente a la comunidad tech del Pacífico mexicano. Paquetes de patrocinio Silver, Gold, Platinum y Diamond, más opciones para media partners. ¡Conoce nuestros planes!",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "https://playasontech.com/assets/metadata/og-patrocinadores.jpg",
        width: 1200,
        height: 630,
        alt: "Patrocinadores 7º Aniversario Playas on Tech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patrocinadores · 7º Aniversario — Playas on Tech",
    description:
      "Lleva tu marca frente a la comunidad tech del Pacífico mexicano. Paquetes de patrocinio Silver, Gold, Platinum y Diamond, más opciones para media partners. ¡Conoce nuestros planes!",
    images: ["https://playasontech.com/assets/metadata/og-patrocinadores.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://playasontech.com/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "7º Aniversario",
      item: "https://playasontech.com/aniversario",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Patrocinadores",
      item: "https://playasontech.com/patrocinadores",
    },
  ],
};

export default function PatrocinadoresPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <AnivHeader />
      <main>
        {/* Dark hero — keeps the fixed glass header readable, then the warm
            cream sponsor section follows. */}
        <section className="mesh-hero grain relative overflow-hidden">
          <div className="blobs cine-field">
            <span className="blob blob-teal" />
            <span className="blob blob-ocean" />
            <span className="blob blob-aqua" />
            <span className="blob blob-sunset" />
          </div>
          <div className="relative z-10 mx-auto max-w-[900px] px-6 pb-32 pt-36 text-center">
            <Link
              href="/aniversario"
              className="cine cine-1 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
            >
              ← Volver al 7º Aniversario
            </Link>
            <h1 className="cine cine-2 mt-6 text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[1] tracking-tightest text-white">
              Patrocina el{" "}
              <span className="text-ocean-300">
                7º aniversario.
              </span>
            </h1>
            <p className="cine cine-3 mx-auto mt-6 max-w-[54ch] text-lg leading-relaxed text-white/80 md:text-xl">
              {ANIV_EVENT.dateLabel} · {ANIV_EVENT.venue}, {ANIV_EVENT.venueCity}. Pon tu marca
              frente a la comunidad tech del Pacífico mexicano — elige el paquete que mejor se adapte.
            </p>
            <div className="cine cine-4 mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="#paquetes"
                className="group flex items-center gap-2.5 rounded-full bg-sunset py-2 pl-6 pr-2 text-[16px] font-semibold text-white shadow-xl shadow-sunset/30 transition hover:bg-sunset-400 active:scale-[0.98]"
              >
                Ver paquetes
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/95 text-navy transition group-hover:translate-x-0.5">
                  <ArrowRight size={16} />
                </span>
              </Link>
              <Link
                href="/aniversario#registro"
                className="group flex items-center gap-2.5 rounded-full border border-white/30 bg-white/5 py-2 pl-6 pr-2 text-[16px] font-semibold text-white glass transition hover:bg-white/10"
              >
                Reservar mi lugar
                <span className="grid h-9 w-9 place-items-center rounded-full bg-ocean text-white transition group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </div>
          </div>

          {/* Wavy divider into the cream sponsors section */}
          <svg
            className="wave-divider absolute inset-x-0 bottom-[-1px] z-[5]"
            viewBox="0 0 1440 130"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M-120,70 C140,130 380,8 620,52 C880,100 1140,132 1380,74 C1460,56 1520,62 1560,72 L1560,131 L-120,131 Z"
              fill="#FCF9F3"
            />
          </svg>
        </section>

        <Patrocinadores withHeader={false} />
      </main>
      <Footer />
      <SiteEffects />
    </>
  );
}
