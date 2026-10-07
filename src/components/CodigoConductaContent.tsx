"use client";

import { useLang } from "@/lib/lang";
import PageHero from "@/components/ui/PageHero";
import Prose from "@/components/ui/Prose";

export default function CodigoConductaContent() {
  const { t } = useLang();
  const p = (key: string) => t(`codigoConducta.${key}`);
  const email = p("reportarEmail");

  return (
    <main>
      <PageHero back={p("back")} title={p("h1")} sub={p("heroSub")} subClass="max-w-[50ch]" />

      <Prose
        closing={p("closing")}
        blocks={[
          { title: p("compromisoH2"), body: p("compromisoBody") },
          {
            title: p("esperadoH2"),
            bullets: t("codigoConducta.esperado", { returnObjects: true }) as string[],
            bulletTone: "bg-ocean",
          },
          {
            title: p("inaceptableH2"),
            bullets: t("codigoConducta.inaceptable", { returnObjects: true }) as string[],
            bulletTone: "bg-sunset",
          },
          { title: p("reportarH2"), body: p("reportarBody"), link: { label: email, href: `mailto:${email}` } },
          { title: p("consecuenciasH2"), body: p("consecuenciasBody") },
        ]}
      />
    </main>
  );
}
