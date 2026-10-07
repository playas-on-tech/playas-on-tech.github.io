"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang";
import Footer from "@/components/Footer";
import Fireworks from "@/components/Fireworks";
import SiteEffects from "@/components/SiteEffects";
import Blobs from "@/components/ui/Blobs";
import Cta from "@/components/ui/Cta";
import Lightbox from "@/components/ui/Lightbox";
import Pill from "@/components/ui/Pill";
import SectionHeader from "@/components/ui/SectionHeader";

const PHOTOS = Array.from({ length: 10 }, (_, i) => `/assets/7aniversario/${i + 1}.webp`);

export default function AniversarioThankYou() {
  const { t } = useLang();
  const [index, setIndex] = useState<number | null>(null);

  const step = (delta: number) => setIndex((i) => ((i ?? 0) + delta + PHOTOS.length) % PHOTOS.length);
  const copy = (key: string, options?: Record<string, unknown>) =>
    t(`aniversario.thankYou.${key}`, options);

  return (
    <main>
      {/* Thank you */}
      <section className="mesh-hero grain relative overflow-hidden px-6 py-20 sm:py-28">
        <Blobs />
        <Fireworks />
        <div className="relative z-10 mx-auto max-w-[720px] text-center">
          <Pill tone="ocean" size="hero" className="cine cine-1 glass border border-white/20">
            {copy("heroPill")}
          </Pill>
          <h1 className="cine cine-2 mt-6 text-[clamp(2.2rem,6vw,3.8rem)] font-bold leading-[1.05] tracking-tightest text-white">
            {copy("heroTitle")}
          </h1>
          <p className="cine cine-3 mx-auto mt-6 max-w-[52ch] text-base leading-relaxed text-white/80 sm:text-lg">
            {copy("heroBody1")}
          </p>
          <p className="cine cine-4 mx-auto mt-4 max-w-[52ch] text-base leading-relaxed text-white/80 sm:text-lg">
            {copy("heroBody2")}
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-cream-100 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeader
            pill={copy("galleryPill")}
            title={copy("galleryTitle")}
            sub={copy("gallerySub")}
            subClass="max-w-[38ch]"
            subSize="text-base sm:text-lg"
            className="reveal mb-10 sm:mb-14"
          />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {PHOTOS.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={copy("openPhoto", { n: i + 1 })}
                className="reveal group block cursor-zoom-in overflow-hidden rounded-2xl border border-navy/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={copy("photoAlt", { n: i + 1 })}
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
            alt={copy("merchTitle")}
            loading="lazy"
            className="aspect-[4/5] w-40 shrink-0 -rotate-2 rounded-2xl object-cover shadow-lg sm:w-48"
          />
          <div className="text-center md:text-left">
            <Pill>{copy("merchPill")}</Pill>
            <h3 className="mt-4 text-[clamp(1.5rem,3vw,2.2rem)] font-semibold leading-[1.1] tracking-tightest">
              {copy("merchTitle")}
            </h3>
            <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-navy/60">{copy("merchBody")}</p>
            <div className="mt-6 flex justify-center md:justify-start">
              <Cta href="/merch">{copy("merchCta")}</Cta>
            </div>
          </div>
        </div>
      </section>

      {/* Invitation for next year */}
      <section className="bg-cream-100 px-6 pb-20 sm:pb-24">
        <div className="reveal mesh-cta grain relative mx-auto max-w-[1100px] overflow-hidden rounded-[2.5rem] px-6 py-16 text-center sm:py-20">
          <Blobs dim className="blobs" />
          <div className="relative z-10 mx-auto max-w-[560px]">
            <Pill tone="ocean" size="hero" className="glass border border-white/20">
              {copy("invitePill")}
            </Pill>
            <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.06] tracking-tightest text-white">
              {copy("inviteTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-[42ch] text-base leading-relaxed text-white/80 sm:text-lg">
              {copy("inviteBody")}
            </p>
            <div className="mt-9 flex justify-center">
              <Cta href="/">{copy("inviteCta")}</Cta>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <SiteEffects />

      {index !== null && (
        <Lightbox
          src={PHOTOS[index]}
          alt={copy("galleryTitle")}
          labels={{
            close: copy("close"),
            prev: copy("prev"),
            next: copy("next"),
            download: copy("download"),
            counter: copy("counter", { n: index + 1, total: PHOTOS.length }),
          }}
          onClose={() => setIndex(null)}
          onStep={step}
        />
      )}
    </main>
  );
}
