import { ArrowUpRight } from "./Icons";

export default function CodeOfConduct() {
  return (
    <section className="relative overflow-hidden px-6 py-32 lg:py-44">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
        alt=""
        className="kenburns absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/30" />
      <div className="reveal relative z-10 mx-auto max-w-[900px] text-center">
        <h2 className="text-[clamp(2rem,4.6vw,3.6rem)] font-600 leading-[1.06] tracking-tightest text-white">
          Una comunidad abierta, segura y para todos.
        </h2>
        <p className="mx-auto mt-6 max-w-[48ch] text-lg leading-relaxed text-white/75">
          Nos tomamos en serio que cada persona se sienta bienvenida. Por eso tenemos un código de
          conducta claro — léelo antes de venir.
        </p>
        <a
          href="#"
          className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-sunset py-2 pl-6 pr-2 text-[16px] font-600 text-white shadow-xl shadow-sunset/30 transition hover:bg-sunset-400"
        >
          Lee nuestro código de conducta
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy transition group-hover:rotate-45">
            <ArrowUpRight size={16} />
          </span>
        </a>
      </div>
    </section>
  );
}
