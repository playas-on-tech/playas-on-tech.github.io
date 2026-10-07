"use client";

import { useLang } from "@/lib/lang";
import PageHero from "@/components/ui/PageHero";
import Prose from "@/components/ui/Prose";

const CC_BY = "https://creativecommons.org/licenses/by/4.0/";
const REPO_LICENSE = "https://github.com/playas-on-tech/playas-on-tech.github.io/blob/main/LICENSE";

export default function TerminosContent() {
  const { t } = useLang();
  const p = (key: string) => t(`terminos.${key}`);

  return (
    <main>
      <PageHero back={p("back")} title={p("h1")} sub={t("hero.sub")} />

      <Prose
        closing={p("closing")}
        blocks={[
          { title: p("somosH2"), body: p("somosBody") },
          { title: p("lucroH2"), body: p("lucroBody") },
          { title: p("ccH2"), body: p("ccBody"), link: { label: p("ccLink"), href: CC_BY } },
          { title: p("mitH2"), body: p("mitBody"), link: { label: p("mitLink"), href: REPO_LICENSE } },
          {
            title: p("conductaH2"),
            body: p("conductaBody"),
            link: { label: p("conductaLink"), href: "/codigo-conducta" },
          },
          { title: p("avisoH2"), body: p("avisoBody") },
        ]}
      />
    </main>
  );
}
