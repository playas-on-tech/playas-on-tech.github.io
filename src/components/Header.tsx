"use client";

import Navbar from "./Navbar";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();

  return (
    <Navbar
      navLinks={t("header.nav", { returnObjects: true }) as Array<{ href: string; label: string }>}
      ctaLabel={t("header.joinCta")}
      ctaMobileLabel={t("header.joinCtaMobile")}
      ctaHref={t("header.joinHref")}
      logoHref="#top"
    />
  );
}
