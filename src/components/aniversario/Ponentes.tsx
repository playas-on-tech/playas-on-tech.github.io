import { ArrowUpRight } from "../Icons";

// Line-up still being confirmed — these are slots, not fabricated people.
const slots = [
  { tag: "Keynote", gradient: "from-sunset-300 to-sunset" },
  { tag: "Charla", gradient: "from-ocean-400 to-ocean" },
  { tag: "Lightning talk", gradient: "from-ocean to-navy-700" },
  { tag: "Panel", gradient: "from-sunset to-ocean" },
];

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

export default function Ponentes() {
  return (
    <section id="ponentes" className="bg-cream-100 px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        <div className="reveal mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
              Ponentes
            </span>
            <h2 className="mt-5 max-w-[18ch] text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
              Las voces de la noche.
            </h2>
          </div>
          <p className="max-w-[38ch] text-lg leading-relaxed text-navy/60">
            Estamos cerrando el line-up del 7º aniversario. Vuelve pronto para conocer a los ponentes
            — o postula tu propia charla.
          </p>
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
              <div className="mt-5 text-lg font-semibold tracking-tight">Por anunciar</div>
              <span className="mt-3 inline-block rounded-full bg-navy/5 px-3 py-1 text-[12px] font-semibold text-navy/60">
                {slot.tag}
              </span>
            </div>
          ))}
        </div>

        <div className="reveal mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl border border-navy/10 bg-navy px-8 py-8 text-white sm:flex-row">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">¿Quieres subir al escenario?</h3>
            <p className="mt-1 text-white/70">Propón una charla para el 7º aniversario.</p>
          </div>
          <a
            href="https://www.instagram.com/playasontech_mzo"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex shrink-0 items-center gap-2.5 rounded-full bg-sunset py-2 pl-6 pr-2 text-[15px] font-semibold text-white transition hover:bg-sunset-400 active:scale-[0.98]"
          >
            Propón tu charla
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-navy transition group-hover:rotate-45">
              <ArrowUpRight size={15} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
