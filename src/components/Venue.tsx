"use client";

import { useLang } from "@/lib/lang";
import SectionHeader from "@/components/ui/SectionHeader";
import CheckList from "@/components/ui/CheckList";

export default function Venue() {
  const { t } = useLang();
  const features = t("venue.features", { returnObjects: true }) as string[];

  return (
    <section id="venue" className="bg-cream-100 px-6 py-28 lg:py-36">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2">
        <div className="reveal relative overflow-hidden rounded-[2rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/venue.webp"
            alt={t("venue.alt")}
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
          />
        </div>

        <div className="reveal">
          <SectionHeader
            pill={t("venue.pill")}
            title={t("venue.h2")}
            sub={t("venue.body")}
            layout="stack"
            subClass="mt-5 max-w-[44ch]"
          />
          <CheckList items={features} />
        </div>
      </div>
    </section>
  );
}
