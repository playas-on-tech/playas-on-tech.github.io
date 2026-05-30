"use client";
import Link from "next/link";
import { useLang } from "@/lib/LangProvider";

const REPO_LICENSE = "https://github.com/playas-on-tech/playas-on-tech.github.io/blob/main/LICENSE";
const CC_BY = "https://creativecommons.org/licenses/by/4.0/";

type Term = {
  title: string;
  body: string;
  href?: string;
  external?: boolean;
  linkLabel?: string;
  icon: React.ReactNode;
};

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ICONS = {
  heart: (
    <svg {...iconProps}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3 5.5 5.5 0 0 0 12 5.5 5.5 5.5 0 0 0 7.5 3 5.5 5.5 0 0 0 2 8.5c0 2.29 1.5 4.04 3 5.5l7 7Z" />
    </svg>
  ),
  share: (
    <svg {...iconProps}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
    </svg>
  ),
  code: (
    <svg {...iconProps}>
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  ),
  shield: (
    <svg {...iconProps}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
};

const COPY = {
  es: {
    pill: "Sobre nosotros",
    h2: "Abiertos, sin fines de lucro.",
    intro:
      "Playas on Tech es una comunidad de tecnología independiente y sin fines de lucro, organizada por voluntarios en Manzanillo, Colima desde julio de 2025. Reunimos a desarrolladores, diseñadores y creadores del Pacífico mexicano en meetups gratuitos cada dos meses, frente al mar. Todo lo que hacemos es de libre acceso: los eventos, las grabaciones de las charlas y los materiales. Nos sostenemos con donaciones de la comunidad y patrocinios de empresas locales.",
    termsPrefix: "Consulta los",
    termsLink: "términos y licencias completos",
    termsHref: "/terminos",
    terms: [
      {
        title: "Sin fines de lucro",
        body: "Organizada por voluntarios y sostenida por la comunidad. Cero ánimo de lucro: lo recaudado vuelve al evento.",
        icon: ICONS.heart,
      },
      {
        title: "Contenido abierto",
        body: "Charlas, slides y grabaciones bajo Creative Commons (CC BY 4.0). Compártelas y reutilízalas dando crédito.",
        href: CC_BY,
        external: true,
        linkLabel: "CC BY 4.0",
        icon: ICONS.share,
      },
      {
        title: "Código abierto",
        body: "Las demos y este sitio son software libre bajo licencia MIT. Úsalo, apréndelo, mejóralo.",
        href: REPO_LICENSE,
        external: true,
        linkLabel: "Licencia MIT",
        icon: ICONS.code,
      },
      {
        title: "Código de conducta",
        body: "Un espacio seguro para todas las personas. Participar implica respetar nuestro código de conducta.",
        href: "/codigo-conducta",
        linkLabel: "Leer el código",
        icon: ICONS.shield,
      },
    ] as Term[],
  },
  en: {
    pill: "About us",
    h2: "Open, non-profit.",
    intro:
      "Playas on Tech is an independent, non-profit tech community, organized by volunteers in Manzanillo, Colima since July 2025. We gather developers, designers, and creators from the Mexican Pacific in free meetups every two months, by the sea. Everything we do is freely accessible: events, talk recordings, and materials. We sustain ourselves through community donations and sponsorships from local businesses.",
    termsPrefix: "See the",
    termsLink: "full terms and licenses",
    termsHref: "/terminos",
    terms: [
      {
        title: "Non-profit",
        body: "Organized by volunteers and sustained by the community. Zero profit motive: everything raised goes back to the event.",
        icon: ICONS.heart,
      },
      {
        title: "Open content",
        body: "Talks, slides and recordings under Creative Commons (CC BY 4.0). Share and reuse them with attribution.",
        href: CC_BY,
        external: true,
        linkLabel: "CC BY 4.0",
        icon: ICONS.share,
      },
      {
        title: "Open source",
        body: "The demos and this site are free software under the MIT license. Use it, learn it, improve it.",
        href: REPO_LICENSE,
        external: true,
        linkLabel: "MIT license",
        icon: ICONS.code,
      },
      {
        title: "Code of conduct",
        body: "A safe space for everyone. Participating means respecting our code of conduct.",
        href: "/codigo-conducta",
        linkLabel: "Read the code",
        icon: ICONS.shield,
      },
    ] as Term[],
  },
} as const;

function TermLink({ term }: { term: Term }) {
  if (!term.href) return null;
  const label = (
    <>
      {term.linkLabel}
      <span aria-hidden="true"> →</span>
    </>
  );
  const className = "mt-3 inline-block text-sm font-semibold text-ocean underline-offset-4 hover:underline";
  if (term.external) {
    return (
      <a href={term.href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    );
  }
  return (
    <Link href={term.href} className={className}>
      {label}
    </Link>
  );
}

export default function SobreNosotros() {
  const { lang } = useLang();
  const t = COPY[lang];
  return (
    <section id="sobre-nosotros" className="bg-cream px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1100px]">
        <div className="reveal max-w-[680px]">
          <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
            {t.pill}
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
            {t.h2}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-navy/60">{t.intro}</p>
        </div>

        <div className="reveal mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.terms.map((term) => (
            <div
              key={term.title}
              className="rounded-2xl border border-navy/10 bg-cream-100 p-6"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-ocean/12 text-ocean">
                {term.icon}
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-navy">{term.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/60">{term.body}</p>
              <TermLink term={term} />
            </div>
          ))}
        </div>

        <p className="reveal mt-8 text-navy/60">
          {t.termsPrefix}{" "}
          <Link href={t.termsHref} className="font-semibold text-ocean underline-offset-4 hover:underline">
            {t.termsLink}
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
