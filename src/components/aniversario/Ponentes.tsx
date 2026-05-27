import { ArrowUpRight } from "../Icons";
import type { Lang } from "@/i18n/lang";

const SLOTS = {
  es: [
    { tag: "Keynote", gradient: "from-sunset-300 to-sunset" },
    { tag: "Charla", gradient: "from-ocean-400 to-ocean" },
    { tag: "Lightning talk", gradient: "from-ocean to-navy-700" },
    { tag: "Panel", gradient: "from-sunset to-ocean" },
  ],
  en: [
    { tag: "Keynote", gradient: "from-sunset-300 to-sunset" },
    { tag: "Talk", gradient: "from-ocean-400 to-ocean" },
    { tag: "Lightning talk", gradient: "from-ocean to-navy-700" },
    { tag: "Panel", gradient: "from-sunset to-ocean" },
  ],
} as const;

const COPY = {
  es: {
    pill: "Ponentes",
    h2: "Las voces del evento.",
    sub: "Estamos cerrando el line-up del 7º aniversario. Vuelve pronto para conocer a los ponentes — o postula tu propia charla.",
    placeholder: "Por anunciar",
    ctaH3: "¿Quieres subir al escenario?",
    ctaBody: "Propón una charla para el 7º aniversario.",
    cta: "Propón tu charla",
  },
  en: {
    pill: "Speakers",
    h2: "The voices of the event.",
    sub: "We're closing the line-up for the 7th anniversary. Come back soon to meet the speakers — or submit your own talk.",
    placeholder: "To be announced",
    ctaH3: "Want to take the stage?",
    ctaBody: "Propose a talk for the 7th anniversary.",
    cta: "Propose your talk",
  },
} as const;

function PersonIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function Ponentes({ lang = "es" }: { lang?: Lang }) {
  const t = COPY[lang];
  const slots = SLOTS[lang];
  return (
    <section id="ponentes" className="bg-cream-100 px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        <div className="reveal mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
              {t.pill}
            </span>
            <h2 className="mt-5 max-w-[18ch] text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
              {t.h2}
            </h2>
          </div>
          <p className="max-w-[38ch] text-lg leading-relaxed text-navy/60">{t.sub}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {slots.map((slot, i) => (
            <div
              key={i}
              className="reveal tilt rounded-3xl border border-navy/10 bg-cream p-7 text-center hover:shadow-2xl hover:shadow-navy/10"
            >
              <span
                className={`mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br ${slot.gradient} text-white`}
              >
                <PersonIcon />
              </span>
              <div className="mt-5 text-lg font-semibold tracking-tight">{t.placeholder}</div>
              <span className="mt-3 inline-block rounded-full bg-navy/5 px-3 py-1 text-[12px] font-semibold text-navy/60">
                {slot.tag}
              </span>
            </div>
          ))}
        </div>

        <div className="reveal mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl border border-navy/10 bg-navy px-8 py-8 text-white sm:flex-row">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{t.ctaH3}</h3>
            <p className="mt-1 text-white/70">{t.ctaBody}</p>
          </div>
          <a
            href="https://forms.gle/XwvZK3BVu2KdaNfWA"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex shrink-0 items-center gap-2.5 rounded-full bg-sunset py-2 pl-6 pr-2 text-[15px] font-semibold text-white transition hover:bg-sunset-400 active:scale-[0.98]"
          >
            {t.cta}
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-navy transition group-hover:rotate-45">
              <ArrowUpRight size={15} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
