const agenda = [
  {
    time: "17:00",
    title: "Registro y bienvenida",
    desc: "Acreditaciones y café de bienvenida frente al mar.",
  },
  {
    time: "17:30",
    title: "Apertura: 7 años de comunidad",
    desc: "Un recuento de cómo empezó todo y hacia dónde vamos.",
  },
  {
    time: "17:50",
    title: "Charla principal",
    desc: "Keynote de aniversario. Ponente por confirmar.",
    highlight: true,
  },
  {
    time: "18:35",
    title: "Lightning talks de la comunidad",
    desc: "Charlas relámpago de 5 minutos. Convocatoria abierta.",
  },
  {
    time: "19:10",
    title: "Panel: construir tech desde la costa",
    desc: "Conversación con founders y devs del Pacífico mexicano.",
  },
  {
    time: "19:50",
    title: "Networking + snacks",
    desc: "Conecta con la comunidad mientras cae la tarde.",
  },
  {
    time: "20:20",
    title: "Brindis de aniversario",
    desc: "Celebramos siete ediciones juntos, bajo el atardecer.",
    highlight: true,
  },
  { time: "21:00", title: "Cierre", desc: "Nos vemos en la próxima edición." },
];

export default function Agenda() {
  return (
    <section id="programa" className="bg-cream px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[820px]">
        <div className="reveal mb-14 text-center">
          <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
            Programa
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
            La noche, hora por hora.
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-lg leading-relaxed text-navy/60">
            Una tarde-noche para aprender, conectar y celebrar. El programa puede ajustarse conforme
            confirmamos ponentes.
          </p>
        </div>

        <ol className="reveal relative space-y-3 border-l border-navy/15 pl-6 sm:pl-8">
          {agenda.map((item) => (
            <li key={item.time} className="relative">
              <span
                className={`absolute -left-[31px] top-2 grid h-4 w-4 place-items-center rounded-full ring-4 ring-cream sm:-left-[39px] ${
                  item.highlight ? "bg-sunset" : "bg-ocean"
                }`}
              />
              <div
                className={`rounded-2xl border p-5 transition sm:p-6 ${
                  item.highlight
                    ? "border-sunset/30 bg-sunset/5"
                    : "border-navy/10 bg-cream-100"
                }`}
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-sm font-bold tabular-nums text-ocean">{item.time}</span>
                  <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                </div>
                <p className="mt-1.5 leading-relaxed text-navy/60">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
