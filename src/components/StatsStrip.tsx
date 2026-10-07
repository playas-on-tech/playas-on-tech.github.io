"use client";

import { useLang } from "@/lib/lang";
import { editionCount } from "@/lib/editions";

type Stat = {
  count: number;
  color: string;
  label: string;
  prefix?: string;
  suffix?: string;
};

// `data-count` / `data-prefix` / `data-suffix` are read by SiteEffects to run
// the count-up animation when the strip scrolls into view.
export default function StatsStrip() {
  const { t } = useLang();
  const stats = t("statsStrip.stats", { returnObjects: true }) as Omit<Stat, "count">[];
  const counts = [editionCount(), 200, 2, 100];

  return (
    <section className="border-y border-navy/10 bg-cream-100">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 divide-x divide-y divide-navy/10 md:grid-cols-4 md:divide-y-0">
        {stats.map((stat, i) => (
          <div key={stat.label} className="pop px-6 py-12 text-center">
            <div
              className={`text-[clamp(2.4rem,5vw,3.4rem)] font-bold tracking-tightest ${stat.color}`}
              data-count={counts[i]}
              data-prefix={stat.prefix}
              data-suffix={stat.suffix}
            >
              0
            </div>
            <div className="mt-1 text-sm font-medium text-navy/60">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
