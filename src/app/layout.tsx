import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

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
      "La comunidad de tecnología de Manzanillo, Colima. Cada dos meses, frente al mar. Gratis y abierta para todos.",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={manrope.variable}>
      <body className="font-sans text-navy antialiased">{children}</body>
    </html>
  );
}
