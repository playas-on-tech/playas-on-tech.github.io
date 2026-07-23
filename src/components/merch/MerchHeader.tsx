"use client";

import Navbar from "../Navbar";
import { useTranslation } from "react-i18next";

export default function MerchHeader() {
  const { t } = useTranslation();

  return <Navbar ctaLabel={t("merch.header.ctaLabel")} ctaHref={t("merch.header.ctaHref")} />;
}
