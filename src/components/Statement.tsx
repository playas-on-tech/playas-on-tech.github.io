import type { Lang } from "@/i18n/lang";

const COPY = {
  es: {
    lead: "Creemos que las mejores ideas nacen cuando la comunidad se junta —",
    trail: "cara a cara, sin jerarquías, con el mar de fondo.",
  },
  en: {
    lead: "We believe the best ideas are born when the community gets together —",
    trail: "face to face, no hierarchies, with the sea in the background.",
  },
} as const;

export default function Statement({ lang = "es" }: { lang?: Lang }) {
  const t = COPY[lang];
  return (
    <section className="bg-cream px-6 pb-24 pt-24 lg:pb-28 lg:pt-32">
      <div className="mx-auto max-w-[1100px]">
        <p className="reveal text-[clamp(1.9rem,4.4vw,3.6rem)] font-medium leading-[1.08] tracking-tightest text-navy">
          {t.lead}{" "}
          <span className="text-navy/40">{t.trail}</span>
        </p>
      </div>
    </section>
  );
}
