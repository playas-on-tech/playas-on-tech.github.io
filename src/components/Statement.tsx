"use client";

import { useLang } from "@/lib/lang";

export default function Statement() {
  const { t } = useLang();

  return (
    <section className="bg-cream px-6 pb-24 pt-24 lg:pb-28 lg:pt-32">
      <div className="mx-auto max-w-[1100px]">
        <p className="reveal text-[clamp(1.9rem,4.4vw,3.6rem)] font-medium leading-[1.08] tracking-tightest text-navy">
          {t("statement.lead")} <span className="text-navy/40">{t("statement.trail")}</span>
        </p>
      </div>
    </section>
  );
}
