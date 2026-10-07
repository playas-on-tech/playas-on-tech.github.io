"use client";

import Navbar from "@/components/Navbar";
import { useLang } from "@/lib/lang";

export default function MerchHeader() {
  const { t } = useLang();

  return <Navbar ctaLabel={t("merch.header.ctaLabel")} ctaHref={t("merch.header.ctaHref")} />;
}
