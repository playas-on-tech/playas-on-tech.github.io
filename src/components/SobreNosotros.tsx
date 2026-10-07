"use client";

import { useLang } from "@/lib/lang";
import { Code, Heart, Share, Shield } from "@/components/Icons";
import SectionHeader from "@/components/ui/SectionHeader";
import SmartLink from "@/components/ui/SmartLink";

const ICONS = [Heart, Share, Code, Shield];
const LINK_CLASS = "mt-3 inline-block text-sm font-semibold text-ocean underline-offset-4 hover:underline";

type Term = {
  title: string;
  body: string;
  href?: string;
  external?: boolean;
  linkLabel?: string;
};

export default function SobreNosotros() {
  const { t } = useLang();
  const terms = t("sobreNosotros.terms", { returnObjects: true }) as Term[];

  return (
    <section id="sobre-nosotros" className="bg-cream px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeader
          pill={t("sobreNosotros.pill")}
          title={t("sobreNosotros.h2")}
          sub={t("sobreNosotros.intro")}
          layout="stack"
          subClass="mt-4"
          className="reveal max-w-[680px]"
        />

        <div className="reveal mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {terms.map((term, i) => {
            const Icon = ICONS[i];
            return (
              <div key={term.title} className="rounded-2xl border border-navy/10 bg-cream-100 p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-ocean/12 text-ocean">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-navy">{term.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/60">{term.body}</p>
                {term.href && (
                  <SmartLink href={term.href} className={LINK_CLASS}>
                    {term.linkLabel}
                    <span aria-hidden="true"> →</span>
                  </SmartLink>
                )}
              </div>
            );
          })}
        </div>

        <p className="reveal mt-8 text-navy/60">
          {t("sobreNosotros.termsPrefix")}{" "}
          <SmartLink href={t("sobreNosotros.termsHref")} className="font-semibold text-ocean underline-offset-4 hover:underline">
            {t("sobreNosotros.termsLink")}
          </SmartLink>
          .
        </p>
      </div>
    </section>
  );
}
