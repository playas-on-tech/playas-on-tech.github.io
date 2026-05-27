"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "./Icons";
import { type Lang, altLangHref } from "@/i18n/lang";

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
    joinCta: "Únete",
    joinHref: "#donaciones",
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
    joinCta: "Join",
    joinHref: "#donaciones",
  },
} as const;

export default function Header({ lang = "es" }: { lang?: Lang }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() ?? "/";

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

  const t = COPY[lang];
  const switchHref = altLangHref(pathname, lang);
  const switchLabel = lang === "es" ? "EN" : "ES";

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="mx-auto max-w-[1400px] px-6 lg:px-10 mt-4">
        <div
          className={`glass flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 ${
            scrolled
              ? "border-white/20 bg-navy-900/90 shadow-2xl shadow-navy-900/40"
              : "border-white/15 bg-white/10 shadow-lg shadow-navy/5"
          }`}
        >
          {/* Logo */}
          <Link href="#top" className="flex items-center gap-2 pl-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/app-icon.webp" alt="" className="h-9 w-9 object-contain drop-shadow" />
            <span className="text-[17px] font-bold tracking-tight text-white drop-shadow">
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
          <div className="flex items-center gap-2">
            <Link
              href={switchHref}
              aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}
              className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {switchLabel}
            </Link>
            <Link
              href={t.joinHref}
              className="group flex items-center gap-2 rounded-full bg-navy py-1.5 pl-4 pr-1.5 text-[15px] font-semibold text-white"
            >
              {t.joinCta}
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ocean text-white transition group-hover:rotate-45">
                <ArrowUpRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
