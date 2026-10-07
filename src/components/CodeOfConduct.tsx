"use client";

import { useLang } from "@/lib/lang";
import Cta from "@/components/ui/Cta";

export default function CodeOfConduct() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden px-6 py-32 lg:py-44">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
        alt=""
        className="kenburns absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/30" />

      <div className="reveal relative z-10 mx-auto max-w-[900px] text-center">
        <h2 className="text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1.06] tracking-tightest text-white">
          {t("codeOfConduct.h2")}
        </h2>
        <p className="mx-auto mt-6 max-w-[48ch] text-lg leading-relaxed text-white/75">{t("codeOfConduct.sub")}</p>
        <Cta href={t("codeOfConduct.href")} dot="bg-white text-navy" className="mt-9">
          {t("codeOfConduct.cta")}
        </Cta>
      </div>
    </section>
  );
}
