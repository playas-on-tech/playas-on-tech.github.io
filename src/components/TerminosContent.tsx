"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

const CC_BY = "https://creativecommons.org/licenses/by/4.0/";
const REPO_LICENSE = "https://github.com/playas-on-tech/playas-on-tech.github.io/blob/main/LICENSE";

export default function TerminosContent() {
  const { t } = useTranslation();

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
            {t("terminos.back")}
          </Link>
          <h1 className="cine cine-2 mt-6 text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-tightest text-white">
            {t("terminos.h1")}
          </h1>
          <p className="cine cine-3 mx-auto mt-5 max-w-[52ch] text-lg leading-relaxed text-white/80">
            {t("hero.sub")}
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
            <h2 className="text-2xl font-semibold tracking-tight text-navy">{t("terminos.somosH2")}</h2>
            <p className="mt-3 text-lg leading-relaxed text-navy/70">
              {t("terminos.somosBody")}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-navy">{t("terminos.lucroH2")}</h2>
            <p className="mt-3 text-lg leading-relaxed text-navy/70">
              {t("terminos.lucroBody")}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-navy">
              {t("terminos.ccH2")}
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-navy/70">
              {t("terminos.ccBody")}{" "}
              <a
                href={CC_BY}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ocean underline-offset-4 hover:underline"
              >
                {t("terminos.ccLink")}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-navy">
              {t("terminos.mitH2")}
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-navy/70">
              {t("terminos.mitBody")}{" "}
              <a
                href={REPO_LICENSE}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ocean underline-offset-4 hover:underline"
              >
                {t("terminos.mitLink")}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-navy">{t("terminos.conductaH2")}</h2>
            <p className="mt-3 text-lg leading-relaxed text-navy/70">
              {t("terminos.conductaBody")}{" "}
              <Link
                href="/codigo-conducta"
                className="font-semibold text-ocean underline-offset-4 hover:underline"
              >
                {t("terminos.conductaLink")}
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-navy">{t("terminos.avisoH2")}</h2>
            <p className="mt-3 text-lg leading-relaxed text-navy/70">
              {t("terminos.avisoBody")}
            </p>
          </div>

          <p className="border-t border-navy/10 pt-8 text-lg leading-relaxed text-navy/60">
            {t("terminos.closing")}
          </p>
        </div>
      </section>
    </main>
  );
}
