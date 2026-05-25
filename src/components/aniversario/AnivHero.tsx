import { ArrowUpRight, ArrowRight, Calendar, Clock, MapPin } from "../Icons";
import { ANIV_EVENT } from "./event";
import Countdown from "./Countdown";

const facts = [
  { icon: Calendar, text: ANIV_EVENT.dateLabel },
  { icon: Clock, text: ANIV_EVENT.timeLabel },
  { icon: MapPin, text: `${ANIV_EVENT.venue}, ${ANIV_EVENT.venueCity}` },
];

export default function AnivHero() {
  return (
    <section id="top" className="mesh-hero grain relative overflow-hidden">
      <div className="blobs cine-field">
        <span className="blob blob-teal" />
        <span className="blob blob-ocean" />
        <span className="blob blob-aqua" />
        <span className="blob blob-sunset" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1100px] flex-col items-center justify-center px-6 pb-40 pt-32 text-center">
        <span className="cine cine-1 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[13px] font-600 text-ocean-300 glass">
          <span className="h-1.5 w-1.5 rounded-full bg-ocean-400" />
          {ANIV_EVENT.editionTag}
        </span>

        <h1 className="cine cine-2 mt-7 max-w-[16ch] text-[clamp(2.6rem,7vw,6rem)] font-600 leading-[0.98] tracking-tightest text-white">
          Celebramos nuestro 7º aniversario{" "}
          <span className="shimmer bg-gradient-to-r from-ocean-300 via-sunset-300 to-ocean-300 bg-clip-text text-transparent">
            frente al mar.
          </span>
        </h1>

        <p className="cine cine-3 mt-7 max-w-[48ch] text-lg leading-relaxed text-white/80 md:text-xl">
          Siete ediciones de comunidad, charlas y olas. Esta es la noche que lo celebra — una tarde
          especial de talks, networking y un brindis bajo el atardecer de Manzanillo.
        </p>

        {/* Date / time / venue */}
        <div className="cine cine-3 mt-8 flex flex-wrap items-center justify-center gap-3">
          {facts.map((fact) => (
            <span
              key={fact.text}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-500 text-white/85 glass"
            >
              <fact.icon size={16} className="text-ocean-300" />
              {fact.text}
            </span>
          ))}
        </div>

        <div className="cine cine-4 mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="#registro"
            className="group flex items-center gap-2.5 rounded-full bg-sunset py-2 pl-6 pr-2 text-[16px] font-600 text-white shadow-xl shadow-sunset/30 transition hover:bg-sunset-400"
          >
            Reservar mi lugar
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/95 text-navy transition group-hover:rotate-45">
              <ArrowUpRight size={16} />
            </span>
          </a>
          <a
            href="#programa"
            className="group flex items-center gap-2.5 rounded-full border border-white/30 bg-white/5 py-2 pl-6 pr-2 text-[16px] font-600 text-white glass transition hover:bg-white/10"
          >
            Ver programa
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ocean text-white transition group-hover:translate-x-0.5">
              <ArrowRight size={16} />
            </span>
          </a>
        </div>

        {/* Countdown */}
        <div className="cine cine-5 mt-14 w-full">
          <p className="mb-4 text-[11px] font-500 uppercase tracking-[0.3em] text-white/55">
            Faltan
          </p>
          <Countdown />
        </div>
      </div>

      {/* Wavy divider into next section */}
      <svg
        className="wave-divider absolute inset-x-0 bottom-[-1px] z-[5]"
        viewBox="0 0 1440 130"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M-120,70 C140,130 380,8 620,52 C880,100 1140,132 1380,74 C1460,56 1520,62 1560,72 L1560,131 L-120,131 Z"
          fill="#FBF6EE"
        />
      </svg>
    </section>
  );
}
