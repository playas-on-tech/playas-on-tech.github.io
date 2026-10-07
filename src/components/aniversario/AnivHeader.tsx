"use client";

import { useLang } from "@/lib/lang";
import Navbar, { type NavItem } from "@/components/Navbar";

export default function AnivHeader() {
  const { t } = useLang();

  return (
    <Navbar
      navLinks={t("aniversario.nav", { returnObjects: true }) as NavItem[]}
      ctaLabel={t("aniversario.header.reserve")}
      ctaHref={t("aniversario.header.registroHref")}
    />
  );
}
