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
  title: "Playas on Tech — La comunidad tech frente al mar",
  description:
    "La comunidad de tecnología de Manzanillo, Colima. Nos reunimos cada dos meses, frente al mar, para aprender, conectar y compartir. Gratis y abierta para todos.",
  icons: { icon: "/assets/app-icon.webp" },
  openGraph: {
    title: "Playas on Tech — La comunidad tech frente al mar",
    description:
      "La comunidad de tecnología de Manzanillo, Colima. Cada dos meses, frente al mar.",
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
