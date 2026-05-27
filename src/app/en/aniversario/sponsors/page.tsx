import type { Metadata } from "next";
import Link from "next/link";
import AnivHeader from "@/components/aniversario/AnivHeader";
import Patrocinadores from "@/components/aniversario/Patrocinadores";
import Footer from "@/components/Footer";
import SiteEffects from "@/components/SiteEffects";
import { ArrowUpRight, ArrowRight } from "@/components/Icons";
import { anivEvent } from "@/components/aniversario/event";

export const metadata: Metadata = {
  title: "Sponsors · 7th Anniversary — Playas on Tech",
  description:
    "Sponsor Playas on Tech's 7th anniversary (July 18, 2026, Hotel Marbella, Manzanillo). Silver, Gold and Platinum packages, plus media partners.",
  openGraph: {
    title: "Sponsors · 7th Anniversary — Playas on Tech",
    description:
      "Bring your brand in front of the Mexican Pacific tech community. Silver, Gold, Platinum and media partner packages.",
    locale: "en_US",
    type: "website",
  },
};

export default function SponsorsEnPage() {
  const ev = anivEvent("en");
  return (
    <>
      <AnivHeader lang="en" />
      <main>
        <section className="mesh-hero grain relative overflow-hidden">
          <div className="blobs cine-field">
            <span className="blob blob-teal" />
            <span className="blob blob-ocean" />
            <span className="blob blob-aqua" />
            <span className="blob blob-sunset" />
          </div>
          <div className="relative z-10 mx-auto max-w-[900px] px-6 pb-32 pt-36 text-center">
            <Link
              href="/en/aniversario"
              className="cine cine-1 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
            >
              ← Back to 7th Anniversary
            </Link>
            <h1 className="cine cine-2 mt-6 text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[1] tracking-tightest text-white">
              Sponsor the{" "}
              <span className="text-ocean-300">7th anniversary.</span>
            </h1>
            <p className="cine cine-3 mx-auto mt-6 max-w-[54ch] text-lg leading-relaxed text-white/80 md:text-xl">
              {ev.dateLabel} · {ev.venue}, {ev.venueCity}. Put your brand in front of the Mexican
              Pacific tech community — pick the package that fits best.
            </p>
            <div className="cine cine-4 mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="#patrocinadores"
                className="group flex items-center gap-2.5 rounded-full bg-sunset py-2 pl-6 pr-2 text-[16px] font-semibold text-white shadow-xl shadow-sunset/30 transition hover:bg-sunset-400 active:scale-[0.98]"
              >
                See packages
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/95 text-navy transition group-hover:translate-x-0.5">
                  <ArrowRight size={16} />
                </span>
              </Link>
              <Link
                href="/en/aniversario#registro"
                className="group flex items-center gap-2.5 rounded-full border border-white/30 bg-white/5 py-2 pl-6 pr-2 text-[16px] font-semibold text-white glass transition hover:bg-white/10"
              >
                Reserve my seat
                <span className="grid h-9 w-9 place-items-center rounded-full bg-ocean text-white transition group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </div>
          </div>

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

        <Patrocinadores withHeader={false} lang="en" />
      </main>
      <Footer lang="en" />
      <SiteEffects />
    </>
  );
}
