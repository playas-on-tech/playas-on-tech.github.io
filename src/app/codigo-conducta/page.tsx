import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CodigoConductaContent from "@/components/CodigoConductaContent";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Código de Conducta · PlayasOnTech",
  description:
    "Queremos que cada encuentro de PlayasOnTech sea un espacio seguro y acogedor para todas las personas. Conoce nuestro código de conducta y compromiso contra el acoso.",
});

export default function CodigoConductaPage() {
  return (
    <>
      <CodigoConductaContent />
      <Footer />
    </>
  );
}
