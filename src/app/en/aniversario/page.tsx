import type { Metadata } from "next";
import AnivHeader from "@/components/aniversario/AnivHeader";
import AnivHero from "@/components/aniversario/AnivHero";
import Agenda from "@/components/aniversario/Agenda";
import Ponentes from "@/components/aniversario/Ponentes";
import Ubicacion from "@/components/aniversario/Ubicacion";
import PatrocinadoresCta from "@/components/aniversario/PatrocinadoresCta";
import TicketInfo from "@/components/aniversario/TicketInfo";
import Registro from "@/components/aniversario/Registro";
import Footer from "@/components/Footer";
import SiteEffects from "@/components/SiteEffects";

export const metadata: Metadata = {
  title: "7th Anniversary · Playas on Tech — July 18, Hotel Marbella",
  description:
    "We celebrate Playas on Tech's 7th anniversary on Saturday, July 18, 2026 at Hotel Marbella, Manzanillo. Talks, networking and a toast by the sea. Limited seats.",
  openGraph: {
    title: "7th Anniversary · Playas on Tech",
    description:
      "Saturday, July 18, 2026 · Hotel Marbella, Manzanillo. An event to celebrate 7 years by the sea.",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://playasontech.com/assets/metadata/og-aniversario.jpg",
        width: 981,
        height: 514,
        alt: "7th Anniversary Playas on Tech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "7th Anniversary · Playas on Tech",
    description:
      "Saturday, July 18, 2026 · Hotel Marbella, Manzanillo. An event to celebrate 7 years by the sea.",
    images: ["https://playasontech.com/assets/metadata/og-aniversario.jpg"],
  },
};

export default function AniversarioEnPage() {
  return (
    <>
      <AnivHeader lang="en" />
      <main>
        <AnivHero lang="en" />
        <Agenda lang="en" />
        <Ponentes lang="en" />
        <Ubicacion lang="en" />
        <TicketInfo lang="en" />
        <PatrocinadoresCta lang="en" />
        <Registro lang="en" />
      </main>
      <Footer lang="en" />
      <SiteEffects />
    </>
  );
}
