"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Merch() {
  const { t } = useTranslation();
  return (
    <section id="merch" className="px-6 py-20 text-center">
      <div className="reveal mx-auto max-w-[680px]">
        <Image
          src="/assets/_k7x2m9f.jpeg"
          alt="Merch oficial 7o aniversario PlayasOnTech"
          width={680}
          height={850}
          sizes="420px"
          className="mx-auto w-full max-w-[420px] -rotate-2 rounded-2xl shadow-2xl shadow-navy-900/40"
        />
        <h2 className="mt-8 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.06] tracking-tightest text-navy">
          {t("merch.home.h2")}
        </h2>
        <Link
          href="/merch"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-[16px] font-semibold text-white shadow-xl transition hover:bg-ocean active:scale-[0.98]"
        >
          {t("merch.home.cta")} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
