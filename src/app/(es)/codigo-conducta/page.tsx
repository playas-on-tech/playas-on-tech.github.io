import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Código de Conducta — Playas on Tech",
  description:
    "Queremos que cada encuentro de Playas on Tech sea un espacio seguro y acogedor para todas las personas. Lee nuestro código de conducta.",
};

const esperado = [
  "Tratar a los demás con respeto y consideración.",
  "Contribuir a un ambiente amigable y colaborativo.",
  "Escuchar y valorar distintos puntos de vista y experiencias.",
];

const inaceptable = [
  "Acoso o intimidación en cualquier forma.",
  "Lenguaje o imágenes de contenido sexual o inapropiado.",
  "Comentarios discriminatorios o despectivos hacia otras personas.",
  "Interrumpir o sabotear charlas, actividades o conversaciones.",
];

export default function CodigoConductaPage() {
  return (
    <>
      <main>
        {/* Dark hero */}
        <section className="mesh-hero grain relative overflow-hidden">
          <div className="blobs cine-field">
            <span className="blob blob-teal" />
            <span className="blob blob-ocean" />
            <span className="blob blob-aqua" />
            <span className="blob blob-sunset" />
          </div>
          <div className="relative z-10 mx-auto max-w-[900px] px-6 pb-28 pt-28 text-center lg:pt-32">
            <Link
              href="/"
              className="cine cine-1 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
            >
              ← Volver al inicio
            </Link>
            <h1 className="cine cine-2 mt-6 text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-tightest text-white">
              Código de Conducta
            </h1>
            <p className="cine cine-3 mx-auto mt-5 max-w-[50ch] text-lg leading-relaxed text-white/80">
              Queremos que cada encuentro de Playas on Tech sea un espacio seguro y acogedor para
              todas las personas.
            </p>
          </div>
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

        {/* Content */}
        <section className="bg-cream px-6 py-24 lg:py-28">
          <div className="mx-auto max-w-[760px] space-y-12">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">Nuestro compromiso</h2>
              <p className="mt-3 text-lg leading-relaxed text-navy/70">
                Queremos que cada evento sea un espacio seguro y acogedor para todas las personas. No
                toleramos ninguna forma de acoso o discriminación por motivos de género, orientación
                sexual, discapacidad, apariencia, raza, edad o religión.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">Comportamiento esperado</h2>
              <ul className="mt-4 space-y-3 text-lg text-navy/70">
                {esperado.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">
                Comportamiento inaceptable
              </h2>
              <ul className="mt-4 space-y-3 text-lg text-navy/70">
                {inaceptable.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sunset" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">Cómo reportar</h2>
              <p className="mt-3 text-lg leading-relaxed text-navy/70">
                Si presencias o experimentas algún comportamiento que infrinja este código, acércate
                a cualquier miembro del equipo organizador. También puedes reportarlo de forma
                confidencial a través de nuestro Instagram:{" "}
                <a
                  href="https://www.instagram.com/playasontech_mzo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ocean underline-offset-4 hover:underline"
                >
                  @playasontech_mzo
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">Consecuencias</h2>
              <p className="mt-3 text-lg leading-relaxed text-navy/70">
                El equipo organizador tomará las medidas que considere necesarias, que pueden incluir
                una advertencia, la expulsión del evento o la prohibición de participar en futuros
                eventos.
              </p>
            </div>

            <p className="border-t border-navy/10 pt-8 text-lg leading-relaxed text-navy/60">
              Gracias por ayudarnos a mantener un espacio seguro y agradable para todos.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
