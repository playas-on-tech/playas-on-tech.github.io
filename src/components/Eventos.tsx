import { ArrowUpRight } from "./Icons";

const pastEditions = [
  {
    edition: "Edición #6",
    color: "text-sunset",
    title: "IA en la práctica + demos",
    meta: "Marzo 2026 · 48 asistentes",
  },
  {
    edition: "Edición #5",
    color: "text-ocean",
    title: "Carreras en tech desde la costa",
    meta: "Enero 2026 · 41 asistentes",
  },
  {
    edition: "Edición #4",
    color: "text-sunset",
    title: "Open source & comunidad",
    meta: "Noviembre 2025 · 37 asistentes",
  },
];

const nextEventDetails = [
  { label: "Fecha", value: "Por anunciar" },
  { label: "Hora", value: "17:00 hrs" },
  { label: "Lugar", value: "Manzanillo, Col." },
];

export default function Eventos() {
  return (
    <section id="eventos" className="bg-cream px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-600 text-white">
          Eventos
        </span>
        <h2 className="mt-5 max-w-[20ch] text-[clamp(2rem,4vw,3.2rem)] font-600 leading-[1.05] tracking-tightest">
          Nos vemos cada dos meses.
        </h2>

        {/* Next event card */}
        <div className="reveal mt-12 overflow-hidden rounded-[2rem] border border-navy/10 bg-navy text-white">
          <div className="grid md:grid-cols-[1.1fr_0.9fr]">
            <div className="p-9 lg:p-12">
              <span className="inline-flex items-center gap-2 rounded-full bg-ocean/20 px-3 py-1 text-[13px] font-600 text-ocean-300">
                <span className="h-1.5 w-1.5 rounded-full bg-ocean-400" /> Próximo encuentro
              </span>
              <h3 className="mt-6 text-[clamp(1.8rem,3vw,2.6rem)] font-600 leading-tight tracking-tight">
                Playas on Tech · Edición #7
              </h3>
              <p className="mt-4 max-w-[42ch] leading-relaxed text-white/70">
                Una tarde de charlas, networking y mar. Cupo limitado — aparta tu lugar y trae a
                alguien que quiera aprender.
              </p>
              <div className="mt-8 flex flex-wrap gap-6 text-sm">
                {nextEventDetails.map((detail) => (
                  <div key={detail.label}>
                    <div className="text-white/50">{detail.label}</div>
                    <div className="mt-1 font-600">{detail.value}</div>
                  </div>
                ))}
              </div>
              <a
                href="#"
                className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-sunset py-2 pl-6 pr-2 text-[15px] font-600 text-white transition hover:bg-sunset-400"
              >
                Reservar lugar
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-navy transition group-hover:rotate-45">
                  <ArrowUpRight size={15} />
                </span>
              </a>
            </div>
            <div className="mesh-cta grain relative min-h-[260px] overflow-hidden">
              <div className="blobs">
                <span className="blob blob-teal" style={{ opacity: 0.6 }} />
                <span className="blob blob-ocean" />
                <span className="blob blob-sunset" style={{ opacity: 0.25 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Past editions */}
        <div className="reveal mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pastEditions.map((edition) => (
            <div
              key={edition.edition}
              className="pop rounded-2xl border border-navy/10 bg-cream-100 p-6 hover:shadow-xl hover:shadow-navy/5"
            >
              <div className={`text-sm font-600 ${edition.color}`}>{edition.edition}</div>
              <div className="mt-2 font-600">{edition.title}</div>
              <div className="mt-1 text-sm text-navy/50">{edition.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
