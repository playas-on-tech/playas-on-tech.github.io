import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Playas on Tech — The tech community by the sea",
  description:
    "The tech community of Manzanillo, Colima. We meet every two months by the sea to learn, connect and share. Free and open to all.",
  icons: { icon: "/assets/app-icon.webp" },
  openGraph: {
    title: "Playas on Tech — The tech community by the sea",
    description: "The tech community of Manzanillo, Colima. Every two months, by the sea.",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://playasontech.com/assets/metadata/og-playasontech.jpg",
        width: 1054,
        height: 552,
        alt: "Playas on Tech — tech community by the sea",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Playas on Tech — The tech community by the sea",
    description: "The tech community of Manzanillo, Colima. Every two months, by the sea.",
    images: ["https://playasontech.com/assets/metadata/og-playasontech.jpg"],
  },
};

export default function EnRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans text-navy antialiased">{children}</body>
    </html>
  );
}
