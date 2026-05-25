"use client";

import { useState } from "react";
import { ArrowUpRight } from "../Icons";
import { ANIV_EVENT } from "./event";

export default function Registro() {
  const [submitted, setSubmitted] = useState(false);

  // TODO: wire to a real backend (Formspree / API route / Supabase). For now
  // this just confirms locally so the flow can be demoed.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

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
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[13px] font-600 text-ocean-300 glass">
            Cupo limitado
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-600 leading-[1.06] tracking-tightest text-white">
            Aparta tu lugar.
          </h2>
          <p className="mx-auto mt-4 max-w-[42ch] text-lg leading-relaxed text-white/80">
            {ANIV_EVENT.dateLabel} · {ANIV_EVENT.timeLabel} · {ANIV_EVENT.venue}. El acceso es
            gratuito, pero el espacio es limitado.
          </p>

          {submitted ? (
            <div className="mt-9 rounded-3xl border border-white/15 bg-white/10 p-8 text-white glass">
              <div className="text-3xl">🌊</div>
              <h3 className="mt-3 text-xl font-600">¡Listo! Te apartamos un lugar.</h3>
              <p className="mt-2 text-white/75">
                Te enviaremos los detalles del 7º aniversario por correo. ¡Nos vemos frente al mar!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-9 flex flex-col gap-3 rounded-3xl border border-white/15 bg-white/10 p-5 text-left glass sm:p-6"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-500 text-white/70">Nombre</span>
                  <input
                    type="text"
                    name="nombre"
                    required
                    autoComplete="name"
                    placeholder="Tu nombre"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none transition focus:border-ocean-300 focus:bg-white/10"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-500 text-white/70">Correo</span>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="tu@correo.com"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none transition focus:border-ocean-300 focus:bg-white/10"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-sm font-500 text-white/70">
                  ¿Cuántos vienen?
                </span>
                <select
                  name="invitados"
                  defaultValue="1"
                  className="w-full appearance-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-ocean-300 focus:bg-white/10"
                >
                  <option value="1">Solo yo</option>
                  <option value="2">2 personas</option>
                  <option value="3">3 personas</option>
                  <option value="4">4 o más</option>
                </select>
              </label>
              <button
                type="submit"
                className="group mt-2 flex items-center justify-center gap-2.5 rounded-full bg-sunset py-3 text-[16px] font-600 text-white shadow-xl shadow-sunset/30 transition hover:bg-sunset-400"
              >
                Reservar mi lugar
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/95 text-navy transition group-hover:rotate-45">
                  <ArrowUpRight size={14} />
                </span>
              </button>
              <p className="mt-1 text-center text-xs text-white/45">
                Te escribiremos solo para este evento. Sin spam.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
