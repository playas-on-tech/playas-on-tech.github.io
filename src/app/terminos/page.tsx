import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Términos y Licencias · PlayasOnTech",
  description:
    "PlayasOnTech es una comunidad independiente y sin fines de lucro en Manzanillo, Colima. Conoce nuestros términos: licencias CC BY 4.0, MIT y nuestra política de privacidad.",
  openGraph: {
    title: "Términos y Licencias · PlayasOnTech",
    description:
      "PlayasOnTech es una comunidad independiente y sin fines de lucro. Contenido bajo Creative Commons (CC BY 4.0), software bajo licencia MIT y política de privacidad.",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "https://playasontech.com/assets/metadata/og-playasontech.jpg",
        width: 1200,
        height: 630,
        alt: "PlayasOnTech — comunidad tech frente al mar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Términos y Licencias · PlayasOnTech",
    description:
      "PlayasOnTech es una comunidad independiente y sin fines de lucro. Contenido bajo Creative Commons (CC BY 4.0), software bajo licencia MIT y política de privacidad.",
    images: ["https://playasontech.com/assets/metadata/og-playasontech.jpg"],
  },
};

const CC_BY = "https://creativecommons.org/licenses/by/4.0/";
const REPO_LICENSE = "https://github.com/playas-on-tech/playas-on-tech.github.io/blob/main/LICENSE";

export default function TerminosPage() {
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
              Términos y licencias
            </h1>
            <p className="cine cine-3 mx-auto mt-5 max-w-[52ch] text-lg leading-relaxed text-white/80">
              Cómo opera PlayasOnTech y bajo qué condiciones compartimos todo lo que hacemos.
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
              <h2 className="text-2xl font-semibold tracking-tight text-navy">Quiénes somos</h2>
              <p className="mt-3 text-lg leading-relaxed text-navy/70">
                PlayasOnTech es una comunidad independiente y sin fines de lucro, organizada por un
                grupo de voluntarios en Manzanillo, Colima. No somos una empresa ni vendemos un
                producto: existimos para juntar a quienes construyen tecnología en la costa y
                compartir conocimiento de forma abierta y gratuita.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">Sin fines de lucro</h2>
              <p className="mt-3 text-lg leading-relaxed text-navy/70">
                Los eventos son gratuitos. Nos sostenemos con donaciones y patrocinios, y lo
                recaudado se destina únicamente a hacer posible la comunidad: venue, audio y video,
                café y producción. No se reparten utilidades; el trabajo de organización es
                voluntario.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">
                Contenido — Creative Commons (CC BY 4.0)
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-navy/70">
                Las charlas, slides, grabaciones y demás materiales de la comunidad se comparten bajo{" "}
                <a
                  href={CC_BY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ocean underline-offset-4 hover:underline"
                >
                  Creative Commons Attribution 4.0 (CC BY 4.0)
                </a>
                . Eres libre de copiar, compartir y adaptar el contenido, incluso con fines
                comerciales, siempre que des crédito a PlayasOnTech y a la persona ponente. El
                contenido de cada ponente le pertenece y se publica con su autorización.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">
                Software — Licencia MIT
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-navy/70">
                Las demos, herramientas y el código de este sitio son software libre bajo la{" "}
                <a
                  href={REPO_LICENSE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ocean underline-offset-4 hover:underline"
                >
                  licencia MIT
                </a>
                . Puedes usarlo, modificarlo y redistribuirlo libremente, conservando el aviso de
                copyright. Se ofrece &ldquo;tal cual&rdquo;, sin garantías.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">Código de conducta</h2>
              <p className="mt-3 text-lg leading-relaxed text-navy/70">
                Participar en cualquier actividad de PlayasOnTech implica aceptar nuestro{" "}
                <Link
                  href="/codigo-conducta"
                  className="font-semibold text-ocean underline-offset-4 hover:underline"
                >
                  código de conducta
                </Link>
                , que garantiza un espacio seguro y respetuoso para todas las personas.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">Aviso</h2>
              <p className="mt-3 text-lg leading-relaxed text-navy/70">
                Las marcas, logotipos y contenidos de ponentes y patrocinadores pertenecen a sus
                respectivos titulares. La información de eventos puede cambiar; confirma los detalles
                al registrarte. Esta comunidad se organiza con la mejor intención y los materiales se
                ofrecen para fines educativos y de divulgación.
              </p>
            </div>

            <p className="border-t border-navy/10 pt-8 text-lg leading-relaxed text-navy/60">
              ¿Dudas sobre estos términos? Escríbenos por{" "}
              <a
                href="https://www.instagram.com/playasontech_mzo"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ocean underline-offset-4 hover:underline"
              >
                Instagram
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
