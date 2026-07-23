"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function CodigoConductaContent() {
  const { t } = useTranslation();

  const esperado = t("codigoConducta.esperado", { returnObjects: true }) as string[];
  const inaceptable = t("codigoConducta.inaceptable", { returnObjects: true }) as string[];

  return (
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
            {t("codigoConducta.back")}
          </Link>
          <h1 className="cine cine-2 mt-6 text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-tightest text-white">
            {t("codigoConducta.h1")}
          </h1>
          <p className="cine cine-3 mx-auto mt-5 max-w-[50ch] text-lg leading-relaxed text-white/80">
            {t("codigoConducta.heroSub")}
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
            <h2 className="text-2xl font-semibold tracking-tight text-navy">{t("codigoConducta.compromisoH2")}</h2>
            <p className="mt-3 text-lg leading-relaxed text-navy/70">
              {t("codigoConducta.compromisoBody")}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-navy">{t("codigoConducta.esperadoH2")}</h2>
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
              {t("codigoConducta.inaceptableH2")}
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
            <h2 className="text-2xl font-semibold tracking-tight text-navy">{t("codigoConducta.reportarH2")}</h2>
            <p className="mt-3 text-lg leading-relaxed text-navy/70">
              {t("codigoConducta.reportarBody")}{" "}
              <a
                href={`mailto:${t("codigoConducta.reportarEmail")}`}
                className="font-semibold text-ocean underline-offset-4 hover:underline"
              >
                {t("codigoConducta.reportarEmail")}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-navy">{t("codigoConducta.consecuenciasH2")}</h2>
            <p className="mt-3 text-lg leading-relaxed text-navy/70">
              {t("codigoConducta.consecuenciasBody")}
            </p>
          </div>

          <p className="border-t border-navy/10 pt-8 text-lg leading-relaxed text-navy/60">
            {t("codigoConducta.closing")}
          </p>
        </div>
      </section>
    </main>
  );
}
