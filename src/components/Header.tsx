"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "./Icons";

const navLinks = [
  { href: "#comunidad", label: "Comunidad" },
  { href: "#eventos", label: "Eventos" },
  { href: "#venue", label: "Venue" },
  { href: "#videos", label: "Videos" },
  { href: "#donaciones", label: "Donaciones" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="mx-auto max-w-[1400px] px-6 lg:px-10 mt-4">
        <div
          className={`glass flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 ${
            scrolled
              ? "border-white/20 bg-navy-900/90 shadow-2xl shadow-navy-900/40"
              : "border-white/15 bg-white/10 shadow-lg shadow-navy/5"
          }`}
        >
          {/* Logo */}
          <Link href="#top" className="flex items-center gap-2 pl-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/app-icon.webp" alt="" className="h-9 w-9 object-contain drop-shadow" />
            <span className="text-[17px] font-bold tracking-tight text-white drop-shadow">
              Playas<span className="text-ocean-300">On</span>Tech
            </span>
          </Link>
          {/* Links */}
          <ul className="hidden items-center gap-7 text-[15px] font-medium text-white/90 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link className="transition hover:text-white" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Right */}
          <div className="flex items-center gap-2.5">
            <Link
              href="#donaciones"
              className="group flex items-center gap-2 rounded-full bg-navy py-1.5 pl-4 pr-1.5 text-[15px] font-semibold text-white"
            >
              Únete
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ocean text-white transition group-hover:rotate-45">
                <ArrowUpRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
