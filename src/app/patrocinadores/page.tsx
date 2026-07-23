import type { Metadata } from "next";
import AnivHeader from "@/components/aniversario/AnivHeader";
import Patrocinadores from "@/components/aniversario/Patrocinadores";
import Footer from "@/components/Footer";
import SiteEffects from "@/components/SiteEffects";
import JsonLd from "@/components/JsonLd";
import PatrocinadoresHeroContent from "@/components/PatrocinadoresHeroContent";

export const metadata: Metadata = {
  title: "Patrocinadores · 7º Aniversario — PlayasOnTech",
  description:
    "Patrocina el 7º aniversario de PlayasOnTech (18 de julio de 2026, Hotel Marbella, Manzanillo). Paquetes Silver, Gold y Platinum, además de media partners.",
  alternates: {
    canonical: "/patrocinadores",
    languages: {
      "x-default": "https://playasontech.com/patrocinadores",
      "es-MX": "https://playasontech.com/patrocinadores",
      en: "https://playasontech.com/patrocinadores",
    },
  },
  openGraph: {
    title: "Patrocinadores · 7º Aniversario — PlayasOnTech",
    description:
      "Lleva tu marca frente a la comunidad tech del Pacífico mexicano. Paquetes de patrocinio Silver, Gold, Platinum y Diamond, más opciones para media partners. ¡Conoce nuestros planes!",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "https://playasontech.com/assets/metadata/og-patrocinadores.jpg",
        width: 1200,
        height: 630,
        alt: "Patrocinadores 7º Aniversario PlayasOnTech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patrocinadores · 7º Aniversario — PlayasOnTech",
    description:
      "Lleva tu marca frente a la comunidad tech del Pacífico mexicano. Paquetes de patrocinio Silver, Gold, Platinum y Diamond, más opciones para media partners. ¡Conoce nuestros planes!",
    images: ["https://playasontech.com/assets/metadata/og-patrocinadores.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://playasontech.com/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "7º Aniversario",
      item: "https://playasontech.com/aniversario",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Patrocinadores",
      item: "https://playasontech.com/patrocinadores",
    },
  ],
};

export default function PatrocinadoresPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <AnivHeader />
      <main>
        <PatrocinadoresHeroContent />
        <Patrocinadores withHeader={false} />
      </main>
      <Footer />
      <SiteEffects />
    </>
  );
}
