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

      <div className="relative z-10 mx-auto max-w-[800px] px-6 py-12 flex flex-col">
        {/* Hero image - full width, maximal height */}
        <div className="w-full h-[50vh] overflow-hidden rounded-3xl shadow-2xl shadow-navy/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/7aniversario-gracias.webp"
            alt="7º Aniversario Playas on Tech"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Message section */}
        <div className="flex flex-col items-center text-center px-6 py-12">
          <h2 className="text-3xl font-bold leading-tight tracking-tightest text-white">
            ¡Gracias por ser parte de esta historia!
          </h2>

          <p className="mt-6 max-w-[50ch] text-lg leading-relaxed text-white/80">
            Este 7º aniversario fue posible gracias a ustedes: nuestro increíble equipo de voluntarios, 
            los patrocinadores que creyeron en nosotros, y cada asistente que hizo de este evento 
            una celebración inolvidable frente al mar.
          </p>

          <p className="mt-4 max-w-[50ch] text-lg leading-relaxed text-white/80">
            Juntos construimos algo especial. La comunidad tech del Pacífico mexicano sigue creciendo, 
            y cada meetup nos acerca un poco más.
          </p>

          <p className="mt-8 text-xl font-semibold text-white">
            ¡Nos vemos el próximo año!
          </p>

          {/* CTA */}
          <Link
            href="/"
            className="group mt-12 inline-flex items-center gap-2.5 rounded-full bg-sunset py-3 pl-6 pr-2 text-[16px] font-semibold text-white shadow-xl shadow-sunset/30 transition hover:bg-sunset-400 active:scale-[0.98]"
          >
            Volver al inicio
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/95 text-navy transition group-hover:rotate-45">
              <ArrowUpRight size={14} />
            </span>
          </Link>
        </div>

        {/* Postal footer */}
        <div className="mt-auto pt-8 border-t border-white/10 text-sm text-white/50 flex justify-between items-center px-6">
          <span>Playas on Tech · Manzanillo, Colima</span>
          <span>7º Aniversario</span>
        </div>
      </div>
    </section>
  );
}
