import type { Metadata } from "next";
import MerchHeader from "@/components/merch/MerchHeader";
import MerchSection from "@/components/merch/MerchSection";
import Footer from "@/components/Footer";
import SiteEffects from "@/components/SiteEffects";
import JsonLd from "@/components/JsonLd";
import { breadcrumb } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Merch · PlayasOnTech — Camiseta oficial 7o aniversario",
  description:
    "Adquiere la camiseta oficial del séptimo aniversario de PlayasOnTech. Diseño exclusivo con el mapache icónico de la comunidad.",
  ogDescription:
    "Camiseta oficial del séptimo aniversario de PlayasOnTech. Diseño exclusivo con el mapache icónico.",
  image: "/assets/_k7x2m9f.jpeg",
  size: [1200, 1500],
  alt: "Merch oficial 7o aniversario PlayasOnTech",
  path: "/merch",
});

export default function MerchPage() {
  return (
    <>
      <JsonLd data={breadcrumb([["Inicio", "/"], ["Merch", "/merch"]])} />
      <MerchHeader />
      <main>
        <MerchSection />
      </main>
      <Footer />
      <SiteEffects />
    </>
  );
}
