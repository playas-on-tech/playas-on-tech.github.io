"use client";

import { useLang } from "@/lib/lang";
import { Plus } from "@/components/Icons";
import SectionHeader from "@/components/ui/SectionHeader";

type Item = { q: string; a: string };

export default function FAQ() {
  const { t } = useLang();
  const items = t("faq.items", { returnObjects: true }) as Item[];

  return (
    <section id="faq" className="bg-cream-100 px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeader
          pill={t("faq.pill")}
          title={t("faq.h2")}
          sub={t("faq.sub")}
          titleClass="max-w-[22ch]"
          subClass="max-w-[38ch]"
          className="reveal mb-14"
        />

        <ul className="reveal divide-y divide-navy/10 rounded-3xl border border-navy/10 bg-cream">
          {items.map((item) => (
            <li key={item.q}>
              <details className="group px-6 py-5 md:px-8 md:py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-lg font-semibold tracking-tight text-navy [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ocean/12 text-ocean transition-transform duration-200 group-open:rotate-45">
                    <Plus size={14} />
                  </span>
                </summary>
                <p className="mt-4 max-w-[68ch] leading-relaxed text-navy/70">{item.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
