import { ArrowUpRight, ArrowRight, ChevronDown } from "./Icons";

export default function Hero() {
  return (
    <section id="top" className="mesh-hero grain relative min-h-screen overflow-hidden">
      <div id="hero-blobs" className="blobs cine-field">
        <span className="blob blob-teal" />
        <span className="blob blob-ocean" />
        <span className="blob blob-aqua" />
        <span className="blob blob-sunset" />
      </div>
      <div
        id="hero-content"
        className="relative z-10 mx-auto flex min-h-screen max-w-[1100px] flex-col items-center justify-center px-6 pb-36 text-center lg:pb-40"
      >
        <h1 className="cine cine-1 max-w-[15ch] text-[clamp(2.6rem,7vw,6.2rem)] font-600 leading-[0.98] tracking-tightest text-white">
          La comunidad tech{" "}
          <span className="shimmer bg-gradient-to-r from-ocean-300 via-sunset-300 to-ocean-300 bg-clip-text text-transparent">
            frente al mar.
          </span>
        </h1>
        <p className="cine cine-2 mt-7 max-w-[46ch] text-lg leading-relaxed text-white/80 md:text-xl">
          Nos reunimos cada dos meses en Manzanillo para compartir ideas, aprender y conectar. Sin
          corbatas. Con olas.
        </p>
        <div className="cine cine-3 mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="#donaciones"
            className="group flex items-center gap-2.5 rounded-full bg-sunset py-2 pl-6 pr-2 text-[16px] font-600 text-white shadow-xl shadow-sunset/30 transition hover:bg-sunset-400"
          >
            Únete a la comunidad
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/95 text-navy transition group-hover:rotate-45">
              <ArrowUpRight size={16} />
            </span>
          </a>
          <a
            href="#eventos"
            className="group flex items-center gap-2.5 rounded-full border border-white/30 bg-white/5 py-2 pl-6 pr-2 text-[16px] font-600 text-white glass transition hover:bg-white/10"
          >
            Ver próximo evento
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ocean text-white transition group-hover:translate-x-0.5">
              <ArrowRight size={16} />
            </span>
          </a>
        </div>
      </div>

      {/* Spinning sticker badge */}
      <div className="cine cine-5 absolute right-[6%] bottom-[clamp(96px,13vw,190px)] z-10 hidden h-32 w-32 lg:block">
        <svg className="sticker h-full w-full" viewBox="0 0 200 200">
          <defs>
            <path id="badge" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
          </defs>
          <text
            fill="rgba(255,255,255,.85)"
            fontFamily="Manrope"
            fontSize="13.5"
            fontWeight="600"
            letterSpacing="2.5"
          >
            <textPath href="#badge" startOffset="0">
              GRATIS · CADA 2 MESES · FRENTE AL MAR ·{" "}
            </textPath>
          </text>
        </svg>
        <span className="absolute inset-0 grid place-items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/app-icon.webp" alt="" className="h-9 w-9 object-contain" />
        </span>
      </div>

      {/* Scroll cue */}
      <div className="cine cine-5 pointer-events-none absolute inset-x-0 bottom-[clamp(128px,14vw,168px)] z-[6] flex flex-col items-center gap-2 text-white/55">
        <span className="text-[11px] font-500 uppercase tracking-[0.3em]">Desliza</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>

      {/* Wavy divider into next section */}
      <svg
        className="wave-divider absolute inset-x-0 bottom-[-1px] z-[5]"
        viewBox="0 0 1440 130"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M-120,70 C140,130 380,8 620,52 C880,100 1140,132 1380,74 C1460,56 1520,62 1560,72 L1560,131 L-120,131 Z"
          fill="#FBF6EE"
        />
      </svg>
    </section>
  );
}
