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
import JsonLd from "@/components/JsonLd";

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Playas on Tech — 7º Aniversario",
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
    name: "Playas on Tech",
    url: "https://playasontech.com",
  },
};

export const metadata: Metadata = {
  title: "7º Aniversario · Playas on Tech — Meetup tech en Manzanillo, 18 julio 2026",
  description:
    "Celebra el 7º aniversario de Playas on Tech, la comunidad tech de Manzanillo, Colima. Sábado 18 de julio de 2026 en el Hotel Marbella: charlas, networking y brindis frente al mar. Cupo limitado.",
  openGraph: {
    title: "7º Aniversario · Playas on Tech",
    description:
      "Sábado 18 de julio, 2026 · Hotel Marbella, Manzanillo. Un encuentro para celebrar siete ediciones frente al mar.",
    locale: "es_MX",
    type: "website",
  },
};

export default function AniversarioPage() {
  return (
    <>
      <JsonLd data={eventSchema} />
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
