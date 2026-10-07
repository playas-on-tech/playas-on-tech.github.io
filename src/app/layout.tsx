import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import PostHogProvider from "@/components/PostHogProvider";
import LangProvider from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PlayasOnTech",
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
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

// Root metadata is the fallback for pages that don't set their own.
export const metadata: Metadata = {
  ...pageMetadata({
    title: "PlayasOnTech — Comunidad tech y meetups en Manzanillo, Colima",
    description:
      "Comunidad de desarrolladores, diseñadores y founders en Manzanillo, Colima. Meetups gratuitos cada dos meses frente al mar, desde 2025. Únete a la comunidad tech del Pacífico mexicano.",
    ogTitle: "PlayasOnTech · Meetup tech frente al mar en Manzanillo",
    ogDescription:
      "La comunidad de tecnología de Manzanillo, Colima. Meetups gratuitos cada dos meses frente al mar. Gratis y abierta para todos los developers, diseñadores y founders del Pacífico mexicano.",
    alt: "PlayasOnTech — comunidad tech frente al mar",
    path: "/",
  }),
  icons: { icon: "/assets/app-icon.webp" },
  metadataBase: new URL("https://playasontech.com"),
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={manrope.variable}>
      <body className="font-sans text-navy antialiased">
        <PostHogProvider>
          <JsonLd data={ORGANIZATION_SCHEMA} />
          <LangProvider>{children}</LangProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
