import type { Metadata } from "next";
import Footer from "@/components/Footer";
import TerminosContent from "@/components/TerminosContent";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Términos y Licencias · PlayasOnTech",
  description:
    "PlayasOnTech es una comunidad independiente y sin fines de lucro en Manzanillo, Colima. Conoce nuestros términos: licencias CC BY 4.0, MIT y nuestra política de privacidad.",
});

export default function TerminosPage() {
  return (
    <>
      <TerminosContent />
      <Footer />
    </>
  );
}
