import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import PostHogProvider from "@/components/PostHogProvider";
import LangProvider from "@/lib/LangProvider";

const organizationSchema = {
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
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

// ══════════════════════════════════════════════════════════════════════
// Root layout — SEO metadata
//
// The `metadata` export below serves as the FALLBACK for any page that
// does not export its own `metadata`.  Every page SHOULD export its own
// `Metadata` object with a unique title, description, canonical URL, and
// Open Graph / Twitter cards to avoid duplicate‑title issues in search
// results.
//
// See the Next.js Metadata API docs:
// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// ══════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: "PlayasOnTech — Comunidad tech y meetups en Manzanillo, Colima",
  description:
    "Comunidad de desarrolladores, diseñadores y founders en Manzanillo, Colima. Meetups gratuitos cada dos meses frente al mar, desde 2025. Únete a la comunidad tech del Pacífico mexicano.",
  icons: { icon: "/assets/app-icon.webp" },
  metadataBase: new URL("https://playasontech.com"),
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "https://playasontech.com/",
      "es-MX": "https://playasontech.com/",
      en: "https://playasontech.com/",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "PlayasOnTech · Meetup tech frente al mar en Manzanillo",
    description:
      "La comunidad de tecnología de Manzanillo, Colima. Meetups gratuitos cada dos meses frente al mar. Gratis y abierta para todos los developers, diseñadores y founders del Pacífico mexicano.",
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
    title: "PlayasOnTech · Meetup tech frente al mar en Manzanillo",
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
        <PostHogProvider>
          <JsonLd data={organizationSchema} />
          <LangProvider>{children}</LangProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
