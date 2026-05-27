import type { Lang } from "@/i18n/lang";

const COPY = {
  es: {
    lead: "Creemos que las mejores ideas nacen cuando la comunidad de desarrolladores se junta —",
    trail: "cara a cara, sin jerarquías, con el mar de fondo. Por eso, desde 2025, los meetups de Playas on Tech reúnen cada dos meses a quienes construyen tecnología en el Pacífico mexicano.",
  },
  en: {
    lead: "We believe the best ideas are born when the developer community gets together —",
    trail: "face to face, no hierarchies, with the sea in the background. That's why, since 2025, Playas on Tech meetups gather those building tech in the Mexican Pacific every two months.",
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
