import { ArrowUpRight } from "./Icons";

const navLinks = [
  { href: "#comunidad", label: "Comunidad" },
  { href: "#eventos", label: "Eventos" },
  { href: "#venue", label: "Venue" },
  { href: "#videos", label: "Videos" },
  { href: "#donaciones", label: "Donaciones" },
];

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="mx-auto max-w-[1400px] px-6 lg:px-10 mt-4">
        <div className="glass flex items-center justify-between rounded-full border border-white/15 bg-white/10 px-4 py-2.5 shadow-lg shadow-navy/5">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2 pl-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/app-icon.webp" alt="" className="h-9 w-9 object-contain drop-shadow" />
            <span className="text-[17px] font-700 tracking-tight text-white drop-shadow">
              Playas<span className="text-ocean-300">On</span>Tech
            </span>
          </a>
          {/* Links */}
          <ul className="hidden items-center gap-7 text-[15px] font-500 text-white/90 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a className="transition hover:text-white" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {/* Right */}
          <div className="flex items-center gap-2.5">
            <div className="hidden items-center rounded-full border border-white/20 p-0.5 text-[13px] font-600 sm:flex">
              <span className="rounded-full bg-white px-2.5 py-1 text-navy">ES</span>
              <span className="px-2.5 py-1 text-white/70">EN</span>
            </div>
            <a
              href="#donaciones"
              className="group flex items-center gap-2 rounded-full bg-navy py-1.5 pl-4 pr-1.5 text-[15px] font-600 text-white"
            >
              Únete
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ocean text-white transition group-hover:rotate-45">
                <ArrowUpRight size={14} />
              </span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
