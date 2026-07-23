import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CodigoConductaContent from "@/components/CodigoConductaContent";

export const metadata: Metadata = {
  title: "Código de Conducta · PlayasOnTech",
  description:
    "Queremos que cada encuentro de PlayasOnTech sea un espacio seguro y acogedor para todas las personas. Conoce nuestro código de conducta y compromiso contra el acoso.",
  openGraph: {
    title: "Código de Conducta · PlayasOnTech",
    description:
      "Conoce el código de conducta de PlayasOnTech: comportamiento esperado, cómo reportar incidentes y consecuencias. Un espacio seguro para la comunidad tech de Manzanillo.",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "https://playasontech.com/assets/metadata/og-playasontech.jpg",
        width: 1200,
        height: 630,
        alt: "PlayasOnTech — comunidad tech frente al mar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Código de Conducta · PlayasOnTech",
    description:
      "Conoce el código de conducta de PlayasOnTech: comportamiento esperado, cómo reportar incidentes y consecuencias. Un espacio seguro para la comunidad tech de Manzanillo.",
    images: ["https://playasontech.com/assets/metadata/og-playasontech.jpg"],
  },
};

export default function CodigoConductaPage() {
  return (
    <>
      <CodigoConductaContent />
      <Footer />
    </>
  );
}
