"use client";

import { useTranslation } from "react-i18next";

export default function FAQ() {
  const { t } = useTranslation();
  const items = t("faq.items", { returnObjects: true }) as Array<{q: string; a: string}>;

  return (
    <section id="faq" className="bg-cream-100 px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1100px]">
        <div className="reveal mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="inline-block rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-semibold text-white">
              {t("faq.pill")}
            </span>
            <h2 className="mt-5 max-w-[22ch] text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
              {t("faq.h2")}
            </h2>
          </div>
          <p className="max-w-[38ch] text-lg leading-relaxed text-navy/60">
            {t("faq.sub")}
          </p>
        </div>

        <ul className="reveal divide-y divide-navy/10 rounded-3xl border border-navy/10 bg-cream">
          {items.map((item) => (
            <li key={item.q}>
              <details className="group px-6 py-5 md:px-8 md:py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-lg font-semibold tracking-tight text-navy [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ocean/12 text-ocean transition-transform duration-200 group-open:rotate-45"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
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
