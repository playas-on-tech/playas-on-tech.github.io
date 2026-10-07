import type { Metadata } from "next";
import AnivHeader from "@/components/aniversario/AnivHeader";
import Patrocinadores from "@/components/aniversario/Patrocinadores";
import PatrocinadoresHeroContent from "@/components/PatrocinadoresHeroContent";
import Footer from "@/components/Footer";
import SiteEffects from "@/components/SiteEffects";
import JsonLd from "@/components/JsonLd";
import AniversarioGate from "@/components/AniversarioGate";
import { breadcrumb } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Patrocinadores · 7º Aniversario — PlayasOnTech",
  description:
    "Patrocina el 7º aniversario de PlayasOnTech (18 de julio de 2026, Hotel Marbella, Manzanillo). Paquetes Silver, Gold y Platinum, además de media partners.",
  ogDescription:
    "Lleva tu marca frente a la comunidad tech del Pacífico mexicano. Paquetes de patrocinio Silver, Gold, Platinum y Diamond, más opciones para media partners. ¡Conoce nuestros planes!",
  image: "/assets/metadata/og-patrocinadores.jpg",
  alt: "Patrocinadores 7º Aniversario PlayasOnTech",
  path: "/patrocinadores",
});

export default function PatrocinadoresPage() {
  return (
    <>
      <JsonLd data={breadcrumb([["Inicio", "/"], ["7º Aniversario", "/aniversario"], ["Patrocinadores", "/patrocinadores"]])} />
      <AniversarioGate>
        <AnivHeader />
        <main>
          <PatrocinadoresHeroContent />
          <Patrocinadores withHeader={false} />
        </main>
        <Footer />
        <SiteEffects />
      </AniversarioGate>
    </>
  );
}
