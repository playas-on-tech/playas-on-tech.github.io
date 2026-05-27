import Link from "next/link";
import { ArrowUpRight, ArrowRight, ChevronDown } from "./Icons";
import type { Lang } from "@/i18n/lang";

const COPY = {
  es: {
    h1a: "La comunidad tech",
    h1b: "frente al mar.",
    sub: "Nos reunimos cada dos meses en Manzanillo para compartir ideas, aprender y conectar. Sin corbatas. Con olas.",
    ctaPrimary: "Únete a la comunidad",
    ctaSecondary: "Ver próximo evento",
    sticker: "GRATIS · CADA 2 MESES · FRENTE AL MAR ·",
    scrollCue: "Desliza",
  },
  en: {
    h1a: "The tech community",
    h1b: "by the sea.",
    sub: "We meet every two months in Manzanillo to share ideas, learn and connect. No ties. With waves.",
    ctaPrimary: "Join the community",
    ctaSecondary: "See next event",
    sticker: "FREE · EVERY 2 MONTHS · BY THE SEA ·",
    scrollCue: "Scroll",
  },
} as const;

export default function Hero({ lang = "es" }: { lang?: Lang }) {
  const t = COPY[lang];
  const eventsHref = lang === "en" ? "/en#events" : "#eventos";
  const donationsHref = lang === "en" ? "/en#donations" : "#donaciones";
  return (
    <section id="top" className="mesh-hero grain relative min-h-screen overflow-hidden">
      <div id="hero-blobs" className="blobs cine-field">
        <span className="blob blob-teal" />
        <span className="blob blob-ocean" />
        <span className="blob blob-aqua" />
        <span className="blob blob-sunset" />
      </div>
      <div
        id="hero-content"
        className="relative z-10 mx-auto flex min-h-screen max-w-[1100px] flex-col items-center justify-center px-6 pb-36 text-center lg:pb-40"
      >
        <h1 className="cine cine-1 max-w-[15ch] text-[clamp(2.6rem,7vw,6.2rem)] font-semibold leading-[0.98] tracking-tightest text-white">
          {t.h1a}{" "}
          <span className="text-ocean-300">
            {t.h1b}
          </span>
        </h1>
        <p className="cine cine-2 mt-7 max-w-[46ch] text-lg leading-relaxed text-white/80 md:text-xl">
          {t.sub}
        </p>
        <div className="cine cine-3 mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href={donationsHref}
            className="group flex items-center gap-2.5 rounded-full bg-sunset py-2 pl-6 pr-2 text-[16px] font-semibold text-white shadow-xl shadow-sunset/30 transition hover:bg-sunset-400 active:scale-[0.98]"
          >
            {t.ctaPrimary}
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/95 text-navy transition group-hover:rotate-45">
              <ArrowUpRight size={16} />
            </span>
          </Link>
          <Link
            href={eventsHref}
            className="group flex items-center gap-2.5 rounded-full border border-white/30 bg-white/5 py-2 pl-6 pr-2 text-[16px] font-semibold text-white glass transition hover:bg-white/10"
          >
            {t.ctaSecondary}
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ocean text-white transition group-hover:translate-x-0.5">
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </div>

      {/* Spinning sticker badge */}
      <div className="cine cine-5 absolute right-[6%] bottom-[clamp(96px,13vw,190px)] z-10 hidden h-32 w-32 lg:block">
        <svg className="sticker h-full w-full" viewBox="0 0 200 200">
          <defs>
            <path id="badge" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
          </defs>
          <text
            fill="rgba(255,255,255,.85)"
            fontFamily="Manrope"
            fontSize="13.5"
            fontWeight="600"
            letterSpacing="2.5"
          >
            <textPath href="#badge" startOffset="0">
              {t.sticker}{" "}
            </textPath>
          </text>
        </svg>
        <span className="absolute inset-0 grid place-items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/app-icon.webp" alt="" className="h-9 w-9 object-contain" />
        </span>
      </div>

      {/* Scroll cue */}
      <div className="cine cine-5 pointer-events-none absolute inset-x-0 bottom-[clamp(128px,14vw,168px)] z-[6] flex flex-col items-center gap-2 text-white/55">
        <span className="text-[11px] font-medium uppercase tracking-[0.3em]">{t.scrollCue}</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>

      {/* Wavy divider into next section */}
      <svg
        className="wave-divider absolute inset-x-0 bottom-[-1px] z-[5]"
        viewBox="0 0 1440 130"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M-120,70 C140,130 380,8 620,52 C880,100 1140,132 1380,74 C1460,56 1520,62 1560,72 L1560,131 L-120,131 Z"
          fill="#FBF6EE"
        />
      </svg>
    </section>
  );
}
