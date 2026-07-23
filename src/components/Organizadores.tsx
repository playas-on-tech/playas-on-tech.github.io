"use client";
import Link from "next/link";
import { ArrowUpRight } from "./SocialIcons";
import { useLang } from "@/lib/LangProvider";

const organizers = [
  { name: "Edson", img: "/assets/staff/edson.png" },
  { name: "H", img: "/assets/staff/h.png" },
  { name: "Juaneque", img: "/assets/staff/juaneque.png" },
  { name: "Kev", img: "/assets/staff/kev.png" },
  { name: "Mane", img: "/assets/staff/mane.png" },
  { name: "Mauricio", img: "/assets/staff/mauricio.png" },
  { name: "Danny", img: "/assets/staff/danny.png" },
  { name: "Franky", img: "/assets/staff/franky.png" },
];

const COPY = {
  es: {
    pill: "Organizadores",
    h2: "Hecho por voluntarios.",
    sub: "Cada edición de PlayasOnTech la organiza un grupo de voluntarios en su tiempo libre, por amor a la comunidad. Sin fines de lucro: solo ganas de juntar a quienes construyen tecnología en la costa.",
    ctaH3: "¿Te gustaría ser parte del equipo?",
    ctaBody:
      "Buscamos manos para organizar, dar charlas, conseguir venue y mucho más. No necesitas experiencia, solo ganas de aportar a la comunidad.",
    cta: "Quiero ser voluntario",
    ctaHref: "/?category=Staff#contacto",
  },
  en: {
    pill: "Organizers",
    h2: "Made by volunteers.",
    sub: "Every PlayasOnTech edition is put together by volunteers in their spare time, out of love for the community. Non-profit: just the desire to bring together those building tech on the coast.",
    ctaH3: "Want to join the team?",
    ctaBody:
      "We're looking for hands to organize, give talks, find venues and much more. No experience required, just the will to give back to the community.",
    cta: "I want to volunteer",
    ctaHref: "/en?category=Staff#contacto",
  },
} as const;

export default function Organizadores() {
  const { lang } = useLang();
  const t = COPY[lang];
  return (
    <section id="organizadores" className="bg-cream-100 px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        <div className="reveal mx-auto max-w-[640px] text-center">
          <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
            {t.pill}
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
            {t.h2}
          </h2>
          <p className="mx-auto mt-4 text-lg leading-relaxed text-navy/60">{t.sub}</p>
        </div>

        <div className="reveal mt-14">
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-10 sm:gap-x-16 max-w-2xl mx-auto justify-items-center">
            {organizers.map((person) => (
              <li key={person.name} className="flex flex-col items-center text-center w-24">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={person.img}
                  alt={person.name}
                  loading="lazy"
                  className="h-24 w-24 rounded-full object-cover ring-2 ring-white shadow-lg shadow-navy/10 transition duration-300 hover:-translate-y-1"
                />
                <span className="mt-4 font-semibold text-navy">{person.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal mt-16 flex flex-col items-center gap-6 rounded-3xl border border-navy/10 bg-navy px-8 py-10 text-center text-white">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">{t.ctaH3}</h3>
            <p className="mx-auto mt-2 max-w-[52ch] text-white/70">{t.ctaBody}</p>
          </div>
          <Link
            href={t.ctaHref}
            className="group inline-flex items-center gap-2.5 rounded-full bg-sunset py-2 pl-6 pr-2 text-[16px] font-semibold text-white transition hover:bg-sunset-400 active:scale-[0.98]"
          >
            {t.cta}
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy transition group-hover:rotate-45 shrink-0">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
