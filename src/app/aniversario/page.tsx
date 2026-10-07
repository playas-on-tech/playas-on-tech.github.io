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
import AniversarioGate from "@/components/AniversarioGate";
import { EVENT } from "@/lib/event";
import { breadcrumb } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";

const EVENT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "PlayasOnTech — 7º Aniversario",
  description:
    "7º Aniversario de la comunidad tech de Manzanillo: charlas, networking y brindis frente al mar.",
  startDate: EVENT.dateISO,
  endDate: "2026-07-18T18:00:00-06:00",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: EVENT.venue,
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
    // The structured data keeps the plain eventbrite URL; the affiliate tag is only for links.
    url: EVENT.eventbriteUrl.split("?")[0],
    validFrom: "2026-05-01T00:00:00-06:00",
  },
  organizer: { "@type": "Organization", name: "PlayasOnTech", url: "https://playasontech.com" },
};

export const metadata: Metadata = pageMetadata({
  title: "7º Aniversario · PlayasOnTech — Meetup tech en Manzanillo, 18 julio 2026",
  description:
    "Celebra el 7º aniversario de PlayasOnTech, la comunidad tech de Manzanillo, Colima. Sábado 18 de julio de 2026 en el Hotel Marbella: charlas, networking y brindis frente al mar. Cupo limitado.",
  ogTitle: "7º Aniversario · PlayasOnTech",
  ogDescription:
    "Sábado 18 de julio, 2026 · Hotel Marbella, Manzanillo. Un evento para celebrar 7 años frente al mar con charlas, networking y brindis. Cupo limitado — reserva tu lugar.",
  image: "/assets/metadata/og-aniversario.jpg",
  alt: "7º Aniversario PlayasOnTech",
  path: "/aniversario",
});

export default function AniversarioPage() {
  return (
    <>
      <JsonLd data={breadcrumb([["Inicio", "/"], ["7º Aniversario", "/aniversario"]])} />
      <JsonLd data={EVENT_SCHEMA} />
      <AniversarioGate>
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
      </AniversarioGate>
    </>
  );
}
