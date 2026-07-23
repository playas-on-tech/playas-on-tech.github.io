import type { Metadata } from "next";
import AnivHeader from "@/components/aniversario/AnivHeader";
import AnivHero from "@/components/aniversario/AnivHero";
import Agenda from "@/components/aniversario/Agenda";
import Ponentes from "@/components/aniversario/Ponentes";
import ComunidadesAliadas from "@/components/aniversario/ComunidadesAliadas";
import Sponsors from "@/components/aniversario/Sponsors";
import Ubicacion from "@/components/aniversario/Ubicacion";
import Registro from "@/components/aniversario/Registro";
import Footer from "@/components/Footer";
import SiteEffects from "@/components/SiteEffects";
import JsonLd from "@/components/JsonLd";

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
  ],
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "PlayasOnTech — 7º Aniversario",
  description:
    "7º Aniversario de la comunidad tech de Manzanillo: charlas, networking y brindis frente al mar.",
  startDate: "2026-07-18T10:00:00-06:00",
  endDate: "2026-07-18T18:00:00-06:00",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "Hotel Marbella",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Marbella 7, Playa Azul Salagua",
      addressLocality: "Manzanillo",
      addressRegion: "Colima",
      postalCode: "28218",
      addressCountry: "MX",
    },
  },
  image: "https://playasontech.com/assets/app-logo.webp",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "MXN",
    availability: "https://schema.org/LimitedAvailability",
    url: "https://www.eventbrite.com.mx/e/7o-aniversario-playasontech-tickets-1990496734315",
    validFrom: "2026-05-01T00:00:00-06:00",
  },
  organizer: {
    "@type": "Organization",
    name: "PlayasOnTech",
    url: "https://playasontech.com",
  },
};

export const metadata: Metadata = {
  title: "7º Aniversario · PlayasOnTech — Meetup tech en Manzanillo, 18 julio 2026",
  description:
    "Celebra el 7º aniversario de PlayasOnTech, la comunidad tech de Manzanillo, Colima. Sábado 18 de julio de 2026 en el Hotel Marbella: charlas, networking y brindis frente al mar. Cupo limitado.",
  alternates: {
    canonical: "/aniversario",
    languages: {
      "x-default": "https://playasontech.com/aniversario",
      "es-MX": "https://playasontech.com/aniversario",
      en: "https://playasontech.com/aniversario",
    },
  },
  openGraph: {
    title: "7º Aniversario · PlayasOnTech",
    description:
      "Sábado 18 de julio, 2026 · Hotel Marbella, Manzanillo. Un evento para celebrar 7 años frente al mar con charlas, networking y brindis. Cupo limitado — reserva tu lugar.",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "https://playasontech.com/assets/metadata/og-aniversario.jpg",
        width: 1200,
        height: 630,
        alt: "7º Aniversario PlayasOnTech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "7º Aniversario · PlayasOnTech",
    description:
      "Sábado 18 de julio, 2026 · Hotel Marbella, Manzanillo. Un evento para celebrar 7 años frente al mar con charlas, networking y brindis. Cupo limitado — reserva tu lugar.",
    images: ["https://playasontech.com/assets/metadata/og-aniversario.jpg"],
  },
};

export default function AniversarioPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={eventSchema} />
      <AnivHeader />
      <main>
        <AnivHero />
        <Ponentes />
        <Agenda />
        <Sponsors />
        <ComunidadesAliadas />
        <Ubicacion />
        <Registro />
      </main>
      <Footer />
      {/* Reuses the homepage scroll-reveal observer (hero parallax/count-up are no-ops here). */}
      <SiteEffects />
    </>
  );
}
