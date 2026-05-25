import type { Metadata } from "next";
import AnivHeader from "@/components/aniversario/AnivHeader";
import AnivHero from "@/components/aniversario/AnivHero";
import Agenda from "@/components/aniversario/Agenda";
import Ponentes from "@/components/aniversario/Ponentes";
import Ubicacion from "@/components/aniversario/Ubicacion";
import PatrocinadoresCta from "@/components/aniversario/PatrocinadoresCta";
import Registro from "@/components/aniversario/Registro";
import Footer from "@/components/Footer";
import SiteEffects from "@/components/SiteEffects";

export const metadata: Metadata = {
  title: "7º Aniversario · Playas on Tech — 18 de julio, Hotel Marbella",
  description:
    "Celebramos el 7º aniversario de Playas on Tech el sábado 18 de julio de 2026 en el Hotel Marbella, Manzanillo. Charlas, networking y un brindis frente al mar. Cupo limitado.",
  openGraph: {
    title: "7º Aniversario · Playas on Tech",
    description:
      "Sábado 18 de julio, 2026 · Hotel Marbella, Manzanillo. Una noche para celebrar siete ediciones frente al mar.",
    locale: "es_MX",
    type: "website",
  },
};

export default function AniversarioPage() {
  return (
    <>
      <AnivHeader />
      <main>
        <AnivHero />
        <Agenda />
        <Ponentes />
        <Ubicacion />
        <PatrocinadoresCta />
        <Registro />
      </main>
      <Footer />
      {/* Reuses the homepage scroll-reveal observer (hero parallax/count-up are no-ops here). */}
      <SiteEffects />
    </>
  );
}
