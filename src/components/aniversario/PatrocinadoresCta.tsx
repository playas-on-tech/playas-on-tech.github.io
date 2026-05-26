import Link from "next/link";
import { ArrowRight } from "../Icons";

const tiers = ["Silver · $5,000", "Gold · $10,000", "Platinum · $20,000", "Media partners"];

// Compact teaser on the main /aniversario page that links to the dedicated
// sponsors page (/aniversario/patrocinadores).
export default function PatrocinadoresCta() {
  return (
    <section id="patrocinadores" className="bg-cream-100 px-6 py-24 lg:py-28">
      <div className="reveal mx-auto max-w-[1100px] overflow-hidden rounded-[2rem] border border-navy/10 bg-navy px-8 py-12 text-center text-white lg:px-12 lg:py-16">
        <span className="inline-block rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-semibold text-ocean-300">
          Patrocinadores
        </span>
        <h2 className="mx-auto mt-5 max-w-[20ch] text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold leading-[1.08] tracking-tightest">
          Lleva tu marca al 7º aniversario.
        </h2>
        <p className="mx-auto mt-4 max-w-[52ch] text-lg leading-relaxed text-white/70">
          Paquetes desde $5,000 MXN — ayúdanos a hacer de esta edición de aniversario una noche memorable.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {tiers.map((tier) => (
            <span
              key={tier}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/80"
            >
              {tier}
            </span>
          ))}
        </div>
        <Link
          href="/aniversario/patrocinadores"
          className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-sunset py-2 pl-6 pr-2 text-[16px] font-semibold text-white transition hover:bg-sunset-400 active:scale-[0.98]"
        >
          Ver paquetes de patrocinio
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy transition group-hover:translate-x-0.5">
            <ArrowRight size={16} />
          </span>
        </Link>
      </div>
    </section>
  );
}
