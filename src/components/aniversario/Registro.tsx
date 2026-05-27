import { ArrowUpRight } from "../Icons";
import { ANIV_EVENT } from "./event";
import EventbriteCheckout from "./EventbriteCheckout";

export default function Registro() {
  return (
    <section id="registro" className="px-6 py-10">
      <div className="mesh-cta grain relative mx-auto max-w-[1100px] overflow-hidden rounded-[2.5rem] px-6 py-20 text-center lg:py-24">
        <div className="blobs">
          <span className="blob blob-teal" />
          <span className="blob blob-ocean" />
          <span className="blob blob-aqua" />
          <span className="blob blob-sunset" style={{ opacity: 0.2 }} />
        </div>

        <div className="relative z-10 mx-auto max-w-[560px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-ocean-300 glass">
            Cupo limitado
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.06] tracking-tightest text-white">
            Aparta tu lugar.
          </h2>
          <p className="mx-auto mt-4 max-w-[42ch] text-lg leading-relaxed text-white/80">
            {ANIV_EVENT.dateLabel} · {ANIV_EVENT.timeLabel} · {ANIV_EVENT.venue}. El acceso es
            gratuito, pero el espacio es limitado.
          </p>

          <div className="mt-9 flex justify-center">
            <EventbriteCheckout className="group flex items-center gap-2.5 rounded-full bg-sunset py-2 pl-6 pr-2 text-[16px] font-semibold text-white shadow-xl shadow-sunset/30 transition hover:bg-sunset-400 active:scale-[0.98]">
              Reservar mi lugar
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/95 text-navy transition group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </span>
            </EventbriteCheckout>
          </div>
          <p className="mt-4 text-center text-xs text-white/45">
            Registro gestionado por Eventbrite.
          </p>
        </div>
      </div>
    </section>
  );
}
