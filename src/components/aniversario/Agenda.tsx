export default function Agenda() {
  return (
    <section id="programa" className="bg-cream px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[820px]">
        <div className="reveal mb-14 text-center">
          <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
            Programa
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
            Agenda del evento
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-lg leading-relaxed text-navy/60">
            Una tarde-noche para aprender, conectar y celebrar nuestro 7º Aniversario.
          </p>
        </div>

        <div className="reveal rounded-3xl border border-navy/10 bg-cream-100 p-8 text-center sm:p-12 shadow-sm">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean/10 text-ocean text-xl mb-6">
            ⏳
          </span>
          <h3 className="text-2xl font-semibold tracking-tight text-navy">Próximamente</h3>
          <p className="mx-auto mt-4 max-w-[44ch] leading-relaxed text-navy/60">
            Estamos afinando los últimos detalles del programa. Muy pronto revelaremos la agenda completa con todas las charlas, ponentes y sorpresas preparadas para esta gran celebración.
          </p>
        </div>
      </div>
    </section>
  );
}
