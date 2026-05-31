"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "./Icons";
import { useLang } from "@/lib/LangProvider";

const COPY = {
  es: {
    nav: [
      { href: "#comunidad", label: "Comunidad" },
      { href: "#eventos", label: "Eventos" },
      { href: "#venue", label: "Venue" },
      { href: "#videos", label: "Videos" },
      { href: "#donaciones", label: "Donaciones" },
      { href: "#contacto", label: "Contacto" },
    ],
    joinCta: "7º Aniversario",
    joinCtaMobile: "7º Aniv.",
    joinHref: "/aniversario",
  },
  en: {
    nav: [
      { href: "#comunidad", label: "Community" },
      { href: "#eventos", label: "Events" },
      { href: "#venue", label: "Venue" },
      { href: "#videos", label: "Videos" },
      { href: "#donaciones", label: "Donations" },
      { href: "#contacto", label: "Contact" },
    ],
    joinCta: "7th Anniversary",
    joinCtaMobile: "7th Aniv.",
    joinHref: "/aniversario",
  },
} as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { lang, setLang } = useLang();
  const t = COPY[lang];

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="mx-auto max-w-[1400px] px-3 min-[360px]:px-4 sm:px-6 lg:px-10 mt-4">
        <div
          className={`glass flex items-center justify-between rounded-full border px-2.5 min-[360px]:px-3 py-2 sm:px-4 sm:py-2.5 transition-all duration-300 ${
            scrolled
              ? "border-white/20 bg-navy-900/90 shadow-2xl shadow-navy-900/40"
              : "border-white/15 bg-white/10 shadow-lg shadow-navy/5"
          }`}
        >
          {/* Logo */}
          <Link href="#top" className="flex items-center gap-1.5 sm:gap-2 pl-1 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/app-icon.webp" alt="Playas on Tech" className="h-8 w-8 sm:h-9 sm:w-9 object-contain drop-shadow" />
            <span className="hidden min-[360px]:inline text-[15px] sm:text-[17px] font-bold tracking-tight text-white drop-shadow">
              Playas<span className="text-ocean-300">On</span>Tech
            </span>
          </Link>
          {/* Links */}
          <ul className="hidden items-center gap-7 text-[15px] font-medium text-white/90 lg:flex">
            {t.nav.map((link) => (
              <li key={link.href}>
                <Link className="transition hover:text-white" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Right */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}
              className="rounded-full border border-white/20 px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white shrink-0"
            >
              {lang === "es" ? "EN" : "ES"}
            </button>
            <Link
              href={t.joinHref}
              className="group flex items-center gap-1.5 sm:gap-2 rounded-full bg-sunset py-1 sm:py-1.5 pl-3 sm:pl-4 pr-1 sm:pr-1.5 text-xs sm:text-[15px] font-semibold text-white shadow-lg shadow-sunset/30 transition hover:bg-sunset-400 active:scale-[0.98] whitespace-nowrap"
            >
              <span className="hidden sm:inline">{t.joinCta}</span>
              <span className="sm:hidden">{t.joinCtaMobile}</span>
              <span className="grid h-6 w-6 sm:h-7 sm:w-7 place-items-center rounded-full bg-white text-navy transition group-hover:rotate-45 shrink-0">
                <ArrowUpRight size={12} className="sm:hidden" />
                <ArrowUpRight size={14} className="hidden sm:block" />
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
