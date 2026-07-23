"use client";

import Navbar from "../Navbar";
import { useLang } from "@/lib/LangProvider";

const COPY = {
  es: { ctaLabel: "7º Aniversario", ctaHref: "/aniversario" },
  en: { ctaLabel: "7th Anniversary", ctaHref: "/aniversario" },
} as const;

export default function MerchHeader() {
  const { lang } = useLang();
  const t = COPY[lang];

  return <Navbar ctaLabel={t.ctaLabel} ctaHref={t.ctaHref} />;
}
