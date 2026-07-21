"use client";

import Link from "next/link";
import { ArrowUpRight } from "./SocialIcons";

export default function AniversarioThankYou() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-cream px-6 py-12">
      <div className="max-w-[600px] w-full">
        {/* Postal card container */}
        <div className="relative rounded-lg overflow-hidden shadow-xl border-2 border-dashed border-ocean/30">
          {/* Stamp area */}
          <div className="absolute top-4 right-4 w-16 h-20 bg-sunset/10 rounded flex items-center justify-center border border-sunset/20">
            <span className="text-[10px] font-semibold text-sunset text-center leading-tight">
              PLAYAS<br/>ON<br/>TECH
            </span>
          </div>

          {/* Postmark */}
          <div className="absolute top-4 left-4 w-16 h-16 rounded-full border-2 border-navy/20 flex items-center justify-center">
            <span className="text-[8px] font-semibold text-navy/40 text-center leading-tight">
              MANZANILLO<br/>COL. MX<br/>★ 2026 ★
            </span>
          </div>

          {/* Image */}
          <div className="w-full h-64 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/7aniversario-gracias.webp"
              alt="7º Aniversario Playas on Tech"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Message area */}
          <div className="p-8 bg-cream">
            <h2 className="text-2xl font-bold text-navy mb-4">
              ¡Gracias por ser parte de esta historia!
            </h2>
            
            <p className="text-navy/70 leading-relaxed mb-6">
              Este 7º aniversario fue posible gracias a ustedes: nuestro increíble equipo de voluntarios, 
              los patrocinadores que creyeron en nosotros, y cada asistente que hizo de este evento 
              una celebración inolvidable frente al mar.
            </p>

            <p className="text-navy/70 leading-relaxed mb-8">
              Juntos construimos algo especial. La comunidad tech del Pacífico mexicano sigue creciendo, 
              y cada meetup nos acerca un poco más.
            </p>

            {/* Divider */}
            <div className="border-t border-ocean/20 my-6" />

            {/* CTA */}
            <Link
              href="/"
              className="group flex items-center gap-2 text-sunset font-semibold hover:text-sunset-400 transition"
            >
              Volver al inicio
              <ArrowUpRight size={16} className="transition group-hover:rotate-45" />
            </Link>

            {/* Postal details */}
            <div className="mt-8 pt-6 border-t border-ocean/10 text-xs text-navy/40">
              <div className="flex justify-between items-center">
                <span>Playas on Tech · Manzanillo, Colima</span>
                <span>7º Aniversario</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
