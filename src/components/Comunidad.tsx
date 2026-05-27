const cards = [
  {
    title: "Aprender",
    gradient: "from-sunset-300 to-sunset",
    iconPath: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
    text: "Charlas y talleres de quienes construyen tecnología en la región y más allá. De lo práctico a lo experimental.",
  },
  {
    title: "Conectar",
    gradient: "from-ocean-400 to-ocean",
    iconPath:
      "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    text: "Conoce a la gente que está construyendo el futuro desde la costa. Las mejores colaboraciones empiezan con un café.",
  },
  {
    title: "Compartir",
    gradient: "from-sunset to-ocean",
    iconPath: "M3 11l19-9-9 19-2-8-8-2z",
    text: "¿Tienes algo que enseñar? El micrófono es tuyo. Propón una charla y comparte lo que sabes con la comunidad.",
  },
];

export default function Comunidad() {
  return (
    <section id="comunidad" className="bg-cream px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        <div className="reveal mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
              La comunidad
            </span>
            <h2 className="mt-5 max-w-[18ch] text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
              Comunidad de desarrolladores y creadores en el Pacífico mexicano.
            </h2>
          </div>
          <p className="max-w-[38ch] text-lg leading-relaxed text-navy/60">
            Programadores, diseñadores, founders, estudiantes y curiosos de Manzanillo, Colima y
            toda la costa. Nos juntamos para aprender, conectar y compartir tecnología — sin
            importar tu nivel. Vengas de donde vengas, aquí cabes.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="reveal tilt group rounded-3xl border border-navy/10 bg-cream-100 p-8 hover:shadow-2xl hover:shadow-navy/10"
            >
              <span
                className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${card.gradient} text-white`}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={card.iconPath} />
                </svg>
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{card.title}</h3>
              <p className="mt-3 leading-relaxed text-navy/60">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
