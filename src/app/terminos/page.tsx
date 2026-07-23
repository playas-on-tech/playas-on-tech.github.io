import type { Metadata } from "next";
import Footer from "@/components/Footer";
import TerminosContent from "@/components/TerminosContent";

export const metadata: Metadata = {
  title: "Términos y Licencias · PlayasOnTech",
  description:
    "PlayasOnTech es una comunidad independiente y sin fines de lucro en Manzanillo, Colima. Conoce nuestros términos: licencias CC BY 4.0, MIT y nuestra política de privacidad.",
  openGraph: {
    title: "Términos y Licencias · PlayasOnTech",
    description:
      "PlayasOnTech es una comunidad independiente y sin fines de lucro. Contenido bajo Creative Commons (CC BY 4.0), software bajo licencia MIT y política de privacidad.",
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
    title: "Términos y Licencias · PlayasOnTech",
    description:
      "PlayasOnTech es una comunidad independiente y sin fines de lucro. Contenido bajo Creative Commons (CC BY 4.0), software bajo licencia MIT y política de privacidad.",
    images: ["https://playasontech.com/assets/metadata/og-playasontech.jpg"],
  },
};

export default function TerminosPage() {
  return (
    <>
      <TerminosContent />
      <Footer />
    </>
  );
}
