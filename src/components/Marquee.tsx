import { Fragment } from "react";

const words = ["Aprender", "Conectar", "Compartir", "Crear", "Reír", "Repetir"];

function Track({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      className="marquee__track"
      aria-hidden={ariaHidden || undefined}
      aria-label={ariaHidden ? undefined : "Aprender, conectar, compartir, crear, reír, repetir"}
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

export default function Marquee() {
  return (
    <section className="overflow-hidden border-y border-navy/10 bg-navy py-7 lg:py-9">
      <div className="marquee">
        <Track />
        <Track ariaHidden />
      </div>
    </section>
  );
}
