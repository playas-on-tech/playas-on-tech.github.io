"use client";
import { useTranslation } from "react-i18next";

const getEventCount = (): number => {
  const startDate = new Date(2019, 5, 1); // June 1, 2019
  const currentDate = new Date();
  const yearsDiff = currentDate.getFullYear() - startDate.getFullYear();
  const monthsDiff = currentDate.getMonth() - startDate.getMonth();
  const totalMonths = (yearsDiff * 12) + monthsDiff;
  return Math.floor(totalMonths / 2) + 1;
};

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
  const { t } = useTranslation();
  const eventCount = getEventCount();
  const statsData = t("statsStrip.stats", { returnObjects: true }) as Array<{ color: string; label: string; prefix?: string; suffix?: string }>;
  const stats: Stat[] = [
    { count: eventCount, ...statsData[0] },
    { count: 200, ...statsData[1] },
    { count: 2, ...statsData[2] },
    { count: 100, ...statsData[3] },
  ];
  return (
    <section className="border-y border-navy/10 bg-cream-100">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 divide-x divide-y divide-navy/10 md:grid-cols-4 md:divide-y-0">
        {stats.map((stat) => (
          <div key={stat.label} className="pop px-6 py-12 text-center">
            <div
              className={`text-[clamp(2.4rem,5vw,3.4rem)] font-bold tracking-tightest ${stat.color}`}
              data-count={stat.count}
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
