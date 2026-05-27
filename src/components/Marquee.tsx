import { Fragment } from "react";
import type { Lang } from "@/i18n/lang";

const WORDS = {
  es: ["Aprender", "Conectar", "Compartir", "Crear", "Reír", "Repetir"],
  en: ["Learn", "Connect", "Share", "Create", "Laugh", "Repeat"],
} as const;

function Track({
  words,
  ariaLabel,
  ariaHidden,
}: {
  words: readonly string[];
  ariaLabel: string;
  ariaHidden?: boolean;
}) {
  return (
    <div
      className="marquee__track"
      aria-hidden={ariaHidden || undefined}
      aria-label={ariaHidden ? undefined : ariaLabel}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            className={`mx-7 text-[clamp(1.6rem,3.4vw,2.8rem)] font-bold ${
              i % 2 === 0 ? "text-white" : "text-outline-light"
            }`}
          >
            {word}
          </span>
          <span className={`text-2xl ${i % 2 === 0 ? "text-ocean-400" : "text-sunset"}`}>✦</span>
        </Fragment>
      ))}
    </div>
  );
}

export default function Marquee({ lang = "es" }: { lang?: Lang }) {
  const words = WORDS[lang];
  const ariaLabel = words.map((w) => w.toLowerCase()).join(", ");
  return (
    <section className="overflow-hidden border-y border-navy/10 bg-navy py-7 lg:py-9">
      <div className="marquee">
        <Track words={words} ariaLabel={ariaLabel} />
        <Track words={words} ariaLabel={ariaLabel} ariaHidden />
      </div>
    </section>
  );
}
