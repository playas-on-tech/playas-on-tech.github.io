import Link from "next/link";

const footerColumns = [
  {
    title: "Navegación",
    links: [
      { href: "/#comunidad", label: "Comunidad" },
      { href: "/#eventos", label: "Eventos" },
      { href: "/#venue", label: "Venue" },
      { href: "/#videos", label: "Videos" },
    ],
  },
  {
    title: "Comunidad",
    links: [
      { href: "#", label: "Código de conducta" },
      { href: "/#donaciones", label: "Donaciones" },
      { href: "#", label: "Propón una charla" },
      { href: "/aniversario", label: "7º Aniversario" },
    ],
  },
  {
    title: "Redes",
    links: [
      { href: "https://www.instagram.com/playasontech_mzo", label: "Instagram" },
      { href: "https://twitter.com/PlayasOnTech", label: "X / Twitter" },
      { href: "https://www.facebook.com/playasontech", label: "Facebook" },
    ],
  },
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
  return (
    <footer className="bg-navy-900 px-6 pb-12 pt-24 text-white">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/#top" className="inline-flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/app-logo.webp" alt="Playas on Tech" className="h-11 w-auto" />
            </Link>
            <p className="mt-5 max-w-[34ch] leading-relaxed text-white/55">
              La comunidad de tecnología de Manzanillo, Colima. Cada dos meses, frente al mar.
            </p>
          </div>
          {footerColumns.map((column) => (
            <div key={column.title}>
              <div className="text-sm font-600 text-white/40">{column.title}</div>
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
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/45 sm:flex-row">
          <span>© 2026 Playas on Tech · Manzanillo, Colima</span>
          <span>Hecho con 🌊 por la comunidad</span>
        </div>
      </div>
    </footer>
  );
}
