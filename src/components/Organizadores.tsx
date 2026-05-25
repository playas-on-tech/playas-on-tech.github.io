import { ArrowUpRight } from "./Icons";

const organizers = [
  { name: "Danny", img: "/assets/staff/danny.png" },
  { name: "Franky", img: "/assets/staff/franky.png" },
  { name: "H", img: "/assets/staff/h.png" },
  { name: "Juaneque", img: "/assets/staff/juaneque.png" },
  { name: "Kev", img: "/assets/staff/kev.png" },
  { name: "Dev sin sueldo", img: "/assets/staff/unpaid-dev.png" },
];

export default function Organizadores() {
  return (
    <section id="organizadores" className="bg-cream-100 px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        <div className="reveal mx-auto max-w-[640px] text-center">
          <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
            Organizadores
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
            Hecho por voluntarios.
          </h2>
          <p className="mx-auto mt-4 text-lg leading-relaxed text-navy/60">
            Cada edición de Playas on Tech la organiza un grupo de voluntarios en su tiempo libre,
            por amor a la comunidad. Sin fines de lucro: solo ganas de juntar a quienes construyen
            tecnología en la costa.
          </p>
        </div>

        <ul className="reveal mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {organizers.map((person) => (
            <li key={person.name} className="flex flex-col items-center text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={person.img}
                alt={person.name}
                loading="lazy"
                className="h-24 w-24 rounded-full object-cover ring-2 ring-white shadow-lg shadow-navy/10 transition duration-300 hover:-translate-y-1"
              />
              <span className="mt-4 font-semibold text-navy">{person.name}</span>
            </li>
          ))}
        </ul>

        <div className="reveal mt-16 flex flex-col items-center gap-6 rounded-3xl border border-navy/10 bg-navy px-8 py-10 text-center text-white">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">¿Te gustaría ser parte del equipo?</h3>
            <p className="mx-auto mt-2 max-w-[52ch] text-white/70">
              Buscamos manos para organizar, dar charlas, conseguir venue y mucho más. No necesitas
              experiencia, solo ganas de aportar a la comunidad.
            </p>
          </div>
          <a
            href="https://www.instagram.com/playasontech_mzo"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full bg-sunset py-2 pl-6 pr-2 text-[16px] font-semibold text-white transition hover:bg-sunset-400 active:scale-[0.98]"
          >
            Quiero ser voluntario
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy transition group-hover:rotate-45">
              <ArrowUpRight size={16} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
