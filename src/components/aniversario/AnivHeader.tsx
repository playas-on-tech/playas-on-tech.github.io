"use client";

import Navbar from "../Navbar";
import { useTranslation } from "react-i18next";

export default function AnivHeader() {
  const { t } = useTranslation();

  return (
    <Navbar
      navLinks={t("aniversario.nav", { returnObjects: true }) as Array<{ href: string; label: string }>}
      ctaLabel={t("aniversario.header.reserve")}
      ctaHref={t("aniversario.header.registroHref")}
    />
  );
}
