import { ArrowUpRight, Check, MapPin } from "../Icons";
import { ANIV_EVENT } from "./event";

const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  ANIV_EVENT.mapQuery
)}&output=embed`;
const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ANIV_EVENT.mapQuery
)}`;

const amenities = [
  "Salón frente al mar",
  "Terraza para el brindis al atardecer",
  "Estacionamiento en el hotel",
];

export default function Ubicacion() {
  return (
    <section id="ubicacion" className="bg-cream px-6 py-28 lg:py-36">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2">
        <div className="reveal">
          <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-600 text-white">
            Ubicación
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-600 leading-[1.05] tracking-tightest">
            {ANIV_EVENT.venue}.
          </h2>
          <p className="mt-3 flex items-start gap-2 text-lg text-navy/60">
            <MapPin size={18} className="mt-1 shrink-0 text-ocean" />
            {ANIV_EVENT.venueAddress}
          </p>
          <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-navy/60">
            Celebramos el 7º aniversario en la zona hotelera de Manzanillo, justo frente al mar. Los
            detalles de acceso al salón se confirman al reservar tu lugar.
          </p>
          <ul className="mt-8 space-y-3 text-navy/70">
            {amenities.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-ocean/15 text-ocean">
                  <Check size={14} />
                </span>{" "}
                {item}
              </li>
            ))}
          </ul>
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-navy py-2 pl-6 pr-2 text-[15px] font-600 text-white transition hover:bg-navy-700"
          >
            Cómo llegar
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ocean text-white transition group-hover:rotate-45">
              <ArrowUpRight size={15} />
            </span>
          </a>
        </div>

        <div className="reveal relative overflow-hidden rounded-[2rem] border border-navy/10 shadow-xl shadow-navy/5">
          <iframe
            title={`Mapa — ${ANIV_EVENT.venue}, ${ANIV_EVENT.venueCity}`}
            src={mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[360px] w-full lg:h-[440px]"
          />
        </div>
      </div>
    </section>
  );
}
