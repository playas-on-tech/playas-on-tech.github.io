"use client";
import { useLang } from "@/lib/LangProvider";

const getEventCount = (): number => {
  const startDate = new Date(2019, 5, 1); // June 1, 2019
  const currentDate = new Date();
  const yearsDiff = currentDate.getFullYear() - startDate.getFullYear();
  const monthsDiff = currentDate.getMonth() - startDate.getMonth();
  const totalMonths = (yearsDiff * 12) + monthsDiff;
  return Math.floor(totalMonths / 2) + 1;
};

const getCOPY = (eventCount: number) => ({
  es: {
    stats: [
      { count: eventCount, color: "text-sunset", label: "ediciones desde 2019" },
      { count: 200, prefix: "+", color: "text-ocean", label: "asistentes en Manzanillo" },
      { count: 2, color: "text-sunset", label: "meses entre cada meetup" },
      { count: 100, suffix: "%", color: "text-ocean", label: "gratis · sin costo · abierta" },
    ],
  },
  en: {
    stats: [
      { count: eventCount, color: "text-sunset", label: "editions since 2019" },
      { count: 200, prefix: "+", color: "text-ocean", label: "attendees in Manzanillo" },
      { count: 2, color: "text-sunset", label: "months between each meetup" },
      { count: 100, suffix: "%", color: "text-ocean", label: "free · no cost · open" },
    ],
  },
} as const);

// `data-count` / `data-prefix` / `data-suffix` are read by SiteEffects to run
// the count-up animation when the strip scrolls into view.
export default function StatsStrip() {
  const { lang } = useLang();
  const eventCount = getEventCount();
  const { stats } = getCOPY(eventCount)[lang];
  return (
    <section className="border-y border-navy/10 bg-cream-100">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 divide-x divide-y divide-navy/10 md:grid-cols-4 md:divide-y-0">
        {stats.map((stat) => (
          <div key={stat.label} className="pop px-6 py-12 text-center">
            <div
              className={`text-[clamp(2.4rem,5vw,3.4rem)] font-bold tracking-tightest ${stat.color}`}
              data-count={stat.count}
              data-prefix={"prefix" in stat ? stat.prefix : undefined}
              data-suffix={"suffix" in stat ? stat.suffix : undefined}
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
