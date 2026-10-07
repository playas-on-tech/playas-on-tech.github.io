"use client";

import Image from "next/image";
import { useLang } from "@/lib/lang";
import Blobs from "@/components/ui/Blobs";
import SmartLink from "@/components/ui/SmartLink";
import WaveDivider from "@/components/ui/WaveDivider";

export default function MerchSection() {
  const { t } = useLang();

  return (
    <section id="top" className="mesh-hero grain relative overflow-hidden">
      <Blobs />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6 pt-32 pb-40 sm:pt-36 lg:px-8 lg:pt-40 lg:pb-44">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-12">
          <div className="cine cine-1 flex-shrink-0 md:w-1/2">
            <div className="relative aspect-[4/5] w-full -rotate-2 rounded-2xl shadow-2xl shadow-navy-900/40">
              <Image
                src="/assets/_k7x2m9f.jpeg"
                alt="Merch oficial 7o aniversario PlayasOnTech"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="cine cine-2 flex flex-col justify-center md:w-1/2 mt-0 lg:mt-10">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.2rem)] font-semibold leading-[1.1] tracking-tightest">
                {t("merch.section.title")}
              </h2>
              <p className="mt-3 text-base leading-relaxed">{t("merch.section.subtitle")}</p>
              <p className="mt-5 text-center text-2xl font-bold text-ocean-400">{t("merch.section.price")}</p>

              <div className="mt-6 text-center">
                <SmartLink
                  href="https://forms.gle/55wqvWws8pNncqHc7"
                  className="inline-flex items-center gap-2 rounded-full bg-sunset px-6 py-3 text-[15px] font-semibold shadow-lg shadow-sunset/30 transition hover:bg-sunset-400 active:scale-[0.98]"
                >
                  {t("merch.section.cta")}
                </SmartLink>
              </div>

              <div className="mt-8 border-t pt-6">
                <p className="text-sm font-semibold">{t("merch.section.deliveryTitle")}</p>
                <ul className="mt-2 space-y-1.5 text-sm">
                  <li>{t("merch.section.deliveryLocal")}</li>
                  <li>{t("merch.section.deliveryOther")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WaveDivider />
    </section>
  );
}
