import type { Lang } from "@/i18n/lang";

const COPY = {
  es: {
    stats: [
      { count: 6, color: "text-sunset", label: "ediciones desde 2025" },
      { count: 200, prefix: "+", color: "text-ocean", label: "asistentes en Manzanillo" },
      { count: 2, color: "text-sunset", label: "meses entre cada meetup" },
      { count: 100, suffix: "%", color: "text-ocean", label: "gratis · sin costo · abierta" },
    ],
  },
  en: {
    stats: [
      { count: 6, color: "text-sunset", label: "editions since 2025" },
      { count: 200, prefix: "+", color: "text-ocean", label: "attendees in Manzanillo" },
      { count: 2, color: "text-sunset", label: "months between each meetup" },
      { count: 100, suffix: "%", color: "text-ocean", label: "free · no cost · open" },
    ],
  },
} as const;

// `data-count` / `data-prefix` / `data-suffix` are read by SiteEffects to run
// the count-up animation when the strip scrolls into view.
export default function StatsStrip({ lang = "es" }: { lang?: Lang }) {
  const { stats } = COPY[lang];
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
