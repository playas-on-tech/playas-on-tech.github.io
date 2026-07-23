"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/LangProvider";

const COPY = {
  es: {
    pill: "Merch",
    title: "¡Compra ya tu merch del 7o aniversario!",
    subtitle: "Apoya a la comunidad adquiriendo la playera oficial del 7o aniversario.",
    price: "$300 MXN",
    cta: "Comprar ahora",
    deliveryTitle: "¿Cómo la recibo?",
    deliveryLocal: "En Colima: la recibes en la siguiente sesión de PlayasOnTech.",
    deliveryOther: "Fuera de Colima: en la próxima JSConf MX o la acordamos contigo.",
  },
  en: {
    pill: "Merch",
    title: "Get your 7th anniversary merch now!",
    subtitle: "Official PlayasOnTech seventh anniversary t-shirt. Exclusive design featuring the iconic community raccoon.",
    price: "$300 MXN",
    cta: "Buy now",
    deliveryTitle: "How do I get it?",
    deliveryLocal: "In Colima: pick it up at the next PlayasOnTech session.",
    deliveryOther: "Outside the state: at the next JSConf MX or we'll arrange it with you.",
  },
} as const;

export default function MerchSection() {
  const { lang } = useLang();
  const t = COPY[lang];

  return (
    <section id="top" className="mesh-hero grain relative overflow-hidden">
      <div className="blobs cine-field">
        <span className="blob blob-teal" />
        <span className="blob blob-ocean" />
        <span className="blob blob-aqua" />
        <span className="blob blob-sunset" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-6 pt-32 pb-40 sm:pt-36 lg:px-8 lg:pt-40 lg:pb-44">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-12">
          <div className="cine cine-1 flex-shrink-0 md:w-1/2">
            <div className="relative aspect-[4/5] w-full -rotate-2 rounded-2xl shadow-2xl shadow-navy-900/40">
              <Image
                src="/assets/_k7x2m9f.jpeg"
                alt="Merch oficial 7o aniversario PlayasOnTech"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="cine cine-2 flex flex-col justify-center md:w-1/2 mt-0 lg:mt-10">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.2rem)] font-semibold leading-[1.1] tracking-tightest">
                {t.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                {t.subtitle}
              </p>
              <p className="mt-5 text-center text-2xl font-bold text-ocean-400">{t.price}</p>

              <div className="mt-6 text-center">
                <Link
                  href="https://forms.gle/55wqvWws8pNncqHc7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-sunset px-6 py-3 text-[15px] font-semibold shadow-lg shadow-sunset/30 transition hover:bg-sunset-400 active:scale-[0.98]"
                >
                  {t.cta}
                </Link>
              </div>

              <div className="mt-8 border-t pt-6">
                <p className="text-sm font-semibold">{t.deliveryTitle}</p>
                <ul className="mt-2 space-y-1.5 text-sm">
                  <li>{t.deliveryLocal}</li>
                  <li>{t.deliveryOther}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
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
  );
}
