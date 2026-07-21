"use client";

import Link from "next/link";
import { ArrowUpRight } from "./SocialIcons";

export default function AniversarioThankYou() {
  return (
    <section className="mesh-hero grain relative min-h-screen overflow-hidden">
      <div className="blobs cine-field">
        <span className="blob blob-teal" />
        <span className="blob blob-ocean" />
        <span className="blob blob-aqua" />
        <span className="blob blob-sunset" />
      </div>

      <div className="relative z-10 mx-auto max-w-[600px] px-6 py-28">
        {/* Postal card */}
        <div className="rounded-3xl overflow-hidden shadow-2xl shadow-navy/20 border border-white/10 bg-white/5 glass">
          {/* Image */}
          <div className="w-full h-72 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/7aniversario-gracias.webp"
              alt="7º Aniversario Playas on Tech"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Message */}
          <div className="p-8 text-white">
            <h2 className="text-3xl font-bold leading-tight tracking-tightest">
              ¡Gracias por ser parte de esta historia!
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-white/80">
              Este 7º aniversario fue posible gracias a ustedes: nuestro increíble equipo de voluntarios, 
              los patrocinadores que creyeron en nosotros, y cada asistente que hizo de este evento 
              una celebración inolvidable frente al mar.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-white/80">
              Juntos construimos algo especial. La comunidad tech del Pacífico mexicano sigue creciendo, 
              y cada meetup nos acerca un poco más.
            </p>

            <p className="mt-6 text-xl font-semibold text-white">
              ¡Nos vemos el próximo año!
            </p>

            {/* CTA */}
            <Link
              href="/"
              className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-sunset py-3 pl-6 pr-2 text-[16px] font-semibold text-white shadow-xl shadow-sunset/30 transition hover:bg-sunset-400 active:scale-[0.98]"
            >
              Volver al inicio
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/95 text-navy transition group-hover:rotate-45">
                <ArrowUpRight size={14} />
              </span>
            </Link>

            {/* Postal footer */}
            <div className="mt-12 pt-6 border-t border-white/10 text-sm text-white/50 flex justify-between items-center">
              <span>Playas on Tech · Manzanillo, Colima</span>
              <span>7º Aniversario</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
