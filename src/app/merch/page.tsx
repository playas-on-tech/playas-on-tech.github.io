import type { Metadata } from "next";
import MerchHeader from "@/components/merch/MerchHeader";
import MerchSection from "@/components/merch/MerchSection";
import Footer from "@/components/Footer";
import SiteEffects from "@/components/SiteEffects";
import JsonLd from "@/components/JsonLd";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://playasontech.com/" },
    { "@type": "ListItem", position: 2, name: "Merch", item: "https://playasontech.com/merch" },
  ],
};

export const metadata: Metadata = {
  title: "Merch · PlayasOnTech — Camiseta oficial 7o aniversario",
  description:
    "Adquiere la camiseta oficial del séptimo aniversario de PlayasOnTech. Diseño exclusivo con el mapache icónico de la comunidad.",
  alternates: {
    canonical: "/merch",
    languages: {
      "x-default": "https://playasontech.com/merch",
      "es-MX": "https://playasontech.com/merch",
      en: "https://playasontech.com/merch",
    },
  },
  openGraph: {
    title: "Merch · PlayasOnTech — Camiseta oficial 7o aniversario",
    description:
      "Camiseta oficial del séptimo aniversario de PlayasOnTech. Diseño exclusivo con el mapache icónico.",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "https://playasontech.com/assets/_k7x2m9f.jpeg",
        width: 1200,
        height: 1500,
        alt: "Merch oficial 7o aniversario PlayasOnTech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Merch · PlayasOnTech — Camiseta oficial 7o aniversario",
    description:
      "Camiseta oficial del séptimo aniversario de PlayasOnTech. Diseño exclusivo con el mapache icónico.",
    images: ["https://playasontech.com/assets/_k7x2m9f.jpeg"],
  },
};

export default function MerchPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <MerchHeader />
      <main>
        <MerchSection />
      </main>
      <Footer />
      <SiteEffects />
    </>
  );
}
