import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";
import JsonLd from "@/components/JsonLd";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Playas on Tech",
  alternateName: "PlayasOnTech",
  description:
    "Comunidad de tecnología de Manzanillo, Colima. Meetups gratuitos cada dos meses frente al mar.",
  url: "https://playasontech.com",
  logo: "https://playasontech.com/assets/app-logo.webp",
  foundingDate: "2025-07",
  areaServed: { "@type": "City", name: "Manzanillo, Colima, México" },
  sameAs: [
    "https://www.instagram.com/playasontech_mzo",
    "https://www.facebook.com/playasontech",
    "https://www.linkedin.com/company/playasontech",
    "https://x.com/playasontech",
    "https://www.tiktok.com/@playasontech",
    "https://www.youtube.com/@PlayasOnTech",
  ],
};

// Manrope is a variable font; next/font self-hosts it and exposes every weight
// through the --font-manrope CSS variable consumed by tailwind's `font-sans`.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Playas on Tech — Comunidad tech y meetups en Manzanillo, Colima",
  description:
    "Comunidad de desarrolladores, diseñadores y founders en Manzanillo, Colima. Meetups gratuitos cada dos meses frente al mar, desde 2025. Únete a la comunidad tech del Pacífico mexicano.",
  icons: { icon: "/assets/app-icon.webp" },
  openGraph: {
    title: "Playas on Tech · Meetup tech frente al mar en Manzanillo",
    description:
      "La comunidad de tecnología de Manzanillo, Colima. Meetups gratuitos cada dos meses frente al mar. Gratis y abierta para todos los developers, diseñadores y founders del Pacífico mexicano.",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "https://playasontech.com/assets/metadata/og-playasontech.jpg",
        width: 1200,
        height: 630,
        alt: "Playas on Tech — comunidad tech frente al mar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Playas on Tech · Meetup tech frente al mar en Manzanillo",
    description:
      "La comunidad de tecnología de Manzanillo, Colima. Meetups gratuitos cada dos meses frente al mar. Gratis y abierta para todos los developers, diseñadores y founders del Pacífico mexicano.",
    images: ["https://playasontech.com/assets/metadata/og-playasontech.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={manrope.variable}>
      <body className="font-sans text-navy antialiased">
        <JsonLd data={organizationSchema} />
        {children}
      </body>
    </html>
  );
}
