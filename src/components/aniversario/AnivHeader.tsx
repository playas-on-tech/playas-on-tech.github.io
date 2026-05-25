import Link from "next/link";
import { ArrowUpRight } from "../Icons";
import { ANIV_NAV } from "./event";

export default function AnivHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="mx-auto max-w-[1400px] px-6 lg:px-10 mt-4">
        <div className="glass flex items-center justify-between rounded-full border border-white/15 bg-white/10 px-4 py-2.5 shadow-lg shadow-navy/5">
          {/* Logo → back home */}
          <Link href="/" className="flex items-center gap-2 pl-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/app-icon.webp" alt="" className="h-9 w-9 object-contain drop-shadow" />
            <span className="text-[17px] font-bold tracking-tight text-white drop-shadow">
              Playas<span className="text-ocean-300">On</span>Tech
            </span>
          </Link>
          {/* Section links */}
          <ul className="hidden items-center gap-7 text-[15px] font-medium text-white/90 lg:flex">
            {ANIV_NAV.map((link) => (
              <li key={link.href}>
                <Link className="transition hover:text-white" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Reservar */}
          <Link
            href="/aniversario#registro"
            className="group flex items-center gap-2 rounded-full bg-sunset py-1.5 pl-4 pr-1.5 text-[15px] font-semibold text-white shadow-lg shadow-sunset/30 transition hover:bg-sunset-400 active:scale-[0.98]"
          >
            Reservar
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-navy transition group-hover:rotate-45">
              <ArrowUpRight size={14} />
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
