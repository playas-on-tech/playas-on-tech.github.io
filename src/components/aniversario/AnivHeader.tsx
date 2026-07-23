"use client";

import Navbar from "../Navbar";
import { anivNav } from "./event";
import { useLang } from "@/lib/LangProvider";

const COPY = {
  es: { reserve: "Reservar", registroHref: "/aniversario#registro" },
  en: { reserve: "Reserve", registroHref: "/aniversario#registro" },
} as const;

export default function AnivHeader() {
  const { lang } = useLang();
  const t = COPY[lang];
  const nav = anivNav(lang);

  return (
    <Navbar
      navLinks={[...nav]}
      ctaLabel={t.reserve}
      ctaHref={t.registroHref}
    />
  );
}
