import { ArrowUpRight } from "./Icons";

export default function Donaciones() {
  return (
    <section id="donaciones" className="px-6 py-10">
      <div className="mesh-cta grain relative mx-auto max-w-[1200px] overflow-hidden rounded-[2.5rem] px-8 py-20 text-center lg:py-28">
        <div className="blobs">
          <span className="blob blob-teal" />
          <span className="blob blob-ocean" />
          <span className="blob blob-aqua" />
          <span className="blob blob-sunset" style={{ opacity: 0.2 }} />
        </div>
        <div className="reveal relative z-10 mx-auto max-w-[680px]">
          <h2 className="text-[clamp(2rem,4.6vw,3.6rem)] font-600 leading-[1.06] tracking-tightest text-white">
            Ayúdanos a mantener la comunidad viva.
          </h2>
          <p className="mx-auto mt-5 max-w-[46ch] text-lg leading-relaxed text-white/80">
            Playas on Tech es 100% gratis. Tu donación cubre el venue, el café y el equipo para que
            sigamos reuniéndonos.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://www.paypal.com/paypalme/kevindperezm"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 rounded-full bg-white py-2 pl-6 pr-2 text-[16px] font-600 text-navy shadow-xl transition hover:bg-cream"
            >
              Donar con PayPal
              <span className="grid h-9 w-9 place-items-center rounded-full bg-sunset text-white transition group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </span>
            </a>
            <a
              href="https://patreon.com/PlayasOnTech"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-[16px] font-600 text-white glass transition hover:bg-white/10"
            >
              Apóyanos en Patreon
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
