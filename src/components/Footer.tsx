"use client";
import Link from "next/link";
import { Instagram, Facebook, LinkedIn, X, TikTok } from "./SocialIcons";
import { useLang } from "@/lib/LangProvider";

const COPY = {
  es: {
    columns: [
      {
        title: "Navegación",
        links: [
          { href: "/#comunidad", label: "La comunidad tech de Manzanillo" },
          { href: "/#eventos", label: "Próximos meetups" },
          { href: "/#venue", label: "Dónde nos reunimos" },
          { href: "/#videos", label: "Charlas grabadas" },
          { href: "/#sobre-nosotros", label: "Quiénes somos" },
          { href: "/#contacto", label: "Contacto" },
        ],
      },
      {
        title: "Comunidad",
        links: [
          { href: "/codigo-conducta", label: "Código de conducta" },
          { href: "/#donaciones", label: "Apoya a la comunidad" },
          { href: "https://forms.gle/XwvZK3BVu2KdaNfWA", label: "Propón una charla" },
          { href: "/#organizadores", label: "Únete al equipo organizador" },
          { href: "/aniversario", label: "7º Aniversario" },
          { href: "/merch", label: "Merch" },
        ],
      },
    ],
    blurb: "Comunidad tech de Manzanillo, Colima. Meetups gratuitos de desarrolladores, diseñadores y founders cada dos meses, frente al mar — desde 2025.",
    copyright: "© 2026 PlayasOnTech · Manzanillo, Colima",
    termsLabel: "Términos y licencias",
    termsHref: "/terminos",
    handmade: "Hecho frente al mar, por la comunidad",
  },
  en: {
    columns: [
      {
        title: "Navigation",
        links: [
          { href: "/#comunidad", label: "The tech community of Manzanillo" },
          { href: "/#eventos", label: "Upcoming meetups" },
          { href: "/#venue", label: "Where we meet" },
          { href: "/#videos", label: "Recorded talks" },
          { href: "/#sobre-nosotros", label: "Who we are" },
          { href: "/#contacto", label: "Contact" },
        ],
      },
      {
        title: "Community",
        links: [
          { href: "/codigo-conducta", label: "Code of conduct" },
          { href: "/#donaciones", label: "Support the community" },
          { href: "https://forms.gle/XwvZK3BVu2KdaNfWA", label: "Propose a talk" },
          { href: "/#organizadores", label: "Join the organizing team" },
          { href: "/aniversario", label: "7th Anniversary" },
          { href: "/merch", label: "Merch" },
        ],
      },
    ],
    blurb: "Tech community of Manzanillo, Colima. Free meetups for developers, designers, and founders every two months, by the sea — since 2025.",
    copyright: "© 2026 PlayasOnTech · Manzanillo, Colima",
    termsLabel: "Terms and licenses",
    termsHref: "/terminos",
    handmade: "Made by the sea, by the community",
  },
} as const;

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/playasontech_mzo", Icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/playasontech", Icon: Facebook },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/playasontech", Icon: LinkedIn },
  { label: "X", href: "https://x.com/playasontech", Icon: X },
  { label: "TikTok", href: "https://www.tiktok.com/@playasontech", Icon: TikTok },
];

// Internal links use next/link; external (social) links render as plain anchors.
function FooterLink({ href, label }: { href: string; label: string }) {
  const className = "transition hover:text-white";
  if (href.startsWith("http")) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }
  return (
    <Link className={className} href={href}>
      {label}
    </Link>
  );
}

export default function Footer() {
  const { lang } = useLang();
  const t = COPY[lang];
  const topHref = "/#top";
  return (
    <footer className="bg-navy-900 px-6 pb-12 pt-24 text-white">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Link href={topHref} className="inline-flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/app-logo.webp" alt="PlayasOnTech" className="h-11 w-auto" />
            </Link>
            <p className="mt-5 max-w-[34ch] leading-relaxed text-white/55">{t.blurb}</p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                  >
                    <Icon size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {t.columns.map((column) => (
            <div key={column.title}>
              <div className="text-sm font-semibold text-white/40">{column.title}</div>
              <ul className="mt-4 space-y-3 text-white/80">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-white/10 pt-8 text-sm text-white/45 sm:flex-row sm:justify-between">
          <span>{t.copyright}</span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href={t.termsHref} className="transition hover:text-white">
              {t.termsLabel}
            </Link>
            <span>{t.handmade}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
