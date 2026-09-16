"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Footer from "./Footer";
import Fireworks from "./Fireworks";
import SiteEffects from "./SiteEffects";
import { ArrowUpRight } from "./Icons";
import { useLang } from "@/lib/LangProvider";

const PHOTOS = Array.from({ length: 10 }, (_, i) => `/assets/7aniversario/${i + 1}.webp`);
const SWIPE_THRESHOLD = 48;

const COPY = {
  es: {
    heroPill: "7º Aniversario · 18 julio 2026",
    heroTitle: "¡Gracias por celebrar con nosotros!",
    heroBody1:
      "Este 7º aniversario fue posible gracias a ustedes: el equipo de voluntarios, los patrocinadores que creyeron en nosotros y cada persona que asistió.",
    heroBody2:
      "La comunidad tech del Pacífico mexicano sigue creciendo, y cada meetup nos acerca un poco más.",
    galleryPill: "Galería",
    galleryTitle: "Revive la celebración.",
    gallerySub: "Los mejores momentos del 7º Aniversario en el Hotel Marbella, Manzanillo.",
    photoAlt: (n: number) => `Foto ${n} del 7º Aniversario de Playas on Tech`,
    openPhoto: (n: number) => `Ampliar foto ${n}`,
    merchPill: "Merch oficial",
    merchTitle: "Llévate la playera del 7º Aniversario.",
    merchBody: "Apoya a la comunidad comprando la playera oficial del evento.",
    merchCta: "Comprar merch",
    invitePill: "Nos vemos pronto",
    inviteTitle: "8º Aniversario · Julio 2027.",
    inviteBody:
      "La comunidad sigue activa todo el año: meetups, charlas y networking frente al mar.",
    inviteCta: "Volver al inicio",
    close: "Cerrar galería",
    prev: "Foto anterior",
    next: "Foto siguiente",
    download: "Descargar foto",
    counter: (n: number, total: number) => `${n} de ${total}`,
  },
  en: {
    heroPill: "7th Anniversary · July 18, 2026",
    heroTitle: "Thank you for celebrating with us!",
    heroBody1:
      "This 7th anniversary was possible thanks to you: the team of volunteers, the sponsors who believed in us, and everyone who attended.",
    heroBody2:
      "The tech community of the Mexican Pacific keeps growing, and every meetup brings us a little closer.",
    galleryPill: "Gallery",
    galleryTitle: "Relive the celebration.",
    gallerySub: "The best moments of the 7th Anniversary at Hotel Marbella, Manzanillo.",
    photoAlt: (n: number) => `Photo ${n} of the Playas on Tech 7th Anniversary`,
    openPhoto: (n: number) => `Enlarge photo ${n}`,
    merchPill: "Official merch",
    merchTitle: "Get the 7th Anniversary t-shirt.",
    merchBody: "Support the community by buying the official event t-shirt.",
    merchCta: "Buy merch",
    invitePill: "See you soon",
    inviteTitle: "8th Anniversary · July 2027.",
    inviteBody:
      "The community stays active all year: meetups, talks, and networking by the sea.",
    inviteCta: "Back to home",
    close: "Close gallery",
    prev: "Previous photo",
    next: "Next photo",
    download: "Download photo",
    counter: (n: number, total: number) => `${n} of ${total}`,
  },
} as const;

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ChevronIcon({ left = false }: { left?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={`h-5 w-5 ${left ? "rotate-180" : ""}`} aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

const sunsetCta =
  "group flex items-center gap-2.5 rounded-full bg-sunset py-2 pl-6 pr-2 text-[16px] font-semibold text-white shadow-xl shadow-sunset/30 transition hover:bg-sunset-400 active:scale-[0.98]";

const glassButton =
  "grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white";

export default function AniversarioThankYou() {
  const { lang } = useLang();
  const t = COPY[lang];
  const [index, setIndex] = useState<number | null>(null);
  const touchStartX = useRef(0);

  const step = (delta: number) =>
    setIndex((i) => ((i ?? 0) + delta + PHOTOS.length) % PHOTOS.length);

  // Lightbox: keyboard navigation + body scroll lock while open
  useEffect(() => {
    if (index === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <main>
      {/* Thank you */}
      <section className="mesh-hero grain relative overflow-hidden px-6 py-20 sm:py-28">
        <div className="blobs cine-field">
          <span className="blob blob-teal" />
          <span className="blob blob-ocean" />
          <span className="blob blob-aqua" />
          <span className="blob blob-sunset" />
        </div>
        <Fireworks />
        <div className="relative z-10 mx-auto max-w-[720px] text-center">
          <span className="cine cine-1 glass inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-ocean-300">
            {t.heroPill}
          </span>
          <h1 className="cine cine-2 mt-6 text-[clamp(2.2rem,6vw,3.8rem)] font-bold leading-[1.05] tracking-tightest text-white">
            {t.heroTitle}
          </h1>
          <p className="cine cine-3 mx-auto mt-6 max-w-[52ch] text-base leading-relaxed text-white/80 sm:text-lg">
            {t.heroBody1}
          </p>
          <p className="cine cine-4 mx-auto mt-4 max-w-[52ch] text-base leading-relaxed text-white/80 sm:text-lg">
            {t.heroBody2}
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-cream-100 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="reveal mb-10 flex flex-col items-start justify-between gap-6 sm:mb-14 md:flex-row md:items-end">
            <div>
              <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
                {t.galleryPill}
              </span>
              <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
                {t.galleryTitle}
              </h2>
            </div>
            <p className="max-w-[38ch] text-base leading-relaxed text-navy/60 sm:text-lg">{t.gallerySub}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {PHOTOS.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={t.openPhoto(i + 1)}
                className="reveal group block cursor-zoom-in overflow-hidden rounded-2xl border border-navy/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={t.photoAlt(i + 1)}
                  loading="lazy"
                  className="aspect-[3/2] w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Merch */}
      <section className="bg-cream-100 px-6 pb-20 sm:pb-24">
        <div className="reveal mx-auto flex max-w-[1100px] flex-col items-center gap-8 rounded-3xl border border-navy/10 bg-white p-6 shadow-sm sm:p-10 md:flex-row md:gap-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/_k7x2m9f.jpeg"
            alt={t.merchTitle}
            loading="lazy"
            className="aspect-[4/5] w-40 shrink-0 -rotate-2 rounded-2xl object-cover shadow-lg sm:w-48"
          />
          <div className="text-center md:text-left">
            <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
              {t.merchPill}
            </span>
            <h3 className="mt-4 text-[clamp(1.5rem,3vw,2.2rem)] font-semibold leading-[1.1] tracking-tightest">
              {t.merchTitle}
            </h3>
            <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-navy/60">
              {t.merchBody}
            </p>
            <div className="mt-6 flex justify-center md:justify-start">
              <Link href="/merch" className={sunsetCta}>
                {t.merchCta}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/95 text-navy transition group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Invitation for next year */}
      <section className="bg-cream-100 px-6 pb-20 sm:pb-24">
        <div className="reveal mesh-cta grain relative mx-auto max-w-[1100px] overflow-hidden rounded-[2.5rem] px-6 py-16 text-center sm:py-20">
          <div className="blobs">
            <span className="blob blob-teal" />
            <span className="blob blob-ocean" />
            <span className="blob blob-aqua" />
            <span className="blob blob-sunset" style={{ opacity: 0.2 }} />
          </div>
          <div className="relative z-10 mx-auto max-w-[560px]">
            <span className="glass inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-ocean-300">
              {t.invitePill}
            </span>
            <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.06] tracking-tightest text-white">
              {t.inviteTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-[42ch] text-base leading-relaxed text-white/80 sm:text-lg">
              {t.inviteBody}
            </p>
            <div className="mt-9 flex justify-center">
              <Link href="/" className={sunsetCta}>
                {t.inviteCta}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/95 text-navy transition group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <SiteEffects />

      {/* Lightbox */}
      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.galleryTitle}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900/95 p-4 backdrop-blur-sm"
          onClick={() => setIndex(null)}
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > SWIPE_THRESHOLD) step(dx < 0 ? 1 : -1);
          }}
        >
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-3 sm:p-4">
            <span className="px-2 text-sm font-medium text-white/70">
              {t.counter(index + 1, PHOTOS.length)}
            </span>
            <div className="flex gap-2">
              <a
                href={PHOTOS[index]}
                download
                aria-label={t.download}
                title={t.download}
                className={glassButton}
                onClick={(e) => e.stopPropagation()}
              >
                <DownloadIcon />
              </a>
              <button
                type="button"
                onClick={() => setIndex(null)}
                aria-label={t.close}
                title={t.close}
                className={glassButton}
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PHOTOS[index]}
            alt={t.photoAlt(index + 1)}
            className="max-h-[82vh] max-w-full rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label={t.prev}
            title={t.prev}
            className={`${glassButton} absolute left-2 top-1/2 -translate-y-1/2 sm:left-4`}
          >
            <ChevronIcon left />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label={t.next}
            title={t.next}
            className={`${glassButton} absolute right-2 top-1/2 -translate-y-1/2 sm:right-4`}
          >
            <ChevronIcon />
          </button>
        </div>
      )}
    </main>
  );
}
