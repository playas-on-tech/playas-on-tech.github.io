"use client";

import { useLang } from "@/lib/lang";
import Navbar, { type NavItem } from "@/components/Navbar";

export default function Header() {
  const { t } = useLang();

  return (
    <Navbar
      navLinks={t("header.nav", { returnObjects: true }) as NavItem[]}
      ctaLabel={t("header.joinCta")}
      ctaMobileLabel={t("header.joinCtaMobile")}
      ctaHref={t("header.joinHref")}
      logoHref="#top"
      gateCta
    />
  );
}
