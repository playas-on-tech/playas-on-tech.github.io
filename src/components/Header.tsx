"use client";

import Navbar from "./Navbar";
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
  const { lang } = useLang();
  const t = COPY[lang];

  return (
    <Navbar
      navLinks={[...t.nav]}
      ctaLabel={t.joinCta}
      ctaMobileLabel={t.joinCtaMobile}
      ctaHref={t.joinHref}
      logoHref="#top"
    />
  );
}
